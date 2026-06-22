import { useState } from 'react';
import { TYPE_PANELS } from '../../data/gameContent';
import TopNav from '../layout/TopNav';

const TYPE_ORDER = ['狐', '鬼', '精', '仙'];

function PanelSilhouette({ type }) {
  return (
    <div className={`type-silhouette type-silhouette-${type}`} aria-hidden="true">
      <div className="type-silhouette-figure" />
    </div>
  );
}

export default function Vol1Type({ onSelect, onEnterResearch, onBackHome }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  function handleSelect(key) {
    setSelected(key);
    setTimeout(() => onSelect(key), 500);
  }

  return (
    <div className="select-page">
      <TopNav
        active="select"
        onStartSelect={() => {}}
        onDataAnalysis={onEnterResearch}
      />

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
              className={`type-panel ${isHovered ? 'type-panel-hover' : ''} ${isSelected ? 'type-panel-selected' : ''}`}
              style={{
                background: panel.bg,
                opacity: isFading ? 0.35 : 1,
              }}
              onMouseEnter={() => !selected && setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => !selected && handleSelect(key)}
              disabled={!!selected}
            >
              <div className="type-panel-top">
                <span className="type-panel-char" style={{ color: panel.accent }}>
                  {panel.label}
                </span>
              </div>

              <p className="type-panel-verse vertical-text" style={{ color: panel.accent }}>
                {panel.verse}
              </p>

              <PanelSilhouette type={panel.silhouette} />

              <div className="type-panel-mist" aria-hidden="true" />
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
