import React, { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { ValidationResults } from './components/ValidationResults';
import { AdaptationResults } from './components/AdaptationResults';
import { ConfigurationWizard } from './components/wizard/ConfigurationWizard';
import { ProjectStructure, ValidationResult, AdaptationResult } from './types/project';
import { validateProject } from './utils/projectValidator';
import { adaptProject } from './utils/projectAdapter';
import { Zap, Settings } from 'lucide-react';

function App() {
  const [validationResults, setValidationResults] = useState<ValidationResult | null>(null);
  const [adaptationResults, setAdaptationResults] = useState<AdaptationResult | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [showWizard, setShowWizard] = useState(false);

  const analyzeProject = async (uploadedFiles: FileList) => {
    setFiles(uploadedFiles);
    const structure: ProjectStructure = {
      hasPackageJson: false,
      hasTsConfig: false,
      hasViteConfig: false,
      dependencies: {},
      devDependencies: {},
      srcFolder: false,
      indexHtml: false,
    };

    // Analyze uploaded files
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const path = file.webkitRelativePath || file.name;

      if (path.endsWith('package.json')) {
        structure.hasPackageJson = true;
        try {
          const content = await file.text();
          const pkg = JSON.parse(content);
          structure.dependencies = pkg.dependencies || {};
          structure.devDependencies = pkg.devDependencies || {};
        } catch (e) {
          console.error('Error parsing package.json:', e);
        }
      }

      if (path.endsWith('tsconfig.json')) structure.hasTsConfig = true;
      if (path.match(/vite\.config\.(js|ts)/)) structure.hasViteConfig = true;
      if (path.includes('/src/')) structure.srcFolder = true;
      if (path.endsWith('index.html')) structure.indexHtml = true;
    }

    const results = validateProject(structure);
    setValidationResults(results);

    if (!results.isCompatible) {
      const adaptation = await adaptProject(uploadedFiles);
      setAdaptationResults(adaptation);
    }
  };

  const handleAdaptation = async () => {
    if (!files) return;
    
    try {
      console.log('Adapting project...');
      setValidationResults(null);
      setAdaptationResults(null);
      setFiles(null);
    } catch (error) {
      console.error('Error adapting project:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">
              Project Configuration Tool
            </h1>
          </div>
          <p className="text-gray-600 mb-4">
            Configure and adapt your project for bolt.new
          </p>
          <button
            onClick={() => setShowWizard(!showWizard)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Settings className="w-4 h-4" />
            {showWizard ? 'Hide Configuration Wizard' : 'Show Configuration Wizard'}
          </button>
        </div>

        {showWizard ? (
          <ConfigurationWizard />
        ) : (
          <>
            <FileUploader onFolderSelect={analyzeProject} />
            <ValidationResults results={validationResults} />
            {!validationResults?.isCompatible && (
              <AdaptationResults 
                results={adaptationResults} 
                onConfirm={handleAdaptation}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;