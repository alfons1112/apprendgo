import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import CourseCard from './components/CourseCard';
import ChatInterface from './components/ChatInterface';
import QuizModal from './components/QuizModal';
import { User, YearLevel, Course, QuizData } from './types';
import { MOCK_COURSES } from './constants';
import { generateQuiz } from './services/geminiService';

const App: React.FC = () => {
  // --- State ---
  const [user, setUser] = useState<User | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  
  // View State: 'dashboard' (choix niveau) -> 'level_courses' (liste cours) -> 'course' (contenu)
  const [view, setView] = useState<'dashboard' | 'level_courses' | 'course'>('dashboard');
  const [selectedLevel, setSelectedLevel] = useState<YearLevel | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // Quiz State
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  // --- Mock Authentication ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username && loginForm.password) {
      setUser({
        username: loginForm.username,
        isAuthenticated: true,
        year: YearLevel.L1 // Default
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    resetNavigation();
  };

  const resetNavigation = () => {
    setView('dashboard');
    setSelectedLevel(null);
    setSelectedCourse(null);
  };

  // --- Navigation Handlers ---
  const handleLevelSelect = (level: YearLevel) => {
    setSelectedLevel(level);
    setView('level_courses');
    window.scrollTo(0, 0);
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setView('course');
    window.scrollTo(0, 0);
  };

  const handleBackToLevels = () => {
    setView('dashboard');
    setSelectedLevel(null);
  };

  const handleBackToCourseList = () => {
    setView('level_courses');
    setSelectedCourse(null);
  };

  // --- AI Features ---
  const handleGenerateQuiz = async () => {
    if (!selectedCourse) return;
    
    setIsQuizOpen(true);
    setQuizLoading(true);
    setQuizData(null);

    try {
      const data = await generateQuiz(selectedCourse.content);
      setQuizData(data);
    } catch (error) {
      console.error("Failed to generate quiz", error);
    } finally {
      setQuizLoading(false);
    }
  };

  // --- Render Login ---
  if (!user) {
    return (
      <div className="min-h-screen bg-literature-dark flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-24 -left-24 w-96 h-96 bg-literature-accent rounded-full blur-3xl"></div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-literature-dark mb-2">Apprend<span className="text-literature-accent">GO</span></h1>
            <p className="text-gray-500 text-sm">Portail étudiant - Licence Lettres Modernes</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Identifiant étudiant</label>
              <input
                type="text"
                required
                value={loginForm.username}
                onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-literature-accent focus:border-transparent outline-none transition-all"
                placeholder="ex: etudiant123"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-literature-accent focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-literature-dark text-white font-medium py-3 rounded-lg hover:bg-slate-800 transform active:scale-95 transition-all shadow-lg hover:shadow-xl"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filter courses based on selected level
  const filteredCourses = selectedLevel 
    ? MOCK_COURSES.filter(c => c.year === selectedLevel)
    : [];

  // --- Render Authenticated App ---
  return (
    <Layout 
      user={user} 
      onLogout={handleLogout}
      currentView={view}
      onChangeView={(v) => {
        if(v === 'dashboard') resetNavigation();
      }}
    >
      {/* VIEW: LEVEL SELECTION (DASHBOARD) */}
      {view === 'dashboard' && (
        <div className="animate-fade-in">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold text-literature-dark">Bienvenue sur ApprendGO</h2>
            <p className="text-slate-500 mt-2">Sélectionnez votre niveau d'étude pour accéder aux cours.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {/* Level Card L1 */}
            <div 
              onClick={() => handleLevelSelect(YearLevel.L1)}
              className="group cursor-pointer relative bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-64 flex flex-col justify-center items-center text-center p-6"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-500 group-hover:h-full group-hover:opacity-5 transition-all duration-500"></div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span className="font-serif font-bold text-2xl">L1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 z-10">Licence 1</h3>
              <p className="text-sm text-gray-500 mt-2 z-10">Introduction et Fondamentaux</p>
            </div>

            {/* Level Card L2 */}
            <div 
              onClick={() => handleLevelSelect(YearLevel.L2)}
              className="group cursor-pointer relative bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-64 flex flex-col justify-center items-center text-center p-6"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-literature-accent group-hover:h-full group-hover:opacity-5 transition-all duration-500"></div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-literature-accent group-hover:bg-literature-accent group-hover:text-white transition-colors">
                <span className="font-serif font-bold text-2xl">L2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 z-10">Licence 2</h3>
              <p className="text-sm text-gray-500 mt-2 z-10">Histoire littéraire approfondie</p>
            </div>

            {/* Level Card L3 */}
            <div 
              onClick={() => handleLevelSelect(YearLevel.L3)}
              className="group cursor-pointer relative bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-64 flex flex-col justify-center items-center text-center p-6"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 group-hover:h-full group-hover:opacity-5 transition-all duration-500"></div>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <span className="font-serif font-bold text-2xl">L3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 z-10">Licence 3</h3>
              <p className="text-sm text-gray-500 mt-2 z-10">Critique et Théorie littéraire</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: COURSE LIST FOR SELECTED LEVEL */}
      {view === 'level_courses' && selectedLevel && (
        <div className="animate-fade-in">
          <button 
            onClick={handleBackToLevels}
            className="flex items-center text-sm text-slate-500 hover:text-literature-dark mb-6 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux niveaux
          </button>

          <div className="mb-8 flex items-end justify-between border-b border-gray-200 pb-4">
            <div>
               <span className="text-xs font-bold text-literature-accent uppercase tracking-wider">Programme</span>
               <h2 className="text-3xl font-serif font-bold text-literature-dark mt-1">{selectedLevel}</h2>
            </div>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredCourses.length} matières disponibles
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} onClick={handleCourseClick} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-400">Aucun cours disponible pour le moment dans ce niveau.</p>
            </div>
          )}
        </div>
      )}

      {/* VIEW: COURSE CONTENT */}
      {view === 'course' && selectedCourse && (
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-8">
            <button 
              onClick={handleBackToCourseList}
              className="flex items-center text-sm text-slate-500 hover:text-literature-accent mb-4 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à la liste {selectedLevel}
            </button>

            <div className="bg-literature-paper p-8 rounded-xl shadow-sm border border-stone-200">
              <div className="border-b border-stone-300 pb-6 mb-6">
                <span className="text-literature-accent font-bold tracking-widest text-xs uppercase mb-2 block">{selectedCourse.year} — {selectedCourse.category}</span>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-literature-dark">{selectedCourse.title}</h1>
              </div>
              
              <div className="prose prose-stone prose-lg max-w-none font-serif">
                {selectedCourse.content.split('\n').map((line, i) => {
                  const trimmed = line.trim();
                  if (trimmed.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mt-6 mb-4">{trimmed.replace('# ', '')}</h1>
                  if (trimmed.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-5 mb-3 text-literature-dark">{trimmed.replace('## ', '')}</h2>
                  if (trimmed.startsWith('### ')) return <h3 key={i} className="text-lg font-bold mt-4 mb-2 text-slate-700">{trimmed.replace('### ', '')}</h3>
                  if (trimmed.startsWith('- ')) return <li key={i} className="ml-4 list-disc">{trimmed.replace('- ', '')}</li>
                  if (trimmed === '') return <br key={i}/>
                  return <p key={i} className="mb-4 leading-relaxed text-gray-800">{trimmed}</p>
                })}
              </div>
            </div>
          </div>

          {/* Right Column: AI Tools */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-gradient-to-br from-literature-dark to-slate-800 rounded-xl p-6 text-white shadow-lg">
                <h3 className="font-serif font-bold text-lg mb-2">Outils d'apprentissage</h3>
                <p className="text-slate-300 text-sm mb-4">Utilisez l'IA pour tester vos connaissances sur ce chapitre.</p>
                <button 
                  onClick={handleGenerateQuiz}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Générer un Quiz
                </button>
             </div>

             <ChatInterface courseContent={selectedCourse.content} />
          </div>
        </div>
      )}

      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        quizData={quizData}
        isLoading={quizLoading}
      />
    </Layout>
  );
};

export default App;