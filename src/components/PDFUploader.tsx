import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PDFUploaderProps {
  onFileSelect: (file: File) => void;
}

const PDFUploader = ({ onFileSelect }: PDFUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.type === "application/pdf") {
        setSelectedFile(file);
        onFileSelect(file);
      } else {
        toast({
          variant: "destructive",
          title: "Erro no upload",
          description: "Por favor, selecione apenas arquivos PDF.",
        });
      }
    },
    [onFileSelect, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
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
          {selectedFile ? (
            <>
              <FileText className="w-12 h-12 text-pdf-DEFAULT" />
              <p className="text-lg font-medium">{selectedFile.name}</p>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium">
                  {isDragActive
                    ? "Solte o arquivo aqui"
                    : "Arraste e solte seu arquivo PDF aqui"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  ou clique para selecionar
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