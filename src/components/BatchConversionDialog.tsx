import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, FolderPlus, Folder } from "lucide-react";
import { Progress } from "@/components/ui/progress";
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
  progress: number;
}

const BatchConversionDialog = ({ open, onOpenChange }: BatchConversionDialogProps) => {
  const [step, setStep] = useState<"folder" | "upload" | "converting" | "result">("folder");
  const [results, setResults] = useState<ConversionResult[]>([]);
  const [queue, setQueue] = useState<File[]>([]);
  const [outputPath, setOutputPath] = useState<string>("");
  const [overallProgress, setOverallProgress] = useState(0);
  const { toast } = useToast();

  const handleFolderSelect = async (createNew: boolean) => {
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
      status: "pending" as const,
      progress: 0
    }));
    
    setResults(prev => [...prev, ...newResults]);

    const totalFiles = files.length;
    let completedFiles = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      setResults(prev => prev.map(result => 
        result.fileName === file.name
          ? { ...result, status: "converting" }
          : result
      ));

      // Simular progresso individual do arquivo
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        
        setResults(prev => prev.map(result => 
          result.fileName === file.name
            ? { ...result, progress }
            : result
        ));
      }
      
      completedFiles++;
      setOverallProgress((completedFiles / totalFiles) * 100);
      
      setResults(prev => prev.map(result => 
        result.fileName === file.name
          ? {
              ...result,
              text: `Texto convertido do arquivo ${file.name}.\nSalvo em: ${outputPath}/${file.name}.txt`,
              status: "completed",
              progress: 100
            }
          : result
      ));

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
    setOverallProgress(0);
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
              <div className="space-y-2 mb-6">
                <Progress value={overallProgress} className="w-full" />
                <div className={`px-3 py-1 text-sm rounded ${overallProgress === 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {overallProgress === 100 ? 'Concluído' : 'Convertendo'}
                </div>
              </div>

              {results.map((result, index) => (
                <div key={index} className="relative space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{result.fileName}</span>
                    {result.status === "converting" && (
                      <Loader className="w-4 h-4 animate-spin text-pdf-DEFAULT" />
                    )}
                  </div>
                  <Progress value={result.progress} className="w-full" />
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