import React from 'react';
import { FileCheck, FolderPlus } from 'lucide-react';
import { AdaptationResult } from '../types/project';

interface AdaptationResultsProps {
  results: AdaptationResult | null;
  onConfirm: () => void;
}

export function AdaptationResults({ results, onConfirm }: AdaptationResultsProps) {
  if (!results) return null;

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Adaptation Plan
      </h2>

      {results.createdDirectories.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FolderPlus className="w-5 h-5" />
            Directories to Create:
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {results.createdDirectories.map((dir, index) => (
              <li key={index} className="text-gray-600">
                {dir}
              </li>
            ))}
          </ul>
        </div>
      )}

      {results.modifiedFiles.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FileCheck className="w-5 h-5" />
            Files to Create/Modify:
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {results.modifiedFiles.map((file, index) => (
              <li key={index} className="text-gray-600">
                {file.path}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={onConfirm}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Apply Changes
      </button>
    </div>
  );
}