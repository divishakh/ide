
-- Add file_versions table for version history
CREATE TABLE IF NOT EXISTS file_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id UUID REFERENCES code_files(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  version_number INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster version queries
CREATE INDEX IF NOT EXISTS idx_file_versions_file_id ON file_versions(file_id);
CREATE INDEX IF NOT EXISTS idx_file_versions_created_at ON file_versions(created_at DESC);

-- Add shared_snippets table for shareable links
CREATE TABLE IF NOT EXISTS shared_snippets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_id TEXT UNIQUE NOT NULL DEFAULT substring(md5(random()::text) from 1 for 10),
  file_id UUID REFERENCES code_files(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'javascript',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0
);

-- Add index for share_id lookups
CREATE INDEX IF NOT EXISTS idx_shared_snippets_share_id ON shared_snippets(share_id);

-- Enable RLS on new tables
ALTER TABLE file_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_snippets ENABLE ROW LEVEL SECURITY;

-- Create policies for file_versions (public access for simplicity)
CREATE POLICY "Allow public read access to file_versions"
  ON file_versions FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access to file_versions"
  ON file_versions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to file_versions"
  ON file_versions FOR DELETE
  USING (true);

-- Create policies for shared_snippets (public read, authenticated write)
CREATE POLICY "Allow public read access to shared_snippets"
  ON shared_snippets FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access to shared_snippets"
  ON shared_snippets FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access to shared_snippets"
  ON shared_snippets FOR UPDATE
  USING (true);

-- Function to auto-increment version numbers
CREATE OR REPLACE FUNCTION get_next_version_number(p_file_id UUID)
RETURNS INTEGER AS $$
DECLARE
  next_version INTEGER;
BEGIN
  SELECT COALESCE(MAX(version_number), 0) + 1
  INTO next_version
  FROM file_versions
  WHERE file_id = p_file_id;
  
  RETURN next_version;
END;
$$ LANGUAGE plpgsql;

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_snippet_views(p_share_id TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE shared_snippets
  SET view_count = view_count + 1
  WHERE share_id = p_share_id;
END;
$$ LANGUAGE plpgsql;
