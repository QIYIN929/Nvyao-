import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import DataExplorer from './DataExplorer';

const TABS = [
  { key: 'overview', label: '典藏概览' },
  { key: 'explore',  label: '卷宗检阅' },
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
    <div className="min-h-screen paper-bg font-sans pb-32 text-ink selection-bg-ink relative overflow-hidden">
      
      {/* 博物院级背景：顶部红墙遮罩 */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none z-0" 
           style={{ background: 'linear-gradient(to bottom, rgba(140, 15, 22, 0.95), rgba(140, 15, 22, 0.7) 60%, transparent)' }}>
      </div>

      {/* Top nav - 居中琉璃金设计 */}
      <header className="sticky top-0 z-50 px-4 py-4 backdrop-blur-md border-b"
        style={{ borderBottomColor: 'rgba(194, 156, 87, 0.3)', backgroundColor: 'rgba(140, 15, 22, 0.85)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 animate-ink-fade">
            <span style={{
              fontFamily: "'Ma Shan Zheng', serif",
              fontSize: '1.4rem', color: 'var(--gold)',
              letterSpacing: '0.15em',
            }}>女妖自述</span>
            <span className="text-xs text-gold/50">·</span>
            <span className="text-xs text-paper/80 tracking-widest-plus">
              数字志怪博物院
            </span>
          </div>
          
          {/* 居中 Tabs */}
          <nav className="flex gap-8 px-6 py-1.5 animate-fade-up">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`text-sm transition-all duration-300 tracking-widest-plus relative py-1 ${tab === t.key ? 'text-gold font-bold' : 'text-paper/60 hover:text-gold/80'}`}
                style={{ fontFamily: "'Noto Serif SC', serif" }}>
                {t.label}
                {tab === t.key && (
                  <span className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-gold rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          {/* 占位符以保持 flex-between 的完美居中，在桌面端显示 */}
          <div className="hidden md:block w-[200px]"></div>
        </div>
      </header>

      {/* 博物院级首屏 Hero：红墙与竖排卷轴 */}
      <div className="pt-24 pb-16 px-4 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 animate-fade-up">
          
          {/* 左侧：竖排主视觉 */}
          <div className="flex gap-6 items-start h-64">
            <div className="w-[2px] h-full" style={{ background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)' }}></div>
            <h1 className="vertical-text text-5xl md:text-6xl text-gold drop-shadow-md" style={{ fontFamily: "'Ma Shan Zheng', serif" }}>
              异类女性生存策略考
            </h1>
            <div className="vertical-text text-sm text-paper/80 tracking-widest-plus leading-relaxed mt-4">
              基于《聊斋志异》《阅微草堂笔记》《子不语》的量化展陈
            </div>
          </div>

          {/* 右侧：琉璃金框线展板 */}
          <div className="palace-border bg-paper/10 backdrop-blur-sm p-8 md:p-12 max-w-md">
            <p className="text-sm md:text-base leading-loose text-paper/90 tracking-widest-plus text-justify mb-10">
              揭示在明清礼教绞杀与天威镇压之下，异类女性如何在夹缝中寻求生存空间。
            </p>
            
            <div className="flex flex-col gap-6 text-sm font-medium">
              {loading ? (
                <span className="text-gold tracking-widest-plus animate-pulse text-center">开启地宫库房中……</span>
              ) : stats ? (
                <div className="flex justify-between items-center border-t border-gold/30 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-serif text-paper mb-2 tracking-wider drop-shadow-sm">{totalEntries}</div>
                    <div className="text-xs text-gold tracking-widest-plus">馆藏卷宗</div>
                  </div>
                  <div className="w-px h-10 bg-gold/30"></div>
                  <div className="text-center">
                    <div className="text-3xl font-serif text-paper mb-2 tracking-wider drop-shadow-sm">5</div>
                    <div className="text-xs text-gold tracking-widest-plus">策略展区</div>
                  </div>
                  <div className="w-px h-10 bg-gold/30"></div>
                  <div className="text-center">
                    <div className="text-3xl font-serif text-paper mb-2 tracking-wider drop-shadow-sm">{Number(avgSubjectivity).toFixed(1)}</div>
                    <div className="text-xs text-gold tracking-widest-plus">平均主体性</div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <p className="text-gold tracking-widest-plus animate-pulse">理平案卷中……</p>
          </div>
        ) : tab === 'overview' ? (
          <div className="bg-paper shadow-2xl rounded-sm p-4 md:p-8 palace-border">
            <Dashboard stats={stats} />
          </div>
        ) : (
          <div className="bg-paper shadow-2xl rounded-sm p-4 md:p-8 palace-border">
            <DataExplorer entries={entries} />
          </div>
        )}
      </main>

      {/* 底部重新开始按钮 */}
      <div className="mt-24 mb-12 flex justify-center animate-fade-up delay-500 relative z-10">
        <button 
          onClick={() => window.location.reload()}
          className="group relative flex flex-col items-center justify-center gap-3 px-16 py-8 palace-border bg-vermillion/5 hover:bg-vermillion/10 overflow-hidden cursor-pointer hover-glow"
        >
          {/* 按钮光晕 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-vermillion transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
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
