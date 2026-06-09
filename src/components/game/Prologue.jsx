import { useState, useEffect } from 'react';
import { PROLOGUE_TEXT } from '../../data/gameContent';

export default function Prologue({ onEnter }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timers = [];
    PROLOGUE_TEXT.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 600 + i * 700));
    });
    timers.push(setTimeout(() => setShowTitle(true), 600 + PROLOGUE_TEXT.length * 700 + 200));
    timers.push(setTimeout(() => setShowButton(true), 600 + PROLOGUE_TEXT.length * 700 + 1200));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen paper-bg flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Aged paper vignette */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(90,60,20,0.18) 100%)' }} />

      {/* Vertical line decoration */}
      <div className="absolute top-0 bottom-0 left-16 w-px opacity-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #4A3728, transparent)' }} />
      <div className="absolute top-0 bottom-0 right-16 w-px opacity-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #4A3728, transparent)' }} />

      <div className="max-w-xl w-full text-center relative z-10">
        {/* Seal top */}
        <div className="flex justify-center mb-10 opacity-0 animate-ink-fade" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="seal w-8 h-16 text-sm" style={{ fontSize: '14px' }}>女妖自述</div>
        </div>

        {/* Prologue text lines */}
        <div className="space-y-3 mb-8">
          {PROLOGUE_TEXT.map((line, i) => (
            <p
              key={i}
              className="text-base leading-relaxed transition-all duration-700"
              style={{
                fontFamily: "'Noto Serif SC', serif",
                color: 'var(--ink-light)',
                letterSpacing: '0.1em',
                opacity: visibleLines > i ? 1 : 0,
                transform: visibleLines > i ? 'translateY(0)' : 'translateY(8px)',
                minHeight: line === '' ? '0.5rem' : undefined,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Big title */}
        {showTitle && (
          <div className="my-8 animate-seal">
            <h1
              style={{
                fontFamily: "'Ma Shan Zheng', 'Noto Serif SC', serif",
                fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                color: 'var(--vermillion)',
                letterSpacing: '0.3em',
                textShadow: '2px 2px 8px rgba(139,26,26,0.2)',
              }}
            >
              女妖自述
            </h1>
            <p className="mt-2 text-sm" style={{ color: 'var(--ash)', letterSpacing: '0.2em' }}>
              志怪三书·异类女性生存策略研究
            </p>
          </div>
        )}

        {/* Chapter divider */}
        {showTitle && (
          <div className="chapter-line my-6 animate-ink-fade" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <span className="text-xs tracking-widest" style={{ color: 'var(--ash)' }}>序章</span>
          </div>
        )}

        {/* Enter button */}
        {showButton && (
          <div className="animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            <p className="text-sm mb-6" style={{ color: 'var(--ash)', letterSpacing: '0.15em' }}>
              执笔者不知何人，然字迹时而工整，时而潦草，<br />
              某处以浓墨涂去——仿佛她曾回头，不甘。
            </p>
            <button
              onClick={onEnter}
              className="group relative px-10 py-3 border transition-all duration-300"
              style={{
                borderColor: 'var(--vermillion)',
                color: 'var(--vermillion)',
                background: 'transparent',
                fontFamily: "'Noto Serif SC', serif",
                letterSpacing: '0.2em',
                fontSize: '15px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--vermillion)';
                e.currentTarget.style.color = 'var(--paper)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--vermillion)';
              }}
            >
              拾起手稿
            </button>
          </div>
        )}
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-30">
        <div style={{ color: 'var(--ash)', fontSize: '12px', letterSpacing: '0.3em' }}>
          ◆ ◇ ◆
        </div>
      </div>
    </div>
  );
}
