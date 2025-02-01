import { motion } from "framer-motion";
import { ButtonProps, buttonVariants } from "./button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const AnimatedButton = ({ 
  children, 
  className,
  variant = "default",
  size = "default",
  ...props 
}: AnimatedButtonProps) => {
  return (
    <motion.button
      className={cn(buttonVariants({ variant, size, className }))}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;