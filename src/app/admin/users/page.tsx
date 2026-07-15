import React from 'react';
import { 
  UserPlus, Shield, UserX, Search, Edit2, 
  Eye, ToggleLeft, Activity, ListOrdered
} from 'lucide-react';

export default function AdminUsersPage() {
  const users = [
    { id: 'AN-992', name: 'John Doe', email: 'john@example.com', role: 'Administrator', status: 'ACTIVE' },
    { id: 'AN-881', name: 'Jane Smith', email: 'jane@mugisub.com', role: 'Moderator', status: 'SUSPENDED' },
    { id: 'AN-102', name: 'AnimeLover99', email: 'otaku@mail.com', role: 'User', status: 'ACTIVE' },
    { id: 'AN-103', name: 'Militades', email: 'militades@mugisub.com', role: 'Uploader', status: 'PENDING' },
  ];

  return (
    // padding text aur border margins ko left navigation bar ke sath align karne ke liye h-full aur container spacing handle ki hai
    <div className="w-full min-h-screen bg-[#b9bdc6] p-6 font-sans text-slate-800">
      
      {/* HEADER SECTION - Perfect Left & Right alignment */}
      <div className="w-full bg-[#273246] text-white px-4 py-3 rounded-md shadow-md flex justify-between items-center mb-6">
        <h2 className="m-0 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2">
          <span className="w-1.5 h-4 bg-blue-500 rounded-xs inline-block"></span>
          Admin Panel &gt; Users Management
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-[10px] bg-slate-700/60 px-2.5 py-1 rounded-sm text-slate-300 font-mono">v2.4.1-stable</span>
        </div>
      </div>

      {/* TWO COLUMN GRID LAYOUT */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">
        
        {/* LEFT COLUMN: Main Users Table */}
        <div className="bg-[#d1d5db] border border-slate-400/60 rounded-md shadow-sm overflow-hidden">
          
          {/* Table Control Header */}
          <div className="bg-[#273246] text-white px-4 py-3 text-xs font-bold flex justify-between items-center">
            <span className="uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ListOrdered size={14} className="text-slate-400" /> Users Index
            </span>
            <button className="bg-[#cc3737] hover:bg-[#b52a2a] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-sm flex items-center gap-1.5 uppercase transition-all tracking-wide shadow-sm active:scale-95">
              <UserPlus size={12} /> Add User
            </button>
          </div>

          {/* Inline Action Sub-header & Search */}
          <div className="bg-[#e2e8f0] p-3 border-b border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full max-w-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Search size={14} />
              </span>
              <input 
                type="text" 
                placeholder="Search users by name, email or index ID..." 
                className="bg-white border border-slate-400/80 text-xs pl-9 pr-3 py-1.5 w-full rounded-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium shadow-inner"
              />
            </div>
            <div className="text-[11px] text-slate-500 font-bold self-end sm:self-center bg-slate-300/60 px-2 py-0.5 rounded-sm">
              Showing: {users.length} Records
            </div>
          </div>

          {/* Table UI Container */}
          <div className="overflow-x-auto w-full bg-white">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#334155] text-slate-200 uppercase text-[10px] tracking-wider border-b border-slate-400">
                  <th className="p-3 font-bold w-24">ID</th>
                  <th className="p-3 font-bold">User Name</th>
                  <th className="p-3 font-bold">Email Address</th>
                  <th className="p-3 font-bold">Assigned Role</th>
                  <th className="p-3 font-bold text-center w-28">Status</th>
                  <th className="p-3 font-bold text-center w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-100/80 bg-white transition-colors">
                    <td className="p-3 font-bold text-blue-700 tracking-tight">
                      <a href="#" className="hover:underline hover:text-blue-900">{user.id}</a>
                    </td>
                    <td className="p-3 font-semibold text-slate-700">{user.name}</td>
                    <td className="p-3 text-slate-500 font-medium">{user.email}</td>
                    <td className="p-3 font-bold text-slate-600">
                      <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-sm text-[10px]">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block text-[9px] font-black px-2.5 py-1 rounded-sm text-white uppercase tracking-widest min-w-[80px] text-center shadow-xs
                        ${user.status === 'ACTIVE' ? 'bg-[#1e7e34] border border-[#1c7430]' : ''}
                        ${user.status === 'SUSPENDED' ? 'bg-[#bd2130] border border-[#b21f2d]' : ''}
                        ${user.status === 'PENDING' ? 'bg-[#d39e00] border border-[#c69500]' : ''}
                      `}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center items-center gap-1">
                        <button className="bg-[#4b5563] hover:bg-[#374151] text-white p-1.5 rounded-sm transition-colors shadow-xs" title="Edit Properties">
                          <Edit2 size={11} />
                        </button>
                        <button className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1.5 rounded-sm transition-colors shadow-xs" title="Restrict Profile">
                          <UserX size={11} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Admin Utilities */}
        <div className="flex flex-col gap-5 w-full">
          
          {/* USER COMMANDS */}
          <div className="bg-white border border-slate-400/80 rounded-sm shadow-sm overflow-hidden">
            <div className="bg-[#273246] text-white px-3 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              User Commands
            </div>
            <div className="p-3 bg-[#cbd5e1] flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-[#bd2130] hover:bg-[#a71d2a] text-white text-[10px] font-black py-2.5 px-2 flex flex-col items-center justify-center gap-2 rounded-sm transition-all shadow-sm active:scale-95">
                  <Shield size={16} />
                  <span className="tracking-wide">ROLES MGR</span>
                </button>
                <button className="bg-[#1b6ca8] hover:bg-[#16598a] text-white text-[10px] font-black py-2.5 px-2 flex flex-col items-center justify-center gap-2 rounded-sm transition-all shadow-sm active:scale-95">
                  <UserX size={16} />
                  <span className="tracking-wide">BAN LIST</span>
                </button>
              </div>
              <button className="bg-[#e0a800] hover:bg-[#c69500] text-slate-900 text-[10px] font-black py-2 w-full flex items-center justify-center gap-1.5 rounded-sm transition-all shadow-sm active:scale-95 tracking-wide mt-1">
                <Eye size={13} /> VIEW AUDIT LOGS
              </button>
            </div>
          </div>

          {/* USER STATS WITH METERS */}
          <div className="bg-white border border-slate-400/80 rounded-sm shadow-sm overflow-hidden">
            <div className="bg-[#273246] text-white px-3 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Activity size={13} /> User Stats
            </div>
            <div className="p-4 bg-white flex flex-col gap-4 text-xs font-bold text-slate-700">
              
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-slate-500 font-medium">Total System Users</span>
                  <span className="text-slate-900 font-mono text-[13px]">1,240</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 border border-slate-300 rounded-xs overflow-hidden shadow-inner">
                  <div className="bg-blue-600 h-full w-[85%] rounded-r-xs"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-slate-500 font-medium">Active Right Now</span>
                  <span className="text-emerald-700 font-mono text-[13px]">42 Users</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 border border-slate-300 rounded-xs overflow-hidden shadow-inner">
                  <div className="bg-emerald-600 h-full w-[35%] rounded-r-xs"></div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}