import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, FolderPlus, Folder } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PDFUploader from "./PDFUploader";
import TextDisplay from "./TextDisplay";

interface BatchConversionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ConversionResult {
  fileName: string;
  text: string;
  status: "pending" | "converting" | "completed" | "error";
}

const BatchConversionDialog = ({ open, onOpenChange }: BatchConversionDialogProps) => {
  const [step, setStep] = useState<"folder" | "upload" | "converting" | "result">("folder");
  const [results, setResults] = useState<ConversionResult[]>([]);
  const [queue, setQueue] = useState<File[]>([]);
  const [outputPath, setOutputPath] = useState<string>("");
  const { toast } = useToast();

  const handleFolderSelect = async (createNew: boolean) => {
    // Simulando seleção de pasta - em uma implementação real, 
    // isso usaria a API do sistema de arquivos
    setOutputPath("/Users/Documents/PDFtoTXT");
    setStep("upload");
  };

  const handleFileSelect = async (files: File[]) => {
    if (files.length > 10) {
      const initialBatch = files.slice(0, 10);
      const remainingFiles = files.slice(10);
      
      setQueue(remainingFiles);
      processFiles(initialBatch);
    } else {
      processFiles(files);
    }
  };

  const processFiles = async (files: File[]) => {
    setStep("converting");
    
    const newResults = files.map(file => ({
      fileName: file.name,
      text: "",
      status: "pending" as const
    }));
    
    setResults(prev => [...prev, ...newResults]);

    // Processar arquivos em lotes de 10
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Atualizar status para converting
      setResults(prev => prev.map((result, index) => 
        result.fileName === file.name
          ? { ...result, status: "converting" }
          : result
      ));

      // Simular conversão
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar com o resultado
      setResults(prev => prev.map((result, index) => 
        result.fileName === file.name
          ? {
              ...result,
              text: `Texto convertido do arquivo ${file.name}.\nSalvo em: ${outputPath}/${file.name}.txt`,
              status: "completed"
            }
          : result
      ));

      // Se for o último arquivo e ainda há arquivos na fila
      if (i === files.length - 1 && queue.length > 0) {
        const nextBatch = queue.slice(0, 10);
        const remainingQueue = queue.slice(10);
        setQueue(remainingQueue);
        processFiles(nextBatch);
      }
    }

    setStep("result");
  };

  const resetConversion = () => {
    setStep("folder");
    setResults([]);
    setQueue([]);
    setOutputPath("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {step === "folder" && "Selecione a pasta de destino"}
            {step === "upload" && "Selecione os arquivos PDF"}
            {step === "converting" && "Convertendo arquivos..."}
            {step === "result" && "Conversão concluída"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {step === "folder" && (
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => handleFolderSelect(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FolderPlus className="w-5 h-5" />
                Criar nova pasta
              </Button>
              <Button
                onClick={() => handleFolderSelect(false)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Folder className="w-5 h-5" />
                Selecionar pasta existente
              </Button>
            </div>
          )}

          {step === "upload" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Pasta selecionada: {outputPath}
              </p>
              <PDFUploader onFileSelect={handleFileSelect} maxFiles={999} />
            </div>
          )}

          {(step === "converting" || step === "result") && (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="relative">
                  {result.status === "converting" && (
                    <div className="absolute right-2 top-2">
                      <Loader className="w-5 h-5 animate-spin text-pdf-DEFAULT" />
                    </div>
                  )}
                  <TextDisplay
                    fileName={result.fileName}
                    text={result.text || "Aguardando conversão..."}
                    isLoading={result.status === "pending" || result.status === "converting"}
                  />
                </div>
              ))}
              
              {queue.length > 0 && (
                <p className="text-sm text-gray-500">
                  {queue.length} arquivo(s) na fila de conversão
                </p>
              )}
            </div>
          )}
        </div>

        {step === "result" && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={resetConversion}
            >
              Converter mais arquivos
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BatchConversionDialog;