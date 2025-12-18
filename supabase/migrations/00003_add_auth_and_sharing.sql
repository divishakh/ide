-- Drop existing public policies
DROP POLICY IF EXISTS "Allow public read access to projects" ON projects;
DROP POLICY IF EXISTS "Allow public insert access to projects" ON projects;
DROP POLICY IF EXISTS "Allow public update access to projects" ON projects;
DROP POLICY IF EXISTS "Allow public delete access to projects" ON projects;
DROP POLICY IF EXISTS "Allow public read access to code_files" ON code_files;
DROP POLICY IF EXISTS "Allow public insert access to code_files" ON code_files;
DROP POLICY IF EXISTS "Allow public update access to code_files" ON code_files;
DROP POLICY IF EXISTS "Allow public delete access to code_files" ON code_files;

-- Create user_role enum
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT,
  phone TEXT,
  role user_role DEFAULT 'user'::user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add user_id to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES profiles(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);

-- Create shares table for share links
CREATE TABLE IF NOT EXISTS shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  share_token TEXT UNIQUE NOT NULL,
  permission TEXT NOT NULL CHECK (permission IN ('view', 'edit')),
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_shares_project_id ON shares(project_id);
CREATE INDEX IF NOT EXISTS idx_shares_token ON shares(share_token);
CREATE INDEX IF NOT EXISTS idx_shares_created_by ON shares(created_by);

-- Enable RLS on new tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- Trigger to sync new users to profiles
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
  extracted_username text;
BEGIN
  SELECT COUNT(*) INTO user_count FROM profiles;
  
  -- Extract username from email (format: username@miaoda.com)
  extracted_username := split_part(NEW.email, '@', 1);
  
  -- Insert a profile synced with fields collected at signup
  INSERT INTO profiles (id, username, email, phone, role)
  VALUES (
    NEW.id,
    extracted_username,
    NEW.email,
    NEW.phone,
    CASE WHEN user_count = 0 THEN 'admin'::user_role ELSE 'user'::user_role END
  );
  RETURN NEW;
END;
$$;

-- Create trigger for user confirmation
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION handle_new_user();

-- Profiles policies
CREATE POLICY "Admins have full access to profiles" ON profiles
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id)
  WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM profiles WHERE id = auth.uid()));

-- Public view for shareable profile info
CREATE OR REPLACE VIEW public_profiles AS
  SELECT id, username, role FROM profiles;

-- Projects policies (authenticated users only)
CREATE POLICY "Users can view their own projects" ON projects
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can view shared projects" ON projects
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM shares s
      WHERE s.project_id = projects.id
        AND s.is_active = true
        AND (s.expires_at IS NULL OR s.expires_at > NOW())
    )
  );

CREATE POLICY "Users can create their own projects" ON projects
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own projects" ON projects
  FOR UPDATE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can update shared projects with edit permission" ON projects
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM shares s
      WHERE s.project_id = projects.id
        AND s.permission = 'edit'
        AND s.is_active = true
        AND (s.expires_at IS NULL OR s.expires_at > NOW())
    )
  );

CREATE POLICY "Users can delete their own projects" ON projects
  FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Admins can view all projects" ON projects
  FOR SELECT TO authenticated USING (is_admin(auth.uid()));

-- Code files policies
CREATE POLICY "Users can view files in their projects" ON code_files
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM projects p
      WHERE p.id = code_files.project_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view files in shared projects" ON code_files
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM shares s
      JOIN projects p ON s.project_id = p.id
      WHERE p.id = code_files.project_id
        AND s.is_active = true
        AND (s.expires_at IS NULL OR s.expires_at > NOW())
    )
  );

CREATE POLICY "Users can create files in their projects" ON code_files
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects p
      WHERE p.id = code_files.project_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update files in their projects" ON code_files
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM projects p
      WHERE p.id = code_files.project_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update files in shared projects with edit permission" ON code_files
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM shares s
      JOIN projects p ON s.project_id = p.id
      WHERE p.id = code_files.project_id
        AND s.permission = 'edit'
        AND s.is_active = true
        AND (s.expires_at IS NULL OR s.expires_at > NOW())
    )
  );

CREATE POLICY "Users can delete files in their projects" ON code_files
  FOR DELETE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM projects p
      WHERE p.id = code_files.project_id AND p.user_id = auth.uid()
    )
  );

-- Shares policies
CREATE POLICY "Users can view shares for their projects" ON shares
  FOR SELECT TO authenticated USING (created_by = auth.uid());

CREATE POLICY "Users can create shares for their projects" ON shares
  FOR INSERT TO authenticated WITH CHECK (
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM projects p
      WHERE p.id = shares.project_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own shares" ON shares
  FOR UPDATE TO authenticated USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own shares" ON shares
  FOR DELETE TO authenticated USING (created_by = auth.uid());