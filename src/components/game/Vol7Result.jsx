import { useState, useEffect } from 'react';
import { getSealTier, getPathRecap } from '../../data/gameContent';
import GameSceneLayout from '../layout/GameSceneLayout';

function ScoreMeter({ score }) {
  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    let n = 0;
    const interval = setInterval(() => { n++; setDisplayScore(n); if (n >= score) clearInterval(interval); }, 120);
    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="transition-all duration-200"
          style={{
            width: '18px', height: '18px', borderRadius: '2px',
            background: i < displayScore ? (displayScore <= 2 ? '#6B5B4E' : displayScore <= 4 ? '#7C8FA0' : displayScore <= 6 ? '#A07820' : '#8B1A1A') : 'rgba(74,55,40,0.15)',
            transitionDelay: `${i * 80}ms`,
          }} />
      ))}
      <span className="ml-1 text-sm font-medium text-ink-light">{displayScore}/9</span>
    </div>
  );
}

function ExampleCard({ example, sealColor }) {
  return (
    <div className="text-left p-4 border game-scene-inset">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <p className="text-sm font-medium text-ink">《{example.title}》</p>
          <p className="text-xs mt-0.5 text-ash">{example.corpus} · {example.role}</p>
        </div>
        <span className="text-xs px-2 py-0.5 shrink-0 border"
          style={{ color: sealColor, borderColor: `${sealColor}55`, background: `${sealColor}10` }}>
          {example.score}/9
        </span>
      </div>
      <p className="text-xs leading-7 text-ink-light">{example.gist}</p>
    </div>
  );
}

export default function Vol7Result({ typeKey, encKey, finalStratKey, transferred, finalScore, outcomeStr, onEnterResearch }) {
  const seal = getSealTier(finalScore);
  const pathRecap = getPathRecap({ typeKey, encKey, finalStratKey, transferred, outcomeStr, score: finalScore });

  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1100),
      setTimeout(() => setPhase(3), 2100),
      setTimeout(() => setPhase(4), 3300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const clampedScore = Math.max(0, Math.min(9, finalScore));

  return (
    <GameSceneLayout>
      <div className="game-scene-card game-scene-card--result text-center">
        {phase >= 1 && (
          <div className="flex flex-col items-center mb-8 animate-seal">
            <div className="w-24 h-24 flex items-center justify-center mb-3"
              style={{ border: `3px solid ${seal.color}`, background: `${seal.color}15`, fontFamily: "'Ma Shan Zheng', serif", fontSize: '2.5rem', color: seal.color, boxShadow: `0 0 20px ${seal.color}40` }}>
              {seal.iconChar}
            </div>
            <p className="font-medium" style={{ color: seal.color, letterSpacing: '0.2em', fontSize: '1.1rem' }}>{seal.name}</p>
            <ScoreMeter score={clampedScore} />
          </div>
        )}

        {phase >= 2 && (
          <div className="mb-6 p-5 border animate-fade-up game-scene-inset" style={{ borderColor: `${seal.color}40` }}>
            <p className="text-sm leading-8 text-ink-light">{pathRecap}</p>
          </div>
        )}

        {phase >= 3 && (
          <div className="mb-6 animate-fade-up text-left">
            <div className="space-y-3">
              {seal.examples.map((ex) => (
                <ExampleCard key={ex.title} example={ex} sealColor={seal.color} />
              ))}
            </div>
          </div>
        )}

        {phase >= 4 && (
          <div className="animate-fade-up mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              type="button"
              onClick={onEnterResearch}
              className="px-8 py-3 text-sm transition-all border border-gold/50 bg-gold/10 text-ink hover:bg-gold/20 tracking-widest"
            >
              查看完整数据 →
            </button>
          </div>
        )}
      </div>
    </GameSceneLayout>
  );
}
