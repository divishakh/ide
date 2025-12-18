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
  user_id?: string | null;
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

export interface FileVersion {
  id: string;
  file_id: string;
  content: string;
  version_number: number;
  created_at: string;
  description: string | null;
}

export interface SharedSnippet {
  id: string;
  share_id: string;
  file_id: string;
  title: string;
  content: string;
  language: string;
  created_at: string;
  expires_at: string | null;
  view_count: number;
}

export interface Share {
  id: string;
  project_id: string;
  share_token: string;
  permission: 'view' | 'edit';
  created_by: string;
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
}

export interface Language {
  id: string;
  name: string;
  version: string;
  aliases: string[];
  runtime?: string;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  output: string;
  exitCode: number;
  executionTime?: number;
}
