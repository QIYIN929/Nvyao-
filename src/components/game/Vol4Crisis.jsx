import { useState } from 'react';
import { ENCOUNTERS, CRISES } from '../../data/gameContent';

export default function Vol4Crisis({ encKey, onSelect }) {
  const encounter = ENCOUNTERS.find(e => e.key === encKey);
  const crisis = CRISES[encounter.crisisKey];
  const [selected, setSelected] = useState(null);

  function handleSelect(strat) {
    setSelected(strat.key);
    setTimeout(() => onSelect(strat), 1500);
  }

  return (
    <div className="min-h-screen paper-bg flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-6 animate-ink-fade">
          <p className="text-xs tracking-widest mb-1" style={{ color: 'var(--vermillion)' }}>卷 四</p>
          <h2 style={{ fontFamily: "'Ma Shan Zheng', serif", fontSize: '2rem', color: 'var(--vermillion)' }}>劫雷至</h2>
          <div className="chapter-line mt-3 mb-3"><span className="text-xs" style={{ color: 'var(--vermillion)' }}>{crisis.title}</span></div>
        </div>

        <div className="mb-6 p-5 border-l-2 animate-fade-up" style={{ borderColor: 'var(--vermillion)', background: 'rgba(139,26,26,0.05)' }}>
          <p className="text-sm leading-8" style={{ color: 'var(--ink-light)', letterSpacing: '0.1em' }}>{crisis.scene}</p>
        </div>

        {!selected ? (
          <div className="space-y-3">
            {crisis.strategies.map((strat, i) => (
              <button
                key={strat.key}
                className="w-full text-left p-4 border transition-all duration-300 hover:bg-red-900/5 animate-fade-up"
                style={{ borderColor: 'rgba(74,55,40,0.3)', animationDelay: `${i * 0.1}s` }}
                onClick={() => handleSelect(strat)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(74,55,40,0.1)', color: 'var(--ink)' }}>{strat.key}</span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>【{strat.label}】</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--ink-light)' }}>{strat.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center mt-8 animate-ink-fade">
            <p className="text-sm italic" style={{ color: 'var(--vermillion)' }}>大局将定……</p>
          </div>
        )}
      </div>
    </div>
  );
}
