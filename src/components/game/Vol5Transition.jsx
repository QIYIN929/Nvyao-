import { useState } from 'react';
import { ENCOUNTERS, TRANSITIONS } from '../../data/gameContent';

export default function Vol5Transition({ encKey, failedStrat, onSelect }) {
  const encounter = ENCOUNTERS.find(e => e.key === encKey);
  const transList = TRANSITIONS[encounter.crisisKey];
  const [selected, setSelected] = useState(null);

  function handleSelect(t) {
    setSelected(t);
    setTimeout(() => onSelect(t), 1500);
  }

  return (
    <div className="min-h-screen paper-bg flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-6 animate-ink-fade">
          <p className="text-xs tracking-widest mb-1" style={{ color: 'var(--ash)' }}>卷 五</p>
          <h2 style={{ fontFamily: "'Ma Shan Zheng', serif", fontSize: '2rem', color: 'var(--ink)' }}>破与立</h2>
          <div className="chapter-line mt-3 mb-3"><span className="text-xs text-red-800">策略破产·强制转换</span></div>
        </div>

        <div className="mb-6 p-5 border animate-fade-up relative overflow-hidden" style={{ borderColor: 'var(--vermillion)', background: 'rgba(245,237,214,0.5)' }}>
          <div className="absolute top-0 left-0 w-1 h-full bg-red-800" />
          <p className="text-sm leading-8" style={{ color: 'var(--ink-light)' }}>{failedStrat.failText}</p>
          <p className="mt-3 text-xs italic" style={{ color: 'var(--vermillion)' }}>你的【{failedStrat.label}】失败了。大错已铸成，此时你该如何自处？</p>
        </div>

        {!selected ? (
          <div className="space-y-3">
            {transList.map((t, i) => (
              <button
                key={t.key}
                className="w-full text-left p-4 border transition-all duration-300 animate-fade-up"
                style={{ borderColor: 'rgba(74,55,40,0.3)', background: 'rgba(139,26,26,0.03)', animationDelay: `${i * 0.1}s` }}
                onClick={() => handleSelect(t)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1" style={{ color: 'var(--vermillion)', border: '1px solid var(--vermillion)' }}>转：{t.key}</span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>【{t.label}】</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--ink-light)' }}>{t.action}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center mt-8 animate-ink-fade text-xs" style={{ color: 'var(--ash)' }}>因果已定……</div>
        )}
      </div>
    </div>
  );
}
