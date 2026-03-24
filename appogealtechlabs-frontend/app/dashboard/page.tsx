'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, 
  FileText, 
  Clock, 
  Settings,
  LogOut,
  User 
} from 'lucide-react';

export default function DashboardPage() {
  const { user, logout, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Client Portal</h1>
            <p className="text-text-secondary mt-1">Welcome back, {user.first_name || user.username}!</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1 */}
          <div className="bg-bg-secondary p-6 rounded-2xl border border-gray-800 hover:border-accent transition-colors">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-1">Active Projects</h3>
            <p className="text-3xl font-bold text-accent">2</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-bg-secondary p-6 rounded-2xl border border-gray-800 hover:border-accent transition-colors">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-4">
              <CreditCard size={24} />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-1">Invoices Due</h3>
            <p className="text-3xl font-bold text-purple-500">$0.00</p>
          </div>

          {/* Card 3 */}
          <div className="bg-bg-secondary p-6 rounded-2xl border border-gray-800 hover:border-accent transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-4">
              <Clock size={24} />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-1">Hours Logged</h3>
            <p className="text-3xl font-bold text-blue-500">124</p>
          </div>

          {/* Card 4 */}
          <div className="bg-bg-secondary p-6 rounded-2xl border border-gray-800 hover:border-accent transition-colors">
             <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-4">
              <User size={24} />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-1">Profile Status</h3>
            <p className="text-sm text-green-500 font-bold mt-2">Active</p>
          </div>
        </div>

        {/* Recent Activity / Projects List */}
        <div className="bg-bg-secondary rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold text-text-primary">Recent Projects</h2>
          </div>
          <div className="p-6">
             <div className="text-center py-12 text-text-secondary">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
                    <Settings size={32} />
                </div>
                <p>No recent project activity to display.</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
