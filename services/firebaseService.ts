import { db, storage } from '../firebaseConfig';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Profile, Project, Skill } from '../types';

// --- Profile ---
export const getProfile = async (): Promise<Profile | null> => {
  const docRef = doc(db, 'profile', 'main');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as Profile) : null;
};

export const updateProfile = async (profileData: Profile, avatarFile?: File | null): Promise<void> => {
    let avatarUrl = profileData.avatarUrl;
    if (avatarFile) {
        avatarUrl = await uploadFile(avatarFile, `avatars/${avatarFile.name}`);
    }
    const profileRef = doc(db, 'profile', 'main');
    await setDoc(profileRef, { ...profileData, avatarUrl }, { merge: true });
};

// --- Skills ---
export const getSkills = async (): Promise<Skill[]> => {
  const skillsCollection = collection(db, 'skills');
  const skillsSnapshot = await getDocs(skillsCollection);
  return skillsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Skill));
};

export const addSkill = async (skillData: { name: string }, iconFile: File): Promise<Skill> => {
    const iconUrl = await uploadFile(iconFile, `skills/${iconFile.name}`);
    const docRef = await addDoc(collection(db, 'skills'), { ...skillData, iconUrl });
    return { id: docRef.id, ...skillData, iconUrl };
};

export const deleteSkill = async (skillId: string): Promise<void> => {
  await deleteDoc(doc(db, 'skills', skillId));
};


// --- Projects ---
export const listenToProjects = (
    callback: (projects: Project[]) => void, 
    onError: (error: Error) => void
) => {
  const q = query(
    collection(db, 'projects'), 
    where('isPublished', '==', true),
    orderBy('createdAt', 'desc')
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Project));
    callback(projects);
  }, (error) => {
    console.error("Error listening to projects:", error);
    onError(error);
  });

  return unsubscribe;
};

export const getAllProjects = async (): Promise<Project[]> => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};

export const getProject = async (id: string): Promise<Project | null> => {
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Project) : null;
};

export const addProject = async (projectData: Omit<Project, 'id' | 'imageUrl' | 'createdAt'>, imageFile: File): Promise<void> => {
    const imageUrl = await uploadFile(imageFile, `projects/${imageFile.name}`);
    await addDoc(collection(db, 'projects'), {
        ...projectData,
        imageUrl,
        createdAt: Timestamp.now(),
    });
};

export const updateProject = async (id: string, projectData: Partial<Project>, imageFile?: File | null): Promise<void> => {
    const updateData = { ...projectData };
    if (imageFile) {
        updateData.imageUrl = await uploadFile(imageFile, `projects/${imageFile.name}`);
    }
    const projectRef = doc(db, 'projects', id);
    await updateDoc(projectRef, updateData);
};

export const deleteProject = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'projects', id));
};


// --- Users & Roles ---
export const getUserRole = async (uid: string): Promise<string | null> => {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
        return userDoc.data().role;
    }
    return null;
};

// --- Storage ---
export const uploadFile = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
