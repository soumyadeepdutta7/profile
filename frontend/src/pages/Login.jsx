import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader, ArrowRight } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        try {
            await login(data.email, data.password);
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="premium-card glass" style={{ maxWidth: '400px', width: '100%', margin: '6rem auto' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2rem' }}>Welcome Back</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Please enter your details</p>

                {error && <div className="error-alert">{error}</div>}

                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                            {...register('email', {
                                required: 'Email is required',
                                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                            })}
                            placeholder="Email Address"
                            className={errors.email ? 'error' : ''}
                        />
                    </div>
                    {errors.email && <span className="error-text">{errors.email.message}</span>}

                    <div className="input-group">
                        <Lock className="input-icon" size={20} />
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            placeholder="Password"
                            className={errors.password ? 'error' : ''}
                        />
                    </div>
                    {errors.password && <span className="error-text">{errors.password.message}</span>}

                    <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
                        <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: 'var(--primary)', textDecoration: 'none' }}>Forgot password?</Link>
                    </div>

                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? <Loader className="spin" size={20} /> : (
                            <>Sign In <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} /></>
                        )}
                    </button>
                </form>

                <div style={{ margin: '2rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                </div>

                <button
                    onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
                    className="btn-google"
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" style={{ width: '20px' }} />
                    Continue with Google
                </button>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign up</Link>
                </p>
            </div>

            <style>{`
        .auth-container { padding: 1rem; }
        .input-group { position: relative; }
        .input-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        input { width: 100%; padding: 0.75rem 1rem 0.75rem 3rem; border-radius: var(--radius); border: 1px solid var(--border); outline: none; transition: border 0.2s; background: white; }
        input:focus { border-color: var(--primary); }
        input.error { border-color: var(--error); }
        .error-text { color: var(--error); font-size: 0.75rem; margin-top: -0.75rem; margin-left:1rem; }
        .btn-submit { background: var(--primary); color: white; border: none; padding: 0.875rem; border-radius: var(--radius); font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
        .btn-submit:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .error-alert { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 0.75rem; border-radius: var(--radius); margin-bottom: 1.5rem; font-size: 0.875rem; }
        .btn-google { width: 100%; display: flex; align-items: center; justify-content: center; gap: 1rem; padding: 0.75rem; border-radius: var(--radius); border: 1px solid var(--border); background: white; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .btn-google:hover { background: #f8fafc; border-color: #cbd5e1; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default Login;
