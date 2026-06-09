import { useState } from 'react';
import { TYPES, STRATEGIES } from '../../data/gameContent';

const STRAT_ORDER = ['博弈型', '情感型', '顺从型', '抗争型', '非自主'];

const STRAT_COLORS = {
  博弈型: { bg: '#A07820', light: '#C8982A' },
  情感型: { bg: '#8B1A1A', light: '#C53030' },
  顺从型: { bg: '#6B5B4E', light: '#8A7568' },
  抗争型: { bg: '#2C4A3E', light: '#3D6B5C' },
  非自主: { bg: '#3A3A4A', light: '#5A5A6E' },
};

export default function Vol2Strategy({ typeKey, onSelect }) {
  const type = TYPES[typeKey];
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showText, setShowText] = useState(false);

  function handleSelect(key) {
    setSelected(key);
    setShowText(true);
    setTimeout(() => onSelect(key, STRATEGIES[key].scoreEffect), 1400);
  }

  return (
    <div className="min-h-screen paper-bg flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(90,60,20,0.15) 100%)' }} />

      <div className="max-w-2xl w-full relative z-10">
        {/* Chapter header */}
        <div className="text-center mb-6 animate-ink-fade" style={{ animationFillMode: 'forwards' }}>
          <p className="text-xs tracking-widest mb-1" style={{ color: 'var(--ash)' }}>卷 二</p>
          <h2 style={{
            fontFamily: "'Ma Shan Zheng', serif",
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            color: 'var(--ink)',
            letterSpacing: '0.25em',
          }}>初劫·择路</h2>
          <div className="chapter-line mt-3 mb-3">
            <span className="text-xs" style={{ color: type.color }}>
              {type.label} · {type.subtitle}
            </span>
          </div>
        </div>

        {/* Crisis scene */}
        <div className="mb-6 p-5 border-l-2 animate-fade-up"
          style={{ borderColor: type.color, background: 'rgba(245,237,214,0.4)', animationFillMode: 'forwards' }}>
          <p className="text-sm leading-8" style={{
            color: 'var(--ink-light)',
            fontFamily: "'Noto Serif SC', serif",
            letterSpacing: '0.1em',
          }}>
            {type.crisis}
          </p>
        </div>

        {/* Strategy options */}
        {!showText ? (
          <div className="space-y-3">
            {STRAT_ORDER.map((key, i) => {
              const s = STRATEGIES[key];
              const c = STRAT_COLORS[key];
              return (
                <button
                  key={key}
                  className="w-full text-left p-4 border transition-all duration-300 animate-fade-up"
                  style={{
                    borderColor: hovered === key ? c.bg : 'rgba(74,55,40,0.2)',
                    background: hovered === key ? `${c.bg}15` : 'rgba(245,237,214,0.5)',
                    animationDelay: `${0.1 + i * 0.08}s`,
                    animationFillMode: 'forwards',
                  }}
                  onMouseEnter={() => setHovered(key)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleSelect(key)}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: '1.2rem', color: c.bg }}>{s.icon}</span>
                    <div className="flex-1">
                      <span className="font-medium text-sm" style={{ color: 'var(--ink)', letterSpacing: '0.08em' }}>
                        {s.label}
                      </span>
                      <span className="ml-2 text-xs" style={{ color: 'var(--ash)' }}>
                        {s.shortDesc}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{
                      background: `${c.bg}20`,
                      color: c.bg,
                      letterSpacing: '0.05em',
                    }}>
                      {s.effectDesc.split('｜')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Show selected strategy narrative */
          selected && (
            <div className="animate-fade-up" style={{ animationFillMode: 'forwards' }}>
              <div className="p-6 border" style={{
                borderColor: STRAT_COLORS[selected].bg,
                background: `${STRAT_COLORS[selected].bg}08`,
              }}>
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ fontSize: '1.3rem', color: STRAT_COLORS[selected].bg }}>
                    {STRATEGIES[selected].icon}
                  </span>
                  <span className="font-medium" style={{
                    color: STRAT_COLORS[selected].bg,
                    letterSpacing: '0.1em',
                    fontFamily: "'Noto Serif SC', serif",
                  }}>
                    {STRATEGIES[selected].label}
                  </span>
                </div>
                <p className="text-sm leading-8 whitespace-pre-line" style={{
                  color: 'var(--ink-light)',
                  letterSpacing: '0.1em',
                  fontFamily: "'Noto Serif SC', serif",
                }}>
                  {STRATEGIES[selected].fullText(typeKey)}
                </p>
                <p className="mt-4 text-xs" style={{ color: STRAT_COLORS[selected].bg, letterSpacing: '0.1em' }}>
                  {STRATEGIES[selected].effectDesc}
                </p>
              </div>
              <p className="text-center text-xs mt-4 animate-flicker" style={{ color: 'var(--ash)' }}>
                翻页中……
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
