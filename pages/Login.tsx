
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export const Login: React.FC = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await authService.login(token);
    
    if (success) {
      navigate('/editor');
    } else {
      setError('Invalid Token or Unauthorized User. Please use a token for "namojo".');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
             <span className="material-symbols-outlined text-3xl">terminal</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Admin Authentication</h1>
          <p className="text-sm text-gray-500 mt-2">
            Verify your identity using your GitHub Personal Access Token.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">GitHub Token (Classic or Fine-grained)</label>
            <input 
                type="password" 
                value={token}
                onChange={(e) => {
                    setToken(e.target.value);
                    setError('');
                }}
                placeholder="ghp_..."
                className={`w-full rounded-lg border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 text-sm py-3 px-4 ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 dark:border-dark-border'}`}
                autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-medium">
                <span className="material-symbols-outlined text-sm">error</span>
                {error}
            </div>
          )}
          
          <button 
            type="submit"
            disabled={loading || !token}
            className="w-full py-3 bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-sm flex justify-center items-center gap-2"
          >
            {loading ? (
                <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Verifying...
                </>
            ) : 'Verify Token'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-dark-border text-center">
            <p className="text-xs text-gray-400 mb-2">Don't have a token?</p>
            <a 
                href="https://github.com/settings/tokens" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-semibold text-primary-600 hover:underline flex items-center justify-center gap-1"
            >
                Generate one on GitHub
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
        </div>
      </div>
    </div>
  );
};
