import React, { useState, useEffect } from 'react';
import { TrashIcon, PlusIcon } from '../../components/icons';
import { Skill } from '../../types';
import { getSkills, addSkill, deleteSkill } from '../../services/supabaseService';
import { uploadImage } from '../../services/cloudinaryService';

const SkillsPage: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [newSkillName, setNewSkillName] = useState('');
    const [newSkillIcon, setNewSkillIcon] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const skillsData = await getSkills();
                setSkills(skillsData);
            } catch (error) {
                console.error("Failed to fetch skills:", (error as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    const handleAddSkill = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newSkillName.trim() === '' || !newSkillIcon) {
            alert("Please provide a skill name and an icon.");
            return;
        }

        setIsSubmitting(true);
        try {
            const iconUrl = await uploadImage(newSkillIcon);
            const newSkillData = { name: newSkillName.trim(), iconUrl };
            const addedSkill = await addSkill(newSkillData);
            setSkills([...skills, addedSkill]);
            setNewSkillName('');
            setNewSkillIcon(null);
            // Reset file input
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error("Failed to add skill:", (error as Error).message);
            alert("Error adding skill.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteSkill = async (skillId: number, skillName: string) => {
        if (window.confirm(`Are you sure you want to delete the skill "${skillName}"?`)) {
            try {
                await deleteSkill(skillId);
                setSkills(skills.filter(skill => skill.id !== skillId));
            } catch (error) {
                console.error("Failed to delete skill:", (error as Error).message);
                alert("Error deleting skill.");
            }
        }
    };
    
    return (
        <div className="space-y-8">
            <section>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Manage Skills</h1>
                <p className="text-md text-gray-400 mt-2">Add or remove skills displayed on your "About" page.</p>
            </section>
            
            {/* Add Skill Form */}
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-purple-300">Add New Skill</h2>
                <form onSubmit={handleAddSkill} className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-grow w-full">
                        <label htmlFor="skill-name" className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
                        <input
                            id="skill-name"
                            type="text"
                            value={newSkillName}
                            onChange={(e) => setNewSkillName(e.target.value)}
                            placeholder="e.g., React"
                            className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>
                    <div className="w-full sm:w-64">
                         <label htmlFor="skill-icon" className="block text-sm font-medium text-gray-300 mb-2">Skill Icon</label>
                         <input type="file" id="skill-icon" accept="image/*,.svg" onChange={(e) => e.target.files && setNewSkillIcon(e.target.files[0])} required className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600/20 file:text-purple-300 hover:file:bg-purple-600/40 transition" />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors disabled:bg-gray-500"
                    >
                       <PlusIcon className="w-5 h-5 mr-2" /> {isSubmitting ? 'Adding...' : 'Add'}
                    </button>
                </form>
            </div>

            {/* Existing Skills List */}
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-purple-300">Current Skills</h2>
                {loading ? (
                    <p>Loading skills...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {skills.map(skill => (
                            <div key={skill.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md">
                                <div className="flex items-center gap-3">
                                    <img src={skill.iconUrl} alt={skill.name} className="w-8 h-8 object-contain" />
                                    <span className="font-medium text-gray-200">{skill.name}</span>
                                </div>
                                <button
                                    onClick={() => handleDeleteSkill(skill.id, skill.name)}
                                    className="text-gray-400 hover:text-red-400 transition-colors"
                                    aria-label={`Delete ${skill.name}`}
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkillsPage;