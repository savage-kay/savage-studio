-- Supabase Setup Script for Dynamic Portfolio Projects (Works)
-- Run this in your Supabase SQL Editor.

-- 1. Create the `projects` table
CREATE TABLE public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  description text not null,
  image_url text,
  link_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create the `project_images` storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project_images', 'project_images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Enable RLS on the table and storage
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
-- (storage.objects already has RLS)

-- 4. Policies for the `projects` table (Public Read, Admin Write)
CREATE POLICY "Public Access Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Auth All Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');

-- 5. Policies for the `project_images` storage bucket (Public Read, Admin Write)
CREATE POLICY "Public Read Images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'project_images');

CREATE POLICY "Auth Upload Images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'project_images' AND auth.role() = 'authenticated');

CREATE POLICY "Auth Update Images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'project_images' AND auth.role() = 'authenticated');

CREATE POLICY "Auth Delete Images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'project_images' AND auth.role() = 'authenticated');
