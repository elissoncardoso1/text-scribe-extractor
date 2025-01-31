import { useState } from "react";
import ConversionDialog from "@/components/ConversionDialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">
          Converta PDF para TXT
        </h1>
        <p className="text-xl text-gray-600">
          Transforme arquivos PDF em texto com facilidade
        </p>
        <Button
          onClick={() => setDialogOpen(true)}
          size="lg"
          className="mt-8"
        >
          <FileText className="mr-2" />
          Escolha um arquivo PDF
        </Button>
      </div>

      <ConversionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default Index;