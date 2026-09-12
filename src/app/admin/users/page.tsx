"use client";

import React, { useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import { Users, Plus, Trash2, ShieldCheck, UserCheck, Key, Save, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function AdminUsersPage() {
  const { success, error } = useToast();
  const [users, setUsers] = useState<Omit<User, "passwordHash">[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // New User Form State
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("editor");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password, role }),
      });

      if (res.ok) {
        success("New user created successfully!");
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("editor");
        fetchUsers();
      } else {
        const err = await res.json();
        error(err.error || "Failed to create user");
      }
    } catch (err) {
      error("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, uname: string) => {
    if (!confirm(`Delete user account "${uname}"?`)) return;

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        success("User account deleted");
        fetchUsers();
      } else {
        const err = await res.json();
        error(err.error || "Failed to delete user");
      }
    } catch (err) {
      error("Network error");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white font-display">
          Users & Permissions
        </h1>
        <p className="text-xs text-gray-400 font-mono mt-0.5">
          Manage administrator accounts, editors, and author role privileges
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form: Add User */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-surface-200/90 border border-white/10 space-y-4 shadow-glass-card">
          <h2 className="text-sm font-bold text-white font-display flex items-center gap-2 pb-3 border-b border-white/10">
            <Plus className="w-4 h-4 text-brand-green" />
            <span>Add New User</span>
          </h2>

          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sunil Kumar Bohara"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="sunil_editor"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="editor@domain.com"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Role & Permissions</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-brand-green"
              >
                <option value="super_admin">Super Admin (All Access)</option>
                <option value="editor">Editor (Posts, Media, Categories, Pages)</option>
                <option value="author">Author (Create/Edit Own Posts)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs shadow-glow-sm hover:brightness-110 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Create Account</span>
            </button>
          </form>
        </div>

        {/* Right Table: Users List */}
        <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-surface-200/90 overflow-hidden shadow-glass-card">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-gray-400 gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-brand-green" />
              <span className="text-xs font-mono">Loading user accounts...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-white/10 bg-surface-100/90 text-[10px] font-mono text-gray-400 uppercase">
                    <th className="p-4 font-semibold">User</th>
                    <th className="p-4 font-semibold">Username</th>
                    <th className="p-4 font-semibold">Role</th>
                    <th className="p-4 font-semibold">Created</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white font-display">{u.name}</div>
                        <div className="text-[11px] font-mono text-gray-400">{u.email}</div>
                      </td>
                      <td className="p-4 font-mono text-brand-cyan">{u.username}</td>
                      <td className="p-4 font-mono">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            u.role === "super_admin"
                              ? "bg-brand-green/20 text-brand-green border border-brand-green/40"
                              : u.role === "editor"
                              ? "bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40"
                              : "bg-gray-500/20 text-gray-300"
                          }`}
                        >
                          {u.role.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-gray-400 text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right font-mono">
                        {u.role !== "super_admin" && (
                          <button
                            onClick={() => handleDelete(u.id, u.username)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
