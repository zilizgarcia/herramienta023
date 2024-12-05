import React, { useState } from 'react';
import { configStages } from '../../data/wizardStages';
import { StageNavigation } from './StageNavigation';
import { StageOptions } from './StageOptions';
import { ConfigSummary } from './ConfigSummary';
import { ProjectConfig, WizardState } from '../../types/wizard';

const initialConfig: ProjectConfig = {
  appType: [],
  features: [],
  design: [],
  integrations: [],
  environment: [],
  security: [],
  testing: [],
  collaboration: [],
  customization: [],
  scalability: []
};

export function ConfigurationWizard() {
  const [state, setState] = useState<WizardState>({
    currentStage: 0,
    config: initialConfig
  });

  const handleOptionToggle = (stageId: string, optionId: string) => {
    setState(prev => ({
      ...prev,
      config: {
        ...prev.config,
        [stageId]: prev.config[stageId as keyof ProjectConfig].includes(optionId)
          ? prev.config[stageId as keyof ProjectConfig].filter(id => id !== optionId)
          : [...prev.config[stageId as keyof ProjectConfig], optionId]
      }
    }));
  };

  const handleNext = () => {
    if (state.currentStage < configStages.length - 1) {
      setState(prev => ({ ...prev, currentStage: prev.currentStage + 1 }));
    }
  };

  const handlePrevious = () => {
    if (state.currentStage > 0) {
      setState(prev => ({ ...prev, currentStage: prev.currentStage - 1 }));
    }
  };

  const currentStage = configStages[state.currentStage];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{currentStage.title}</h2>
        <p className="text-gray-600 mt-2">{currentStage.description}</p>
      </div>

      <StageOptions
        options={currentStage.options}
        selectedOptions={state.config[currentStage.id as keyof ProjectConfig]}
        onToggle={(optionId) => handleOptionToggle(currentStage.id, optionId)}
      />

      <StageNavigation
        currentStage={state.currentStage}
        totalStages={configStages.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {state.currentStage === configStages.length - 1 && (
        <ConfigSummary config={state.config} />
      )}
    </div>
  );
}