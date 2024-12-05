import { ProjectStructure, AdaptationResult, FileData } from '../types/project';
import { generateTemplateFiles } from './templateGenerator';

export async function adaptProject(files: FileList): Promise<AdaptationResult> {
  try {
    const structure = await analyzeProjectStructure(files);
    const templateFiles = generateTemplateFiles();
    const modifiedFiles: FileData[] = [];
    const createdDirectories: string[] = [];

    // Create missing directories
    if (!structure.srcFolder) {
      createdDirectories.push('src');
    }

    // Generate missing files
    for (const template of templateFiles) {
      const fileExists = Array.from(files).some(
        file => file.webkitRelativePath.endsWith(template.path)
      );

      if (!fileExists) {
        modifiedFiles.push(template);
      }
    }

    return {
      success: true,
      modifiedFiles,
      createdDirectories
    };
  } catch (error) {
    return {
      success: false,
      modifiedFiles: [],
      createdDirectories: [],
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

async function analyzeProjectStructure(files: FileList): Promise<ProjectStructure> {
  const structure: ProjectStructure = {
    hasPackageJson: false,
    hasTsConfig: false,
    hasViteConfig: false,
    dependencies: {},
    devDependencies: {},
    srcFolder: false,
    indexHtml: false
  };

  for (const file of Array.from(files)) {
    const path = file.webkitRelativePath;
    
    if (path.endsWith('package.json')) {
      structure.hasPackageJson = true;
      const content = await file.text();
      const pkg = JSON.parse(content);
      structure.dependencies = pkg.dependencies || {};
      structure.devDependencies = pkg.devDependencies || {};
    }
    if (path.endsWith('tsconfig.json')) structure.hasTsConfig = true;
    if (path.match(/vite\.config\.(js|ts)/)) structure.hasViteConfig = true;
    if (path.includes('/src/')) structure.srcFolder = true;
    if (path.endsWith('index.html')) structure.indexHtml = true;
  }

  return structure;
}