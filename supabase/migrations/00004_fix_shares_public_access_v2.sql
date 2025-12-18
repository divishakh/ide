
-- Allow anyone (including anonymous users) to read active shares
-- This is needed so share links work for anyone who has the link
DROP POLICY IF EXISTS "Users can view shares for their projects" ON shares;
DROP POLICY IF EXISTS "Anyone can view active shares" ON shares;

CREATE POLICY "Anyone can view active shares"
ON shares
FOR SELECT
TO public
USING (is_active = true);

-- Also need to allow anonymous users to read shared projects
DROP POLICY IF EXISTS "Anyone can view shared projects" ON projects;

CREATE POLICY "Anyone can view shared projects"
ON projects
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM shares
    WHERE shares.project_id = projects.id
    AND shares.is_active = true
  )
);

-- Allow anonymous users to read code_files from shared projects
DROP POLICY IF EXISTS "Anyone can view files from shared projects" ON code_files;

CREATE POLICY "Anyone can view files from shared projects"
ON code_files
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM shares
    WHERE shares.project_id = code_files.project_id
    AND shares.is_active = true
  )
);

-- For edit shares, allow updates to code_files
DROP POLICY IF EXISTS "Anyone can edit files from edit-shared projects" ON code_files;

CREATE POLICY "Anyone can edit files from edit-shared projects"
ON code_files
FOR UPDATE
TO public
USING (
  EXISTS (
    SELECT 1 FROM shares
    WHERE shares.project_id = code_files.project_id
    AND shares.is_active = true
    AND shares.permission = 'edit'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM shares
    WHERE shares.project_id = code_files.project_id
    AND shares.is_active = true
    AND shares.permission = 'edit'
  )
);
