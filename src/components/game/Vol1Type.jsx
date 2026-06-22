import { useState } from 'react';
import { TYPE_PANELS } from '../../data/gameContent';
import TopNav from '../layout/TopNav';

const TYPE_ORDER = ['狐', '鬼', '精', '仙'];
const PANEL_BG_POS = ['0% 9%', '33.33% 9%', '66.66% 9%', '100% 9%'];

export default function Vol1Type({ onSelect, onEnterResearch, onBackHome }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  function handleSelect(key) {
    setSelected(key);
    setTimeout(() => onSelect(key), 500);
  }

  return (
    <div className="select-page select-page--artwork">
      <TopNav
        active="select"
        onStartSelect={() => {}}
        onDataAnalysis={onEnterResearch}
      />

      <main className="select-page-main">
        {TYPE_ORDER.map((key, index) => {
          const panel = TYPE_PANELS[key];
          const isSelected = selected === key;
          const isFading = selected && selected !== key;
          const isHovered = hovered === key;

          return (
            <button
              key={key}
              type="button"
              className={`type-panel type-panel--artwork ${isHovered ? 'type-panel-hover' : ''} ${isSelected ? 'type-panel-selected' : ''}`}
              style={{
                backgroundImage: "url('/images/select-panels.png')",
                backgroundSize: '400% 112%',
                backgroundPosition: PANEL_BG_POS[index],
                backgroundRepeat: 'no-repeat',
                opacity: isFading ? 0.35 : 1,
              }}
              onMouseEnter={() => !selected && setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => !selected && handleSelect(key)}
              disabled={!!selected}
              aria-label={`选择${panel.label}：${panel.verse}`}
              data-panel-index={index}
            >
              <span className="sr-only">{panel.label}</span>
            </button>
          );
        })}
      </main>

      <button type="button" className="select-back-link" onClick={onBackHome}>
        返回序章
      </button>
    </div>
  );
}
