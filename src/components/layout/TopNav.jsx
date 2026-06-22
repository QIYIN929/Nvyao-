const ORNATE_SVG = (
  <svg className="nav-ornate-svg" viewBox="0 0 120 32" preserveAspectRatio="none" aria-hidden="true">
    <path
      d="M6 16 L14 8 L106 8 L114 16 L106 24 L14 24 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path d="M10 16 L16 12 L104 12 L110 16 L104 20 L16 20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
  </svg>
);

export default function TopNav({ active = 'home', onStartSelect, onDataAnalysis }) {
  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <button
          type="button"
          className={`nav-link ${active === 'select' ? 'nav-link-active' : ''}`}
          onClick={onStartSelect}
        >
          {ORNATE_SVG}
          <span>开始选择</span>
        </button>

        <div className="nav-diamond" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <button
          type="button"
          className={`nav-link ${active === 'research' ? 'nav-link-active' : ''}`}
          onClick={onDataAnalysis}
        >
          {ORNATE_SVG}
          <span>数据分析</span>
        </button>
      </div>
    </header>
  );
}
