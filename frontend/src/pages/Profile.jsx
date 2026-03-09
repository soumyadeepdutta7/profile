import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { User, Mail, Shield, Camera, Save, Edit2, Loader, Trash2, X } from 'lucide-react';

const Profile = () => {
    const { user, setUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const watchImage = watch('profileImage');

    useEffect(() => {
        if (user) {
            reset({ username: user.username, email: user.email });
            setPreview(user.profileImage ? `http://localhost:5000/${user.profileImage}` : null);
        }
    }, [user, reset]);

    useEffect(() => {
        if (watchImage && watchImage.length > 0) {
            const file = watchImage[0];
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    }, [watchImage]);

    const handleSave = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('email', data.email);
        if (data.profileImage && data.profileImage[0]) {
            formData.append('profileImage', data.profileImage[0]);
        }

        try {
            const res = await axios.put('/api/users/me', formData);
            setUser(res.data.user);
            setEditing(false);
            alert('Profile updated successfully!');
        } catch (err) {
            alert(err.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveImage = async () => {
        if (!window.confirm('Remove profile image?')) return;
        setLoading(true);
        try {
            const res = await axios.delete('/api/users/me/image');
            setUser(res.data.user);
            setPreview(null);
            alert('Image removed');
        } catch (err) {
            alert('Failed to remove image');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem' }}>
            <div className="premium-card glass">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>My Profile</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Manage your professional identity</p>
                    </div>
                    {!editing ? (
                        <button onClick={() => setEditing(true)} className="btn-edit">
                            <Edit2 size={18} /> Edit Profile
                        </button>
                    ) : (
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button onClick={() => { setEditing(false); setPreview(user.profileImage ? `http://localhost:5000/${user.profileImage}` : null); }} className="btn-cancel">Cancel</button>
                            <button onClick={handleSubmit(handleSave)} className="btn-save" disabled={loading}>
                                {loading ? <Loader className="spin" size={20} /> : <><Save size={18} /> Save Changes</>}
                            </button>
                        </div>
                    )}
                </div>

                <div className="profile-layout">
                    <div className="avatar-column">
                        <div className="avatar-wrapper shadow-lg">
                            {preview ? <img src={preview} alt="Profile" /> : <User size={64} color="#94a3b8" />}
                            {editing && (
                                <label className="camera-overlay">
                                    <Camera size={24} />
                                    <input type="file" {...register('profileImage')} style={{ display: 'none' }} accept="image/*" />
                                </label>
                            )}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                            <div className={`role-badge-large ${user.role}`}>{user.role.toUpperCase()}</div>
                            {editing && user.profileImage && (
                                <button onClick={handleRemoveImage} className="btn-remove-img">
                                    <Trash2 size={14} /> Remove Photo
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="form-column">
                        <form className="profile-form">
                            <div className="field-group">
                                <label><User size={16} /> Username</label>
                                <div className="input-with-icon">
                                    <input
                                        disabled={!editing}
                                        {...register('username', { required: 'Username is required' })}
                                        className={errors.username ? 'error' : ''}
                                    />
                                </div>
                                {errors.username && <span className="error-hint">{errors.username.message}</span>}
                            </div>

                            <div className="field-group">
                                <label><Mail size={16} /> Email Address</label>
                                <div className="input-with-icon">
                                    <input
                                        disabled={!editing}
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                                        })}
                                        className={errors.email ? 'error' : ''}
                                    />
                                </div>
                                {errors.email && <span className="error-hint">{errors.email.message}</span>}
                            </div>

                            <div className="field-group">
                                <label><Shield size={16} /> Verification status</label>
                                <div className={`status-pill ${user.isVerified ? 'verified' : 'pending'}`}>
                                    {user.isVerified ? 'Email Verified' : 'Pending Verification'}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
                .premium-card { padding: 3rem; border-radius: 2rem; background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.3); }
                .profile-layout { display: grid; grid-template-columns: 240px 1fr; gap: 4rem; }
                .avatar-column { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
                .avatar-wrapper { width: 180px; height: 180px; border-radius: 2rem; background: #f8fafc; position: relative; overflow: hidden; border: 4px solid white; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
                .avatar-wrapper img { width: 100%; height: 100%; object-fit: cover; }
                .camera-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); color: white; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; cursor: pointer; backdrop-filter: blur(4px); }
                .avatar-wrapper:hover .camera-overlay { opacity: 1; }
                
                .role-badge-large { text-align: center; padding: 0.5rem; border-radius: 1rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.05em; }
                .role-badge-large.admin { background: #fee2e2; color: #ef4444; border: 1px solid #fecaca; }
                .role-badge-large.user { background: #e0e7ff; color: #4338ca; border: 1px solid #c7d2fe; }
                
                .btn-remove-img { background: none; border: 1px solid #fee2e2; color: #ef4444; padding: 0.5rem; border-radius: 0.75rem; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.2s; }
                .btn-remove-img:hover { background: #fef2f2; }

                .form-column { display: flex; flex-direction: column; gap: 2rem; }
                .field-group { display: flex; flex-direction: column; gap: 0.5rem; }
                .field-group label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 600; color: #64748b; }
                .field-group input { width: 100%; padding: 0.875rem 1rem; border-radius: 1rem; border: 1px solid var(--border); background: white; transition: all 0.2s; font-size: 1rem; font-weight: 500; }
                .field-group input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); outline: none; }
                .field-group input:disabled { background: #f1f5f9; color: #64748b; cursor: not-allowed; border-style: dashed; }
                .field-group input.error { border-color: var(--error); }
                .error-hint { color: var(--error); font-size: 0.75rem; font-weight: 500; margin-left: 0.5rem; }
                
                .status-pill { padding: 0.75rem 1rem; border-radius: 1rem; font-weight: 600; font-size: 0.875rem; display: inline-block; width: fit-content; }
                .status-pill.verified { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
                .status-pill.pending { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }

                .btn-edit { display: flex; align-items: center; gap: 0.5rem; background: white; border: 1px solid var(--border); padding: 0.625rem 1.25rem; border-radius: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
                .btn-edit:hover { border-color: var(--primary); color: var(--primary); box-shadow: var(--shadow); }
                .btn-cancel { background: transparent; border: none; font-weight: 700; color: #64748b; cursor: pointer; padding: 0.625rem 1.25rem; }
                .btn-save { background: var(--primary); color: white; border: none; padding: 0.625rem 1.5rem; border-radius: 1rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: transform 0.2s; }
                .btn-save:hover { transform: translateY(-1px); filter: brightness(1.1); }
                .btn-save:disabled { opacity: 0.7; cursor: not-allowed; }

                @media (max-width: 768px) {
                    .profile-layout { grid-template-columns: 1fr; gap: 2rem; }
                    .premium-card { padding: 2rem 1.5rem; }
                }
            `}</style>
        </div>
    );
};

export default Profile;
