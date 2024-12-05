import React from 'react';
import { Download } from 'lucide-react';
import { ProjectConfig } from '../../types/wizard';
import { configStages } from '../../data/wizardStages';

interface ConfigSummaryProps {
  config: ProjectConfig;
}

export function ConfigSummary({ config }: ConfigSummaryProps) {
  const handleExport = () => {
    const configString = JSON.stringify(config, null, 2);
    const blob = new Blob([configString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Configuration Summary</h3>
      
      <div className="space-y-4">
        {configStages.map(stage => (
          <div key={stage.id} className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-700 mb-2">{stage.title}</h4>
            <div className="flex flex-wrap gap-2">
              {config[stage.id as keyof ProjectConfig].map(optionId => {
                const option = stage.options.find(opt => opt.id === optionId);
                return option ? (
                  <span
                    key={optionId}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {option.label}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleExport}
        className="mt-6 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        <Download className="w-4 h-4" />
        Export Configuration
      </button>
    </div>
  );
}