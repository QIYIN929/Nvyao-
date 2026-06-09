import { useState, useMemo } from 'react';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';

const CORPUS_COLOR = {
  '聊斋志异': '#8B1A1A',
  '阅微草堂笔记': '#2C4A3E',
  '子不语': '#A07820',
};

const STRAT_COLORS = {
  博弈型: '#A07820', 情感型: '#8B1A1A', 顺从型: '#6B5B4E',
  抗争型: '#2C4A3E', 非自主: '#7C8FA0',
};

function ScoreDots({ score }) {
  const s = Math.max(0, Math.min(9, parseInt(score) || 0));
  const color = s <= 2 ? '#6B5B4E' : s <= 5 ? '#7C8FA0' : '#A07820';
  return (
    <span className="inline-flex gap-0.5 items-center">
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} style={{
          display: 'inline-block', width: '7px', height: '7px',
          borderRadius: '1px',
          background: i < s ? color : 'rgba(74,55,40,0.15)',
        }} />
      ))}
      <span className="ml-1 text-xs" style={{ color }}>{s}</span>
    </span>
  );
}

function EntryCard({ entry, expanded, onToggle }) {
  const corpusColor = CORPUS_COLOR[entry['语料库']] || '#6B5B4E';
  const stratKey = entry['_策略简称'] || '';
  const stratColor = STRAT_COLORS[stratKey] || '#6B5B4E';

  return (
    <div className="border mb-2 transition-all duration-200"
      style={{ borderColor: expanded ? corpusColor : 'rgba(74,55,40,0.18)', background: 'rgba(245,237,214,0.55)' }}>
      {/* Header row */}
      <button
        className="w-full text-left px-4 py-3 flex items-center gap-3"
        onClick={onToggle}
      >
        <span className="text-xs px-2 py-0.5 rounded-full shrink-0"
          style={{ background: `${corpusColor}18`, color: corpusColor, letterSpacing: '0.05em' }}>
          {entry['语料库']}
        </span>
        <span className="text-xs" style={{ color: 'var(--ash)', minWidth: '28px' }}>
          #{entry['序号']}
        </span>
        <span className="font-medium text-sm flex-1 text-left" style={{ color: 'var(--ink)', letterSpacing: '0.06em' }}>
          {String(entry['篇名'] || '').replace(/子不语卷[^ ]*-/,'').replace(/聊斋志异-/,'').replace(/阅微草堂笔记-/,'')}
        </span>
        <span className="text-xs px-2 py-0.5 shrink-0"
          style={{ background: `${stratColor}18`, color: stratColor }}>
          {stratKey}
        </span>
        <ScoreDots score={entry['_主体性']} />
        <span className="shrink-0 ml-1" style={{ color: 'var(--ash)' }}>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 border-t text-xs" style={{ borderColor: 'rgba(74,55,40,0.12)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--ash)', letterSpacing: '0.1em' }}>异类类型</p>
              <p style={{ color: 'var(--ink-light)', lineHeight: 1.7 }}>{entry['异类类型'] || '—'}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--ash)', letterSpacing: '0.1em' }}>初始处境</p>
              <p style={{ color: 'var(--ink-light)', lineHeight: 1.7 }}>{entry['初始处境'] || '—'}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--ash)', letterSpacing: '0.1em' }}>核心困境</p>
              <p style={{ color: 'var(--ink-light)', lineHeight: 1.7 }}>{entry['核心困境'] || '—'}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--ash)', letterSpacing: '0.1em' }}>最终结局</p>
              <p style={{ color: 'var(--ink-light)', lineHeight: 1.7 }}>{entry['最终结局_大类'] || '—'}</p>
            </div>
            {entry['主要手段'] && (
              <div className="sm:col-span-2">
                <p className="text-xs mb-1" style={{ color: 'var(--ash)', letterSpacing: '0.1em' }}>主要手段</p>
                <p style={{ color: 'var(--ink-light)', lineHeight: 1.7 }}>{entry['主要手段']}</p>
              </div>
            )}
            {entry['备注'] && !entry['备注'].includes('【分类存疑】') && (
              <div className="sm:col-span-2">
                <p className="text-xs mb-1" style={{ color: 'var(--ash)', letterSpacing: '0.1em' }}>研究按语</p>
                <p style={{ color: 'var(--ink-light)', lineHeight: 1.8 }}>{entry['备注']}</p>
              </div>
            )}
          </div>
          <div className="mt-3 flex gap-2 flex-wrap">
            {entry['策略转换'] === '是' && (
              <span className="px-2 py-0.5 text-xs" style={{ background: 'rgba(139,26,26,0.1)', color: 'var(--vermillion)' }}>
                策略转换
              </span>
            )}
            {entry['策略自反性'] === '是' && (
              <span className="px-2 py-0.5 text-xs" style={{ background: 'rgba(160,120,32,0.1)', color: 'var(--gold)' }}>
                策略自反
              </span>
            )}
            {entry['是否付出重大代价'] === '是' && (
              <span className="px-2 py-0.5 text-xs" style={{ background: 'rgba(44,74,62,0.1)', color: 'var(--jade)' }}>
                重大代价
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DataExplorer({ entries }) {
  const [query, setQuery] = useState('');
  const [filterCorpus, setFilterCorpus] = useState('全部');
  const [filterStrat, setFilterStrat] = useState('全部');
  const [filterType, setFilterType] = useState('全部');
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 20;

  const filtered = useMemo(() => {
    return (entries || []).filter(e => {
      if (filterCorpus !== '全部' && e['语料库'] !== filterCorpus) return false;
      if (filterStrat !== '全部' && e['_策略简称'] !== filterStrat) return false;
      if (filterType !== '全部' && !String(e['_异类简称']).startsWith(filterType)) return false;
      if (query) {
        const q = query.toLowerCase();
        const text = `${e['篇名']}${e['异类类型']}${e['备注']}${e['理论标签']}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [entries, query, filterCorpus, filterStrat, filterType]);

  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  function resetFilters() {
    setQuery(''); setFilterCorpus('全部');
    setFilterStrat('全部'); setFilterType('全部'); setPage(0);
  }

  const FilterBtn = ({ value, current, setter, children, color }) => (
    <button
      onClick={() => { setter(value); setPage(0); }}
      className="text-xs px-3 py-1 border transition-all duration-150"
      style={{
        borderColor: current === value ? (color || 'var(--vermillion)') : 'rgba(74,55,40,0.2)',
        background: current === value ? `${color || '#8B1A1A'}18` : 'transparent',
        color: current === value ? (color || 'var(--vermillion)') : 'var(--ash)',
        letterSpacing: '0.06em',
      }}
    >{children}</button>
  );

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <div className="chapter-line mb-6">
        <h3 style={{ fontFamily: "'Noto Serif SC', serif", fontSize: '1rem',
          letterSpacing: '0.2em', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
          七、数据检索
        </h3>
      </div>

      {/* Search + filters */}
      <div className="mb-4">
        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--ash)' }} />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(0); }}
            placeholder="搜索篇名、类型、理论标签……"
            className="w-full pl-8 pr-8 py-2 border text-sm outline-none"
            style={{
              borderColor: 'rgba(74,55,40,0.25)', background: 'rgba(245,237,214,0.7)',
              color: 'var(--ink)', fontFamily: "'Noto Serif SC',serif",
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--ash)' }}>
              <X size={13} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="text-xs self-center" style={{ color: 'var(--ash)' }}>语料库：</span>
          {['全部','聊斋志异','阅微草堂笔记','子不语'].map(v => (
            <FilterBtn key={v} value={v} current={filterCorpus} setter={setFilterCorpus}
              color={CORPUS_COLOR[v]}>{v}</FilterBtn>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="text-xs self-center" style={{ color: 'var(--ash)' }}>策略：</span>
          {['全部','博弈型','情感型','顺从型','抗争型','非自主'].map(v => (
            <FilterBtn key={v} value={v} current={filterStrat} setter={setFilterStrat}
              color={STRAT_COLORS[v]}>{v}</FilterBtn>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs self-center" style={{ color: 'var(--ash)' }}>类型：</span>
          {['全部','狐','鬼','精','仙'].map(v => (
            <FilterBtn key={v} value={v} current={filterType} setter={setFilterType}>{v}</FilterBtn>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs" style={{ color: 'var(--ash)' }}>
          <span>共 <strong style={{ color: 'var(--ink)' }}>{filtered.length}</strong> 条结果</span>
          <button onClick={resetFilters} className="underline" style={{ color: 'var(--ash)' }}>重置筛选</button>
        </div>
      </div>

      {/* Entry list */}
      <div>
        {paginated.map(entry => {
          const id = `${entry['语料库']}-${entry['序号']}`;
          return (
            <EntryCard
              key={id}
              entry={entry}
              expanded={expandedId === id}
              onToggle={() => setExpandedId(expandedId === id ? null : id)}
            />
          );
        })}
        {filtered.length === 0 && (
          <p className="text-center py-12 text-sm" style={{ color: 'var(--ash)' }}>
            未找到符合条件的条目
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button onClick={() => setPage(p => Math.max(0, p-1))} disabled={page===0}
            className="px-3 py-1 border text-xs disabled:opacity-30"
            style={{ borderColor: 'rgba(74,55,40,0.25)', color: 'var(--ash)' }}>上页</button>
          <span className="px-3 py-1 text-xs" style={{ color: 'var(--ash)' }}>
            {page+1} / {totalPages}
          </span>
          <button onClick={() => setPage(p => Math.min(totalPages-1, p+1))} disabled={page===totalPages-1}
            className="px-3 py-1 border text-xs disabled:opacity-30"
            style={{ borderColor: 'rgba(74,55,40,0.25)', color: 'var(--ash)' }}>下页</button>
        </div>
      )}
    </div>
  );
}
