import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, LogOut } from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const queryClient = useQueryClient();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin1234") {
      setIsAuthenticated(true);
      toast.success("Successfully unlocked Dashboard!");
    } else {
      toast.error("Invalid Passcode.");
    }
  };

  // --- SKILLS ---
  const { data: skills, isLoading: skillsLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase.from("skills").select("*").order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const [newSkill, setNewSkill] = useState({ name: "", level: "" });
  const addSkill = useMutation({
    mutationFn: async (skill: { name: string; level: number }) => {
      const { error } = await supabase.from("skills").insert([skill]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      setNewSkill({ name: "", level: "" });
      toast.success("Skill added successfully!");
    },
    onError: (error: any) => {
      toast.error(`Error adding skill (Check Auth): ${error.message}`);
    }
  });

  const deleteSkill = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill deleted!");
    },
    onError: (error: any) => {
      toast.error(`Error deleting skill: ${error.message}`);
    }
  });

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name || !newSkill.level) return;
    addSkill.mutate({ name: newSkill.name, level: parseInt(newSkill.level) });
  };


  // --- SOCIAL LINKS ---
  const { data: socials, isLoading: socialsLoading } = useQuery({
    queryKey: ["socials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("social_links").select("*").order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const [newSocial, setNewSocial] = useState({ platform: "", url: "" });
  const addSocial = useMutation({
    mutationFn: async (social: { platform: string; url: string }) => {
      const { error } = await supabase.from("social_links").insert([social]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socials"] });
      setNewSocial({ platform: "", url: "" });
      toast.success("Social link added!");
    },
    onError: (error: any) => {
      toast.error(`Error adding link: ${error.message}`);
    }
  });

  const deleteSocial = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("social_links").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socials"] });
      toast.success("Social link deleted!");
    },
    onError: (error: any) => {
      toast.error(`Error deleting link: ${error.message}`);
    }
  });

  const handleAddSocial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSocial.platform || !newSocial.url) return;
    addSocial.mutate(newSocial);
  };


  // --- SITE CONFIG (CV) ---
  const { data: siteConfig } = useQuery({
    queryKey: ["siteConfig"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_config").select("*").eq("id", 1).single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  const [cvFile, setCvFile] = useState<File | null>(null);

  const updateConfig = useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `resume-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabase.storage.from('resumes').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(filePath);

      const { error } = await supabase.from("site_config").upsert({ id: 1, cv_url: publicUrl });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteConfig"] });
      setCvFile(null);
      toast.success("CV File successfully uploaded and activated!");
    },
    onError: (error: any) => {
      toast.error(`Upload failed: ${error.message}`);
    }
  });

  const handleUpdateCv = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) return;
    updateConfig.mutate(cvFile);
  };


  // --- WORKS (PROJECTS) ---
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const [newProject, setNewProject] = useState({ title: "", category: "", description: "", link_url: "" });
  const [projectImage, setProjectImage] = useState<File | null>(null);

  const addProject = useMutation({
    mutationFn: async (payload: { title: string; category: string; description: string; link_url: string; file: File | null }) => {
      let imageUrl = null;
      if (payload.file) {
        const fileExt = payload.file.name.split('.').pop();
        const fileName = `project-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from("project_images").upload(fileName, payload.file);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("project_images").getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      const { error } = await supabase.from("projects").insert([{ 
        title: payload.title, 
        category: payload.category, 
        description: payload.description, 
        link_url: payload.link_url || null, 
        image_url: imageUrl 
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setNewProject({ title: "", category: "", description: "", link_url: "" });
      setProjectImage(null);
      
      // Reset file input quickly by ID workaround 
      const fileInput = document.getElementById("projectImage") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
      toast.success("Project added successfully!");
    },
    onError: (error: any) => {
      toast.error(`Failed to add project: ${error.message}`);
    }
  });

  const deleteProject = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted!");
    },
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.category || !newProject.description) {
      toast.error("Please fill in the title, category, and description.");
      return;
    }
    addProject.mutate({ ...newProject, file: projectImage });
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 noise-texture">
        <Card className="w-full max-w-sm border-gold/20 bg-card/50 backdrop-blur shadow-[0_0_40px_hsl(var(--gold)/0.15)]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-display text-gradient-gold">Admin Access</CardTitle>
            <CardDescription>Enter the master passcode to modify your live database.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="passcode" className="sr-only">Secret Passcode</Label>
                <Input id="passcode" type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} required placeholder="••••••••" className="text-center tracking-[0.5em]" />
              </div>
              <Button type="submit" className="w-full gold-glow tracking-widest uppercase text-xs font-body font-bold">Unlock Dashboard</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-4xl font-black font-display text-gradient-gold">Savage Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your dynamic portfolio data securely in real-time.</p>
          </div>
          <Button variant="outline" className="border-gold/20 hover:bg-gold hover:text-primary self-start" onClick={() => setIsAuthenticated(false)}>
            <LogOut className="w-4 h-4 mr-2" />
            Lock Dashboard
          </Button>
        </div>

        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="socials">Social Links</TabsTrigger>
            <TabsTrigger value="works">Works</TabsTrigger>
            <TabsTrigger value="config">Site Config</TabsTrigger>
          </TabsList>

          {/* SKILLS TAB */}
          <TabsContent value="skills" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Skill</CardTitle>
                <CardDescription>Enter a skill name and proficiency level (0-100).</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSkill} className="flex gap-4 items-end">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="skillName">Skill Name</Label>
                    <Input id="skillName" placeholder="e.g. React.js" value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} />
                  </div>
                  <div className="space-y-2 w-32">
                    <Label htmlFor="skillLevel">Level (%)</Label>
                    <Input id="skillLevel" type="number" min="0" max="100" placeholder="90" value={newSkill.level} onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })} />
                  </div>
                  <Button type="submit" disabled={addSkill.isPending}>Add Skill</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Skills</CardTitle>
              </CardHeader>
              <CardContent>
                {skillsLoading ? (
                  <p>Loading...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Skill Name</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead className="w-[100px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {skills && skills.map((skill: any) => (
                        <TableRow key={skill.id}>
                          <TableCell className="font-medium">{skill.name}</TableCell>
                          <TableCell>{skill.level}%</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => deleteSkill.mutate(skill.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {(!skills || skills.length === 0) && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">No skills found.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SOCIALS TAB */}
          <TabsContent value="socials" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Social Link</CardTitle>
                <CardDescription>Enter the platform name and your URL.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSocial} className="flex gap-4 items-end">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="platform">Platform</Label>
                    <Input id="platform" placeholder="e.g. LinkedIn" value={newSocial.platform} onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })} />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" type="url" placeholder="https://..." value={newSocial.url} onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })} />
                  </div>
                  <Button type="submit" disabled={addSocial.isPending}>Add Link</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Social Links</CardTitle>
              </CardHeader>
              <CardContent>
                {socialsLoading ? (
                  <p>Loading...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Platform</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead className="w-[100px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {socials && socials.map((social: any) => (
                        <TableRow key={social.id}>
                          <TableCell className="font-medium">{social.platform}</TableCell>
                          <TableCell className="text-muted-foreground truncate max-w-[200px]">{social.url}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => deleteSocial.mutate(social.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {(!socials || socials.length === 0) && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">No social links found.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONFIG TAB */}
          <TabsContent value="config" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Active Resume</CardTitle>
                <CardDescription>Upload a PDF/Doc file to host automatically on Supabase Storage.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateCv} className="flex flex-col sm:flex-row gap-4 sm:items-end">
                  <div className="space-y-2 flex-1 relative">
                    <Label htmlFor="cvFile">Resume Document</Label>
                    <Input id="cvFile" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files?.[0] || null)} />
                    {siteConfig?.cv_url && (
                      <p className="text-sm text-muted-foreground mt-4 border-t border-border pt-4">
                        Current Live Resume: <a href={siteConfig.cv_url} target="_blank" rel="noreferrer" className="text-gold hover:underline">Click to View File</a>
                      </p>
                    )}
                  </div>
                  <Button type="submit" disabled={!cvFile || updateConfig.isPending}>
                    {updateConfig.isPending ? "Uploading..." : "Upload & Save"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          {/* WORKS TAB */}
          <TabsContent value="works" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Portfolio Project</CardTitle>
                <CardDescription>Upload an image and detail your work to feature it publicly.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProject} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projTitle">Project Title *</Label>
                      <Input id="projTitle" placeholder="e.g. SAVAGE STUDIO" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projCat">Category *</Label>
                      <Input id="projCat" placeholder="e.g. Web Design" value={newProject.category} onChange={(e) => setNewProject({ ...newProject, category: e.target.value })} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="projDesc">Short Description *</Label>
                    <Input id="projDesc" placeholder="Summarize the project vibe..." value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projLink">Live Link (Optional)</Label>
                      <Input id="projLink" type="url" placeholder="https://..." value={newProject.link_url} onChange={(e) => setNewProject({ ...newProject, link_url: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectImage">Cover Image *</Label>
                      <Input id="projectImage" type="file" accept="image/*" onChange={(e) => setProjectImage(e.target.files?.[0] || null)} />
                    </div>
                  </div>
                  
                  <Button type="submit" disabled={addProject.isPending} className="self-end w-48">
                    {addProject.isPending ? "Uploading..." : "Publish Project"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Projects</CardTitle>
              </CardHeader>
              <CardContent>
                {projectsLoading ? (
                  <p>Loading projects...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-24">Image</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="hidden md:table-cell">Description</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects.map((proj: any) => (
                          <TableRow key={proj.id}>
                            <TableCell>
                              {proj.image_url ? (
                                <img src={proj.image_url} alt={proj.title} className="w-16 h-10 object-cover rounded-md border border-border" />
                              ) : (
                                <div className="w-16 h-10 bg-secondary rounded-md border border-border flex items-center justify-center text-[10px] text-muted-foreground">No img</div>
                              )}
                            </TableCell>
                            <TableCell className="font-bold">{proj.title}</TableCell>
                            <TableCell className="text-sm">{proj.category}</TableCell>
                            <TableCell className="text-sm text-muted-foreground hidden md:table-cell max-w-xs truncate">{proj.description}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" onClick={() => deleteProject.mutate(proj.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {(!projects || projects.length === 0) && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground py-6">No projects found. Add one above.</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
