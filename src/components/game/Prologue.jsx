import TopNav from '../layout/TopNav';
import OrnateButton from '../layout/OrnateButton';

export default function Prologue({ onEnter, onEnterResearch }) {
  return (
    <div className="hero-page hero-page--artwork">
      <div className="hero-page-bg" aria-hidden="true">
        <img
          className="hero-page-bg-image"
          src="/images/home-hero.png"
          alt=""
          fetchPriority="high"
        />
      </div>

      <TopNav
        active="home"
        onStartSelect={onEnter}
        onDataAnalysis={onEnterResearch}
      />

      <div className="hero-page-overlay">
        <OrnateButton onClick={onEnter}>点击开始</OrnateButton>
      </div>

      {/* 背景图下方大面积可点区域，避免热区偏移点不到 */}
      <button
        type="button"
        className="hero-hit-area"
        onClick={onEnter}
        aria-label="点击开始"
      />
    </div>
  );
}
