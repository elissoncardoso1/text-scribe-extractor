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

const ConversionDialog = ({ open, onOpenChange }: ConversionDialogProps) => {
  const [step, setStep] = useState<"upload" | "converting" | "result">("upload");
  const [extractedText, setExtractedText] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setStep("converting");
    // Simulando conversão
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setExtractedText(
      "Este é um texto de exemplo extraído do PDF.\n\nPara implementar a extração real, você precisará criar uma API que utilize PyPDF2 ou pdfplumber."
    );
    setStep("result");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {step === "upload" && "Selecione um arquivo PDF"}
            {step === "converting" && "Convertendo arquivo..."}
            {step === "result" && "Texto extraído com sucesso"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {step === "upload" && (
            <PDFUploader onFileSelect={handleFileSelect} />
          )}

          {step === "converting" && (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <Loader className="w-8 h-8 animate-spin text-pdf-DEFAULT" />
              <p className="text-gray-600">Processando seu arquivo...</p>
            </div>
          )}

          {step === "result" && (
            <TextDisplay text={extractedText} isLoading={false} />
          )}
        </div>

        {step === "result" && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setStep("upload");
                setExtractedText(null);
              }}
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