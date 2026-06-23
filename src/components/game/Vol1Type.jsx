import { useState } from 'react';
import { TYPE_PANELS } from '../../data/gameContent';

const TYPE_ORDER = ['狐', '鬼', '精', '仙'];

export default function Vol1Type({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  function handleSelect(key) {
    setSelected(key);
    setTimeout(() => onSelect(key), 500);
  }

  return (
    <div className="select-page select-page--artwork">
      <div className="select-page-bg" aria-hidden="true">
        <img
          className="select-page-bg-image"
          src="/images/select-panels.png"
          alt=""
        />
      </div>

      <main className="select-page-main">
        {TYPE_ORDER.map((key) => {
          const panel = TYPE_PANELS[key];
          const isSelected = selected === key;
          const isFading = selected && selected !== key;
          const isHovered = hovered === key;

          return (
            <button
              key={key}
              type="button"
              className={`type-hit-zone ${isHovered ? 'type-hit-zone--hover' : ''} ${isSelected ? 'type-hit-zone--selected' : ''}`}
              style={{
                '--panel-accent': panel.accent,
                opacity: isFading ? 0.45 : 1,
              }}
              onMouseEnter={() => !selected && setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => !selected && handleSelect(key)}
              disabled={!!selected}
              aria-label={`选择${panel.label}：${panel.verse}`}
            >
              <span className="sr-only">{panel.label}</span>
            </button>
          );
        })}
      </main>
    </div>
  );
}
