import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, FolderOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PDFUploader from "./PDFUploader";
import TextDisplay from "./TextDisplay";

interface ConversionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "single" | "batch";
}

interface ConversionResult {
  fileName: string;
  text: string;
  outputPath?: string;
}

const ConversionDialog = ({ open, onOpenChange, mode }: ConversionDialogProps) => {
  const [step, setStep] = useState<"upload" | "output" | "converting" | "result">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputPath, setOutputPath] = useState<string>("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [format, setFormat] = useState<"txt" | "docx">("txt");

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
    
    setStep("converting");
    setProgress(0);
    
    // Simulando conversão com progresso
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setProgress(i);
    }
    
    setResult({
      fileName: selectedFile.name,
      text: `Texto convertido do arquivo ${selectedFile.name}.\nSalvo em: ${outputPath}/${selectedFile.name}.${format}`,
      outputPath
    });
    
    setStep("result");
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

          {step === "result" && result && (
            <div>
              <p className="text-sm text-gray-500 mb-4">
                Arquivo salvo em: {result.outputPath}
              </p>
              <TextDisplay 
                fileName={result.fileName}
                text={result.text}
                isLoading={false}
              />
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