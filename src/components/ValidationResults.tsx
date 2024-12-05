import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ValidationResult } from '../types/project';

interface ValidationResultsProps {
  results: ValidationResult | null;
}

export function ValidationResults({ results }: ValidationResultsProps) {
  if (!results) return null;

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        {results.isCompatible ? (
          <>
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold text-green-700">
              Project is compatible with bolt.new!
            </h2>
          </>
        ) : (
          <>
            <AlertCircle className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-yellow-700">
              Project needs some adjustments
            </h2>
          </>
        )}
      </div>

      {!results.isCompatible && (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Issues Found:</h3>
            <ul className="list-disc list-inside space-y-1">
              {results.issues.map((issue, index) => (
                <li key={index} className="text-red-600 flex items-center gap-2">
                  <XCircle className="w-4 h-4 inline" />
                  {issue}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Suggestions:</h3>
            <ul className="list-disc list-inside space-y-1">
              {results.suggestions.map((suggestion, index) => (
                <li key={index} className="text-blue-600">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}