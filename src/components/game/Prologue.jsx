import OrnateButton from '../layout/OrnateButton';

export default function Prologue({ onEnter }) {
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

      <div className="hero-page-content">
        <h1 className="hero-title">女妖模拟器</h1>
        <p className="hero-subtitle">
          你重生一世，择其形、遇其人、定其策——
          <br />
          每一抉择，皆可在志怪三书中寻得回响。
        </p>
        <OrnateButton onClick={onEnter}>点击开始</OrnateButton>
      </div>
    </div>
  );
}
