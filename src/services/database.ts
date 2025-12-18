import { supabase } from '@/lib/supabase';
import type { Project, CodeFile } from '@/types';

// Project operations
export const projectsApi = {
  // Get all projects
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  // Get a single project
  async getById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // Create a new project
  async create(name: string, description?: string): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert({ name, description: description || null })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update a project
  async update(id: string, updates: Partial<Pick<Project, 'name' | 'description'>>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a project
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// Code file operations
export const filesApi = {
  // Get all files for a project
  async getByProject(projectId: string): Promise<CodeFile[]> {
    const { data, error } = await supabase
      .from('code_files')
      .select('*')
      .eq('project_id', projectId)
      .order('name', { ascending: true });

    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  // Get a single file
  async getById(id: string): Promise<CodeFile | null> {
    const { data, error } = await supabase
      .from('code_files')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // Create a new file
  async create(
    projectId: string,
    name: string,
    content: string = '',
    language: string = 'javascript'
  ): Promise<CodeFile> {
    const { data, error } = await supabase
      .from('code_files')
      .insert({
        project_id: projectId,
        name,
        content,
        language,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update a file
  async update(
    id: string,
    updates: Partial<Pick<CodeFile, 'name' | 'content' | 'language'>>
  ): Promise<CodeFile> {
    const { data, error } = await supabase
      .from('code_files')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a file
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('code_files')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Auto-save file content
  async autoSave(id: string, content: string): Promise<void> {
    const { error } = await supabase
      .from('code_files')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  },
};
