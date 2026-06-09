import { useState, useEffect } from 'react';
import './index.css';
import Prologue from './components/game/Prologue';
import Vol1Type from './components/game/Vol1Type';
import Vol2Strategy from './components/game/Vol2Strategy';
import Vol3Transition from './components/game/Vol3Transition';
import Vol4Result from './components/game/Vol4Result';
import ResearchPage from './components/research/ResearchPage';

function App() {
  // Game state: 'prologue' | 'vol1' | 'vol2' | 'vol3' | 'vol4' | 'research'
  const [phase, setPhase] = useState('prologue');
  const [gameData, setGameData] = useState({
    typeKey: null,
    stratKey: null,
    finalStratKey: null,
    transferred: false,
    score: 0,
  });
  const [gamePaths, setGamePaths] = useState(null);

  useEffect(() => {
    // Load game paths data
    fetch('/data.json')
      .then(r => r.json())
      .then(d => setGamePaths(d.gamePaths))
      .catch(() => setGamePaths({}));
  }, []);

  const handleEnterGame = () => setPhase('vol1');

  const handleSelectType = (typeKey) => {
    setGameData(prev => ({ ...prev, typeKey }));
    setPhase('vol2');
  };

  const handleSelectStrategy = (stratKey, scoreEffect) => {
    setGameData(prev => ({
      ...prev,
      stratKey,
      finalStratKey: stratKey,
      score: scoreEffect,
    }));
    setPhase('vol3');
  };

  const handleTransition = (newStratKey, scoreChange) => {
    setGameData(prev => ({
      ...prev,
      finalStratKey: newStratKey,
      transferred: newStratKey !== prev.stratKey,
      score: Math.max(0, Math.min(9, prev.score + scoreChange)),
    }));
    setPhase('vol4');
  };

  const handleEnterResearch = () => setPhase('research');

  if (phase === 'research') {
    return <ResearchPage />;
  }

  return (
    <>
      {phase === 'prologue' && <Prologue onEnter={handleEnterGame} />}
      {phase === 'vol1' && <Vol1Type onSelect={handleSelectType} />}
      {phase === 'vol2' && gameData.typeKey && (
        <Vol2Strategy typeKey={gameData.typeKey} onSelect={handleSelectStrategy} />
      )}
      {phase === 'vol3' && gameData.typeKey && gameData.stratKey && (
        <Vol3Transition
          typeKey={gameData.typeKey}
          stratKey={gameData.stratKey}
          currentScore={gameData.score}
          onSelect={handleTransition}
        />
      )}
      {phase === 'vol4' && gameData.typeKey && gameData.finalStratKey && (
        <Vol4Result
          typeKey={gameData.typeKey}
          stratKey={gameData.stratKey}
          finalStratKey={gameData.finalStratKey}
          transferred={gameData.transferred}
          finalScore={gameData.score}
          gamePaths={gamePaths}
          onEnterResearch={handleEnterResearch}
        />
      )}
    </>
  );
}

export default App;
