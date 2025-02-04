import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, FolderOpen, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PDFUploader from "./PDFUploader";
import PDFPreview from "./PDFPreview";
import { pdfProcessor } from "@/services/pdfProcessor";

interface ConversionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "single" | "batch";
}

interface ConversionResult {
  fileName: string;
  text: string;
  outputPath?: string;
  structure: {
    titles: string[];
    paragraphs: string[];
    tables: string[][][];
  };
}

const ConversionDialog = ({ open, onOpenChange, mode }: ConversionDialogProps) => {
  const [step, setStep] = useState<"upload" | "output" | "converting" | "preview" | "result">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputPath, setOutputPath] = useState<string>("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [format, setFormat] = useState<"txt" | "docx">("txt");
  const { toast } = useToast();

  const handleDownload = () => {
    if (!result?.text) return;
    
    const blob = new Blob([result.text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${result.fileName}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileSelect = async (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setStep("output");
    }
  };

  const handleOutputSelect = async () => {
    setOutputPath("/Users/Documents/PDFtoTXT");
    handleConversion();
  };

  const handleConversion = async () => {
    if (!selectedFile) return;
    
    try {
      setStep("converting");
      setProgress(0);
      
      // Simular progresso
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const processed = await pdfProcessor.processFile(selectedFile);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setResult({
        fileName: selectedFile.name,
        text: processed.text,
        structure: processed.structure,
        outputPath
      });
      
      if (processed.hasImages) {
        toast({
          title: "OCR Ativado",
          description: "Foram detectadas imagens no PDF. O OCR foi utilizado para extrair o texto.",
        });
      }
      
      setStep("preview");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro na conversão",
        description: error.message,
      });
      setStep("upload");
    }
  };

  const resetConversion = () => {
    setStep("upload");
    setSelectedFile(null);
    setOutputPath("");
    setResult(null);
    setProgress(0);
    setFormat("txt");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {step === "upload" && "Selecione o arquivo PDF"}
            {step === "output" && "Escolha onde salvar"}
            {step === "converting" && "Convertendo arquivo..."}
            {step === "preview" && "Prévia da conversão"}
            {step === "result" && "Texto extraído com sucesso"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {step === "upload" && (
            <div className="space-y-4">
              <PDFUploader onFileSelect={handleFileSelect} maxFiles={1} />
              <Select value={format} onValueChange={(value: "txt" | "docx") => setFormat(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="txt">TXT</SelectItem>
                  <SelectItem value="docx">DOCX</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {step === "output" && selectedFile && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Arquivo selecionado: {selectedFile.name}
              </p>
              <p className="text-sm text-gray-500">
                Formato selecionado: {format.toUpperCase()}
              </p>
              <Button
                onClick={handleOutputSelect}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <FolderOpen className="w-5 h-5" />
                Escolher onde salvar
              </Button>
            </div>
          )}

          {step === "converting" && (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <div className="w-full space-y-2">
                <Progress value={progress} className="w-full" />
                <div className={`px-3 py-1 text-sm rounded ${progress === 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {progress === 100 ? 'Concluído' : 'Convertendo'}
                </div>
              </div>
              <p className="text-gray-600">Processando seu arquivo...</p>
            </div>
          )}

          {step === "preview" && result && (
            <div className="space-y-4">
              <PDFPreview text={result.text} structure={result.structure} />
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep("result")}
                >
                  Confirmar e Salvar
                </Button>
                <Button
                  variant="outline"
                  onClick={resetConversion}
                >
                  Converter outro arquivo
                </Button>
              </div>
            </div>
          )}

          {step === "result" && result && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  Arquivo salvo em: {result.outputPath}
                </p>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Baixar arquivo
                </Button>
              </div>
              <PDFPreview text={result.text} structure={result.structure} />
            </div>
          )}
        </div>

        {step === "result" && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={resetConversion}
            >
              Converter outro arquivo
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConversionDialog;