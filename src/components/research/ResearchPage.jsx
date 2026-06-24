import { useState, useEffect, useCallback } from 'react';
import Dashboard from './Dashboard';
import DataExplorer from './DataExplorer';
import YourPathSection from './YourPathSection';
import EntryDetailPage from './EntryDetailPage';
import GameSceneLayout from '../layout/GameSceneLayout';
import {
  entryRouteHash,
  findEntryByRoute,
  parseEntryRouteHash,
} from '../../lib/researchUtils';

const TABS = [
  { key: 'overview', label: '典藏概览' },
  { key: 'explore', label: '卷宗检阅' },
];

function buildExplorerFilters(gameContext) {
  if (!gameContext?.typeKey) return null;
  return {
    type: gameContext.typeKey,
    strat: gameContext.finalStratKey === '避世' ? '全部' : gameContext.finalStratKey,
    transfer: gameContext.finalStratKey === '避世' ? '全部' : (gameContext.transferred ? '是' : '否'),
    seal: '全部',
    corpus: '全部',
  };
}

export default function ResearchPage({ gameContext }) {
  const fromGame = Boolean(gameContext?.typeKey && gameContext?.finalStratKey);
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [entries, setEntries] = useState([]);
  const [texts, setTexts] = useState({});
  const [wenyanTexts, setWenyanTexts] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [explorerFilters, setExplorerFilters] = useState(() => buildExplorerFilters(gameContext));

  useEffect(() => {
    Promise.all([
      fetch('/data.json').then(r => r.json()),
      fetch('/entries.json').then(r => r.json()),
      fetch('/texts.json').then(r => r.json()).catch(() => ({})),
      fetch('/texts_wenyan.json').then(r => r.json()).catch(() => ({})),
    ])
      .then(([data, list, textMap, wenyanMap]) => {
        setStats(data);
        setEntries(list);
        setTexts(textMap || {});
        setWenyanTexts(wenyanMap || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const syncEntryFromHash = useCallback(() => {
    const route = parseEntryRouteHash(window.location.hash);
    if (!route || !entries.length) {
      setSelectedEntry(null);
      return;
    }
    const entry = findEntryByRoute(entries, route.corpus, route.seq);
    setSelectedEntry(entry);
    if (entry) setTab('explore');
  }, [entries]);

  useEffect(() => {
    if (loading) return;
    syncEntryFromHash();
    window.addEventListener('hashchange', syncEntryFromHash);
    return () => window.removeEventListener('hashchange', syncEntryFromHash);
  }, [loading, syncEntryFromHash]);

  const openEntry = useCallback((entry) => {
    if (!entry) return;
    setSelectedEntry(entry);
    setTab('explore');
    const hash = entryRouteHash(entry);
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const closeEntry = useCallback(() => {
    setSelectedEntry(null);
    if (window.location.hash.startsWith('#/entry/')) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const totalEntries = stats?.globalStats?.total || 0;
  const avgSubjectivity = stats?.globalStats?.score_avg?.['全部'] || 0;

  function handleExploreSimilar() {
    setExplorerFilters(buildExplorerFilters(gameContext));
    setTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!loading && selectedEntry) {
    return (
      <EntryDetailPage
        entry={selectedEntry}
        texts={texts}
        wenyanTexts={wenyanTexts}
        onBack={closeEntry}
      />
    );
  }

  return (
    <GameSceneLayout faded wide center={false}>
      <div className="research-page-inner">
        <div className="research-subnav px-4 py-3 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-ink tracking-widest" style={{ fontFamily: "'Ma Shan Zheng', serif" }}>
                异类女性生存策略考
              </p>
              <p className="text-xs text-ash tracking-widest mt-0.5">509 例 · 聊斋 · 阅微 · 子不语</p>
            </div>
            <nav className="flex justify-center gap-6">
              {TABS.map(t => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`text-sm transition-all duration-300 tracking-widest relative py-1 ${
                    tab === t.key ? 'text-ink font-bold' : 'text-ash hover:text-ink/80'
                  }`}
                >
                  {t.label}
                  {tab === t.key && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold rounded-full" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {!fromGame && (
          <section className="research-hero px-4 pb-8 text-center">
            <p className="text-sm text-ink-light tracking-widest leading-relaxed max-w-xl mx-auto">
              基于志怪三书的量化展陈，揭示在礼教与天威之间，异类女性如何在夹缝中寻求生存空间。
            </p>

            {!loading && stats && (
              <div className="palace-border game-scene-inset p-6 md:p-8 w-full max-w-lg mx-auto mt-6">
                <div className="flex justify-center items-center gap-8 md:gap-12">
                  <div className="text-center">
                    <div className="text-3xl font-serif text-ink mb-1 tracking-wider">{totalEntries}</div>
                    <div className="text-xs text-ash tracking-widest">馆藏卷宗</div>
                  </div>
                  <div className="w-px h-10 bg-gold/30" />
                  <div className="text-center">
                    <div className="text-3xl font-serif text-ink mb-1 tracking-wider">5</div>
                    <div className="text-xs text-ash tracking-widest">策略类型</div>
                  </div>
                  <div className="w-px h-10 bg-gold/30" />
                  <div className="text-center">
                    <div className="text-3xl font-serif text-ink mb-1 tracking-wider">{Number(avgSubjectivity).toFixed(1)}</div>
                    <div className="text-xs text-ash tracking-widest">平均主体性</div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        <main className="flex flex-col items-center pb-16">
          {loading ? (
            <div className="flex justify-center items-center py-32 w-full">
              <p className="text-ash tracking-widest animate-pulse">理平案卷中……</p>
            </div>
          ) : (
            <>
              {fromGame && (
                <div className="w-full mb-8">
                  <YourPathSection
                    gameContext={gameContext}
                    stats={stats}
                    entries={entries}
                    onExploreSimilar={handleExploreSimilar}
                    onOpenEntry={openEntry}
                  />
                </div>
              )}

              {fromGame && tab === 'overview' && (
                <p className="text-xs text-ash tracking-widest mb-6 text-center w-full">↓ 以下为 509 例全库统计 ↓</p>
              )}

              {tab === 'overview' ? (
                <div className="game-scene-panel w-full">
                  <Dashboard stats={stats} />
                </div>
              ) : (
                <div className="game-scene-panel w-full">
                  <DataExplorer
                    entries={entries}
                    initialFilters={explorerFilters}
                    onOpenEntry={openEntry}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </GameSceneLayout>
  );
}
