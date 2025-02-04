import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';
import { createWorker } from 'tesseract.js';
import { PDFDocument } from 'pdf-lib';
import { OPS } from 'pdfjs-dist';

// Configurar worker do PDF.js
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`;

interface ProcessedPDF {
  text: string;
  structure: {
    titles: string[];
    paragraphs: string[];
    tables: string[][];
  };
  hasImages: boolean;
}

export class PDFProcessor {
  private worker: any = null;

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
        tables: [] as string[][],
      };

      const processedPages: string[] = [];
      
      for (let i = 1; i <= pdfJS.numPages; i++) {
        const page = await pdfJS.getPage(i);
        const textContent = await page.getTextContent();
        
        let pageText = '';
        let currentY = null;
        let lineText = '';
        
        // Processar elementos da página
        for (const item of textContent.items as any[]) {
          // Detectar títulos baseado no tamanho da fonte
          if (item.height > 14) {
            structure.titles.push(item.str);
          }
          
          // Agrupar texto por linha
          if (currentY === null || currentY !== item.transform[5]) {
            if (lineText) {
              pageText += lineText + '\n';
              structure.paragraphs.push(lineText);
            }
            lineText = item.str;
          } else {
            lineText += ' ' + item.str;
          }
          
          currentY = item.transform[5];
        }
        
        // Verificar se há imagens e fazer OCR se necessário
        const operatorList = await page.getOperatorList();
        const hasImages = operatorList.fnArray.some(
          (fn: number) => fn === OPS.paintJpegXObject || fn === OPS.paintImageXObject
        );
        
        if (hasImages) {
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          await page.render({
            canvasContext: context!,
            viewport: viewport
          }).promise;
          
          const { data: { text: ocrText } } = await this.worker.recognize(canvas);
          pageText += '\n' + ocrText;
        }
        
        processedPages.push(pageText);
      }

      return {
        text: processedPages.join('\n'),
        structure,
        hasImages: processedPages.some(page => page.includes('[Image]'))
      };
    } catch (error) {
      console.error('Erro ao processar PDF:', error);
      throw new Error(this.getErrorMessage(error));
    }
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