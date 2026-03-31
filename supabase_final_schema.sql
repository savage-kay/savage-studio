-- SAVAGE STUDIO: COMPLETE SUPABASE BACKEND SCHEMA
-- This single script creates EVERYTHING your portfolio needs 
-- and configures it to work with your custom local `admin1234` Passcode dashboard.

-- 1. Create the `skills` table
CREATE TABLE IF NOT EXISTS public.skills (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  level integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create the `social_links` table
CREATE TABLE IF NOT EXISTS public.social_links (
  id uuid default gen_random_uuid() primary key,
  platform text not null,
  url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create the `site_config` table (for CV)
CREATE TABLE IF NOT EXISTS public.site_config (
  id integer primary key,
  cv_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Initialize site_config with a default row if empty
INSERT INTO public.site_config (id, cv_url) VALUES (1, null) ON CONFLICT (id) DO NOTHING;

-- 4. Create the `projects` table (for Works)
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  description text not null,
  image_url text,
  link_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Create Storage Buckets for Images and PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('project_images', 'project_images', true) ON CONFLICT (id) DO NOTHING;

-- 6. Enable Row Level Security
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 7. CONFIGURE FULLY ANONYMOUS PASSCODE ADMIN POLICIES 
-- (This ensures the Admin Dashboard can upload freely without Email Logins)
DROP POLICY IF EXISTS "Allow ALL on skills" ON public.skills;
CREATE POLICY "Allow ALL on skills" ON public.skills FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow ALL on social_links" ON public.social_links;
CREATE POLICY "Allow ALL on social_links" ON public.social_links FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow ALL on site_config" ON public.site_config;
CREATE POLICY "Allow ALL on site_config" ON public.site_config FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow ALL on projects" ON public.projects;
CREATE POLICY "Allow ALL on projects" ON public.projects FOR ALL USING (true);

-- 8. Storage Bucket Anonymous Upload Policies
DROP POLICY IF EXISTS "Allow anonymous ALL on resumes" ON storage.objects;
CREATE POLICY "Allow anonymous ALL on resumes" ON storage.objects FOR ALL USING (bucket_id = 'resumes');

DROP POLICY IF EXISTS "Allow anonymous ALL on project_images" ON storage.objects;
CREATE POLICY "Allow anonymous ALL on project_images" ON storage.objects FOR ALL USING (bucket_id = 'project_images');
