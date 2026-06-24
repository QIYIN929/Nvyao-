import { getSealTier } from '../../data/gameContent';
import { formatEntryTitle, getSealShort } from '../../lib/researchUtils';
import { CORPUS_COLOR, STRAT_COLORS } from './entryDetailParts';

export default function EntryCard({ entry, onOpen, compact = false }) {
  const corpusColor = CORPUS_COLOR[entry['语料库']] || '#6B5B4E';
  const stratKey = entry['_策略简称'] || '';
  const score = entry['_主体性'] || 0;
  const seal = getSealTier(score);
  const sealShort = getSealShort(seal);
  const title = formatEntryTitle(entry['篇名']);
  const hasTrans = entry['策略转换'] === '是';
  const situation = entry['初始处境'] || '';
  const dilemma = entry['核心困境'] || '';

  return (
    <button
      type="button"
      className={`group relative bg-paper/40 border border-ink/10 p-5 hover:border-ink/30 transition-all shadow-sm hover:shadow-md flex flex-col h-full overflow-hidden cursor-pointer text-left w-full hover:-translate-y-1 ${compact ? 'p-4' : ''}`}
      onClick={() => onOpen?.(entry)}
    >
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: corpusColor }} />
      <div
        className="absolute -bottom-4 -right-4 w-24 h-24 flex items-center justify-center pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"
        style={{ color: seal.color, fontFamily: "'Ma Shan Zheng', serif", fontSize: compact ? '4rem' : '6rem' }}
      >
        {sealShort.charAt(0)}
      </div>

      <div className="mb-3 flex items-center gap-2 flex-wrap">
        <span className="text-xs px-2 py-0.5 border" style={{ borderColor: `${corpusColor}40`, color: corpusColor, background: `${corpusColor}10` }}>
          {entry['语料库']}
        </span>
        <span className="text-xs px-2 py-0.5 border border-ink/10 text-ash bg-ink/5">
          {entry['异类类型'] || '未知'}
        </span>
        <span className="text-xs px-2 py-0.5 border" style={{ color: seal.color, borderColor: `${seal.color}40`, background: `${seal.color}10` }}>
          {sealShort}
        </span>
      </div>

      <h4 className={`font-serif text-ink mb-3 group-hover:text-vermillion transition-colors flex items-center justify-between gap-2 ${compact ? 'text-lg' : 'text-xl'}`}>
        <span>《{title}》</span>
        <span className="text-sm font-sans px-2 py-1 bg-paper border border-ink/10 shadow-sm shrink-0" style={{ color: seal.color }}>
          {score}/9
        </span>
      </h4>

      <div className="flex-1 space-y-2 text-sm">
        <div className="flex justify-between items-center border-b border-ink/5 pb-2">
          <span className="text-ash tracking-widest text-xs">起手策略</span>
          <span className="text-xs" style={{ color: STRAT_COLORS[stratKey] || 'var(--ink)' }}>{stratKey}</span>
        </div>
        {hasTrans && (
          <div className="flex justify-between items-center border-b border-ink/5 pb-2">
            <span className="text-vermillion tracking-widest text-xs">策略转换</span>
            <span className="text-vermillion text-xs">是</span>
          </div>
        )}
        {situation && (
          <div className="pt-1">
            <span className="text-xs text-ash tracking-widest block mb-1">初始处境</span>
            <span className="text-ink-light text-xs leading-relaxed line-clamp-2">{situation}</span>
          </div>
        )}
        {dilemma && (
          <div className="pt-1">
            <span className="text-xs text-ash tracking-widest block mb-1">核心困境</span>
            <span className="text-ink-light text-xs leading-relaxed line-clamp-2">{dilemma}</span>
          </div>
        )}
      </div>
    </button>
  );
}
