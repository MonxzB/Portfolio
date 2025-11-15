import React, { useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon, InstagramIcon, FacebookIcon, WhatsAppIcon, BehanceIcon } from '../../components/icons';
import { getProfile, updateProfile } from '../../services/supabaseService';
import { uploadImage } from '../../services/cloudinaryService';
import { Profile } from '../../types';

const initialProfileState: Omit<Profile, 'id'> = {
    displayName: '',
    headline: '',
    bio: '',
    avatarUrl: '',
    socials: {
        github: '',
        linkedin: '',
        twitter: '',
        youtube: '',
        instagram: '',
        facebook: '',
        whatsapp: '',
        behance: '',
    },
};

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<Omit<Profile, 'id'>>(initialProfileState);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>('');

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                if (profileData) {
                    setProfile(profileData);
                    setAvatarPreview(profileData.avatarUrl);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", (error as Error).message);
            } finally {
                setIsFetching(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            socials: { ...prev.socials, [name]: value },
        }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);
        try {
            let newAvatarUrl = profile.avatarUrl;
            if (avatarFile) {
                newAvatarUrl = await uploadImage(avatarFile);
            }

            const profileToUpdate = {
                ...profile,
                avatarUrl: newAvatarUrl,
            };

            await updateProfile(profileToUpdate);
            setStatus({type: 'success', message: 'Profile updated successfully!'});
        } catch (error) {
            console.error("Profile update failed:", (error as Error).message);
            setStatus({type: 'error', message: 'Failed to update profile.'});
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return <div className="text-center p-8">Loading profile...</div>;
    }

    return (
        <div className="space-y-8">
            <section>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Edit Profile</h1>
                <p className="text-md text-gray-400 mt-2">Update your public-facing portfolio information.</p>
            </section>

            <div className="max-w-4xl bg-gray-800/50 p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center space-x-6">
                        <img src={avatarPreview} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-gray-700"/>
                        <div>
                            <label htmlFor="avatar" className="block text-sm font-medium text-gray-300 mb-2">Update Avatar</label>
                            <input type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600/20 file:text-purple-300 hover:file:bg-purple-600/40 transition" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                            <input type="text" id="displayName" name="displayName" value={profile.displayName} onChange={handleChange} required className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" />
                        </div>
                        <div>
                            <label htmlFor="headline" className="block text-sm font-medium text-gray-300 mb-2">Headline / Title</label>
                            <input type="text" id="headline" name="headline" value={profile.headline} onChange={handleChange} required className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">Bio / About Me</label>
                        <textarea id="bio" name="bio" value={profile.bio} onChange={handleChange} rows={5} required className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition"></textarea>
                    </div>

                    <h3 className="text-lg font-semibold text-purple-300 pt-4 border-t border-gray-700/50">Social Links</h3>
                    
                    <div className="space-y-4">
                        <div className="flex items-center">
                           <GithubIcon className="w-6 h-6 mr-4 text-gray-400"/>
                           <input type="url" name="github" value={profile.socials.github} onChange={handleSocialChange} placeholder="GitHub URL" className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" />
                        </div>
                         <div className="flex items-center">
                           <LinkedinIcon className="w-6 h-6 mr-4 text-gray-400"/>
                           <input type="url" name="linkedin" value={profile.socials.linkedin} onChange={handleSocialChange} placeholder="LinkedIn URL" className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" />
                        </div>
                         <div className="flex items-center">
                           <TwitterIcon className="w-6 h-6 mr-4 text-gray-400"/>
                           <input type="url" name="twitter" value={profile.socials.twitter} onChange={handleSocialChange} placeholder="Twitter URL" className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" />
                        </div>
                         <div className="flex items-center">
                           <YoutubeIcon className="w-6 h-6 mr-4 text-gray-400"/>
                           <input type="url" name="youtube" value={profile.socials.youtube} onChange={handleSocialChange} placeholder="YouTube URL" className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" />
                        </div>
                         <div className="flex items-center">
                           <InstagramIcon className="w-6 h-6 mr-4 text-gray-400"/>
                           <input type="url" name="instagram" value={profile.socials.instagram} onChange={handleSocialChange} placeholder="Instagram URL" className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" />
                        </div>
                         <div className="flex items-center">
                           <FacebookIcon className="w-6 h-6 mr-4 text-gray-400"/>
                           <input type="url" name="facebook" value={profile.socials.facebook} onChange={handleSocialChange} placeholder="Facebook URL" className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" />
                        </div>
                         <div className="flex items-center">
                           <WhatsAppIcon className="w-6 h-6 mr-4 text-gray-400"/>
                           <input type="url" name="whatsapp" value={profile.socials.whatsapp} onChange={handleSocialChange} placeholder="WhatsApp URL" className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" />
                        </div>
                         <div className="flex items-center">
                           <BehanceIcon className="w-6 h-6 mr-4 text-gray-400"/>
                           <input type="url" name="behance" value={profile.socials.behance} onChange={handleSocialChange} placeholder="Behance URL" className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" />
                        </div>
                    </div>

                     {status && (
                        <div className={`text-center p-3 rounded-md text-sm ${status.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                        {status.message}
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <button type="submit" disabled={isLoading} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded-full transition-all duration-300 shadow-lg shadow-purple-500/40 disabled:bg-gray-500">
                           {isLoading ? 'Saving...' : 'Update Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;