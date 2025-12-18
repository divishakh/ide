-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create code_files table
CREATE TABLE IF NOT EXISTS code_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  content TEXT DEFAULT '',
  language TEXT DEFAULT 'javascript',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_code_files_project_id ON code_files(project_id);
CREATE INDEX IF NOT EXISTS idx_projects_updated_at ON projects(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_code_files_updated_at ON code_files(updated_at DESC);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_files ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required)
CREATE POLICY "Allow public read access to projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to projects" ON projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to projects" ON projects
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to projects" ON projects
  FOR DELETE USING (true);

CREATE POLICY "Allow public read access to code_files" ON code_files
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to code_files" ON code_files
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to code_files" ON code_files
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to code_files" ON code_files
  FOR DELETE USING (true);

-- Insert a default project with sample files
INSERT INTO projects (id, name, description) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Welcome Project', 'Your first project in Athena''s Code Chambers')
ON CONFLICT (id) DO NOTHING;

INSERT INTO code_files (project_id, name, content, language)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'hello.js', '// Welcome to Athena''s Code Chambers!
// Write your JavaScript code here and click Run to execute it.

console.log("Hello, World!");
console.log("May Athena''s wisdom guide your code!");

// Try some examples:
const greet = (name) => {
  return `Welcome, ${name}!`;
};

console.log(greet("Developer"));

// Calculate fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci(10):", fibonacci(10));', 'javascript'),
  ('00000000-0000-0000-0000-000000000001', 'example.js', '// Example: Array operations
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);

const evens = numbers.filter(n => n % 2 === 0);
console.log("Even numbers:", evens);', 'javascript')
ON CONFLICT DO NOTHING;