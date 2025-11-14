import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProjectDetailPage from './pages/ProjectDetailPage';
import { AuthProvider } from './context/AuthContext';

// Lazy load admin components for better performance
const AdminLayout = React.lazy(() => import('./layouts/AdminLayout'));
const DashboardHomePage = React.lazy(() => import('./pages/admin/DashboardHomePage'));
const ManageProjectsPage = React.lazy(() => import('./pages/admin/ManageProjectsPage'));
const EditProjectPage = React.lazy(() => import('./pages/admin/EditProjectPage'));
const ProfilePage = React.lazy(() => import('./pages/admin/ProfilePage'));
const SkillsPage = React.lazy(() => import('./pages/admin/SkillsPage'));


const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-full w-full absolute inset-0">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 font-sans">
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/portfolio/:projectId" element={<ProjectDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="dashboard" replace />} />
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