import { useState } from 'react';
import { ENCOUNTERS, CRISES, STRATEGY_TAGS, CHAPTER_INTROS } from '../../data/gameContent';
import GameSceneLayout from '../layout/GameSceneLayout';

export default function Vol4Crisis({ encKey, onSelect }) {
  const encounter = ENCOUNTERS.find(e => e.key === encKey);
  const crisis = CRISES[encounter.crisisKey];
  const [selected, setSelected] = useState(null);
  const intro = CHAPTER_INTROS.vol3;

  function handleSelect(strat) {
    setSelected(strat.key);
    setTimeout(() => onSelect(strat), 1500);
  }

  return (
    <GameSceneLayout>
      <div className="game-scene-card">
        <div className="text-center mb-6 animate-ink-fade">
          <p className="text-xs tracking-widest mb-1 text-vermillion">{intro.num}</p>
          <h2 className="game-scene-title game-scene-title--crisis">{intro.title}</h2>
          <div className="chapter-line mt-3 mb-3"><span className="text-xs text-vermillion">{intro.tagline} · {crisis.title}</span></div>
        </div>

        <div className="mb-6 p-5 border-l-2 animate-fade-up game-scene-inset" style={{ borderColor: 'var(--vermillion)' }}>
          <p className="text-sm leading-8 text-ink-light" style={{ letterSpacing: '0.1em' }}>
            与【{encounter.label}】经年相守，终非密不透风。异象既起，风雨满门——<br />
            {crisis.scene}
          </p>
        </div>

        {!selected ? (
          <div className="space-y-3">
            {crisis.strategies.map((strat, i) => (
              <button
                key={strat.key}
                type="button"
                className="game-option-btn w-full text-left animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => handleSelect(strat)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 rounded bg-ink/5 text-ink">
                    {STRATEGY_TAGS[strat.key] || strat.key}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">【{strat.label}】</p>
                    <p className="text-xs mt-1 text-ink-light">{strat.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center mt-8 animate-ink-fade">
            <p className="text-sm italic text-ink-light">大势已定……</p>
          </div>
        )}
      </div>
    </GameSceneLayout>
  );
}
