import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, loading, isAdmin } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Failed to login. Please check your credentials or ensure you are an admin.');
      console.error("Login Error:", (err as Error).message);
    }
  };

  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
            Admin Login
          </h1>
          <p className="mt-2 text-gray-400">Please enter your credentials to access the admin panel.</p>
        </div>
        <div className="bg-gray-800/50 p-8 rounded-lg shadow-lg shadow-purple-500/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
            </div>
            
            {error && <p className="text-sm text-red-400 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/40 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;