-- Supabase Storage Setup Script for Resume Uploads
-- Run this in your Supabase SQL Editor.

-- 1. Create the `resumes` bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS on the storage objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Policy to allow anyone to read the resumes bucket
CREATE POLICY "Public Access Resume" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'resumes');

-- 4. Policy to allow authenticated admin to upload, update, remove resumes
CREATE POLICY "Auth Upload Resume" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'resumes' AND auth.role() = 'authenticated');

CREATE POLICY "Auth Update Resume" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');

CREATE POLICY "Auth Delete Resume" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');
