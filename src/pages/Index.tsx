import { useState } from "react";
import { motion } from "framer-motion";
import ConversionDialog from "@/components/ConversionDialog";
import BatchConversionDialog from "@/components/BatchConversionDialog";
import AnimatedButton from "@/components/ui/animated-button";
import { Files } from "lucide-react";

const Index = () => {
  const [singleDialogOpen, setSingleDialogOpen] = useState(false);
  const [batchDialogOpen, setBatchDialogOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"
    >
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-gray-900"
        >
          Converta PDF para{" "}
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex items-center">
              <img 
                src="/lovable-uploads/5005748c-facc-4121-aa43-91a98f47eed9.png"
                alt="TXT icon"
                className="w-10 h-10" // Aumentado de w-6 h-6 para w-10 h-10
              />
              <span className="text-sm ml-1">txt</span>
            </span>
            {" "}ou{" "}
            <span className="inline-flex items-center">
              <Files className="w-10 h-10 text-primary" /> {/* Aumentado de w-6 h-6 para w-10 h-10 */}
              <span className="text-sm ml-1">docx</span>
            </span>
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-gray-600"
        >
          Transforme arquivos PDF em texto com facilidade
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <AnimatedButton
            onClick={() => setSingleDialogOpen(true)}
            size="lg"
            className="flex items-center gap-2"
          >
            <Files className="w-5 h-5" />
            Converter um arquivo
          </AnimatedButton>
          
          <AnimatedButton
            onClick={() => setBatchDialogOpen(true)}
            size="lg"
            variant="outline"
            className="flex items-center gap-2"
          >
            <Files className="w-5 h-5" />
            Conversão em massa
          </AnimatedButton>
        </motion.div>
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
    </motion.div>
  );
};

export default Index;