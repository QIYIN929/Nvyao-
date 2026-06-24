import { useState, useMemo, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import EntryCard from './EntryCard';
import { entryInSealTier } from '../../lib/researchUtils';

const CORPUS_COLOR = {
  '聊斋志异': '#8B1A1A',
  '阅微草堂笔记': '#2C4A3E',
  '子不语': '#A07820',
};

const STRAT_COLORS = {
  博弈型: '#A07820', 情感型: '#8B1A1A', 顺从型: '#6B5B4E',
  抗争型: '#2C4A3E', 非自主: '#7C8FA0',
};

const SEAL_OPTIONS = ['全部', '灰烬', '银辉', '金焰', '朱砂'];
const TRANSFER_OPTIONS = ['全部', '是', '否'];

const DEFAULT_FILTERS = {
  corpus: '全部',
  strat: '全部',
  type: '全部',
  seal: '全部',
  transfer: '全部',
};

export default function DataExplorer({ entries, initialFilters, onOpenEntry }) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(initialFilters || DEFAULT_FILTERS);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 12;

  useEffect(() => {
    if (initialFilters) {
      setFilters({ ...DEFAULT_FILTERS, ...initialFilters });
      setQuery('');
      setPage(0);
    }
  }, [initialFilters]);

  const filtered = useMemo(() => {
    return (entries || []).filter(e => {
      if (filters.corpus !== '全部' && e['语料库'] !== filters.corpus) return false;
      if (filters.strat !== '全部' && e['_策略简称'] !== filters.strat) return false;
      if (filters.type !== '全部' && !String(e['_异类简称']).startsWith(filters.type)) return false;
      if (filters.transfer !== '全部' && e['策略转换'] !== filters.transfer) return false;
      if (!entryInSealTier(e, filters.seal)) return false;
      if (query) {
        const q = query.toLowerCase();
        const text = `${e['篇名']}${e['异类类型']}${e['初始处境']}${e['核心困境']}${e['备注']}${e['理论标签']}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [entries, query, filters]);

  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  function resetFilters() {
    setQuery('');
    setFilters(DEFAULT_FILTERS);
    setPage(0);
  }

  function setFilter(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(0);
  }

  const FilterBtn = ({ value, current, onSelect, children, color }) => (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className="text-xs px-4 py-1.5 border transition-all duration-150"
      style={{
        borderColor: current === value ? (color || 'var(--gold)') : 'rgba(74,55,40,0.2)',
        background: current === value ? `${color || '#C29C57'}10` : 'transparent',
        color: current === value ? (color || 'var(--ink)') : 'var(--ash)',
        letterSpacing: '0.06em',
      }}
    >{children}</button>
  );

  const hasActiveGameFilters = initialFilters && (
    filters.type !== '全部' || filters.strat !== '全部' || filters.transfer !== '全部'
  );

  return (
    <div className="animate-fade-up flex flex-col items-center w-full">
      <div className="flex flex-col items-center justify-center gap-3 mb-10 mt-4 w-full max-w-sm">
        <div className="flex items-center gap-4 w-full">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
          <h2 className="text-2xl font-serif text-ink tracking-widest-plus text-center" style={{ fontFamily: "'Ma Shan Zheng', serif" }}>
            原典案卷检索
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
        </div>
        <div className="w-12 h-[2px] bg-gold/40" />
      </div>

      {hasActiveGameFilters && (
        <p className="text-xs text-gold tracking-widest mb-6 text-center">
          已按你的游戏路径预填筛选条件，可继续调整或重置。
        </p>
      )}

      <div className="palace-border bg-paper-dark/20 p-8 shadow-sm mb-12 space-y-6 flex flex-col items-center w-full max-w-4xl">
        <div className="relative w-full max-w-2xl mb-2">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(0); }}
            placeholder="搜索篇名、处境、困境或学者按语……"
            className="w-full pl-12 pr-10 py-3 border border-gold/40 text-sm focus:outline-none focus:border-gold placeholder-ash/50 bg-paper transition-colors shadow-inner text-center"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-ash hover:text-ink">
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 w-full">
          <span className="text-sm font-serif text-gold tracking-widest w-12 text-center shrink-0">古籍</span>
          <div className="flex flex-wrap justify-center gap-3">
            {['全部', '聊斋志异', '阅微草堂笔记', '子不语'].map(v => (
              <FilterBtn key={v} value={v} current={filters.corpus} onSelect={v => setFilter('corpus', v)} color={CORPUS_COLOR[v]}>{v}</FilterBtn>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 w-full">
          <span className="text-sm font-serif text-gold tracking-widest w-12 text-center shrink-0">策略</span>
          <div className="flex flex-wrap justify-center gap-3">
            {['全部', '博弈型', '情感型', '顺从型', '抗争型', '非自主'].map(v => (
              <FilterBtn key={v} value={v} current={filters.strat} onSelect={v => setFilter('strat', v)} color={STRAT_COLORS[v]}>{v}</FilterBtn>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 w-full">
          <span className="text-sm font-serif text-gold tracking-widest w-12 text-center shrink-0">本相</span>
          <div className="flex flex-wrap justify-center gap-3">
            {['全部', '狐', '鬼', '精', '仙'].map(v => (
              <FilterBtn key={v} value={v} current={filters.type} onSelect={v => setFilter('type', v)}>{v}</FilterBtn>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 w-full">
          <span className="text-sm font-serif text-gold tracking-widest w-12 text-center shrink-0">印记</span>
          <div className="flex flex-wrap justify-center gap-3">
            {SEAL_OPTIONS.map(v => (
              <FilterBtn key={v} value={v} current={filters.seal} onSelect={v => setFilter('seal', v)}>{v}</FilterBtn>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 w-full">
          <span className="text-sm font-serif text-gold tracking-widest w-12 text-center shrink-0">转换</span>
          <div className="flex flex-wrap justify-center gap-3">
            {TRANSFER_OPTIONS.map(v => (
              <FilterBtn key={v} value={v} current={filters.transfer} onSelect={v => setFilter('transfer', v)}>{v === '全部' ? '全部' : `转换·${v}`}</FilterBtn>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 mt-4 border-t border-gold/20 w-full max-w-2xl">
          <span className="text-xs text-ash tracking-widest">
            寻得 <strong className="text-ink text-base mx-1 font-serif">{filtered.length}</strong> 卷符合条件的记录
          </span>
          <button type="button" onClick={resetFilters} className="text-xs text-gold hover:text-ink underline underline-offset-4 tracking-widest transition-colors">
            重置所有条件
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
        {paginated.map(entry => (
          <div key={`${entry['语料库']}-${entry['序号']}`} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm">
            <EntryCard entry={entry} onOpen={onOpenEntry} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 border border-gold/20 bg-paper-dark/10 mt-8 palace-border w-full max-w-4xl">
          <p className="text-gold tracking-widest-plus">茫茫书海，未寻得相符卷宗。</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-8 mt-16 w-full">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
            className="px-6 py-2 border border-gold/40 text-sm text-ink hover:bg-gold/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-serif tracking-widest"
          >
            上一卷
          </button>
          <span className="text-sm font-serif text-gold tracking-widest-plus">
            第 {page + 1} / {totalPages} 卷
          </span>
          <button
            type="button"
            disabled={page === totalPages - 1}
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-2 border border-gold/40 text-sm text-ink hover:bg-gold/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-serif tracking-widest"
          >
            下一卷
          </button>
        </div>
      )}
    </div>
  );
}
