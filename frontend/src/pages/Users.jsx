import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ChevronLeft, ChevronRight, User, Trash2, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Users = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/users?page=${page}&search=${searchTerm}`);
            setUsers(res.data.users);
            setTotal(res.data.total);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setSearchTerm(search);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`/api/users/${id}`);
                fetchUsers();
            } catch (err) {
                alert('Delete failed');
            }
        }
    };

    return (
        <div style={{ padding: '4rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>User Directory</h1>

                <form onSubmit={handleSearch} className="search-box">
                    <Search size={20} color="#64748b" />
                    <input
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>

            <div className="users-list">
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><Loader className="spin" size={40} /></div>
                ) : (
                    <div className="grid">
                        {users.map(user => (
                            <div key={user.id} className="user-card glass">
                                <div className="user-info">
                                    <div className="small-avatar">
                                        {user.profileImage ? (
                                            <img src={`http://localhost:5000/${user.profileImage}`} alt="" />
                                        ) : (
                                            <User size={24} color="#94a3b8" />
                                        )}
                                    </div>
                                    <div>
                                        <h4>{user.username}</h4>
                                        <p>{user.email}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                                    <span className={`role-badge ${user.role}`}>{user.role}</span>
                                    {currentUser.role === 'admin' && user.id !== currentUser.id && (
                                        <button onClick={() => handleDelete(user.id)} className="btn-delete">
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="pagination">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="btn-page"
                >
                    <ChevronLeft size={20} /> Prev
                </button>
                <span style={{ fontWeight: '600' }}>Page {page} of {Math.ceil(total / 10) || 1}</span>
                <button
                    disabled={page >= Math.ceil(total / 10)}
                    onClick={() => setPage(page + 1)}
                    className="btn-page"
                >
                    Next <ChevronRight size={20} />
                </button>
            </div>

            <style>{`
        .search-box { display: flex; align-items: center; background: white; border: 1px solid var(--border); padding: 0.5rem 1rem; border-radius: 2rem; width: 300px; box-shadow: var(--shadow); }
        .search-box input { border: none; padding: 0.25rem 0.5rem; outline: none; width: 100%; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .user-card { padding: 1.5rem; border-radius: 1rem; transition: transform 0.2s; }
        .user-card:hover { transform: translateY(-4px); }
        .user-info { display: flex; gap: 1rem; align-items: center; }
        .small-avatar { width: 48px; height: 48px; border-radius: 1rem; background: #f1f5f9; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .small-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .user-info h4 { margin: 0; font-size: 1.125rem; width: 180px; overflow: hidden; text-overflow: ellipsis; }
        .user-info p { margin: 0; font-size: 0.875rem; color: var(--text-muted); width: 180px; overflow: hidden; text-overflow: ellipsis; }
        .role-badge { font-size: 0.75rem; padding: 0.125rem 0.625rem; border-radius: 1rem; font-weight: 700; text-transform: uppercase; }
        .role-badge.admin { background: #fee2e2; color: #ef4444; }
        .role-badge.user { background: #f1f5f9; color: var(--text-muted); }
        .btn-delete { background: white; border: 1px solid #fee2e2; color: #ef4444; padding: 0.5rem; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s; }
        .btn-delete:hover { background: #ef4444; color: white; }
        .pagination { display: flex; justify-content: center; align-items: center; gap: 2rem; margin-top: 4rem; }
        .btn-page { display: flex; align-items: center; gap: 0.5rem; background: white; border: 1px solid var(--border); padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; }
        .btn-page:disabled { opacity: 0.5; cursor: not-allowed; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default Users;
