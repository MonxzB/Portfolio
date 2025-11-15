import { supabase } from '../supabaseClient';
import { Profile, Project, Skill } from '../types';

type SupabaseProfile = Profile & { user_id: string; role: string };

// --- Profile ---
export const getProfile = async (): Promise<Profile | null> => {
    const { data, error } = await supabase
        .from('profile')
        .select('*')
        .eq('id', 1) // Be explicit, matching update logic
        .single();
    
    // 'PGRST116' code means no rows were found, which is a valid case (e.g., initial setup).
    // We should not treat it as a fatal error.
    if (error && error.code !== 'PGRST116') {
        console.error("Error fetching profile:", error.message);
        throw error;
    }
    return data; // Will be null if no profile is found, or the profile data.
};

export const getProfileByUserId = async (userId: string): Promise<SupabaseProfile | null> => {
    const { data, error } = await supabase
        .from('profile')
        .select('*')
        .eq('user_id', userId)
        .single();

    // 'PGRST116' is the code for "Exact one row not found", which can happen if a user has no profile yet.
    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile by user ID:', error.message);
        throw error; // Rethrow unexpected errors
    }
    return data;
}

export const updateProfile = async (profileData: Omit<Profile, 'id'>): Promise<void> => {
    const { error } = await supabase
        .from('profile')
        .update(profileData)
        .eq('id', 1); // Assuming a single profile with id=1
    
    if (error) {
        console.error("Error updating profile:", error.message);
        throw error;
    }
};

// --- Skills ---
export const getSkills = async (): Promise<Skill[]> => {
    const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error("Error fetching skills:", error.message);
        throw error;
    }
    return data || [];
};

export const addSkill = async (skillData: { name: string, iconUrl: string }): Promise<Skill> => {
    const { data, error } = await supabase
        .from('skills')
        .insert([skillData])
        .select()
        .single();
    
    if (error) {
        console.error("Error adding skill:", error.message);
        throw error;
    }
    return data;
};

export const deleteSkill = async (skillId: number): Promise<void> => {
    const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId);

    if (error) {
        console.error("Error deleting skill:", error.message);
        throw error;
    }
};


// --- Projects ---
export const getPublishedProjects = async (): Promise<Project[]> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('isPublished', true)
        .order('createdAt', { ascending: false });
    
    if (error) {
        console.error("Error fetching published projects:", error.message);
        throw error;
    }
    return data || [];
};

export const getAllProjects = async (): Promise<Project[]> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('createdAt', { ascending: false });

    if (error) {
        console.error("Error fetching all projects:", error.message);
        throw error;
    }
    return data || [];
};

export const getProjectById = async (id: number): Promise<Project | null> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error("Error fetching project by ID:", error.message);
        throw error;
    }
    return data;
};

export const addProject = async (projectData: Omit<Project, 'id' | 'createdAt'>): Promise<void> => {
    const { error } = await supabase
        .from('projects')
        .insert([{ ...projectData, createdAt: new Date().toISOString() }]);
    
    if (error) {
        console.error("Error adding project:", error.message);
        throw error;
    }
};

export const updateProject = async (id: number, projectData: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<void> => {
    const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id);

    if (error) {
        console.error("Error updating project:", error.message);
        throw error;
    }
};

export const deleteProject = async (id: number): Promise<void> => {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
    
    if (error) {
        console.error("Error deleting project:", error.message);
        throw error;
    }
};