import React from 'react';
import { Check } from 'lucide-react';
import { ConfigOption } from '../../types/wizard';

interface StageOptionsProps {
  options: ConfigOption[];
  selectedOptions: string[];
  onToggle: (optionId: string) => void;
}

export function StageOptions({ 
  options, 
  selectedOptions, 
  onToggle 
}: StageOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map(option => (
        <button
          key={option.id}
          onClick={() => onToggle(option.id)}
          className={`p-4 rounded-lg border-2 text-left transition-colors ${
            selectedOptions.includes(option.id)
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 ${
              selectedOptions.includes(option.id)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}>
              {selectedOptions.includes(option.id) && <Check className="w-3 h-3" />}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{option.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{option.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}