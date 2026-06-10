import { useState } from 'react';
import { ENCOUNTERS, PROBES } from '../../data/gameContent';

export default function Vol3Probe({ encKey, onSelect }) {
  const encounter = ENCOUNTERS.find(e => e.key === encKey);
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  function handleSelect() {
    setSelected(true);
    setTimeout(() => onSelect(), 1000);
  }

  return (
    <div className="min-h-screen paper-bg flex flex-col items-center justify-center px-4 py-16 relative">
      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-8 animate-ink-fade">
          <p className="text-xs tracking-widest mb-2" style={{ color: 'var(--ash)' }}>卷 三</p>
          <h2 style={{ fontFamily: "'Ma Shan Zheng', serif", fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', color: 'var(--ink)' }}>风波起</h2>
          <div className="chapter-line mt-4 mb-4"><span className="text-xs" style={{ color: 'var(--ash)' }}>隐患初显</span></div>
          <p className="text-sm leading-8" style={{ color: 'var(--ink-light)', letterSpacing: '0.1em' }}>
            与【{encounter.label}】相伴的时日里，并非密不透风。<br />
            异象初显，旁人已生疑窦，风雨欲来。
          </p>
        </div>

        <div className="space-y-4">
          {PROBES.map((p, i) => (
            <button
              key={p.key}
              className="w-full text-left p-4 border transition-all duration-300 animate-fade-up"
              style={{
                borderColor: hovered === p.key ? 'var(--vermillion)' : 'rgba(74,55,40,0.2)',
                background: hovered === p.key ? 'rgba(139,26,26,0.05)' : 'rgba(245,237,214,0.5)',
                animationDelay: `${0.1 + i * 0.1}s`,
                opacity: selected ? 0 : 1,
              }}
              onMouseEnter={() => setHovered(p.key)}
              onMouseLeave={() => setHovered(null)}
              onClick={handleSelect}
            >
              <p className="font-medium text-sm mb-1" style={{ color: 'var(--ink)' }}>【{p.label}】</p>
              <p className="text-xs" style={{ color: 'var(--ink-light)' }}>{p.desc}</p>
            </button>
          ))}
        </div>

        {selected && (
          <p className="text-center mt-6 text-sm italic animate-ink-fade" style={{ color: 'var(--vermillion)' }}>
            但纸终究包不住火……
          </p>
        )}
      </div>
    </div>
  );
}
