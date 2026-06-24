import { useState, useEffect } from 'react';
import './index.css';
import { HERMIT_OUTCOME, STRATEGY_RESEARCH_KEYS } from './data/gameContent';
import TopNav from './components/layout/TopNav';
import Prologue from './components/game/Prologue';
import Vol1Type from './components/game/Vol1Type';
import Vol2Encounter from './components/game/Vol2Encounter';
import Vol4Crisis from './components/game/Vol4Crisis';
import Vol5Transition from './components/game/Vol5Transition';
import Vol6Cost from './components/game/Vol6Cost';
import Vol7Result from './components/game/Vol7Result';
import ResearchPage from './components/research/ResearchPage';
import { parseEntryRouteHash } from './lib/researchUtils';

const INITIAL_GAME_DATA = {
  typeKey: null,
  typeScore: 0,
  encKey: null,
  stratKey: null,
  finalStratKey: null,
  transferred: false,
  score: 0,
  outcomeStr: '',
};

function App() {
  const [phase, setPhase] = useState(() => (
    parseEntryRouteHash(window.location.hash) ? 'research' : 'prologue'
  ));
  const [gameData, setGameData] = useState(INITIAL_GAME_DATA);

  useEffect(() => {
    const onHashChange = () => {
      if (parseEntryRouteHash(window.location.hash)) {
        setPhase('research');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleRestart = () => {
    setGameData(INITIAL_GAME_DATA);
    setPhase('prologue');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleEnterGame = () => setPhase('vol1');

  const handleSelectType = (typeKey) => {
    const s = (typeKey === '狐' || typeKey === '仙') ? 3 : 1;
    setGameData(prev => ({ ...prev, typeKey, typeScore: s, score: s }));
    setPhase('vol2');
  };

  const handleSelectEncounter = (encKey) => {
    setGameData(prev => ({ ...prev, encKey }));
    if (encKey === 'hermit') {
      setGameData(prev => ({
        ...prev,
        stratKey: '避世', finalStratKey: '避世',
        score: prev.typeScore + 3,
        outcomeStr: HERMIT_OUTCOME.outcomeStr,
      }));
      setPhase('vol6');
    } else {
      setPhase('vol3');
    }
  };

  const handleCrisisSelect = (strat) => {
    const researchKey = STRATEGY_RESEARCH_KEYS[strat.key] || strat.key;
    setGameData(prev => ({
      ...prev,
      stratKey: strat.key,
      finalStratKey: researchKey,
      score: prev.score + strat.score,
    }));

    if (strat.success) {
      setGameData(prev => ({ ...prev, currentCostType: strat.costType }));
      setPhase('vol5');
    } else {
      setGameData(prev => ({ ...prev, failedStrat: strat }));
      setPhase('vol4');
    }
  };

  const handleTransition = (trans) => {
    setGameData(prev => ({
      ...prev,
      finalStratKey: trans.strategyKey,
      transferred: true,
      score: prev.score + trans.scoreChange,
      outcomeStr: trans.action,
    }));
    setPhase('vol6');
  };

  const handleCostSelect = (costChoice) => {
    setGameData(prev => ({
      ...prev,
      outcomeStr: costChoice.outcome,
      score: prev.score + (costChoice.scoreDelta ?? 0),
    }));
    setPhase('vol6');
  };

  const handleEnterResearch = () => {
    setPhase('research');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navVariant = (phase === 'prologue' || phase === 'vol1') ? 'hero' : 'paper';

  return (
    <div className="app-shell">
      <TopNav
        variant={navVariant}
        onRestart={handleRestart}
        onResearch={handleEnterResearch}
      />

      {phase === 'research' ? (
        <ResearchPage
          gameContext={{
            typeKey: gameData.typeKey,
            encKey: gameData.encKey,
            finalStratKey: gameData.finalStratKey,
            transferred: gameData.transferred,
            finalScore: gameData.score,
            outcomeStr: gameData.outcomeStr,
          }}
        />
      ) : (
        <main className="app-main">
          {phase === 'prologue' && <Prologue onEnter={handleEnterGame} />}
          {phase === 'vol1' && <Vol1Type onSelect={handleSelectType} />}
          {phase === 'vol2' && gameData.typeKey && (
            <Vol2Encounter typeKey={gameData.typeKey} onSelect={handleSelectEncounter} />
          )}
          {phase === 'vol3' && gameData.encKey && (
            <Vol4Crisis encKey={gameData.encKey} onSelect={handleCrisisSelect} />
          )}
          {phase === 'vol4' && gameData.failedStrat && (
            <Vol5Transition encKey={gameData.encKey} failedStrat={gameData.failedStrat} onSelect={handleTransition} />
          )}
          {phase === 'vol5' && gameData.currentCostType && (
            <Vol6Cost costType={gameData.currentCostType} onSelect={handleCostSelect} />
          )}
          {phase === 'vol6' && gameData.typeKey && (
            <Vol7Result
              typeKey={gameData.typeKey}
              encKey={gameData.encKey}
              finalStratKey={gameData.finalStratKey}
              transferred={gameData.transferred}
              finalScore={gameData.score}
              outcomeStr={gameData.outcomeStr}
              onEnterResearch={handleEnterResearch}
            />
          )}
        </main>
      )}
    </div>
  );
}

export default App;
