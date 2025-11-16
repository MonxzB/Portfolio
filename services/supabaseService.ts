import { supabase } from '../supabaseClient';
import { Profile, Project, Skill } from '../types';

type SupabaseProfile = Profile & { user_id: string; role: string };

// --- Profile ---
// (Giữ nguyên các hàm profile... )
export const getProfile = async (): Promise<Profile | null> => {
    const { data, error } = await supabase
        .from('profile')
        .select('*')
        .eq('id', 1) 
        .single();
    if (error && error.code !== 'PGRST116') {
        console.error("Error fetching profile:", error.message);
        throw error;
    }
    return data;
};
export const getProfileByUserId = async (userId: string): Promise<SupabaseProfile | null> => {
    const { data, error } = await supabase
        .from('profile')
        .select('*')
        .eq('user_id', userId)
        .single();
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
        .eq('id', 1);
    
    if (error) {
        console.error("Error updating profile:", error.message);
        throw error;
    }
};

// --- Skills ---
// (Giữ nguyên các hàm skills... )
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


// --- Projects (ĐÃ VIẾT LẠI HOÀN TOÀN) ---

// Kiểu dữ liệu Project mà không có 'skills'
// (vì 'skills' là một quan hệ, không phải là một cột)
type ProjectDatabaseRow = Omit<Project, 'skills'>;


// Lấy projects VÀ các skills liên quan
const projectQuery = '*, skills(*)';

export const getPublishedProjects = async (): Promise<Project[]> => {
    const { data, error } = await supabase
        .from('projects')
        .select(projectQuery) // <-- ĐÃ SỬA
        .eq('isPublished', true)
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error("Error fetching published projects:", error.message);
        throw error;
    }
    return (data as any) || [];
};

export const getAllProjects = async (): Promise<Project[]> => {
    const { data, error } = await supabase
        .from('projects')
        .select(projectQuery) // <-- ĐÃ SỬA
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching all projects:", error.message);
        throw error;
    }
    return (data as any) || [];
};

export const getProjectById = async (id: number): Promise<Project | null> => {
    const { data, error } = await supabase
        .from('projects')
        .select(projectQuery) // <-- ĐÃ SỬA
        .eq('id', id)
        .single();

    if (error) {
        console.error("Error fetching project by ID:", error.message);
        throw error;
    }
    return (data as any);
};

// Hàm này giờ nhận thêm một mảng skillIds
export const addProject = async (
    projectData: Omit<ProjectDatabaseRow, 'id' | 'created_at'>,
    skillIds: number[]
): Promise<void> => {
    
    // Bước 1: Thêm dự án vào bảng 'projects'
    const { data: newProject, error: projectError } = await supabase
        .from('projects')
        .insert([{ ...projectData, created_at: new Date().toISOString() }])
        .select()
        .single();
    
    if (projectError || !newProject) {
        console.error("Error adding project:", projectError?.message);
        throw projectError;
    }

    // Bước 2: Chuẩn bị dữ liệu cho bảng nối 'editor_skill'
    const linksToInsert = skillIds.map(skillId => ({
        project_id: newProject.id,
        skill_id: skillId
    }));

    // Bước 3: Thêm các liên kết vào bảng nối
    const { error: skillError } = await supabase
        .from('editor_skill')
        .insert(linksToInsert);
    
    if (skillError) {
        console.error("Error linking skills to project:", skillError.message);
        // (Lý tưởng nhất là bạn nên xóa dự án vừa tạo ở Bước 1, nhưng tạm thời bỏ qua)
        throw skillError;
    }
};

// Hàm này cũng nhận thêm mảng skillIds
export const updateProject = async (
    id: number, 
    projectData: Partial<Omit<ProjectDatabaseRow, 'id' | 'created_at'>>,
    skillIds: number[]
): Promise<void> => {
    
    // Bước 1: Cập nhật thông tin cơ bản của dự án
    const { error: projectError } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id);

    if (projectError) {
        console.error("Error updating project:", projectError.message);
        throw projectError;
    }

    // Bước 2: Xóa tất cả các liên kết kỹ năng CŨ
    const { error: deleteError } = await supabase
        .from('editor_skill')
        .delete()
        .eq('project_id', id);

    if (deleteError) {
        console.error("Error clearing old skills:", deleteError.message);
        throw deleteError;
    }

    // Bước 3: Chuẩn bị dữ liệu MỚI cho bảng nối
    const linksToInsert = skillIds.map(skillId => ({
        project_id: id,
        skill_id: skillId
    }));

    // Bước 4: Thêm các liên kết kỹ năng MỚI
    if (linksToInsert.length > 0) {
        const { error: insertError } = await supabase
            .from('editor_skill')
            .insert(linksToInsert);
        
        if (insertError) {
            console.error("Error linking new skills:", insertError.message);
            throw insertError;
        }
    }
};

export const deleteProject = async (id: number): Promise<void> => {
    // Không cần sửa, vì chúng ta đã đặt 'ON DELETE CASCADE' trong SQL.
    // Xóa 1 dự án sẽ tự động xóa các liên kết trong 'editor_skill'.
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
    
    if (error) {
        console.error("Error deleting project:", error.message);
        throw error;
    }
};