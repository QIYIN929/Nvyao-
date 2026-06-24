import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { getSealTier } from '../../data/gameContent';
import { formatEntryTitle, getEntryOriginalText, getSealShort } from '../../lib/researchUtils';

const CORPUS_COLOR = {
  '聊斋志异': '#8B1A1A',
  '阅微草堂笔记': '#2C4A3E',
  '子不语': '#A07820',
};

const STRAT_COLORS = {
  博弈型: '#A07820', 情感型: '#8B1A1A', 顺从型: '#6B5B4E',
  抗争型: '#2C4A3E', 非自主: '#7C8FA0',
};

const PANELS = [
  { key: 'original', label: '原文' },
  { key: 'commentary', label: '考语' },
  { key: 'data', label: '数据表格' },
];

const DATA_ROWS = [
  ['语料库', '语料库'],
  ['序号', '序号'],
  ['篇名', '篇名'],
  ['异类类型', '异类类型'],
  ['策略类型', '策略类型_主'],
  ['策略转换', '策略转换'],
  ['主体性评分', '主体性评分'],
  ['初始处境', '初始处境'],
  ['核心困境', '核心困境'],
  ['主要手段', '主要手段'],
  ['最终结局', '最终结局_大类'],
  ['重大代价', '是否付出重大代价'],
  ['代价类型', '代价类型'],
  ['策略自反性', '策略自反性'],
  ['跨越人妖界限', '是否跨越人妖界限'],
  ['理论标签', '理论标签'],
  ['备注', '备注'],
];

function VerticalReader({ text, emptyText }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth - el.clientWidth;
  }, [text]);

  if (!text) {
    return (
      <div className="entry-reader entry-reader--empty">
        <p>{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="entry-reader">
      <div className="entry-reader__scroll custom-scrollbar" ref={scrollRef}>
        <div className="entry-reader__columns vertical-text">
          {text.split(/(?<=。)/).map((sentence, idx) => (
            sentence.trim() ? <p key={idx}>{sentence.trim()}</p> : null
          ))}
        </div>
      </div>
    </div>
  );
}

function EntryDataTable({ entry, score, sealShort, sealColor, stratKey }) {
  return (
    <div className="entry-data-panel custom-scrollbar">
      <table className="entry-data-table">
        <tbody>
          {DATA_ROWS.map(([label, field]) => {
            let value = entry[field];
            if (field === '主体性评分') value = `${score} / 9（${sealShort}）`;
            if (value === undefined || value === null || value === '') value = '—';
            const color = field === '策略类型_主' ? STRAT_COLORS[stratKey]
              : field === '主体性评分' ? sealColor : undefined;
            return (
              <tr key={field}>
                <th>{label}</th>
                <td style={color ? { color } : undefined}>{String(value)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function EntryCard({ entry, texts = {}, compact = false }) {
  const corpusColor = CORPUS_COLOR[entry['语料库']] || '#6B5B4E';
  const stratKey = entry['_策略简称'] || '';
  const score = entry['_主体性'] || 0;
  const seal = getSealTier(score);
  const sealShort = getSealShort(seal);
  const title = formatEntryTitle(entry['篇名']);
  const hasTrans = entry['策略转换'] === '是';
  const commentary = entry['备注'] || '';
  const situation = entry['初始处境'] || '';
  const dilemma = entry['核心困境'] || '';
  const originalText = getEntryOriginalText(entry, texts);
  const [panel, setPanel] = useState('original');

  function handleOpenChange(open) {
    if (open) setPanel(originalText ? 'original' : 'data');
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className={`group relative bg-paper/40 border border-ink/10 p-5 hover:border-ink/30 transition-all shadow-sm hover:shadow-md flex flex-col h-full overflow-hidden cursor-pointer text-left w-full hover:-translate-y-1 ${compact ? 'p-4' : ''}`}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: corpusColor }} />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 flex items-center justify-center pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"
            style={{ color: seal.color, fontFamily: "'Ma Shan Zheng', serif", fontSize: compact ? '4rem' : '6rem' }}>
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
        </div>
      </DialogTrigger>

      <DialogContent className="entry-detail-dialog">
        <header className="entry-detail-dialog__header">
          <div className="entry-detail-dialog__title-block">
            <span className="entry-detail-dialog__corpus" style={{ borderColor: `${corpusColor}40`, color: corpusColor, background: `${corpusColor}10` }}>
              {entry['语料库']}
            </span>
            <DialogTitle className="entry-detail-dialog__title">《{title}》</DialogTitle>
            <DialogDescription className="entry-detail-dialog__id">编号 {entry['序号']}</DialogDescription>
          </div>

          <nav className="entry-detail-dialog__tabs" aria-label="卷宗阅览">
            {PANELS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setPanel(key)}
                className="entry-detail-dialog__tab"
                aria-current={panel === key ? 'page' : undefined}
                style={{
                  borderColor: panel === key ? corpusColor : 'rgba(74,55,40,0.18)',
                  color: panel === key ? corpusColor : '#8C7B6D',
                  background: panel === key ? `${corpusColor}12` : 'transparent',
                }}
              >
                {label}
              </button>
            ))}
          </nav>
        </header>

        <main className="entry-detail-dialog__main">
          {panel === 'original' && (
            <VerticalReader text={originalText} emptyText="本篇原文暂未编入馆藏。" />
          )}
          {panel === 'commentary' && (
            <VerticalReader
              text={commentary ? `${commentary}${commentary.endsWith('。') ? '' : '。'}` : ''}
              emptyText="暂无考语。"
            />
          )}
          {panel === 'data' && (
            <EntryDataTable
              entry={entry}
              score={score}
              sealShort={sealShort}
              sealColor={seal.color}
              stratKey={stratKey}
            />
          )}
        </main>
      </DialogContent>
    </Dialog>
  );
}
