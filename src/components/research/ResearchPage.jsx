import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import DataExplorer from './DataExplorer';

const TABS = [
  { key: 'overview', label: '研究概览' },
  { key: 'explore',  label: '数据检索' },
];

export default function ResearchPage() {
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));

    fetch('/entries.json')
      .then(r => r.json())
      .then(d => setEntries(d))
      .catch(() => setEntries([]));
  }, []);

  const totalEntries = stats?.globalStats?.total || 0;
  const avgSubjectivity = stats?.globalStats?.score_avg?.['全部'] || 0;

  return (
    <div className="min-h-screen paper-bg font-sans pb-32 text-ink selection-bg-ink relative">
      
      {/* 飘动的极弱鬼火效果，增加灵异氛围 */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#8B1A1A] rounded-full opacity-[0.015] blur-3xl animate-float pointer-events-none"></div>
      <div className="absolute top-3/4 right-20 w-96 h-96 bg-[#2C4A3E] rounded-full opacity-[0.015] blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

      {/* Top nav - 居中设计 */}
      <header className="sticky top-0 z-50 px-4 py-4 glass-panel border-b-0 border-t-0 border-r-0 border-l-0 shadow-sm"
        style={{ borderBottom: '1px solid rgba(74,55,40,0.1)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 animate-ink-fade">
            <span style={{
              fontFamily: "'Ma Shan Zheng', serif",
              fontSize: '1.4rem', color: 'var(--vermillion)',
              letterSpacing: '0.15em',
            }}>女妖自述</span>
            <span className="text-xs text-ash">·</span>
            <span className="text-xs text-ash tracking-widest-plus">
              志怪三书异类女性生存策略考
            </span>
          </div>
          
          {/* 居中 Tabs */}
          <nav className="flex gap-8 bg-ink/5 px-6 py-1.5 rounded-full border border-ink/10 animate-fade-up">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`text-sm transition-all duration-300 tracking-widest-plus relative py-1 ${tab === t.key ? 'text-vermillion font-bold' : 'text-ash hover:text-ink'}`}
                style={{ fontFamily: "'Noto Serif SC', serif" }}>
                {t.label}
                {tab === t.key && (
                  <span className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-vermillion rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          {/* 占位符以保持 flex-between 的完美居中，在桌面端显示 */}
          <div className="hidden md:block w-[200px]"></div>
        </div>
      </header>

      {/* Hero */}
      <div className="py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-vermillion/40 to-transparent"></div>
        <div className="max-w-4xl mx-auto relative z-10 animate-fade-up">
          <p className="text-xs tracking-[0.4em] mb-6 text-ash/80">VOL. VIII · THE RESEARCH</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 font-serif text-ink tracking-widest drop-shadow-sm" style={{ fontFamily: "'Ma Shan Zheng', serif" }}>
            异类女性生存策略考
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-ash mb-10 font-serif tracking-widest">
            <span>《聊斋志异》</span>
            <span className="text-vermillion/50">✦</span>
            <span>《阅微草堂笔记》</span>
            <span className="text-vermillion/50">✦</span>
            <span>《子不语》</span>
          </div>
          <p className="text-sm md:text-base leading-loose text-ink-light max-w-2xl mx-auto tracking-widest-plus text-justify px-4">
            基于三书中509篇女妖故事的量化研究。
            揭示在明清礼教绞杀与天威镇压之下，异类女性如何在夹缝中寻求生存空间。
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm font-medium animate-ink-fade delay-300">
            {loading ? (
              <span className="text-ash tracking-widest-plus animate-pulse">调取卷宗中……</span>
            ) : stats ? (
              <div className="flex gap-8 glass-panel px-10 py-6 rounded-sm">
                <div className="text-center">
                  <div className="text-3xl font-serif text-vermillion mb-2 tracking-wider drop-shadow-sm">{totalEntries}</div>
                  <div className="text-xs text-ash tracking-widest-plus">有效卷宗</div>
                </div>
                <div className="w-px bg-ink/10 my-2"></div>
                <div className="text-center">
                  <div className="text-3xl font-serif text-gold mb-2 tracking-wider drop-shadow-sm">5</div>
                  <div className="text-xs text-ash tracking-widest-plus">策略路径</div>
                </div>
                <div className="w-px bg-ink/10 my-2"></div>
                <div className="text-center">
                  <div className="text-3xl font-serif text-jade mb-2 tracking-wider drop-shadow-sm">{Number(avgSubjectivity).toFixed(1)}</div>
                  <div className="text-xs text-ash tracking-widest-plus">平均主体性</div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <p className="text-ash tracking-widest-plus animate-pulse">理平案卷中……</p>
          </div>
        ) : tab === 'overview' ? (
          <Dashboard stats={stats} />
        ) : (
          <DataExplorer entries={entries} />
        )}
      </main>

      {/* 底部重新开始按钮 */}
      <div className="mt-24 mb-12 flex justify-center animate-fade-up delay-500">
        <button 
          onClick={() => window.location.reload()}
          className="group relative flex flex-col items-center justify-center gap-3 px-12 py-6 glass-panel hover-glow border border-vermillion/20 overflow-hidden cursor-pointer"
        >
          {/* 按钮光晕 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vermillion/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="w-10 h-10 rounded-full border border-vermillion/30 flex items-center justify-center text-vermillion group-hover:bg-vermillion group-hover:text-paper transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <span className="font-serif text-ink tracking-widest-plus text-sm group-hover:text-vermillion transition-colors duration-300">
            再次入局
          </span>
          <span className="text-xs text-ash tracking-widest">
            重演异类图卷
          </span>
        </button>
      </div>

    </div>
  );
}
