interface TextDisplayProps {
  text: string | null;
  isLoading: boolean;
}

const TextDisplay = ({ text, isLoading }: TextDisplayProps) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  if (!text) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Texto Extraído:</h2>
        <div className="whitespace-pre-wrap font-mono text-sm">{text}</div>
      </div>
    </div>
  );
};

export default TextDisplay;