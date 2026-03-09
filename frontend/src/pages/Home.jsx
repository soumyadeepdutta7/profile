import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Users as UsersIcon, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="home-container">
            <header className="hero">
                <h1 className="hero-title">Experience Seamless <span className="text-gradient">Profile Management</span></h1>
                <p className="hero-subtitle">A powerful MERN stack application built with modern architecture, Redis caching, and robust security.</p>
                <div className="hero-actions">
                    {user ? (
                        <Link to="/profile" className="btn-primary-lg">Go to Dashboard <ArrowRight size={20} /></Link>
                    ) : (
                        <>
                            <Link to="/register" className="btn-primary-lg">Get Started <ArrowRight size={20} /></Link>
                            <Link to="/login" className="btn-outline-lg">Login</Link>
                        </>
                    )}
                </div>
            </header>

            <section className="features">
                <div className="feature-card glass">
                    <div className="feature-icon"><Zap size={24} /></div>
                    <h3>Lightning Fast</h3>
                    <p>Integrated Redis caching ensures that user data is served with minimal latency.</p>
                </div>
                <div className="feature-card glass">
                    <div className="feature-icon"><Shield size={24} /></div>
                    <h3>Secure by Design</h3>
                    <p>JWT-based authentication with refresh tokens and RBAC for granular access control.</p>
                </div>
                <div className="feature-card glass">
                    <div className="feature-icon"><UsersIcon size={24} /></div>
                    <h3>Scalable Architecture</h3>
                    <p>Built with Node.js, Sequelize (MySQL), and React for a robust full-stack experience.</p>
                </div>
            </section>

            <style>{`
        .home-container { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
        .hero { text-align: center; margin-bottom: 6rem; }
        .hero-title { font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
        .text-gradient { background: linear-gradient(90deg, var(--primary), #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtitle { font-size: 1.25rem; color: var(--text-muted); max-width: 700px; margin: 0 auto 3rem; line-height: 1.6; }
        .hero-actions { display: flex; gap: 1rem; justify-content: center; }
        .btn-primary-lg { background: var(--primary); color: white; padding: 1rem 2rem; border-radius: var(--radius); text-decoration: none; font-weight: 700; font-size: 1.125rem; display: flex; align-items: center; gap: 0.75rem; transition: all 0.2s; box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3); }
        .btn-primary-lg:hover { transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.4); }
        .btn-outline-lg { border: 1px solid var(--border); color: var(--text); padding: 1rem 2rem; border-radius: var(--radius); text-decoration: none; font-weight: 700; font-size: 1.125rem; transition: background 0.2s; }
        .btn-outline-lg:hover { background: #f1f5f9; }
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .feature-card { padding: 2.5rem; border-radius: 1.5rem; text-align: left; }
        .feature-icon { background: var(--primary); color: white; width: 3rem; height: 3rem; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
        .feature-card h3 { font-size: 1.5rem; margin-bottom: 1rem; }
        .feature-card p { color: var(--text-muted); line-height: 1.6; }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .hero-actions { flex-direction: column; }
        }
      `}</style>
        </div>
    );
};

export default Home;
