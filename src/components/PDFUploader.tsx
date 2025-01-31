import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PDFUploaderProps {
  onFileSelect: (files: File[]) => void;
  maxFiles?: number;
}

const PDFUploader = ({ onFileSelect, maxFiles = 10 }: PDFUploaderProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const pdfFiles = acceptedFiles.filter(file => file.type === "application/pdf");
      
      if (pdfFiles.length === 0) {
        toast({
          variant: "destructive",
          title: "Erro no upload",
          description: "Por favor, selecione apenas arquivos PDF.",
        });
        return;
      }

      if (pdfFiles.length > maxFiles) {
        toast({
          variant: "destructive",
          title: "Limite excedido",
          description: `Você pode selecionar até ${maxFiles} arquivos por vez.`,
        });
        return;
      }

      setSelectedFiles(pdfFiles);
      onFileSelect(pdfFiles);
    },
    [onFileSelect, maxFiles, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
    maxFiles,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-pdf-DEFAULT bg-pdf-light"
              : "border-gray-300 hover:border-pdf-DEFAULT"
          }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          {selectedFiles.length > 0 ? (
            <>
              <FileText className="w-12 h-12 text-pdf-DEFAULT" />
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {selectedFiles.length} arquivo{selectedFiles.length !== 1 ? 's' : ''} selecionado{selectedFiles.length !== 1 ? 's' : ''}
                </p>
                <ul className="text-sm text-gray-500">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium">
                  {isDragActive
                    ? "Solte os arquivos aqui"
                    : "Arraste e solte seus arquivos PDF aqui"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  ou clique para selecionar (máximo {maxFiles} arquivos)
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFUploader;