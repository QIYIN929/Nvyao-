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

function VerticalPanel({ label, labelColor, children, emptyText }) {
  return (
    <div className="flex-1 relative flex justify-end min-w-0">
      <div className="absolute top-0 bottom-0 right-0 w-8 border-l flex items-center justify-center" style={{ borderColor: `${labelColor}33` }}>
        <span className="vertical-text text-sm" style={{ color: `${labelColor}66` }}>{label}</span>
      </div>
      <div className="pr-12 h-[420px] overflow-x-auto overflow-y-hidden vertical-text text-left text-[#5C4D43] leading-loose tracking-[0.3em] text-[15px] p-4 custom-scrollbar w-full">
        {children || (
          <p className="text-[#8C7B6D] tracking-widest">{emptyText}</p>
        )}
      </div>
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

  return (
    <Dialog>
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

      <DialogContent className="max-w-4xl min-h-[520px] flex flex-col sm:flex-row gap-8 overflow-hidden bg-[#F9F6F0]">
        <div className="flex-1 flex flex-col border-r border-[#C29C57]/30 pr-6 min-w-[240px]">
          <div className="mb-6">
            <span className="text-xs px-2 py-1 border" style={{ borderColor: `${corpusColor}40`, color: corpusColor, background: `${corpusColor}10` }}>
              {entry['语料库']}
            </span>
          </div>
          <DialogTitle>《{title}》</DialogTitle>
          <div className="mt-6 space-y-4">
            {[
              ['异类本相', entry['异类类型'] || '未知'],
              ['初始策略', stratKey],
              ['策略转换', hasTrans ? '是' : '否'],
              ['结局大类', entry['最终结局_大类'] || '未知'],
              ['主体性评分', `${score}（${sealShort}）`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-[#221814]/10 pb-2 gap-4">
                <span className="text-sm text-[#8C7B6D] tracking-widest shrink-0">{label}</span>
                <span className="text-sm text-[#221814] text-right" style={label === '初始策略' ? { color: STRAT_COLORS[stratKey] } : label === '主体性评分' ? { color: seal.color, fontWeight: 600 } : undefined}>{value}</span>
              </div>
            ))}
          </div>
          {(situation || dilemma) && (
            <div className="mt-6 space-y-3 text-sm">
              {situation && (
                <div>
                  <p className="text-xs text-[#8C7B6D] tracking-widest mb-1">初始处境</p>
                  <p className="text-[#5C4D43] leading-relaxed">{situation}</p>
                </div>
              )}
              {dilemma && (
                <div>
                  <p className="text-xs text-[#8C7B6D] tracking-widest mb-1">核心困境</p>
                  <p className="text-[#5C4D43] leading-relaxed">{dilemma}</p>
                </div>
              )}
            </div>
          )}
          <DialogDescription className="mt-auto pt-6 text-xs text-[#8C7B6D]">
            编号：{entry['序号']}
          </DialogDescription>
        </div>

        <div className="flex-[1.4] flex flex-col min-w-0">
          {originalText && (
            <div className="flex gap-2 mb-4 shrink-0">
              {[
                ['original', '原文'],
                ['commentary', '学者按语'],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPanel(key)}
                  className="text-xs px-3 py-1 border transition-colors tracking-widest"
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

          {activePanel === 'original' ? (
            <VerticalPanel label="原文" labelColor={corpusColor}>
              {originalText.split(/(?<=。)/).map((sentence, idx) => (
                sentence.trim() ? <p key={idx} className="mb-2">{sentence.trim()}</p> : null
              ))}
            </VerticalPanel>
          ) : (
            <VerticalPanel label="学者按语" labelColor="#8C0F16">
              {details.split('。').map((sentence, idx) => (
                sentence.trim() ? <p key={idx} className="mb-2">{sentence.trim()}。</p> : null
              ))}
            </VerticalPanel>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
