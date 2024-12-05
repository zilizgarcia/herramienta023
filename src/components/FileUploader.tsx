import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  onFolderSelect: (files: FileList) => void;
}

export function FileUploader({ onFolderSelect }: FileUploaderProps) {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const items = e.dataTransfer.items;
    if (items) {
      onFolderSelect(e.dataTransfer.files);
    }
  }, [onFolderSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFolderSelect(e.target.files);
    }
  }, [onFolderSelect]);

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="folder-input"
        className="hidden"
        webkitdirectory=""
        directory=""
        multiple
        onChange={handleFileSelect}
      />
      <label
        htmlFor="folder-input"
        className="cursor-pointer flex flex-col items-center gap-4"
      >
        <Upload className="w-12 h-12 text-gray-400" />
        <div>
          <p className="text-lg font-medium text-gray-700">
            Drag and drop your project folder here
          </p>
          <p className="text-sm text-gray-500">
            or click to select folder
          </p>
        </div>
      </label>
    </div>
  );
}