-- RUN THIS SCRIPT TO BYPASS SUPABASE AUTH FOREVER
-- Since you are using a hardcoded frontend 'admin1234' passcode, we must tell Supabase to allow Anonymous edits.

-- Drop the old strict authenticated policies
DROP POLICY IF EXISTS "Allow auth all on skills" ON public.skills;
DROP POLICY IF EXISTS "Allow auth all on social_links" ON public.social_links;
DROP POLICY IF EXISTS "Allow auth all on site_config" ON public.site_config;
DROP POLICY IF EXISTS "Auth All Projects" ON public.projects;

DROP POLICY IF EXISTS "Auth Upload Images" ON storage.objects;
DROP POLICY IF EXISTS "Auth Update Images" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete Images" ON storage.objects;

DROP POLICY IF EXISTS "Auth Upload Resume" ON storage.objects;
DROP POLICY IF EXISTS "Auth Update Resume" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete Resume" ON storage.objects;

-- Create fully open policies for the Admin dashboard to use anonymously
CREATE POLICY "Allow ALL on skills" ON public.skills FOR ALL USING (true);
CREATE POLICY "Allow ALL on social_links" ON public.social_links FOR ALL USING (true);
CREATE POLICY "Allow ALL on site_config" ON public.site_config FOR ALL USING (true);
CREATE POLICY "Allow ALL on projects" ON public.projects FOR ALL USING (true);

-- Allow fully open mutations to the storage buckets
CREATE POLICY "Allow anonymous ALL on resumes" ON storage.objects FOR ALL USING (bucket_id = 'resumes');
CREATE POLICY "Allow anonymous ALL on project_images" ON storage.objects FOR ALL USING (bucket_id = 'project_images');
