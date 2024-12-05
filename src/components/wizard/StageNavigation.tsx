import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StageNavigationProps {
  currentStage: number;
  totalStages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function StageNavigation({ 
  currentStage, 
  totalStages, 
  onPrevious, 
  onNext 
}: StageNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={onPrevious}
        disabled={currentStage === 0}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:opacity-50"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>
      <div className="text-sm text-gray-500">
        Stage {currentStage + 1} of {totalStages}
      </div>
      <button
        onClick={onNext}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {currentStage === totalStages - 1 ? 'Finish' : 'Next'}
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}