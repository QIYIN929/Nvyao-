import { useState } from 'react';
import { ENCOUNTERS, TYPES, CHAPTER_INTROS } from '../../data/gameContent';
import GameSceneLayout from '../layout/GameSceneLayout';

export default function Vol2Encounter({ typeKey, onSelect }) {
  const type = TYPES[typeKey];
  const intro = CHAPTER_INTROS.vol2;
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  function handleSelect(key) {
    setSelected(key);
    setTimeout(() => onSelect(key), 800);
  }

  return (
    <GameSceneLayout>
      <div className="game-scene-card">
        <div className="text-center mb-8 animate-ink-fade" style={{ animationFillMode: 'forwards' }}>
          <p className="text-xs tracking-widest mb-2 text-ash">{intro.num}</p>
          <h2 className="game-scene-title">{intro.title}</h2>
          <div className="chapter-line mt-4 mb-3">
            <span className="text-xs" style={{ color: type.color }}>{intro.tagline} · {type.label}出世 · 当遇何人</span>
          </div>
        </div>

        <div className="space-y-4">
          {ENCOUNTERS.map((enc, i) => {
            const isSelected = selected === enc.key;
            return (
              <button
                key={enc.key}
                type="button"
                className="game-option-btn w-full text-left animate-fade-up"
                style={{
                  borderColor: hovered === enc.key || isSelected ? enc.themeColor : 'rgba(74,55,40,0.25)',
                  background: isSelected ? enc.themeColor : hovered === enc.key ? `${enc.themeColor}14` : 'rgba(249,246,240,0.55)',
                  animationDelay: `${i * 0.12}s`,
                  animationFillMode: 'forwards',
                  opacity: selected && !isSelected ? 0.35 : 1,
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                }}
                onMouseEnter={() => !selected && setHovered(enc.key)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => !selected && handleSelect(enc.key)}
              >
                <div className="flex items-center gap-4">
                  <div style={{ fontFamily: "'Ma Shan Zheng', serif", fontSize: '2rem', color: isSelected ? 'rgba(249,246,240,0.95)' : enc.themeColor, width: '40px', textAlign: 'center' }}>
                    {enc.label.charAt(0)}
                  </div>
                  <div>
                    <p className="text-lg font-medium mb-1" style={{ color: isSelected ? 'rgba(249,246,240,0.95)' : 'var(--ink)', letterSpacing: '0.05em' }}>
                      {enc.label}
                    </p>
                    <p className="text-sm" style={{ color: isSelected ? 'rgba(249,246,240,0.8)' : 'var(--ink-light)', letterSpacing: '0.05em' }}>
                      {enc.desc}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </GameSceneLayout>
  );
}
