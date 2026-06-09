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

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b px-4 py-3"
        style={{ background: 'rgba(245,237,214,0.95)', borderColor: 'rgba(74,55,40,0.2)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span style={{
              fontFamily: "'Ma Shan Zheng', serif",
              fontSize: '1.2rem', color: 'var(--vermillion)',
              letterSpacing: '0.15em',
            }}>女妖自述</span>
            <span className="text-xs" style={{ color: 'var(--ash)' }}>·</span>
            <span className="text-xs" style={{ color: 'var(--ash)', letterSpacing: '0.1em' }}>
              志怪三书异类女性生存策略研究
            </span>
          </div>
          <nav className="flex gap-1">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="px-4 py-1.5 text-xs transition-all duration-200"
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
      <div className="paper-bg border-b py-12 px-4 text-center"
        style={{ borderColor: 'rgba(74,55,40,0.15)' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-widest mb-3" style={{ color: 'var(--ash)' }}>
            DIGITAL HUMANITIES · 数字人文研究
          </p>
          <h1 style={{
            fontFamily: "'Ma Shan Zheng', serif",
            fontSize: 'clamp(2rem,6vw,3.2rem)',
            color: 'var(--ink)',
            letterSpacing: '0.2em',
            lineHeight: 1.3,
          }}>
            女妖自述<br />
            <span style={{ fontSize: '0.55em', color: 'var(--ash)' }}>
              志怪三书异类女性生存策略量化研究
            </span>
          </h1>
          <div className="chapter-line mt-6 mb-4" />
          <div className="flex flex-wrap justify-center gap-4 text-xs" style={{ color: 'var(--ash)' }}>
            <span>《聊斋志异》</span>
            <span>·</span>
            <span>《阅微草堂笔记》</span>
            <span>·</span>
            <span>《子不语》</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm font-medium">
            {loading ? (
              <span style={{ color: 'var(--ash)' }}>数据加载中……</span>
            ) : stats ? (
              <>
                <span style={{ color: 'var(--vermillion)' }}>{stats.globalStats.total} 篇有效标注</span>
                <span style={{ color: 'var(--jade)' }}>32 项标注字段</span>
                <span style={{ color: 'var(--gold)' }}>5 种策略类型</span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Content */}
      <main>
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <p style={{ color: 'var(--ash)', letterSpacing: '0.2em' }}>卷宗整理中……</p>
          </div>
        ) : tab === 'overview' ? (
          <Dashboard stats={stats} />
        ) : (
          <DataExplorer entries={entries} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center"
        style={{ borderColor: 'rgba(74,55,40,0.15)' }}>
        <p className="text-xs" style={{ color: 'var(--ash)', letterSpacing: '0.15em' }}>
          本研究基于《聊斋志异》《阅微草堂笔记》《子不语》三书中异类女性叙事的系统性人工标注
        </p>
        <div className="mt-2 flex justify-center">
          <div className="seal w-6 h-12 text-xs">女妖</div>
        </div>
      </footer>
    </div>
  );
}
