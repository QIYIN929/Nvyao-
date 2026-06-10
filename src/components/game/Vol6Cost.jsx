import { useState } from 'react';
import { COSTS } from '../../data/gameContent';

export default function Vol6Cost({ costType, onSelect }) {
  const costData = COSTS[costType];
  const [selected, setSelected] = useState(null);

  if (!costData) {
    // Fallback if missing
    setTimeout(() => onSelect({ outcome: '未知' }), 0);
    return null;
  }

  function handleSelect(c) {
    setSelected(c);
    setTimeout(() => onSelect(c), 1500);
  }

  return (
    <div className="min-h-screen paper-bg flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-6 animate-ink-fade">
          <p className="text-xs tracking-widest mb-1" style={{ color: 'var(--ash)' }}>卷 六</p>
          <h2 style={{ fontFamily: "'Ma Shan Zheng', serif", fontSize: '2rem', color: 'var(--ink)' }}>索代价</h2>
          <div className="chapter-line mt-3 mb-3"><span className="text-xs" style={{ color: 'var(--ash)' }}>天地法则</span></div>
        </div>

        <div className="mb-6 p-5 border-l-2 animate-fade-up" style={{ borderColor: 'var(--ash)', background: 'rgba(245,237,214,0.5)' }}>
          <p className="text-sm leading-8" style={{ color: 'var(--ink-light)' }}>{costData.question}</p>
        </div>

        {!selected ? (
          <div className="space-y-3">
            {costData.choices.map((c, i) => (
              <button
                key={c.label}
                className="w-full text-left p-4 border transition-all duration-300 hover:bg-black/5 animate-fade-up"
                style={{ borderColor: 'rgba(74,55,40,0.3)', animationDelay: `${i * 0.1}s` }}
                onClick={() => handleSelect(c)}
              >
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--ink)' }}>{c.label}</p>
                <p className="text-xs" style={{ color: 'var(--ink-light)' }}>{c.desc}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center mt-8 animate-ink-fade text-xs" style={{ color: 'var(--ash)' }}>尘埃落定……</div>
        )}
      </div>
    </div>
  );
}
