import { useState } from "react";
import ConversionDialog from "@/components/ConversionDialog";
import BatchConversionDialog from "@/components/BatchConversionDialog";
import { Button } from "@/components/ui/button";
import { FileText, File, Files } from "lucide-react";

const Index = () => {
  const [singleDialogOpen, setSingleDialogOpen] = useState(false);
  const [batchDialogOpen, setBatchDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">
          Converta PDF para <span className="inline-flex items-center gap-2"><FileText className="w-6 h-6" /> ou <File className="w-6 h-6" /></span>
        </h1>
        <p className="text-xl text-gray-600">
          Transforme arquivos PDF em texto com facilidade
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            onClick={() => setSingleDialogOpen(true)}
            size="lg"
            className="flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Converter um arquivo
          </Button>
          <Button
            onClick={() => setBatchDialogOpen(true)}
            size="lg"
            variant="outline"
            className="flex items-center gap-2"
          >
            <Files className="w-5 h-5" />
            Conversão em massa
          </Button>
        </div>
      </div>

      <ConversionDialog
        open={singleDialogOpen}
        onOpenChange={setSingleDialogOpen}
        mode="single"
      />
      
      <BatchConversionDialog
        open={batchDialogOpen}
        onOpenChange={setBatchDialogOpen}
      />
    </div>
  );
};

export default Index;