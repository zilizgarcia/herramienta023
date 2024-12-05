import { ProjectStructure, ValidationResult } from '../types/project';

export function validateProject(structure: ProjectStructure): ValidationResult {
  const issues: string[] = [];
  const suggestions: string[] = [];

  if (!structure.hasPackageJson) {
    issues.push('Missing package.json file');
    suggestions.push('Create a package.json file using npm init');
  }

  if (!structure.hasTsConfig) {
    issues.push('Missing TypeScript configuration');
    suggestions.push('Add tsconfig.json for TypeScript support');
  }

  if (!structure.hasViteConfig) {
    issues.push('Missing Vite configuration');
    suggestions.push('Add vite.config.ts for Vite configuration');
  }

  if (!structure.srcFolder) {
    issues.push('Missing src directory');
    suggestions.push('Create a src directory for your source files');
  }

  if (!structure.indexHtml) {
    issues.push('Missing index.html');
    suggestions.push('Add an index.html file in the root directory');
  }

  return {
    isCompatible: issues.length === 0,
    issues,
    suggestions,
  };
}