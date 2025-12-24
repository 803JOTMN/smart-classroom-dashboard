import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './lib/utils';
import { LayoutDashboard } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  
  const isActive = (pageName) => {
    return currentPageName === pageName;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h2 className="text-xl font-bold text-slate-900">GRP-IX</h2>
              <div className="flex gap-2">
                <Link
                  to={createPageUrl('TeacherDashboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive('TeacherDashboard')
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link
                  to={createPageUrl('Analytics')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive('Analytics')
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium">Analytics</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div>
        {children}
      </div>
    </div>
  );
}