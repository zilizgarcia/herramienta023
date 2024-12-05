export interface ConfigOption {
  id: string;
  label: string;
  description: string;
  icon?: string;
}

export interface ConfigStage {
  id: string;
  title: string;
  description: string;
  options: ConfigOption[];
}

export interface ProjectConfig {
  appType: string[];
  features: string[];
  design: string[];
  integrations: string[];
  environment: string[];
  security: string[];
  testing: string[];
  collaboration: string[];
  customization: string[];
  scalability: string[];
}

export interface WizardState {
  currentStage: number;
  config: ProjectConfig;
}