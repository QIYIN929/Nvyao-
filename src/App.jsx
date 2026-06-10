import { useState, useEffect } from 'react';
import './index.css';
import Prologue from './components/game/Prologue';
import Vol1Type from './components/game/Vol1Type';
import Vol2Encounter from './components/game/Vol2Encounter';
import Vol3Probe from './components/game/Vol3Probe';
import Vol4Crisis from './components/game/Vol4Crisis';
import Vol5Transition from './components/game/Vol5Transition';
import Vol6Cost from './components/game/Vol6Cost';
import Vol7Result from './components/game/Vol7Result';
import ResearchPage from './components/research/ResearchPage';

function App() {
  const [phase, setPhase] = useState('prologue'); // prologue -> vol1 -> vol2 -> vol3 -> vol4 -> vol5 -> vol6 -> vol7 -> research
  const [gameData, setGameData] = useState({
    typeKey: null,
    typeScore: 0,
    encKey: null,
    stratKey: null,      // original strategy
    finalStratKey: null, // final strategy after transition (if any)
    transferred: false,
    score: 0,            // running score
    outcomeStr: '',
  });
  const [gamePaths, setGamePaths] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(r => r.json())
      .then(d => setGamePaths(d.gamePaths))
      .catch(() => setGamePaths({}));
  }, []);

  const handleEnterGame = () => setPhase('vol1');

  const handleSelectType = (typeKey) => {
    // 狐/仙=3, 鬼/精=1
    const s = (typeKey === '狐' || typeKey === '仙') ? 3 : 1;
    setGameData(prev => ({ ...prev, typeKey, typeScore: s, score: s }));
    setPhase('vol2');
  };

  const handleSelectEncounter = (encKey) => {
    setGameData(prev => ({ ...prev, encKey }));
    if (encKey === 'hermit') {
      // Direct jump to end
      setGameData(prev => ({
        ...prev,
        stratKey: '避世', finalStratKey: '避世',
        score: prev.typeScore + 5, // 6-8 range
        outcomeStr: '得道飞升/化为山神'
      }));
      setPhase('vol7');
    } else {
      setPhase('vol3');
    }
  };

  const handleFinishProbe = () => {
    setPhase('vol4');
  };

  const handleCrisisSelect = (strat) => {
    setGameData(prev => ({
      ...prev,
      stratKey: strat.key,
      finalStratKey: strat.key,
      score: prev.score + strat.score,
    }));
    
    if (strat.success) {
      // Proceed to Cost
      setGameData(prev => ({ ...prev, currentCostType: strat.costType }));
      setPhase('vol6');
    } else {
      // Bankrupt -> Transition
      setGameData(prev => ({ ...prev, failedStrat: strat }));
      setPhase('vol5');
    }
  };

  const handleTransition = (trans) => {
    setGameData(prev => ({
      ...prev,
      finalStratKey: trans.strategyKey,
      transferred: true,
      score: prev.score + trans.scoreChange,
      outcomeStr: trans.action, // Use the transition action as a short outcome
    }));
    // After transition, we skip Vol 6 and go straight to Vol 7
    setPhase('vol7');
  };

  const handleCostSelect = (costChoice) => {
    setGameData(prev => ({
      ...prev,
      outcomeStr: costChoice.outcome,
    }));
    setPhase('vol7');
  };

  const handleEnterResearch = () => setPhase('research');

  if (phase === 'research') return <ResearchPage />;

  return (
    <>
      {phase === 'prologue' && <Prologue onEnter={handleEnterGame} />}
      {phase === 'vol1' && <Vol1Type onSelect={handleSelectType} />}
      {phase === 'vol2' && gameData.typeKey && (
        <Vol2Encounter typeKey={gameData.typeKey} onSelect={handleSelectEncounter} />
      )}
      {phase === 'vol3' && gameData.encKey && (
        <Vol3Probe encKey={gameData.encKey} onSelect={handleFinishProbe} />
      )}
      {phase === 'vol4' && gameData.encKey && (
        <Vol4Crisis encKey={gameData.encKey} onSelect={handleCrisisSelect} />
      )}
      {phase === 'vol5' && gameData.failedStrat && (
        <Vol5Transition encKey={gameData.encKey} failedStrat={gameData.failedStrat} onSelect={handleTransition} />
      )}
      {phase === 'vol6' && gameData.currentCostType && (
        <Vol6Cost costType={gameData.currentCostType} onSelect={handleCostSelect} />
      )}
      {phase === 'vol7' && gameData.typeKey && (
        <Vol7Result 
          typeKey={gameData.typeKey}
          encKey={gameData.encKey}
          finalStratKey={gameData.finalStratKey}
          transferred={gameData.transferred}
          finalScore={gameData.score}
          outcomeStr={gameData.outcomeStr}
          gamePaths={gamePaths}
          onEnterResearch={handleEnterResearch}
        />
      )}
    </>
  );
}

export default App;
