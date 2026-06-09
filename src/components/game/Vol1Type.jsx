import { useState } from 'react';
import { TYPES } from '../../data/gameContent';

const TYPE_ORDER = ['狐', '鬼', '精', '仙'];

export default function Vol1Type({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  function handleSelect(key) {
    setSelected(key);
    setTimeout(() => onSelect(key), 600);
  }

  return (
    <div className="min-h-screen paper-bg flex flex-col items-center justify-center px-4 py-16 relative">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(90,60,20,0.15) 100%)' }} />

      <div className="max-w-2xl w-full relative z-10">
        {/* Chapter header */}
        <div className="text-center mb-10 animate-ink-fade" style={{ animationFillMode: 'forwards' }}>
          <p className="text-xs tracking-widest mb-2" style={{ color: 'var(--ash)' }}>卷 一</p>
          <h2 style={{
            fontFamily: "'Ma Shan Zheng', serif",
            fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
            color: 'var(--ink)',
            letterSpacing: '0.25em',
          }}>辨其形</h2>
          <div className="chapter-line mt-4 mb-3">
            <span className="text-xs" style={{ color: 'var(--ash)' }}>異類類型</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-light)', letterSpacing: '0.1em' }}>
            泛黄的纸页上，浮现出四种模糊的轮廓。<br />
            古篆标注了她们的出身。
          </p>
        </div>

        {/* Type cards */}
        <div className="grid grid-cols-2 gap-4">
          {TYPE_ORDER.map((key, i) => {
            const t = TYPES[key];
            const isSelected = selected === key;
            const isFading = selected && selected !== key;
            return (
              <button
                key={key}
                className="text-left p-6 border transition-all duration-400 relative overflow-hidden animate-fade-up"
                style={{
                  borderColor: hovered === key || isSelected ? t.color : 'rgba(74,55,40,0.25)',
                  background: isSelected ? t.color : hovered === key ? `${t.color}12` : 'rgba(245,237,214,0.6)',
                  animationDelay: `${i * 0.12}s`,
                  animationFillMode: 'forwards',
                  opacity: isFading ? 0.3 : 1,
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  cursor: selected ? 'default' : 'pointer',
                }}
                onMouseEnter={() => !selected && setHovered(key)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => !selected && handleSelect(key)}
              >
                {/* Big character */}
                <div style={{
                  fontFamily: "'Ma Shan Zheng', serif",
                  fontSize: '3rem',
                  color: isSelected ? 'rgba(245,237,214,0.9)' : t.color,
                  lineHeight: 1,
                  marginBottom: '8px',
                  textShadow: isSelected ? 'none' : `0 2px 8px ${t.color}40`,
                }}>
                  {t.label}
                </div>

                <p className="text-sm font-medium mb-2" style={{
                  color: isSelected ? 'rgba(245,237,214,0.95)' : 'var(--ink)',
                  letterSpacing: '0.05em',
                }}>
                  {t.subtitle}
                </p>

                <p className="text-xs leading-relaxed" style={{
                  color: isSelected ? 'rgba(245,237,214,0.75)' : 'var(--ink-light)',
                  letterSpacing: '0.05em',
                }}>
                  {t.desc}
                </p>

                {/* Corner decoration */}
                <div className="absolute top-2 right-3 text-xs opacity-40" style={{
                  color: isSelected ? 'rgba(245,237,214,0.6)' : t.color,
                  fontFamily: 'serif',
                }}>
                  {['一','二','三','四'][i]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Instruction */}
        <p className="text-center text-xs mt-6 animate-ink-fade delay-700"
          style={{ color: 'var(--ash)', letterSpacing: '0.15em', animationFillMode: 'forwards' }}>
          · 点击选择，揭晓她的名目 ·
        </p>
      </div>
    </div>
  );
}
