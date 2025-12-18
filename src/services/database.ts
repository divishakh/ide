import { supabase } from '@/lib/supabase';
import type { Project, CodeFile, FileVersion, SharedSnippet } from '@/types';

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

// File version operations
export const versionsApi = {
  // Get all versions for a file
  async getByFile(fileId: string): Promise<FileVersion[]> {
    const { data, error } = await supabase
      .from('file_versions')
      .select('*')
      .eq('file_id', fileId)
      .order('version_number', { ascending: false });

    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  // Create a new version
  async create(fileId: string, content: string, description?: string): Promise<FileVersion> {
    // Get next version number
    const { data: versionData } = await supabase
      .rpc('get_next_version_number', { p_file_id: fileId });

    const versionNumber = versionData || 1;

    const { data, error } = await supabase
      .from('file_versions')
      .insert({
        file_id: fileId,
        content,
        version_number: versionNumber,
        description: description || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get a specific version
  async getById(id: string): Promise<FileVersion | null> {
    const { data, error } = await supabase
      .from('file_versions')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // Delete a version
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('file_versions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get version count for a file
  async getCount(fileId: string): Promise<number> {
    const { count, error } = await supabase
      .from('file_versions')
      .select('*', { count: 'exact', head: true })
      .eq('file_id', fileId);

    if (error) throw error;
    return count || 0;
  },
};

// Shared snippet operations
export const sharingApi = {
  // Create a shared snippet
  async create(
    fileId: string,
    title: string,
    content: string,
    language: string,
    expiresInDays?: number
  ): Promise<SharedSnippet> {
    const expiresAt = expiresInDays
      ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString()
      : null;

    const { data, error } = await supabase
      .from('shared_snippets')
      .insert({
        file_id: fileId,
        title,
        content,
        language,
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get a shared snippet by share_id
  async getByShareId(shareId: string): Promise<SharedSnippet | null> {
    const { data, error } = await supabase
      .from('shared_snippets')
      .select('*')
      .eq('share_id', shareId)
      .maybeSingle();

    if (error) throw error;

    // Increment view count if snippet exists
    if (data) {
      await supabase.rpc('increment_snippet_views', { p_share_id: shareId });
    }

    return data;
  },

  // Get all shared snippets for a file
  async getByFile(fileId: string): Promise<SharedSnippet[]> {
    const { data, error } = await supabase
      .from('shared_snippets')
      .select('*')
      .eq('file_id', fileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  // Delete a shared snippet
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('shared_snippets')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Check if snippet is expired
  isExpired(snippet: SharedSnippet): boolean {
    if (!snippet.expires_at) return false;
    return new Date(snippet.expires_at) < new Date();
  },
};
