import React, { useState, useRef, useEffect } from 'react';
import { Lock, Eye, EyeOff, X, ArrowRight, AlertCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const AdminPasswordModal: React.FC = () => {
  const { isPasswordModalOpen, closePasswordModal, verifyPassword } = useAdmin();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPasswordModalOpen) {
      setPassword('');
      setError('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isPasswordModalOpen]);

  if (!isPasswordModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter the admin password');
      return;
    }

    const success = verifyPassword(password);
    if (!success) {
      setError('Incorrect password. Access denied.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-md bg-[#12141A]/95 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden transition-all ${
          isShaking ? 'animate-bounce text-red-400' : ''
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Subtle ambient red background light */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#FF0000]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closePasswordModal}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lock Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#FF0000]/15 border border-[#FF0000]/30 flex items-center justify-center text-[#FF0000] shadow-[0_4px_20px_rgba(255,0,0,0.2)] mb-3.5">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-wide">Admin Access Required</h3>
          <p className="text-xs text-white/50 mt-1 max-w-xs">
            Enter the admin password to edit site content, reorder sections, and adjust layouts.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter password..."
              className={`w-full px-4 py-3 rounded-2xl bg-white/[0.05] border text-white placeholder-white/30 text-sm focus:outline-none transition-all pr-11 ${
                error 
                  ? 'border-red-500/70 focus:border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.2)]' 
                  : 'border-white/10 focus:border-[#FF0000]/60'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-red-400 px-1 animate-in fade-in duration-150">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={closePasswordModal}
              className="flex-1 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white font-medium text-xs sm:text-sm transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-[#FF0000] hover:bg-[#D60000] text-white font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(255,0,0,0.35)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Unlock Admin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
