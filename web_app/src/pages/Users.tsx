import React, { useState } from 'react';
import type { User } from '../services/UserService';
import { useUsers } from '../hooks/useUsers';
import { Calendar, AlertCircle, Edit2, Trash2, X, Users, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UsersPage: React.FC = () => {
  const { users, isLoading, error, updateUser, deleteUser, isUpdating, isDeleting } = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateUser = (user: User, data: Partial<User>) => {
    updateUser({ id: user.id, data }, {
      onSuccess: () => setEditingUser(null)
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    deleteUser(userId);
  };

  const roleBadgeClass: Record<string, string> = {
    admin: 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
    artist: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    customer: 'bg-slate-500/20 text-slate-300 border border-slate-500/30',
  };

  const avatarGradient = (email: string) => {
    const gradients = [
      'from-violet-500 to-indigo-600',
      'from-blue-500 to-cyan-600',
      'from-emerald-500 to-teal-600',
      'from-rose-500 to-pink-600',
      'from-amber-500 to-orange-600',
    ];
    return gradients[email.charCodeAt(0) % gradients.length];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Loading users...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Users size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white leading-tight">System Users</h1>
            <p className="text-xs text-slate-500 mt-0.5">Manage all users and their roles across the platform</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm">
          <span className="text-slate-500">Total</span>
          <span className="font-semibold text-white">{users.length}</span>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error instanceof Error ? error.message : String(error)}</span>
        </div>
      )}

      {/* Main Table Card */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl overflow-hidden">

        {/* Search Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
          <Search size={14} className="text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search by email or role..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-600 hover:text-slate-300 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['User', 'Role', 'Joined', 'Actions'].map(h => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-[11px] font-medium text-slate-500 uppercase tracking-widest"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center text-sm text-slate-600">
                    {searchQuery ? `No users match "${searchQuery}"` : 'No users found'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.025] transition-colors group"
                  >
                    {/* User */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarGradient(user.email)} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm`}>
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200">{user.email}</p>
                          <p className="text-[11px] text-slate-500 font-mono mt-0.5">#{user.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${roleBadgeClass[user.role] ?? roleBadgeClass.customer}`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <Calendar size={13} className="text-slate-600" />
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingUser(user)}
                          disabled={isUpdating}
                          title="Edit User"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={isDeleting}
                          title="Delete User"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredUsers.length > 0 && (
          <div className="px-5 py-3 border-t border-white/[0.06]">
            <p className="text-xs text-slate-500">
              Showing{' '}
              <span className="text-slate-300 font-medium">{filteredUsers.length}</span>
              {' '}of{' '}
              <span className="text-slate-300 font-medium">{users.length}</span>
              {' '}users
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && setEditingUser(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="w-full max-w-md bg-[#13131f] border border-white/[0.1] rounded-2xl shadow-2xl shadow-black/70 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
                <h3 className="text-base font-semibold text-white">Edit User</h3>
                <button
                  onClick={() => setEditingUser(null)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-6 space-y-5">

                {/* Avatar Preview */}
                <div className="flex flex-col items-center gap-3 pb-5 border-b border-white/[0.06]">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${avatarGradient(editingUser.email)} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {editingUser.email.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-[11px] text-slate-600 font-mono">ID: {editingUser.id}</p>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={editingUser.email}
                    onBlur={e => handleUpdateUser(editingUser, { email: e.target.value })}
                    disabled={isUpdating}
                    className="w-full bg-white/[0.05] border border-white/[0.1] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 text-slate-200 text-sm rounded-xl px-4 py-3 outline-none transition-all disabled:opacity-50 placeholder-slate-600"
                  />
                </div>

                {/* Role Field */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-2">
                    Role
                  </label>
                  <div className="relative">
                    <select
                      defaultValue={editingUser.role}
                      onBlur={e => handleUpdateUser(editingUser, { role: e.target.value })}
                      disabled={isUpdating}
                      className="w-full appearance-none bg-white/[0.05] border border-white/[0.1] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 text-slate-200 text-sm rounded-xl px-4 py-3 pr-10 outline-none transition-all cursor-pointer disabled:opacity-50"
                    >
                      <option value="admin" className="bg-[#13131f]">Admin</option>
                      <option value="artist" className="bg-[#13131f]">Artist</option>
                      <option value="customer" className="bg-[#13131f]">Customer</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                {/* Saving Indicator */}
                {isUpdating && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                    <div className="w-3.5 h-3.5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                    Saving changes...
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UsersPage;