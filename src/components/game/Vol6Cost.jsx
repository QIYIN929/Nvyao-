import { useState } from 'react';
import { COSTS, CHAPTER_INTROS } from '../../data/gameContent';
import GameSceneLayout from '../layout/GameSceneLayout';

export default function Vol6Cost({ costType, onSelect }) {
  const costData = COSTS[costType];
  const [selected, setSelected] = useState(null);
  const intro = CHAPTER_INTROS.vol5;

  if (!costData) {
    setTimeout(() => onSelect({ outcome: '未知' }), 0);
    return null;
  }

  function handleSelect(c) {
    setSelected(c);
    setTimeout(() => onSelect(c), 1500);
  }

  return (
    <GameSceneLayout>
      <div className="game-scene-card">
        <div className="text-center mb-6 animate-ink-fade">
          <p className="text-xs tracking-widest mb-1 text-ash">{intro.num}</p>
          <h2 className="game-scene-title">{intro.title}</h2>
          <div className="chapter-line mt-3 mb-3"><span className="text-xs text-ash">{intro.tagline} · 天道索价</span></div>
        </div>

        <div className="mb-6 p-5 border-l-2 animate-fade-up game-scene-inset" style={{ borderColor: 'var(--ash)' }}>
          <p className="text-sm leading-8 text-ink-light">{costData.question}</p>
        </div>

        {!selected ? (
          <div className="space-y-3">
            {costData.choices.map((c, i) => (
              <button
                key={c.label}
                type="button"
                className="game-option-btn w-full text-left animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => handleSelect(c)}
              >
                <p className="text-sm font-medium mb-1 text-ink">{c.label}</p>
                <p className="text-xs text-ink-light">{c.desc}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center mt-8 animate-ink-fade text-xs text-ash">尘埃落定，终局将启……</div>
        )}
      </div>
    </GameSceneLayout>
  );
}
