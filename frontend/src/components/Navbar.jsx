import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Users as UsersIcon, Home as HomeIcon } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass" style={{
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: 'var(--shadow)'
        }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', textDecoration: 'none' }}>
                MERN Profile
            </Link>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Link to="/" className="nav-link"><HomeIcon size={20} /> Home</Link>
                {user ? (
                    <>
                        <Link to="/users" className="nav-link"><UsersIcon size={20} /> Users</Link>
                        <Link to="/profile" className="nav-link"><User size={20} /> Profile</Link>
                        <button onClick={handleLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <LogOut size={18} /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="btn-primary">Register</Link>
                    </>
                )}
            </div>

            <style>{`
        .nav-link {
          text-decoration: none;
          color: var(--text-muted);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: var(--primary);
        }
        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius);
          text-decoration: none;
          font-weight: 600;
          transition: background 0.2s;
        }
        .btn-primary:hover {
          background: var(--primary-hover);
        }
        .btn-secondary {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text);
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
          font-weight: 500;
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
