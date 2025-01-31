import { useState } from "react";
import PDFUploader from "@/components/PDFUploader";
import TextDisplay from "@/components/TextDisplay";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    try {
      // Aqui você deve implementar a chamada para sua API que processa o PDF
      // Por enquanto, vamos simular um delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simulando um texto extraído
      setExtractedText("Este é um texto de exemplo extraído do PDF.\n\nPara implementar a extração real, você precisará criar uma API que utilize PyPDF2 ou pdfplumber e fazer a chamada para ela aqui.");
      
      toast({
        title: "Sucesso!",
        description: "Texto extraído com sucesso.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível extrair o texto do PDF.",
      });
      setExtractedText(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">
          Extrator de Texto PDF
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Faça upload de um arquivo PDF para extrair seu texto
        </p>
        
        <PDFUploader onFileSelect={handleFileSelect} />
        <TextDisplay text={extractedText} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;