export default function TopNav({ onRestart, onResearch, variant = 'default' }) {
  return (
    <header className={`site-nav site-nav--global site-nav--${variant}`}>
      <div className="site-nav-bar">
        <button type="button" className="site-logo" onClick={onRestart} aria-label="返回首页">
          女妖模拟器
        </button>
        <div className="site-nav-actions">
          <button type="button" className="site-nav-btn" onClick={onRestart}>
            重新开始
          </button>
          <button type="button" className="site-nav-btn site-nav-btn--primary" onClick={onResearch}>
            检索数据
          </button>
        </div>
      </div>
    </header>
  );
}
