import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import PDFUploader from "./PDFUploader";
import TextDisplay from "./TextDisplay";

interface ConversionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ConversionResult {
  fileName: string;
  text: string;
}

const ConversionDialog = ({ open, onOpenChange }: ConversionDialogProps) => {
  const [step, setStep] = useState<"upload" | "converting" | "result">("upload");
  const [results, setResults] = useState<ConversionResult[]>([]);

  const handleFileSelect = async (files: File[]) => {
    setStep("converting");
    
    // Simulando conversão de múltiplos arquivos
    const convertedResults = await Promise.all(
      files.map(async (file) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
          fileName: file.name,
          text: `Este é um texto de exemplo extraído do arquivo ${file.name}.\n\nPara implementar a extração real, você precisará criar uma API que utilize PyPDF2 ou pdfplumber.`,
        };
      })
    );

    setResults(convertedResults);
    setStep("result");
  };

  const resetConversion = () => {
    setStep("upload");
    setResults([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {step === "upload" && "Selecione arquivos PDF"}
            {step === "converting" && "Convertendo arquivos..."}
            {step === "result" && "Textos extraídos com sucesso"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {step === "upload" && (
            <PDFUploader onFileSelect={handleFileSelect} maxFiles={10} />
          )}

          {step === "converting" && (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <Loader className="w-8 h-8 animate-spin text-pdf-DEFAULT" />
              <p className="text-gray-600">Processando seus arquivos...</p>
            </div>
          )}

          {step === "result" && results.map((result, index) => (
            <div key={index} className="mb-8">
              <TextDisplay 
                fileName={result.fileName}
                text={result.text} 
                isLoading={false} 
              />
            </div>
          ))}
        </div>

        {step === "result" && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={resetConversion}
            >
              Converter outros arquivos
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConversionDialog;