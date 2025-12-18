export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

// Athena's Code Chambers Types
export interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CodeFile {
  id: string;
  project_id: string | null;
  name: string;
  content: string;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface ConsoleOutput {
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: number;
}
