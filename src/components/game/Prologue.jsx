import TopNav from '../layout/TopNav';

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
        overlay
        active="home"
        onStartSelect={onEnter}
        onDataAnalysis={onEnterResearch}
      />

      <button
        type="button"
        className="hero-hit-start"
        onClick={onEnter}
        aria-label="点击开始"
      />
    </div>
  );
}
