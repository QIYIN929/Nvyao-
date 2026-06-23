import { useState } from 'react';
import { ENCOUNTERS, TRANSITIONS, STRATEGY_TAGS, CHAPTER_INTROS } from '../../data/gameContent';
import GameSceneLayout from '../layout/GameSceneLayout';

export default function Vol5Transition({ encKey, failedStrat, onSelect }) {
  const encounter = ENCOUNTERS.find(e => e.key === encKey);
  const transList = TRANSITIONS[encounter.crisisKey];
  const [selected, setSelected] = useState(null);
  const intro = CHAPTER_INTROS.vol4;

  function handleSelect(t) {
    setSelected(t);
    setTimeout(() => onSelect(t), 1500);
  }

  return (
    <GameSceneLayout>
      <div className="game-scene-card">
        <div className="text-center mb-6 animate-ink-fade">
          <p className="text-xs tracking-widest mb-1 text-ash">{intro.num}</p>
          <h2 className="game-scene-title">{intro.title}</h2>
          <div className="chapter-line mt-3 mb-3"><span className="text-xs text-ash">{intro.tagline} · 初策既破</span></div>
        </div>

        <div className="mb-6 p-5 border animate-fade-up relative overflow-hidden game-scene-inset" style={{ borderColor: 'var(--vermillion)' }}>
          <div className="absolute top-0 left-0 w-1 h-full bg-red-800" />
          <p className="text-sm leading-8 text-ink-light">{failedStrat.failText}</p>
          <p className="mt-3 text-xs italic text-ink-light">【{failedStrat.label}】之路已尽，大错铸成，此时当如何自处？</p>
        </div>

        {!selected ? (
          <div className="space-y-3">
            {transList.map((t, i) => (
              <button
                key={t.key}
                type="button"
                className="game-option-btn w-full text-left animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s`, background: 'rgba(249,246,240,0.45)' }}
                onClick={() => handleSelect(t)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 text-ink border border-ink/20">
                    转·{STRATEGY_TAGS[t.key] || t.key}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">【{t.label}】</p>
                    <p className="text-xs mt-1 text-ink-light">{t.action}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center mt-8 animate-ink-fade text-xs text-ash">因果既转，前路已定……</div>
        )}
      </div>
    </GameSceneLayout>
  );
}
