import { useState, useEffect } from 'react';
import { TYPES, ENCOUNTERS, getSealTier } from '../../data/gameContent';

function ScoreMeter({ score }) {
  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    let n = 0;
    const interval = setInterval(() => { n++; setDisplayScore(n); if (n >= score) clearInterval(interval); }, 120);
    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="flex items-center gap-2 mt-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="transition-all duration-200"
          style={{
            width: '18px', height: '18px', borderRadius: '2px',
            background: i < displayScore ? (displayScore <= 2 ? '#6B5B4E' : displayScore <= 5 ? '#7C8FA0' : displayScore <= 7 ? '#A07820' : '#8B1A1A') : 'rgba(74,55,40,0.15)',
            transitionDelay: `${i * 80}ms`,
          }} />
      ))}
      <span className="ml-1 text-sm font-medium" style={{ color: 'var(--ink-light)' }}>{displayScore}/9</span>
    </div>
  );
}

export default function Vol7Result({ typeKey, encKey, finalStratKey, transferred, finalScore, outcomeStr, gamePaths, onEnterResearch }) {
  const type = TYPES[typeKey];
  const enc = ENCOUNTERS.find(e => e.key === encKey);
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
      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-8">
          <p className="text-xs tracking-widest mb-1" style={{ color: 'var(--ash)' }}>卷 七</p>
          <h2 style={{ fontFamily: "'Ma Shan Zheng', serif", fontSize: '2rem', color: 'var(--ink)' }}>终局</h2>
        </div>

        {phase >= 1 && (
          <div className="mb-6 p-4 border animate-ink-fade" style={{ borderColor: 'rgba(74,55,40,0.2)', background: 'rgba(245,237,214,0.6)' }}>
            <div className="flex flex-wrap gap-2 text-xs justify-center items-center" style={{ letterSpacing: '0.08em' }}>
              <span className="px-2 py-1 rounded" style={{ background: `${type.color}20`, color: type.color }}>{type.label}族</span>
              <span style={{ color: 'var(--ash)' }}>遇</span>
              <span className="px-2 py-1 rounded" style={{ background: `${enc?.themeColor || '#000'}20`, color: enc?.themeColor || '#000' }}>{enc?.label || '隐修'}</span>
              <span style={{ color: 'var(--ash)' }}>结：</span>
              <span className="font-bold text-sm" style={{ color: 'var(--ink)' }}>「{outcomeStr}」</span>
            </div>
          </div>
        )}

        {phase >= 2 && (
          <div className="flex flex-col items-center mb-8 animate-seal">
            <div className="w-24 h-24 flex items-center justify-center mb-3"
              style={{ border: `3px solid ${seal.color}`, background: `${seal.color}15`, fontFamily: "'Ma Shan Zheng', serif", fontSize: '2.5rem', color: seal.color, boxShadow: `0 0 20px ${seal.color}40` }}>
              {seal.iconChar}
            </div>
            <p className="font-medium mb-1" style={{ color: seal.color, letterSpacing: '0.2em', fontSize: '1.1rem' }}>{seal.name}</p>
            <p className="text-xs text-center" style={{ color: 'var(--ash)', maxWidth: '280px', lineHeight: 1.8 }}>{seal.desc}</p>
            <ScoreMeter score={clampedScore} />
          </div>
        )}

        {phase >= 3 && (
          <div className="mb-6 p-5 border-l-2 animate-fade-up" style={{ borderColor: seal.color, background: 'rgba(245,237,214,0.5)' }}>
            <p className="text-xs mb-3 flex items-center gap-2" style={{ color: 'var(--ash)' }}><span>📖</span> 学者按语</p>
            <p className="text-sm leading-8" style={{ color: 'var(--ink-light)' }}>
              此卷记载，<span style={{ color: type.color }}>【{type.label}】</span>族遇【{enc?.label || '深山'}】，
              最终以<span style={{ color: 'var(--vermillion)' }}>【{finalStratKey}】</span>之姿迎来了「{outcomeStr}」。
              其灵魄终印为<span style={{ color: seal.color }}>「{seal.name}」</span>（主体性{clampedScore}/9）。
            </p>
            {pathData && (
              <div className="mt-4 pt-3 border-t text-xs" style={{ borderColor: 'rgba(74,55,40,0.15)', color: 'var(--ash)', lineHeight: 2 }}>
                <p>· 志怪三书中，同类路径（{type.label}·{finalStratKey}{transferred ? '·已转换' : '·未转换'}）共见于 <strong style={{ color: 'var(--ink)' }}>{pathData.count}</strong> 例。</p>
                <p>· 典型篇目：{pathData.examples?.map(e => `《${e.title}》`).join('、')}</p>
              </div>
            )}
            <p className="mt-4 text-sm italic text-center" style={{ color: 'var(--ink-light)', lineHeight: 2 }}>「{seal.metaphor}」</p>
          </div>
        )}

        {phase >= 4 && (
          <div className="text-center animate-fade-up mt-8">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={onEnterResearch} className="px-8 py-3 text-sm transition-all" style={{ background: 'var(--vermillion)', color: 'var(--paper)' }}>
                展开完整研究 →
              </button>
              <button onClick={() => window.location.reload()} className="px-6 py-3 text-sm transition-all" style={{ background: 'transparent', color: 'var(--ash)', border: '1px solid rgba(74,55,40,0.3)' }}>
                重读此卷
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
