"use client";

import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function CustomersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Mock data
    const mockUsers: User[] = [
      { id: "1", name: "Demo User", email: "demo@demo.app", role: "customer", createdAt: new Date(Date.now() - 30 * 86400000).toISOString() },
      { id: "2", name: "Admin User", email: "admin@goon.app", role: "admin", createdAt: new Date(Date.now() - 45 * 86400000).toISOString() },
      { id: "3", name: "Sarah Chen", email: "sarah@brokerage.com", role: "customer", createdAt: new Date(Date.now() - 10 * 86400000).toISOString() },
      { id: "4", name: "Mike Johnson", email: "mike@realty.com", role: "customer", createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
      { id: "5", name: "Lisa Park", email: "lisa.park@realty.com", role: "customer", createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
    ];
    setTimeout(() => { setUsers(mockUsers); setLoading(false); }, 300);
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-text font-manrope">Customers</h1>
          <p className="text-slate-secondary mt-1">Manage customer accounts</p>
        </div>
        <button className="btn-violet">+ Invite User</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="input-warm max-w-sm"
          />
        </div>
        {loading ? (
          <div className="p-8 text-center text-slate-secondary">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">User</th>
                  <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Role</th>
                  <th className="text-left text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Joined</th>
                  <th className="text-right text-xs font-medium text-slate-secondary uppercase tracking-wider px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center">
                          <span className="text-violet text-sm font-semibold">{user.name.split(" ").map((n) => n[0]).join("")}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-surface-text">{user.name}</p>
                          <p className="text-xs text-slate-secondary">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        user.role === "admin" ? "bg-violet-50 text-violet border border-violet-100" : "bg-gray-50 text-gray-600 border border-gray-200"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-secondary">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button className="text-sm text-violet font-medium hover:underline">Edit</button>
                        {user.role !== "admin" && (
                          <button className="text-sm text-coral font-medium hover:underline">Promote</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
