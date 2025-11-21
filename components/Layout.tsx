import React from 'react';
import { User, YearLevel } from '../types';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
  currentView: string;
  onChangeView: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children, currentView, onChangeView }) => {
  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-literature-dark text-white hidden md:flex flex-col sticky top-0 h-screen shadow-xl z-20">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-serif font-bold tracking-wide text-literature-accent">Apprend<span className="text-white">GO</span></h1>
          <p className="text-xs text-slate-400 mt-1">Lettres Modernes</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => onChangeView('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-3 ${currentView === 'dashboard' ? 'bg-literature-accent text-white font-medium' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Niveaux (Accueil)
          </button>
          
          <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider px-4">Mon Profil</div>
          
          <div className="px-4 py-2 text-sm text-slate-300 bg-slate-800/50 rounded border border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="font-medium text-white">{user.username}</span>
            </div>
            <span className="block text-slate-500 text-xs">Statut: Étudiant {user.year}</span>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-literature-dark text-white z-50 px-4 py-3 flex justify-between items-center shadow-md">
         <h1 onClick={() => onChangeView('dashboard')} className="text-xl font-serif font-bold text-literature-accent cursor-pointer">Apprend<span className="text-white">GO</span></h1>
         <button onClick={onLogout} className="text-sm text-slate-300">Sortir</button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 pt-20 md:pt-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;