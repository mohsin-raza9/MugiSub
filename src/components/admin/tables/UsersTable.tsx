'use client';

import React, { useState } from 'react';
import { Search, Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react';

// Mock Data
const MOCK_USERS = [
  { id: 'usr_1', name: 'Tariq Hasan', email: 'admin@mugisub.com', role: 'Super Admin', emailVerified: true, createdAt: '2026-06-01T10:00:00Z' },
  { id: 'usr_2', name: 'Alice Smith', email: 'alice@example.com', role: 'Developer', emailVerified: true, createdAt: '2026-06-05T14:30:00Z' },
  { id: 'usr_3', name: 'Bob Jones', email: 'bob@example.com', role: 'Admin', emailVerified: true, createdAt: '2026-06-10T09:15:00Z' },
  { id: 'usr_4', name: 'Charlie Doe', email: 'charlie@example.com', role: 'Partner', emailVerified: false, createdAt: '2026-06-12T16:45:00Z' },
  { id: 'usr_5', name: 'Diana Prince', email: 'diana@example.com', role: 'User', emailVerified: true, createdAt: '2026-06-15T11:20:00Z' },
  { id: 'usr_6', name: 'Evan Wright', email: 'evan@example.com', role: 'User', emailVerified: false, createdAt: '2026-06-16T08:05:00Z' },
];

export default function UsersTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(MOCK_USERS);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
      console.log(`[SYS] Deleted user: ${id}`);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Super Admin': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'Admin': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Developer': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Partner': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-violet-500/50 text-white px-3 py-2 pl-9 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
        <div className="text-[10px] text-slate-500 font-mono">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto border border-[#1d2433]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111622] border-b border-[#1d2433]">
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Verified</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Joined</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="bg-[#0d111a] border-b border-[#1d2433]/50 hover:bg-[#111622]/50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-white font-bold">{user.name}</td>
                  <td className="px-4 py-3 text-xs font-mono text-slate-300">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider border rounded-sm ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.emailVerified ? (
                      <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-rose-400 text-[10px] font-mono">
                        <XCircle className="w-3.5 h-3.5" /> No
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="p-1.5 bg-[#111622] border border-[#1d2433] hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-colors group"
                        title="Edit User"
                      >
                        <Edit2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-1.5 bg-[#111622] border border-[#1d2433] hover:border-rose-500/50 text-slate-400 hover:text-rose-400 transition-colors group"
                        title="Delete User"
                      >
                        <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-xs font-mono text-slate-500 bg-[#0d111a]">
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
