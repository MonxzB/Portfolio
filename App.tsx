
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { isSupabaseConfigured } from './supabaseClient';

// Lazy load pages
const SuccessPage = lazy(() => import('./pages/contact/SuccessPage'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const DashboardHomePage = lazy(() => import('./pages/admin/DashboardHomePage'));
const ManageProjectsPage = lazy(() => import('./pages/admin/ManageProjectsPage'));
const EditProjectPage = lazy(() => import('./pages/admin/EditProjectPage'));
const ProfilePage = lazy(() => import('./pages/admin/ProfilePage'));
const SkillsPage = lazy(() => import('./pages/admin/SkillsPage'));


const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-full w-full absolute inset-0">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

const ConfigurationError: React.FC = () => (
  <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center p-4">
    <div className="max-w-2xl text-center bg-red-900/50 border border-red-700 rounded-lg p-8 shadow-2xl shadow-red-500/20">
      <h1 className="text-3xl font-bold mb-4 text-red-300">Configuration Error</h1>
      <p className="text-lg text-red-200">
        The application cannot connect to the backend database because it is not configured.
      </p>
      <p className="mt-4 text-red-200">
        Please follow the setup instructions and provide your Supabase project credentials.
      </p>
      <div className="mt-6 bg-gray-800 p-4 rounded-md font-mono text-left text-sm">
        <p className="text-gray-400">// File to edit:</p>
        <p className="text-white">supabaseClient.ts</p>
        <br/>
        <p className="text-gray-400">// Replace these placeholders:</p>
        <p><span className="text-purple-400">const</span> supabaseUrl = ... || <span className="text-yellow-300">'https://your-project-id.supabase.co'</span>;</p>
        <p><span className="text-purple-400">const</span> supabaseAnonKey = ... || <span className="text-yellow-300">'your-supabase-anon-key'</span>;</p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  if (!isSupabaseConfigured) {
    return <ConfigurationError />;
  }

  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 font-sans">
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/portfolio/:projectId" element={<ProjectDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/contact/success" element={<SuccessPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<DashboardHomePage />} />
                  <Route path="dashboard" element={<DashboardHomePage />} />
                  <Route path="projects" element={<ManageProjectsPage />} />
                  <Route path="projects/new" element={<EditProjectPage />} />
                  <Route path="projects/edit/:projectId" element={<EditProjectPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="skills" element={<SkillsPage />} />
                </Route>
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
