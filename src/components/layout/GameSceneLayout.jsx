export default function GameSceneLayout({ children, faded = false, wide = false, center = true }) {
  return (
    <div className={`game-scene${faded ? ' game-scene--faded' : ''}${wide ? ' game-scene--wide' : ''}${center ? '' : ' game-scene--scroll'}`}>
      <div className="game-scene-bg" aria-hidden="true">
        <img className="game-scene-bg-image" src="/images/game-bg.png" alt="" />
        {faded && <div className="game-scene-bg-wash" />}
      </div>
      <div className="game-scene-body">
        {children}
      </div>
    </div>
  );
}
