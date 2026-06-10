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
    // Load data.json (game stats + paths)
    fetch('/data.json')
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));

    // Load full entry list from all batch JSONs is too heavy for client;
    // instead, load entries.json which we'll generate
    fetch('/entries.json')
      .then(r => r.json())
      .then(d => setEntries(d))
      .catch(() => setEntries([]));
  }, []);

  // Safe fallback for stats parsing
  const totalEntries = stats?.globalStats?.total || 0;
  const avgSubjectivity = stats?.globalStats?.score_avg?.['全部'] || 0;

  return (
    <div className="min-h-screen paper-bg font-sans pb-24 text-ink selection-bg-ink">
      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b px-4 py-3 bg-paper/95 backdrop-blur-sm"
        style={{ borderColor: 'rgba(74,55,40,0.2)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span style={{
              fontFamily: "'Ma Shan Zheng', serif",
              fontSize: '1.2rem', color: 'var(--vermillion)',
              letterSpacing: '0.15em',
            }}>女妖自述</span>
            <span className="text-xs text-ash">·</span>
            <span className="text-xs text-ash tracking-widest">
              志怪三书异类女性生存策略研究
            </span>
          </div>
          <nav className="flex gap-1">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="px-4 py-1.5 text-sm transition-all duration-200"
                style={{
                  borderBottom: `2px solid ${tab === t.key ? 'var(--vermillion)' : 'transparent'}`,
                  color: tab === t.key ? 'var(--vermillion)' : 'var(--ash)',
                  background: 'transparent',
                  fontFamily: "'Noto Serif SC', serif",
                  letterSpacing: '0.1em',
                }}>
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b py-16 px-4 text-center relative overflow-hidden"
        style={{ borderColor: 'rgba(74,55,40,0.15)' }}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-vermillion to-transparent opacity-60"></div>
        <div className="max-w-4xl mx-auto relative z-10 animate-fade-up">
          <p className="text-xs tracking-[0.3em] mb-4 text-ash">VOL. VIII · THE RESEARCH</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 font-serif text-ink" style={{ fontFamily: "'Ma Shan Zheng', serif", letterSpacing: '0.1em' }}>
            异类女性生存策略考
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-ash mb-8 font-serif">
            <span>《聊斋志异》</span>
            <span>·</span>
            <span>《阅微草堂笔记》</span>
            <span>·</span>
            <span>《子不语》</span>
          </div>
          <p className="text-sm md:text-base leading-relaxed text-ink-light max-w-2xl mx-auto tracking-wide">
            基于三书中509篇女妖故事的量化研究。
            揭示在明清礼教绞杀与天威镇压之下，异类女性如何在夹缝中寻求生存空间。
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-medium">
            {loading ? (
              <span className="text-ash animate-pulse">调取卷宗中……</span>
            ) : stats ? (
              <div className="flex gap-8 bg-paper border border-ink/10 px-8 py-4 shadow-sm">
                <div className="text-center"><div className="text-2xl font-serif text-vermillion mb-1">{totalEntries}</div><div className="text-xs text-ash tracking-wider">有效卷宗</div></div>
                <div className="w-px bg-ink/10"></div>
                <div className="text-center"><div className="text-2xl font-serif text-gold mb-1">5</div><div className="text-xs text-ash tracking-wider">策略路径</div></div>
                <div className="w-px bg-ink/10"></div>
                <div className="text-center"><div className="text-2xl font-serif text-jade mb-1">{Number(avgSubjectivity).toFixed(1)}</div><div className="text-xs text-ash tracking-wider">平均主体性</div></div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <p className="text-ash tracking-widest animate-pulse">理平案卷中……</p>
          </div>
        ) : tab === 'overview' ? (
          <Dashboard stats={stats} />
        ) : (
          <DataExplorer entries={entries} />
        )}
      </main>

      {/* 返回按钮 */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => window.location.reload()} 
          className="w-12 h-12 rounded-full border border-ink/20 bg-paper/90 backdrop-blur flex items-center justify-center text-ink hover:border-vermillion hover:text-vermillion transition-all shadow-sm hover:shadow-md"
          title="返回游戏"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </button>
      </div>
    </div>
  );
}
