import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PDFPreviewProps {
  text: string;
  structure: {
    titles: string[];
    paragraphs: string[];
    tables: string[][];
  };
}

const PDFPreview = ({ text, structure }: PDFPreviewProps) => {
  return (
    <div className="w-full space-y-4">
      {structure.titles && structure.titles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Títulos Detectados</h3>
          <ul className="list-disc pl-5">
            {structure.titles.map((title, index) => (
              <li key={index} className="text-sm">{title}</li>
            ))}
          </ul>
        </div>
      )}

      {structure.tables && structure.tables.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Tabelas Detectadas</h3>
          {structure.tables.map((table, tableIndex) => (
            <Table key={tableIndex}>
              <TableHeader>
                <TableRow>
                  {table[0]?.map((header, index) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.slice(1).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Texto Extraído</h3>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="whitespace-pre-wrap font-mono text-sm">
            {text}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PDFPreview;