import { useState } from 'react';
import { ENCOUNTERS, TYPES } from '../../data/gameContent';

export default function Vol2Encounter({ typeKey, onSelect }) {
  const type = TYPES[typeKey];
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  function handleSelect(key) {
    setSelected(key);
    setTimeout(() => onSelect(key), 800);
  }

  return (
    <div className="min-h-screen paper-bg flex flex-col items-center justify-center px-4 py-16 relative">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(90,60,20,0.15) 100%)' }} />

      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-8 animate-ink-fade" style={{ animationFillMode: 'forwards' }}>
          <p className="text-xs tracking-widest mb-2" style={{ color: 'var(--ash)' }}>卷 二</p>
          <h2 style={{ fontFamily: "'Ma Shan Zheng', serif", fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', color: 'var(--ink)', letterSpacing: '0.25em' }}>涉红尘</h2>
          <div className="chapter-line mt-4 mb-3">
            <span className="text-xs" style={{ color: type.color }}>{type.label}族出世，当遇何人？</span>
          </div>
        </div>

        <div className="space-y-4">
          {ENCOUNTERS.map((enc, i) => {
            const isSelected = selected === enc.key;
            return (
              <button
                key={enc.key}
                className="w-full text-left p-5 border transition-all duration-400 relative overflow-hidden animate-fade-up"
                style={{
                  borderColor: hovered === enc.key || isSelected ? enc.themeColor : 'rgba(74,55,40,0.25)',
                  background: isSelected ? enc.themeColor : hovered === enc.key ? `${enc.themeColor}12` : 'rgba(245,237,214,0.6)',
                  animationDelay: `${i * 0.12}s`,
                  animationFillMode: 'forwards',
                  opacity: selected && !isSelected ? 0.3 : 1,
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                }}
                onMouseEnter={() => !selected && setHovered(enc.key)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => !selected && handleSelect(enc.key)}
              >
                <div className="flex items-center gap-4">
                  <div style={{ fontFamily: "'Ma Shan Zheng', serif", fontSize: '2rem', color: isSelected ? 'rgba(245,237,214,0.9)' : enc.themeColor, width: '40px', textAlign: 'center' }}>
                    {enc.label.charAt(0)}
                  </div>
                  <div>
                    <p className="text-lg font-medium mb-1" style={{ color: isSelected ? 'rgba(245,237,214,0.95)' : 'var(--ink)', letterSpacing: '0.05em' }}>
                      {enc.label}
                    </p>
                    <p className="text-sm" style={{ color: isSelected ? 'rgba(245,237,214,0.75)' : 'var(--ink-light)', letterSpacing: '0.05em' }}>
                      {enc.desc}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
