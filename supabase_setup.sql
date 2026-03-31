-- Setup Script for Savage Studio Dynamic Portfolio!
-- Please run this directly inside your Supabase SQL Editor.

-- 1. Create Tables
CREATE TABLE public.skills (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  level integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

CREATE TABLE public.social_links (
  id uuid default gen_random_uuid() primary key,
  platform text not null,
  url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

CREATE TABLE public.site_config (
  id integer primary key default 1,
  cv_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Insert initial config
INSERT INTO public.site_config (id, cv_url) VALUES (1, null);

-- 3. Row Level Security
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- 4. Public Access (Allow any visitor to read your data)
CREATE POLICY "Allow public read access on skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on social_links" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Allow public read access on site_config" ON public.site_config FOR SELECT USING (true);

-- 5. Authorized Admin Access (Allow you to mutate data from the admin dashboard)
CREATE POLICY "Allow auth all on skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth all on social_links" ON public.social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth all on site_config" ON public.site_config FOR ALL USING (auth.role() = 'authenticated');
