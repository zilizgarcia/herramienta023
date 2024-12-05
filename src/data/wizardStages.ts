import { ConfigStage } from '../types/wizard';

export const configStages: ConfigStage[] = [
  {
    id: 'appType',
    title: 'Type of Application',
    description: 'Select the type of application you want to build',
    options: [
      { id: 'web', label: 'Web Application', description: 'Standard web application with React' },
      { id: 'mobile', label: 'Mobile Application', description: 'Cross-platform mobile app' },
      { id: 'desktop', label: 'Desktop Application', description: 'Cross-platform desktop app' },
      { id: 'extension', label: 'Browser Extension', description: 'Browser extension or plugin' }
    ]
  },
  {
    id: 'features',
    title: 'Core Features',
    description: 'Select the main features for your application',
    options: [
      { id: 'auth', label: 'Authentication', description: 'User authentication and authorization' },
      { id: 'api', label: 'API Integration', description: 'REST/GraphQL API integration' },
      { id: 'offline', label: 'Offline Support', description: 'Offline-first functionality' },
      { id: 'realtime', label: 'Real-time Features', description: 'Real-time updates and chat' }
    ]
  },
  {
    id: 'design',
    title: 'Design & UI',
    description: 'Choose design and UI preferences',
    options: [
      { id: 'theme-dark', label: 'Dark Theme', description: 'Dark mode support' },
      { id: 'theme-light', label: 'Light Theme', description: 'Light mode support' },
      { id: 'responsive', label: 'Responsive Design', description: 'Mobile-first responsive layout' },
      { id: 'accessibility', label: 'Accessibility', description: 'WCAG compliance features' }
    ]
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Select third-party integrations',
    options: [
      { id: 'database', label: 'Database', description: 'Database integration' },
      { id: 'analytics', label: 'Analytics', description: 'Analytics integration' },
      { id: 'payments', label: 'Payments', description: 'Payment processing integration' },
      { id: 'storage', label: 'Cloud Storage', description: 'Cloud storage integration' }
    ]
  },
  {
    id: 'environment',
    title: 'Development Environment',
    description: 'Configure your development environment',
    options: [
      { id: 'dev', label: 'Development', description: 'Development environment setup' },
      { id: 'staging', label: 'Staging', description: 'Staging environment setup' },
      { id: 'prod', label: 'Production', description: 'Production environment setup' },
      { id: 'docker', label: 'Containerization', description: 'Docker container setup' }
    ]
  }
];