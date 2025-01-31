import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, FolderOpen } from "lucide-react";
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

  const handleFileSelect = async (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setStep("output");
    }
  };

  const handleOutputSelect = async () => {
    // Simulando seleção de pasta - em uma implementação real, 
    // isso usaria a API do sistema de arquivos
    setOutputPath("/Users/Documents/PDFtoTXT");
    handleConversion();
  };

  const handleConversion = async () => {
    if (!selectedFile) return;
    
    setStep("converting");
    
    // Simulando conversão
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setResult({
      fileName: selectedFile.name,
      text: `Texto convertido do arquivo ${selectedFile.name}.\nSalvo em: ${outputPath}/${selectedFile.name}.txt`,
      outputPath
    });
    
    setStep("result");
  };

  const resetConversion = () => {
    setStep("upload");
    setSelectedFile(null);
    setOutputPath("");
    setResult(null);
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
            <PDFUploader onFileSelect={handleFileSelect} maxFiles={1} />
          )}

          {step === "output" && selectedFile && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Arquivo selecionado: {selectedFile.name}
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
              <Loader className="w-8 h-8 animate-spin text-pdf-DEFAULT" />
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