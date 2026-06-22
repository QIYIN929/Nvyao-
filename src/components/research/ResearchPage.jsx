import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import DataExplorer from './DataExplorer';

const TABS = [
  { key: 'overview', label: '典藏概览' },
  { key: 'explore', label: '卷宗检阅' },
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
    <div className="research-page min-h-screen paper-bg text-ink pb-32">
      <header className="research-header sticky top-0 z-50 px-4 py-4 border-b border-gold/30 bg-paper/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-1 text-center animate-ink-fade">
            <span
              className="text-xl text-ink tracking-widest"
              style={{ fontFamily: "'Ma Shan Zheng', serif" }}
            >
              女妖自述
            </span>
            <span className="text-xs text-ash tracking-widest-plus">
              数字志怪博物院 · 数据分析
            </span>
          </div>

          <nav className="flex justify-center gap-8 animate-fade-up">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`text-sm transition-all duration-300 tracking-widest-plus relative py-1 ${
                  tab === t.key ? 'text-ink font-bold' : 'text-ash hover:text-ink/80'
                }`}
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                {t.label}
                {tab === t.key && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gold rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="research-hero px-4 pt-16 pb-12">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8 animate-fade-up">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            <h1
              className="text-3xl md:text-4xl text-ink tracking-widest"
              style={{ fontFamily: "'Ma Shan Zheng', serif" }}
            >
              异类女性生存策略考
            </h1>
            <p className="text-sm text-ink-light tracking-widest-plus leading-relaxed max-w-xl">
              基于《聊斋志异》《阅微草堂笔记》《子不语》的量化展陈，揭示在明清礼教绞杀与天威镇压之下，异类女性如何在夹缝中寻求生存空间。
            </p>
          </div>

          {!loading && stats && (
            <div className="palace-border bg-paper-dark/30 p-6 md:p-8 w-full max-w-lg">
              <div className="flex justify-center items-center gap-8 md:gap-12">
                <div className="text-center">
                  <div className="text-3xl font-serif text-ink mb-1 tracking-wider">{totalEntries}</div>
                  <div className="text-xs text-ash tracking-widest-plus">馆藏卷宗</div>
                </div>
                <div className="w-px h-10 bg-gold/30" />
                <div className="text-center">
                  <div className="text-3xl font-serif text-ink mb-1 tracking-wider">5</div>
                  <div className="text-xs text-ash tracking-widest-plus">策略展区</div>
                </div>
                <div className="w-px h-10 bg-gold/30" />
                <div className="text-center">
                  <div className="text-3xl font-serif text-ink mb-1 tracking-wider">
                    {Number(avgSubjectivity).toFixed(1)}
                  </div>
                  <div className="text-xs text-ash tracking-widest-plus">平均主体性</div>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <p className="text-ash tracking-widest-plus animate-pulse">开启地宫库房中……</p>
          )}
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col items-center">
        {loading ? (
          <div className="flex justify-center items-center py-32 w-full">
            <p className="text-ash tracking-widest-plus animate-pulse">理平案卷中……</p>
          </div>
        ) : tab === 'overview' ? (
          <div className="bg-paper shadow-lg rounded-sm p-4 md:p-8 palace-border w-full">
            <Dashboard stats={stats} />
          </div>
        ) : (
          <div className="bg-paper shadow-lg rounded-sm p-4 md:p-8 palace-border w-full">
            <DataExplorer entries={entries} />
          </div>
        )}
      </main>

      <div className="mt-20 mb-12 flex justify-center animate-fade-up">
        <button
          onClick={() => window.location.reload()}
          className="group flex flex-col items-center gap-3 px-12 py-7 palace-border bg-paper-dark/20 hover:bg-paper-dark/40 transition-colors cursor-pointer hover-glow"
        >
          <div className="w-11 h-11 rounded-full border border-gold/50 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-ink transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          </div>
          <span className="font-serif text-ink tracking-widest-plus text-sm">再次入局</span>
          <span className="text-xs text-ash tracking-widest">重演异类图卷</span>
        </button>
      </div>
    </div>
  );
}
