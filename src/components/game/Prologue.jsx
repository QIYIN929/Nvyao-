import TopNav from '../layout/TopNav';
import OrnateButton from '../layout/OrnateButton';

export default function Prologue({ onEnter, onEnterResearch }) {
  return (
    <div className="hero-page">
      <div className="hero-page-bg" aria-hidden="true">
        <div className="hero-page-bg-image" />
        <div className="hero-page-bg-vignette" />
      </div>

      <TopNav
        active="home"
        onStartSelect={onEnter}
        onDataAnalysis={onEnterResearch}
      />

      <main className="hero-page-main">
        <aside className="hero-aside">
          <p className="hero-aside-text vertical-text">
            山中有女妖，自述一段遥远的故事。
          </p>
          <div className="hero-seal">述</div>
        </aside>

        <section className="hero-center">
          <h1 className="hero-title">女妖自述</h1>
          <OrnateButton onClick={onEnter}>点击开始</OrnateButton>
        </section>
      </main>
    </div>
  );
}
