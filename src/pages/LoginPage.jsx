import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Loader2, Eye, EyeOff, AlertCircle, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AmbientBackground from '../components/layout/AmbientBackground';
import useAuth from '../hooks/useAuth';
import { scaleIn } from '../animations';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async ({ usr, pwd }) => {
    setLoginError('');
    try {
      await login(usr, pwd);
      toast.success('Welcome back!');
      navigate('/');
    } catch (e) {
      const msg =
        e.response?.data?.message ||
        e.response?.data?.exc_type ||
        (e.code === 'ERR_NETWORK'
          ? `Cannot reach server at ${API_URL}. Check VITE_API_BASE_URL in .env and ensure Frappe is running.`
          : e.message || 'Login failed. Check your credentials.');
      setLoginError(msg);
      toast.error(msg);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <AmbientBackground />
      <motion.div
        className="glass-card-neon p-10"
        style={{ width: '100%', maxWidth: '440px', margin: '20px', position: 'relative', zIndex: 1 }}
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'var(--gradient-primary-mesh)', boxShadow: 'var(--glow-button-hover)' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: '24px', color: '#fff' }}>A</span>
          </div>
          <div className="text-center">
            <h1 className="display-heading" style={{ fontSize: '28px' }}>ARP ERP</h1>
            <p className="label-caps mt-1">Stock Module</p>
          </div>
        </div>

        <div className="neon-line mb-8" />

        {/* Inline error banner — visible regardless of toast */}
        {loginError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-3 rounded-xl mb-5"
            style={{ background: 'var(--color-sys-error-bg)', border: '1px solid rgba(220,38,38,0.35)' }}
          >
            <AlertCircle size={16} style={{ color: 'var(--color-sys-error)', flexShrink: 0, marginTop: '1px' }} />
            <p style={{ fontSize: '13px', color: 'var(--color-sys-error)', lineHeight: 1.5 }}>{loginError}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <label className="label-caps mb-1.5 block" htmlFor="usr">Email / Username</label>
            <input
              id="usr"
              className="glass-input"
              type="text"
              autoComplete="username"
              placeholder="admin@company.com"
              {...register('usr', { required: 'Email is required' })}
            />
            {errors.usr && (
              <p style={{ fontSize: '12px', color: 'var(--color-sys-error)', marginTop: '4px' }}>{errors.usr.message}</p>
            )}
          </div>

          <div>
            <label className="label-caps mb-1.5 block" htmlFor="pwd">Password</label>
            <div className="relative">
              <input
                id="pwd"
                className="glass-input pr-10"
                type={showPwd ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                {...register('pwd', { required: 'Password is required' })}
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex' }}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.pwd && (
              <p style={{ fontSize: '12px', color: 'var(--color-sys-error)', marginTop: '4px' }}>{errors.pwd.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
            style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
          >
            {isSubmitting
              ? <><Loader2 size={16} className="animate-spin" /> Signing in…</>
              : 'Sign In'
            }
          </button>
        </form>

        {/* Shows which server the form is posting to */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          <Server size={11} style={{ color: 'var(--color-text-muted)' }} />
          <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: "'DM Mono', monospace" }}>
            {API_URL}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
