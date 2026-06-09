import { useState, useEffect } from 'react';
import { TYPES, STRATEGIES, getSealTier } from '../../data/gameContent';

function ScoreMeter({ score }) {
  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    let n = 0;
    const interval = setInterval(() => {
      n++;
      setDisplayScore(n);
      if (n >= score) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="transition-all duration-200"
          style={{
            width: '18px', height: '18px',
            borderRadius: '2px',
            background: i < displayScore
              ? (displayScore <= 2 ? '#6B5B4E' : displayScore <= 5 ? '#7C8FA0' : '#A07820')
              : 'rgba(74,55,40,0.15)',
            transitionDelay: `${i * 80}ms`,
          }}
        />
      ))}
      <span className="ml-1 text-sm font-medium" style={{ color: 'var(--ink-light)' }}>
        {displayScore}/9
      </span>
    </div>
  );
}

export default function Vol4Result({ typeKey, stratKey, finalStratKey, transferred, finalScore, gamePaths, onEnterResearch }) {
  const type = TYPES[typeKey];
  const initStrat = STRATEGIES[stratKey];
  const finalStrat = STRATEGIES[finalStratKey] || initStrat;
  const seal = getSealTier(Math.max(0, Math.min(9, finalScore)));

  const pathKey = `${typeKey}|${finalStratKey}|${transferred ? '是' : '否'}`;
  const pathData = gamePaths?.[pathKey];

  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const clampedScore = Math.max(0, Math.min(9, finalScore));

  return (
    <div className="min-h-screen paper-bg flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(90,60,20,0.15) 100%)' }} />

      <div className="max-w-2xl w-full relative z-10">
        {/* Chapter header */}
        <div className="text-center mb-8">
          <p className="text-xs tracking-widest mb-1" style={{ color: 'var(--ash)' }}>卷 四</p>
          <h2 style={{
            fontFamily: "'Ma Shan Zheng', serif",
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            color: 'var(--ink)',
            letterSpacing: '0.25em',
          }}>代价与灵魄</h2>
        </div>

        {/* Path summary */}
        {phase >= 1 && (
          <div className="mb-6 p-4 border animate-ink-fade"
            style={{ borderColor: 'rgba(74,55,40,0.2)', background: 'rgba(245,237,214,0.6)', animationFillMode: 'forwards' }}>
            <div className="flex flex-wrap gap-2 text-xs justify-center" style={{ letterSpacing: '0.08em' }}>
              <span className="px-2 py-1 rounded" style={{ background: `${type.color}20`, color: type.color }}>
                {type.label}族
              </span>
              <span style={{ color: 'var(--ash)' }}>→</span>
              <span className="px-2 py-1 rounded" style={{ background: 'rgba(74,55,40,0.1)', color: 'var(--ink-light)' }}>
                初：{initStrat.label}
              </span>
              {transferred && (
                <>
                  <span style={{ color: 'var(--vermillion)' }}>→</span>
                  <span className="px-2 py-1 rounded" style={{ background: 'rgba(139,26,26,0.1)', color: 'var(--vermillion)' }}>
                    转：{finalStrat.label}
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Seal */}
        {phase >= 2 && (
          <div className="flex flex-col items-center mb-8 animate-seal" style={{ animationFillMode: 'forwards' }}>
            <div
              className="w-24 h-24 flex items-center justify-center mb-3"
              style={{
                border: `3px solid ${seal.color}`,
                background: `${seal.color}15`,
                fontFamily: "'Ma Shan Zheng', serif",
                fontSize: '2.5rem',
                color: seal.color,
                boxShadow: `0 0 20px ${seal.color}40`,
              }}
            >
              {seal.iconChar}
            </div>
            <p className="font-medium mb-1" style={{ color: seal.color, letterSpacing: '0.2em', fontSize: '1.1rem' }}>
              {seal.name}
            </p>
            <p className="text-xs text-center" style={{ color: 'var(--ash)', maxWidth: '280px', lineHeight: 1.8 }}>
              {seal.desc}
            </p>
            <div className="mt-3">
              <ScoreMeter score={clampedScore} />
            </div>
          </div>
        )}

        {/* Research note */}
        {phase >= 3 && (
          <div className="mb-6 p-5 border-l-2 animate-fade-up"
            style={{ borderColor: seal.color, background: 'rgba(245,237,214,0.5)', animationFillMode: 'forwards' }}>
            <p className="text-xs mb-3 flex items-center gap-2" style={{ color: 'var(--ash)', letterSpacing: '0.1em' }}>
              <span>📖</span> 学者按语
            </p>
            <p className="text-sm leading-8" style={{
              color: 'var(--ink-light)',
              fontFamily: "'Noto Serif SC', serif",
              letterSpacing: '0.1em',
            }}>
              <span style={{ color: type.color }}>【{type.label}】</span>族，
              初以<span style={{ color: 'var(--ink)' }}>【{initStrat.label}】</span>应对
              {transferred ? <>，后在变局下转为<span style={{ color: 'var(--vermillion)' }}>【{finalStrat.label}】</span></> : '，未曾易辙'}。
              其灵魄终印为
              <span style={{ color: seal.color }}>「{seal.name}」</span>
              （主体性{clampedScore}/9），{seal.metaphor}
            </p>

            {pathData ? (
              <div className="mt-4 pt-3 border-t text-xs" style={{ borderColor: 'rgba(74,55,40,0.15)', color: 'var(--ash)', lineHeight: 2 }}>
                <p>据此残卷所录：</p>
                <p>· 同类路径（{type.label}·{finalStrat.label}
                  {transferred ? '·已转换' : '·未转换'}）共见于研究语料库 <strong style={{ color: 'var(--ink)' }}>{pathData.count}</strong> 例</p>
                <p>· 主体性均值 <strong style={{ color: seal.color }}>{pathData.avg_score}</strong>，
                  最常见结局：<strong style={{ color: 'var(--ink)' }}>「{pathData.top_outcome}」</strong></p>
                {pathData.top_cost && pathData.top_cost !== '无' && pathData.top_cost !== '不适用' && (
                  <p>· 最常见代价：<strong style={{ color: 'var(--vermillion)' }}>「{pathData.top_cost}」</strong></p>
                )}
                {pathData.examples?.length > 0 && (
                  <p>· 典型篇目：{pathData.examples.map(e => `《${e.title}》`).join('、')}</p>
                )}
              </div>
            ) : (
              <p className="mt-3 text-xs italic" style={{ color: 'var(--ash)' }}>
                此路径在三书中属罕见案例，孤本残卷，难以比对。
              </p>
            )}
          </div>
        )}

        {/* Seal metaphor text */}
        {phase >= 3 && (
          <div className="text-center mb-6 animate-ink-fade" style={{ animationFillMode: 'forwards' }}>
            <p className="text-sm italic" style={{ color: 'var(--ink-light)', letterSpacing: '0.1em', lineHeight: 2 }}>
              「{seal.metaphor}」
            </p>
          </div>
        )}

        {/* CTA to research */}
        {phase >= 4 && (
          <div className="text-center animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            <div className="chapter-line mb-5">
              <span className="text-xs" style={{ color: 'var(--ash)' }}>卷末</span>
            </div>
            <p className="text-sm mb-2" style={{ color: 'var(--ink-light)', letterSpacing: '0.1em', lineHeight: 2 }}>
              这只是诸多卷宗中的一叶。
            </p>
            <p className="text-xs mb-6" style={{ color: 'var(--ash)', letterSpacing: '0.1em' }}>
              她的同族、异类，还有五百余条未择之路，<br />
              尽在完整研究中。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onEnterResearch}
                className="px-8 py-3 transition-all duration-300 text-sm"
                style={{
                  background: 'var(--vermillion)',
                  color: 'var(--paper)',
                  fontFamily: "'Noto Serif SC', serif",
                  letterSpacing: '0.2em',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--vermillion-light)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--vermillion)'}
              >
                展开完整研究 →
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 transition-all duration-300 text-sm"
                style={{
                  background: 'transparent',
                  color: 'var(--ash)',
                  fontFamily: "'Noto Serif SC', serif",
                  letterSpacing: '0.15em',
                  border: '1px solid rgba(74,55,40,0.3)',
                  cursor: 'pointer',
                }}
              >
                重读此卷
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
