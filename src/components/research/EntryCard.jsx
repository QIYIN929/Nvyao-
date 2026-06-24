import { useState } from 'react';
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

function TextStage({ label, labelColor, children, emptyText }) {
  return (
    <div className="entry-text-stage">
      <span className="entry-text-stage__label" style={{ color: `${labelColor}99`, borderColor: `${labelColor}33` }}>
        {label}
      </span>
      <div className="entry-text-stage__scroll custom-scrollbar">
        <div className="entry-text-stage__body vertical-text">
          {children || <p className="text-[#8C7B6D] tracking-widest">{emptyText}</p>}
        </div>
      </div>
    </div>
  );
}

function MetaChip({ label, value, color }) {
  return (
    <div className="entry-meta-chip">
      <span className="entry-meta-chip__label">{label}</span>
      <span className="entry-meta-chip__value" style={color ? { color } : undefined}>{value}</span>
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
  const details = entry['备注'] || '暂无详细记载。';
  const situation = entry['初始处境'] || '';
  const dilemma = entry['核心困境'] || '';
  const originalText = getEntryOriginalText(entry, texts);
  const [panel, setPanel] = useState('original');

  const activePanel = originalText ? panel : 'commentary';
  const bodyText = activePanel === 'original' ? originalText : details;
  const bodyLabel = activePanel === 'original' ? '原文' : '学者按语';
  const bodyColor = activePanel === 'original' ? corpusColor : '#8C0F16';

  return (
    <Dialog onOpenChange={(open) => { if (open) setPanel('original'); }}>
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

          {originalText && (
            <div className="entry-detail-dialog__tabs">
              {[
                ['original', '原文'],
                ['commentary', '学者按语'],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPanel(key)}
                  className="entry-detail-dialog__tab"
                  data-active={activePanel === key}
                  style={{
                    borderColor: activePanel === key ? corpusColor : 'rgba(74,55,40,0.15)',
                    color: activePanel === key ? corpusColor : '#8C7B6D',
                    background: activePanel === key ? `${corpusColor}10` : 'transparent',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </header>

        <main className="entry-detail-dialog__main">
          <TextStage
            label={bodyLabel}
            labelColor={bodyColor}
            emptyText={activePanel === 'original' ? '本篇原文暂未编入馆藏。' : '暂无详细记载。'}
          >
            {bodyText && bodyText.split(/(?<=。)/).map((sentence, idx) => (
              sentence.trim() ? (
                <p key={idx} className="entry-text-stage__sentence">
                  {sentence.trim()}{activePanel === 'commentary' && !sentence.trim().endsWith('。') ? '。' : ''}
                </p>
              ) : null
            ))}
          </TextStage>
        </main>

        <footer className="entry-detail-dialog__footer">
          <MetaChip label="异类本相" value={entry['异类类型'] || '未知'} />
          <MetaChip label="初始策略" value={stratKey} color={STRAT_COLORS[stratKey]} />
          <MetaChip label="策略转换" value={hasTrans ? '是' : '否'} />
          <MetaChip label="结局" value={entry['最终结局_大类'] || '未知'} />
          <MetaChip label="主体性" value={`${score} · ${sealShort}`} color={seal.color} />
        </footer>

        {(situation || dilemma) && (
          <div className="entry-detail-dialog__context">
            {situation && (
              <p><span>初始处境</span>{situation}</p>
            )}
            {dilemma && (
              <p><span>核心困境</span>{dilemma}</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
