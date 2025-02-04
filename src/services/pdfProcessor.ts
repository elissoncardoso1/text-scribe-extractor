import { getDocument, GlobalWorkerOptions, version, OPS } from 'pdfjs-dist';
import { createWorker } from 'tesseract.js';
import { PDFDocument } from 'pdf-lib';

// Configurar worker do PDF.js
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`;

interface ProcessedPDF {
  text: string;
  structure: {
    titles: string[];
    paragraphs: string[];
    tables: Array<Array<string[]>>;
  };
  hasImages: boolean;
}

export class PDFProcessor {
  private worker: Tesseract.Worker | null = null;

  async initialize() {
    if (!this.worker) {
      this.worker = await createWorker('eng');
    }
  }

  async processFile(file: File): Promise<ProcessedPDF> {
    try {
      await this.initialize();
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pdfJS = await getDocument(arrayBuffer).promise;
      
      const structure = {
        titles: [] as string[],
        paragraphs: [] as string[],
        tables: [] as Array<Array<string[]>>,
      };

      const processedPages: string[] = [];
      let hasImages = false;

      for (let i = 1; i <= pdfJS.numPages; i++) {
        const page = await pdfJS.getPage(i);
        const textContent = await page.getTextContent();
        
        let pageText = '';
        let currentY: number | null = null;
        let lineText = '';

        for (const item of textContent.items as any[]) {
          const textItem = item as { str: string; transform: number[]; height: number };

          // Detecta títulos baseado no tamanho da fonte
          if (textItem.height > 14) {
            structure.titles.push(textItem.str);
          }

          // Agrupa texto por linha
          if (currentY === null || currentY !== textItem.transform[5]) {
            if (lineText) {
              pageText += lineText + '\n';
              structure.paragraphs.push(lineText);
            }
            lineText = textItem.str;
          } else {
            lineText += ' ' + textItem.str;
          }
          currentY = textItem.transform[5];
        }
        if (lineText) structure.paragraphs.push(lineText);

        // Verifica se há imagens
        const operatorList = await page.getOperatorList();
        const hasPageImages = operatorList.fnArray.some(
          (fn: number) => fn === OPS.paintXObject || fn === OPS.paintInlineImageXObject
        );

        hasImages ||= hasPageImages;

        if (hasPageImages) {
          const ocrText = await this.extractTextFromImages(page);
          pageText += '\n' + ocrText;
        }

        processedPages.push(pageText);
      }

      return {
        text: processedPages.join('\n'),
        structure,
        hasImages,
      };
    } catch (error) {
      console.error('Erro ao processar PDF:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  private async extractTextFromImages(page: any): Promise<string> {
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      console.warn('Contexto 2D não disponível para OCR');
      return '';
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;
    
    const { data: { text: ocrText } } = await this.worker!.recognize(canvas);
    return ocrText;
  }

  private getErrorMessage(error: any): string {
    if (error.message.includes('image')) {
      return 'Este PDF contém imagens. O OCR está sendo utilizado para extrair o texto.';
    }
    if (error.message.includes('encrypted')) {
      return 'Este PDF está protegido. Por favor, remova a proteção antes de converter.';
    }
    return 'Ocorreu um erro ao processar o PDF. Tente novamente.';
  }

  async destroy() {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }
}

export const pdfProcessor = new PDFProcessor();