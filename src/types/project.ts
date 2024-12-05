export interface ProjectStructure {
  hasPackageJson: boolean;
  hasTsConfig: boolean;
  hasViteConfig: boolean;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  srcFolder: boolean;
  indexHtml: boolean;
}

export interface ValidationResult {
  isCompatible: boolean;
  issues: string[];
  suggestions: string[];
}

export interface FileData {
  path: string;
  content: string;
  type: 'file' | 'directory';
}

export interface AdaptationResult {
  success: boolean;
  modifiedFiles: FileData[];
  createdDirectories: string[];
  error?: string;
}