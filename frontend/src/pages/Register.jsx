import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Upload, User, Mail, Lock, Loader } from 'lucide-react';

const Register = () => {
    const { register: registerUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        if (data.profileImage[0]) {
            formData.append('profileImage', data.profileImage[0]);
        }

        try {
            await registerUser(formData);
            alert('Registration successful! Please verify your email.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="premium-card glass" style={{ maxWidth: '450px', width: '100%', margin: '4rem auto' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Create Account</h2>

                {error && <div className="error-alert">{error}</div>}

                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="image-upload-section">
                        <div className="avatar-preview">
                            {preview ? <img src={preview} alt="Preview" /> : <User size={40} color="#cbd5e1" />}
                        </div>
                        <label className="upload-btn">
                            <Upload size={18} />
                            <span>Upload Photo</span>
                            <input
                                type="file"
                                {...register('profileImage')}
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>

                    <div className="input-group">
                        <User className="input-icon" size={20} />
                        <input
                            {...register('username', { required: 'Username is required' })}
                            placeholder="Username"
                            className={errors.username ? 'error' : ''}
                        />
                    </div>
                    {errors.username && <span className="error-text">{errors.username.message}</span>}

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
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Min 6 characters' }
                            })}
                            placeholder="Password"
                            className={errors.password ? 'error' : ''}
                        />
                    </div>
                    {errors.password && <span className="error-text">{errors.password.message}</span>}

                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? <Loader className="spin" size={20} /> : 'Sign Up'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Login</Link>
                </p>
            </div>

            <style>{`
        .auth-container { padding: 1rem; }
        .image-upload-section { display: flex; flex-direction: column; align-items: center; gap: 1rem; margin-bottom: 0.5rem; }
        .avatar-preview { width: 100px; height: 100px; border-radius: 50%; background: #f1f5f9; border: 2px dashed #cbd5e1; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .avatar-preview img { width: 100%; height: 100%; object-fit: cover; }
        .upload-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 2rem; background: #f1f5f9; cursor: pointer; font-size: 0.875rem; color: var(--text-muted); transition: all 0.2s; }
        .upload-btn:hover { background: #e2e8f0; color: var(--text); }
        .input-group { position: relative; }
        .input-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        input { width: 100%; padding: 0.75rem 1rem 0.75rem 3rem; border-radius: var(--radius); border: 1px solid var(--border); outline: none; transition: border 0.2s; background: white; }
        input:focus { border-color: var(--primary); }
        input.error { border-color: var(--error); }
        .error-text { color: var(--error); font-size: 0.75rem; margin-top: -0.75rem; margin-left:1rem; }
        .btn-submit { background: var(--primary); color: white; border: none; padding: 0.875rem; border-radius: var(--radius); font-weight: 700; font-size: 1rem; cursor: pointer; transition: opacity 0.2s; display: flex; align-items: center; justify-content: center; }
        .btn-submit:hover { opacity: 0.9; }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .error-alert { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 0.75rem; border-radius: var(--radius); margin-bottom: 1.5rem; font-size: 0.875rem; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default Register;
