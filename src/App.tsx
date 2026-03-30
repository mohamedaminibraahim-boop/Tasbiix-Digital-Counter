import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Settings as SettingsIcon, 
  BarChart3, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Vibrate, 
  VibrateOff,
  Moon,
  Sun,
  Languages,
  Trash2,
  Heart,
  ChevronRight,
  ChevronLeft,
  X,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTasbiixStore } from './store';
import { TRANSLATIONS, ADHKAR, type Language } from './types';
import { cn } from './lib/utils';

export default function App() {
  const store = useTasbiixStore();
  const { 
    tasbiixList, 
    activeTasbiix, 
    activeId, 
    setActiveId, 
    stats, 
    settings, 
    setSettings, 
    incrementCount, 
    resetTasbiix, 
    fullReset, 
    addCustomTasbiix, 
    deleteTasbiix, 
    toggleFavorite, 
    updateGoal,
    isLoaded 
  } = store;

  const [view, setView] = useState<'counter' | 'list' | 'stats' | 'settings' | 'adhkar'>('counter');
  const [adhkarType, setAdhkarType] = useState<'morning' | 'evening'>('morning');
  const [showResetModal, setShowResetModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newArabic, setNewArabic] = useState('');
  const [newGoal, setNewGoal] = useState(33);

  const t = TRANSLATIONS[settings.language];

  if (!isLoaded) return null;
  if (!activeTasbiix) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  const handleIncrement = () => {
    if (!activeTasbiix) return;
    incrementCount(activeId);
    
    // Feedback
    if (settings.vibrationEnabled && navigator.vibrate) {
      navigator.vibrate(50);
    }
    if (settings.soundEnabled) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
      audio.volume = 0.2;
      audio.play().catch(() => {});
    }

    // Special feedback
    const nextCount = activeTasbiix.currentCount + 1;
    if (nextCount === activeTasbiix.goal || nextCount === 33 || nextCount === 100) {
      if (settings.vibrationEnabled && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      if (nextCount === activeTasbiix.goal) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#009688', '#D4AF37', '#ffffff']
        });
      }
    }
  };

  const progress = Math.min((activeTasbiix.currentCount / activeTasbiix.goal) * 100, 100);

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-background shadow-xl relative overflow-hidden">
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">Tasbiix</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {stats.streak} {t.streak}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSettings(s => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            {settings.theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setView('settings')}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {view === 'counter' && (
            <motion.div 
              key="counter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 flex flex-col items-center justify-center min-h-[70vh] gap-8"
            >
              {/* Tasbiix Selector */}
              <div className="w-full">
                <button 
                  onClick={() => setView('list')}
                  className="w-full p-4 rounded-2xl bg-muted/50 border border-border flex items-center justify-between group hover:bg-muted transition-all"
                >
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{t.tasbiix}</p>
                    <h2 className="text-xl font-bold">{activeTasbiix.name[settings.language]}</h2>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Arabic Text */}
              <div className="text-center min-h-[80px] flex items-center justify-center">
                <motion.p 
                  key={activeTasbiix.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="arabic-text text-4xl md:text-5xl font-bold text-primary"
                >
                  {activeTasbiix.arabic}
                </motion.p>
              </div>

              {/* Counter Button */}
              <div className="relative">
                <svg className="w-64 h-64 -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-muted/30"
                  />
                  <motion.circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 120}
                    animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - progress / 100) }}
                    className="text-primary"
                    strokeLinecap="round"
                  />
                </svg>
                
                <button
                  onClick={handleIncrement}
                  className="absolute inset-4 rounded-full bg-card shadow-2xl border-4 border-primary/20 flex flex-col items-center justify-center active:scale-95 transition-transform overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-active:opacity-100 transition-opacity" />
                  <span className="text-6xl font-black tracking-tighter tabular-nums">
                    {activeTasbiix.currentCount}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium uppercase tracking-widest mt-2">
                    {t.goal}: {activeTasbiix.goal}
                  </span>
                </button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t.daily}</p>
                  <p className="text-xl font-bold tabular-nums">{activeTasbiix.dailyCount}</p>
                </div>
                <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t.lifetime}</p>
                  <p className="text-xl font-bold tabular-nums">{activeTasbiix.lifetimeCount}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-4">
                <button 
                  onClick={() => resetTasbiix(activeId, 'session')}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 text-sm font-medium transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t.reset}
                </button>
                <div className="flex items-center gap-1 bg-muted rounded-full p-1">
                  {[33, 100, 1000].map(g => (
                    <button
                      key={g}
                      onClick={() => updateGoal(activeId, g)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold transition-all",
                        activeTasbiix.goal === g ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-background/50"
                      )}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {view === 'list' && (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-4 space-y-4"
            >
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setView('counter')} className="p-2 rounded-full hover:bg-muted">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold">{t.tasbiix}</h2>
                <button onClick={() => setShowAddModal(true)} className="p-2 rounded-full bg-primary text-primary-foreground shadow-lg">
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-3">
                {tasbiixList.map(item => (
                  <div 
                    key={item.id}
                    className={cn(
                      "p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group",
                      activeId === item.id ? "bg-primary/10 border-primary" : "bg-card border-border hover:border-primary/50"
                    )}
                    onClick={() => {
                      setActiveId(item.id);
                      setView('counter');
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold",
                        activeId === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        {item.dailyCount}
                      </div>
                      <div>
                        <h3 className="font-bold">{item.name[settings.language]}</h3>
                        <p className="text-xs text-muted-foreground arabic-text">{item.arabic}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className={cn(
                          "p-2 rounded-full transition-colors",
                          item.isFavorite ? "text-red-500" : "text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <Heart className="w-5 h-5" fill={item.isFavorite ? "currentColor" : "none"} />
                      </button>
                      {item.isCustom && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTasbiix(item.id);
                          }}
                          className="p-2 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'stats' && (
            <motion.div 
              key="stats"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="p-6 space-y-8"
            >
              <div className="text-center space-y-2">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{t.stats}</h2>
                <p className="text-muted-foreground">{t.streak}: <span className="text-primary font-bold">{stats.streak} {t.days}</span></p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-card border border-border shadow-sm text-center">
                  <p className="text-3xl font-black text-primary mb-1">
                    {tasbiixList.reduce((acc, curr) => acc + curr.lifetimeCount, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{t.lifetime}</p>
                </div>
                <div className="p-6 rounded-3xl bg-card border border-border shadow-sm text-center">
                  <p className="text-3xl font-black text-primary mb-1">
                    {tasbiixList.reduce((acc, curr) => acc + curr.dailyCount, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{t.daily}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg px-2">Top Dhikr</h3>
                <div className="space-y-2">
                  {[...tasbiixList]
                    .sort((a, b) => b.lifetimeCount - a.lifetimeCount)
                    .slice(0, 3)
                    .map(item => (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50">
                        <span className="font-medium">{item.name[settings.language]}</span>
                        <span className="font-bold tabular-nums">{item.lifetimeCount}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </motion.div>
          )}

          {view === 'adhkar' && (
            <motion.div 
              key="adhkar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 space-y-6"
            >
              <div className="flex gap-2 p-1 bg-muted rounded-2xl">
                <button 
                  onClick={() => setAdhkarType('morning')}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-bold transition-all",
                    adhkarType === 'morning' ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-background/50"
                  )}
                >
                  {t.morning}
                </button>
                <button 
                  onClick={() => setAdhkarType('evening')}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-bold transition-all",
                    adhkarType === 'evening' ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-background/50"
                  )}
                >
                  {t.evening}
                </button>
              </div>

              <div className="space-y-4">
                {ADHKAR[adhkarType].map(item => (
                  <div key={item.id} className="p-6 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
                    <p className="arabic-text text-2xl leading-relaxed text-right text-primary">{item.arabic}</p>
                    <p className="text-sm text-muted-foreground italic leading-relaxed">{item.translation}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6 space-y-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setView('counter')} className="p-2 rounded-full hover:bg-muted">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold">{t.settings}</h2>
              </div>

              <div className="space-y-6">
                {/* Language */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Languages className="w-4 h-4" /> {t.language}
                  </label>
                  <div className="flex gap-2">
                    {(['en', 'ar', 'so'] as Language[]).map(lang => (
                      <button
                        key={lang}
                        onClick={() => setSettings(s => ({ ...s, language: lang }))}
                        className={cn(
                          "flex-1 py-3 rounded-xl border font-bold transition-all",
                          settings.language === lang ? "bg-primary border-primary text-primary-foreground shadow-lg" : "bg-card border-border hover:border-primary/50"
                        )}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Sun className="w-4 h-4" /> {t.theme}
                  </label>
                  <div className="flex gap-2">
                    {(['light', 'dark', 'system'] as const).map(theme => (
                      <button
                        key={theme}
                        onClick={() => setSettings(s => ({ ...s, theme }))}
                        className={cn(
                          "flex-1 py-3 rounded-xl border font-bold transition-all text-xs",
                          settings.theme === theme ? "bg-primary border-primary text-primary-foreground shadow-lg" : "bg-card border-border hover:border-primary/50"
                        )}
                      >
                        {t[theme]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Volume2 className="w-4 h-4" /> Feedback
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setSettings(s => ({ ...s, vibrationEnabled: !s.vibrationEnabled }))}
                      className={cn(
                        "p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all",
                        settings.vibrationEnabled ? "bg-primary/10 border-primary text-primary" : "bg-card border-border"
                      )}
                    >
                      {settings.vibrationEnabled ? <Vibrate className="w-6 h-6" /> : <VibrateOff className="w-6 h-6" />}
                      <span className="text-xs font-bold">{t.vibration}</span>
                    </button>
                    <button
                      onClick={() => setSettings(s => ({ ...s, soundEnabled: !s.soundEnabled }))}
                      className={cn(
                        "p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all",
                        settings.soundEnabled ? "bg-primary/10 border-primary text-primary" : "bg-card border-border"
                      )}
                    >
                      {settings.soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                      <span className="text-xs font-bold">{t.sound}</span>
                    </button>
                  </div>
                </div>

                {/* Reset */}
                <div className="pt-8">
                  <button 
                    onClick={() => setShowResetModal(true)}
                    className="w-full p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive font-bold flex items-center justify-center gap-2 hover:bg-destructive/20 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                    {t.resetAll}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background/80 backdrop-blur-lg border-t border-border/50 p-2 flex items-center justify-around z-20">
        <button 
          onClick={() => setView('counter')}
          className={cn(
            "p-3 rounded-2xl transition-all flex flex-col items-center gap-1",
            view === 'counter' ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"
          )}
        >
          <RotateCcw className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{t.counter}</span>
        </button>
        <button 
          onClick={() => setView('list')}
          className={cn(
            "p-3 rounded-2xl transition-all flex flex-col items-center gap-1",
            view === 'list' ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"
          )}
        >
          <Plus className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{t.tasbiix}</span>
        </button>
        <button 
          onClick={() => setView('adhkar')}
          className={cn(
            "p-3 rounded-2xl transition-all flex flex-col items-center gap-1",
            view === 'adhkar' ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"
          )}
        >
          <Volume2 className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{t.adhkar}</span>
        </button>
        <button 
          onClick={() => setView('stats')}
          className={cn(
            "p-3 rounded-2xl transition-all flex flex-col items-center gap-1",
            view === 'stats' ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"
          )}
        >
          <BarChart3 className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{t.stats}</span>
        </button>
      </nav>

      {/* Modals */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-xs bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto text-destructive">
                  <Trash2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">{t.resetAll}</h3>
                <p className="text-sm text-muted-foreground">{t.confirmReset}</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 py-3 rounded-xl bg-muted font-bold hover:bg-muted/80 transition-colors"
                >
                  {t.cancel}
                </button>
                <button 
                  onClick={() => {
                    fullReset();
                    setShowResetModal(false);
                    setView('counter');
                  }}
                  className="flex-1 py-3 rounded-xl bg-destructive text-destructive-foreground font-bold hover:bg-destructive/90 transition-colors"
                >
                  {t.reset}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-sm bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{t.addCustom}</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 rounded-full hover:bg-muted">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t.name}</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Salawat"
                    className="w-full p-3 rounded-xl bg-muted border-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t.arabicText}</label>
                  <input 
                    type="text" 
                    value={newArabic}
                    onChange={(e) => setNewArabic(e.target.value)}
                    placeholder="اللهم صل على محمد"
                    className="w-full p-3 rounded-xl bg-muted border-none focus:ring-2 focus:ring-primary transition-all text-right arabic-text"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t.goal}</label>
                  <div className="flex gap-2">
                    {[33, 100, 1000].map(g => (
                      <button
                        key={g}
                        onClick={() => setNewGoal(g)}
                        className={cn(
                          "flex-1 py-2 rounded-xl border font-bold transition-all",
                          newGoal === g ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-transparent"
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                disabled={!newName}
                onClick={() => {
                  addCustomTasbiix(newName, newArabic, newGoal);
                  setShowAddModal(false);
                  setNewName('');
                  setNewArabic('');
                }}
                className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {t.save}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
