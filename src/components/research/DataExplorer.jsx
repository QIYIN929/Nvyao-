import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';

const CORPUS_COLOR = {
  '聊斋志异': '#8B1A1A',
  '阅微草堂笔记': '#2C4A3E',
  '子不语': '#A07820',
};

const STRAT_COLORS = {
  博弈型: '#A07820', 情感型: '#8B1A1A', 顺从型: '#6B5B4E',
  抗争型: '#2C4A3E', 非自主: '#7C8FA0',
};

function getSealByScore(score) {
  const s = Math.max(0, Math.min(9, parseInt(score) || 0));
  if (s <= 2) return { color: '#6B5B4E', name: '灰烬' };
  if (s <= 5) return { color: '#7C8FA0', name: '银辉' };
  if (s <= 7) return { color: '#A07820', name: '金焰' };
  return { color: '#8B1A1A', name: '朱砂' };
}

function EntryCard({ entry }) {
  const corpusColor = CORPUS_COLOR[entry['语料库']] || '#6B5B4E';
  const stratKey = entry['_策略简称'] || '';
  const score = entry['_主体性'] || 0;
  const seal = getSealByScore(score);
  const title = String(entry['篇名'] || '').replace(/子不语卷[^ ]*-/,'').replace(/聊斋志异-/,'').replace(/阅微草堂笔记-/,'');
  const hasTrans = entry['策略转换'] === '是';

  return (
    <div className="group relative bg-paper/40 border border-ink/10 p-5 hover:border-ink/30 transition-all shadow-sm hover:shadow-md flex flex-col h-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: corpusColor }}></div>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 flex items-center justify-center pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"
        style={{ color: seal.color, fontFamily: "'Ma Shan Zheng', serif", fontSize: '6rem' }}>
        {seal.name.charAt(0)}
      </div>
      
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xs px-2 py-0.5 border" style={{ borderColor: `${corpusColor}40`, color: corpusColor, background: `${corpusColor}10` }}>
          {entry['语料库']}
        </span>
        <span className="text-xs px-2 py-0.5 border border-ink/10 text-ash bg-ink/5">
          {entry['异类类型'] || '未知'}
        </span>
      </div>
      
      <h4 className="text-xl font-serif text-ink mb-4 group-hover:text-vermillion transition-colors flex items-center justify-between">
        <span>《{title}》</span>
        <span className="text-sm font-sans px-2 py-1 bg-paper border border-ink/10 shadow-sm" style={{ color: seal.color }}>
          主体性 {score}
        </span>
      </h4>
      
      <div className="flex-1 space-y-3 text-sm">
        <div className="flex justify-between items-center border-b border-ink/5 pb-2">
          <span className="text-ash tracking-widest">起手策略</span>
          <span style={{ color: STRAT_COLORS[stratKey] || 'var(--ink)' }}>{stratKey}</span>
        </div>
        
        {hasTrans && entry['最终结局_大类'] && (
          <div className="flex justify-between items-center border-b border-ink/5 pb-2">
            <span className="text-vermillion tracking-widest">发生变局</span>
            <span className="text-vermillion text-xs">是</span>
          </div>
        )}

        <div className="pt-2 flex-1">
          <span className="text-xs text-ash tracking-widest block mb-1">终局考语</span>
          <span className="text-ink-light text-xs leading-relaxed line-clamp-3" title={entry['备注'] || entry['结局简述']}>
            {entry['备注'] || entry['结局简述'] || '暂无详细记载。'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DataExplorer({ entries }) {
  const [query, setQuery] = useState('');
  const [filterCorpus, setFilterCorpus] = useState('全部');
  const [filterStrat, setFilterStrat] = useState('全部');
  const [filterType, setFilterType] = useState('全部');
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 12; // 3 columns * 4 rows

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
      className="text-xs px-4 py-1.5 border transition-all duration-150"
      style={{
        borderColor: current === value ? (color || 'var(--vermillion)') : 'rgba(74,55,40,0.2)',
        background: current === value ? `${color || '#8B1A1A'}10` : 'transparent',
        color: current === value ? (color || 'var(--vermillion)') : 'var(--ash)',
        letterSpacing: '0.06em',
      }}
    >{children}</button>
  );

  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-4 mb-8 mt-12">
        <h2 className="text-2xl font-serif text-ink tracking-widest" style={{ fontFamily: "'Ma Shan Zheng', serif" }}>
          原典案卷检索
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-ink/20 to-transparent"></div>
      </div>

      {/* 筛选区 */}
      <div className="palace-border bg-paper-dark/20 p-8 shadow-sm mb-12 space-y-6 flex flex-col items-center">
        <div className="relative w-full max-w-2xl mb-2">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(0); }}
            placeholder="搜索篇名、结局关键字或学者按语……"
            className="w-full pl-12 pr-10 py-3 border border-gold/40 text-sm focus:outline-none focus:border-vermillion placeholder-ash/50 bg-paper transition-colors shadow-inner text-center"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-ash hover:text-ink">
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 w-full">
          <span className="text-sm font-serif text-gold tracking-widest w-12 text-center">古籍</span>
          <div className="flex flex-wrap justify-center gap-3">
            {['全部','聊斋志异','阅微草堂笔记','子不语'].map(v => (
              <FilterBtn key={v} value={v} current={filterCorpus} setter={setFilterCorpus} color={CORPUS_COLOR[v]}>{v}</FilterBtn>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 w-full">
          <span className="text-sm font-serif text-gold tracking-widest w-12 text-center">策略</span>
          <div className="flex flex-wrap justify-center gap-3">
            {['全部','博弈型','情感型','顺从型','抗争型','非自主'].map(v => (
              <FilterBtn key={v} value={v} current={filterStrat} setter={setFilterStrat} color={STRAT_COLORS[v]}>{v}</FilterBtn>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 w-full">
          <span className="text-sm font-serif text-gold tracking-widest w-12 text-center">本相</span>
          <div className="flex flex-wrap justify-center gap-3">
            {['全部','狐','鬼','精','仙'].map(v => (
              <FilterBtn key={v} value={v} current={filterType} setter={setFilterType}>{v}</FilterBtn>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 mt-4 border-t border-gold/20 w-full max-w-2xl">
          <span className="text-xs text-ash tracking-widest">
            寻得 <strong className="text-vermillion text-base mx-1 font-serif">{filtered.length}</strong> 卷符合条件的记录
          </span>
          <button onClick={resetFilters} className="text-xs text-ash hover:text-ink underline underline-offset-4 tracking-widest transition-colors">
            重置所有条件
          </button>
        </div>
      </div>

      {/* 卷宗卡片流 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginated.map(entry => {
          const id = `${entry['语料库']}-${entry['序号']}`;
          return <EntryCard key={id} entry={entry} />;
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 border border-ink/5 bg-paper/30 mt-8">
          <p className="text-ash tracking-widest">茫茫书海，未寻得相符卷宗。</p>
        </div>
      )}

      {/* 分页 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-16">
          <button 
            disabled={page === 0} 
            onClick={() => setPage(p => p - 1)}
            className="px-6 py-2 border border-ink/20 text-sm text-ink hover:bg-ink/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-serif tracking-widest"
          >
            上一卷
          </button>
          <span className="text-sm font-serif text-ash tracking-widest">
            {page + 1} / {totalPages}
          </span>
          <button 
            disabled={page === totalPages - 1} 
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-2 border border-ink/20 text-sm text-ink hover:bg-ink/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-serif tracking-widest"
          >
            下一卷
          </button>
        </div>
      )}
    </div>
  );
}
