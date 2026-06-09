import { useState } from 'react';
import { TYPES, STRATEGIES, TRANSITIONS, CRISIS_ESCALATION } from '../../data/gameContent';

export default function Vol3Transition({ typeKey, stratKey, currentScore, onSelect }) {
  const type = TYPES[typeKey];
  const strat = STRATEGIES[stratKey];
  const transitions = TRANSITIONS[stratKey] || [];
  const [selected, setSelected] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);

  function handleStay() {
    setSelected('stay');
    setShowOutcome(true);
    setTimeout(() => onSelect(stratKey, 0), 1200);
  }

  function handleTransition(t) {
    setSelected(t.key);
    setShowOutcome(true);
    setTimeout(() => onSelect(t.key, t.scoreChange), 1400);
  }

  const escalation = CRISIS_ESCALATION[typeKey];

  return (
    <div className="min-h-screen paper-bg flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(90,60,20,0.15) 100%)' }} />

      <div className="max-w-2xl w-full relative z-10">
        {/* Chapter header */}
        <div className="text-center mb-6 animate-ink-fade" style={{ animationFillMode: 'forwards' }}>
          <p className="text-xs tracking-widest mb-1" style={{ color: 'var(--ash)' }}>卷 三</p>
          <h2 style={{
            fontFamily: "'Ma Shan Zheng', serif",
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            color: 'var(--ink)',
            letterSpacing: '0.25em',
          }}>变局·易辙</h2>
          <div className="chapter-line mt-3 mb-3">
            <span className="text-xs" style={{ color: 'var(--ash)' }}>策略转换</span>
          </div>
        </div>

        {/* Escalation scene — with correction marks */}
        <div className="mb-6 p-5 border animate-fade-up"
          style={{ borderColor: 'rgba(74,55,40,0.3)', background: 'rgba(245,237,214,0.5)', animationFillMode: 'forwards' }}>
          <p className="text-xs mb-3 flex items-center gap-2" style={{ color: 'var(--ash)' }}>
            <span>📜</span>
            <span style={{ letterSpacing: '0.1em' }}>手稿此处字迹潦草，旁有涂改痕迹</span>
          </p>
          <p className="text-sm leading-8" style={{
            color: 'var(--ink-light)',
            letterSpacing: '0.1em',
            fontFamily: "'Noto Serif SC', serif",
          }}>
            {escalation}
          </p>
          <div className="mt-3 pt-3 border-t" style={{ borderColor: 'rgba(74,55,40,0.15)' }}>
            <p className="text-sm leading-7 font-medium" style={{
              color: 'var(--ink)',
              letterSpacing: '0.1em',
              fontFamily: "'Noto Serif SC', serif",
            }}>
              「然劫数愈炽，此前所行之路已难为继。她是否改易其策？」
            </p>
          </div>
        </div>

        {!showOutcome ? (
          <div className="space-y-3">
            {/* Stay option */}
            <button
              className="w-full text-left p-4 border transition-all duration-300 animate-fade-up"
              style={{
                borderColor: 'rgba(74,55,40,0.3)',
                background: 'rgba(245,237,214,0.5)',
                animationDelay: '0.1s',
                animationFillMode: 'forwards',
              }}
              onClick={handleStay}
            >
              <div className="flex items-start gap-3">
                <span style={{ color: 'var(--ash)', fontSize: '1.1rem', marginTop: '2px' }}>—</span>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--ink)', letterSpacing: '0.08em' }}>
                    否，仍行旧路
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--ash)', letterSpacing: '0.06em' }}>
                    坚持{strat.label}，转换未发生·主体性不变
                  </p>
                </div>
              </div>
            </button>

            {/* Transition options */}
            {transitions.map((t, i) => (
              <button
                key={t.key}
                className="w-full text-left p-4 border transition-all duration-300 animate-fade-up"
                style={{
                  borderColor: 'var(--vermillion)',
                  background: 'rgba(139,26,26,0.05)',
                  animationDelay: `${0.18 + i * 0.1}s`,
                  animationFillMode: 'forwards',
                }}
                onClick={() => handleTransition(t)}
              >
                <div className="flex items-start gap-3">
                  <span style={{ color: 'var(--vermillion)', fontSize: '1.1rem', marginTop: '2px' }}>↻</span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--vermillion)', letterSpacing: '0.08em' }}>
                      是，{t.label}
                    </p>
                    <p className="text-xs mt-1 leading-5" style={{ color: 'var(--ink-light)', letterSpacing: '0.06em' }}>
                      {t.desc}
                    </p>
                    <p className="text-xs mt-1 italic" style={{ color: 'var(--ash)', letterSpacing: '0.08em' }}>
                      {t.quote}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--vermillion)' }}>
                      {t.label2}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="animate-fade-up p-5 border text-center"
            style={{ borderColor: 'rgba(74,55,40,0.3)', background: 'rgba(245,237,214,0.5)', animationFillMode: 'forwards' }}>
            {selected === 'stay' ? (
              <>
                <p className="text-sm leading-8" style={{ color: 'var(--ink-light)', letterSpacing: '0.12em' }}>
                  手稿此处，字迹虽潦草，却未曾划去。<br />
                  她的选择留了下来，完整而坚定。
                </p>
                <p className="mt-3 text-xs" style={{ color: 'var(--ash)' }}>转换未发生</p>
              </>
            ) : (
              <>
                <p className="text-sm leading-8" style={{ color: 'var(--ink-light)', letterSpacing: '0.12em' }}>
                  {transitions.find(t => t.key === selected)?.desc}
                </p>
                <p className="mt-3 text-sm italic" style={{ color: 'var(--vermillion)', letterSpacing: '0.1em' }}>
                  {transitions.find(t => t.key === selected)?.quote}
                </p>
              </>
            )}
            <p className="text-center text-xs mt-4 animate-flicker" style={{ color: 'var(--ash)' }}>
              翻页中……
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
