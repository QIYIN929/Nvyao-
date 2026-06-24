import { TYPES, ENCOUNTERS, getSealTier, getPathRecap } from '../../data/gameContent';
import {
  filterByGamePath, avgSubjectivity, pathKeyFromContext, getSealShort,
} from '../../lib/researchUtils';
import EntryCard from './EntryCard';

export default function YourPathSection({ gameContext, stats, entries, onExploreSimilar, onOpenEntry }) {
  if (!gameContext?.typeKey) return null;

  const type = TYPES[gameContext.typeKey];
  const enc = ENCOUNTERS.find((e) => e.key === gameContext.encKey);
  const seal = getSealTier(gameContext.finalScore);
  const sealShort = getSealShort(seal);
  const recap = getPathRecap({
    typeKey: gameContext.typeKey,
    encKey: gameContext.encKey,
    finalStratKey: gameContext.finalStratKey,
    transferred: gameContext.transferred,
    outcomeStr: gameContext.outcomeStr,
    score: gameContext.finalScore,
  });

  const pathMatches = filterByGamePath(entries, gameContext);
  const pathAvg = avgSubjectivity(pathMatches);
  const pathKey = pathKeyFromContext(gameContext);
  const pathData = pathKey ? stats?.gamePaths?.[pathKey] : null;

  const preview = pathMatches.slice(0, 6);
  const isHermit = gameContext.finalStratKey === '避世';

  return (
    <section className="w-full max-w-5xl mx-auto mb-12 animate-fade-up">
      <div className="palace-border bg-paper-dark/25 p-6 md:p-8" style={{ borderColor: `${seal.color}35` }}>
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          <div className="flex flex-col items-center md:items-start shrink-0 md:w-36">
            <div className="w-16 h-16 flex items-center justify-center mb-2"
              style={{ border: `2px solid ${seal.color}`, background: `${seal.color}12`, fontFamily: "'Ma Shan Zheng', serif", fontSize: '1.75rem', color: seal.color }}>
              {seal.iconChar}
            </div>
            <p className="text-sm tracking-widest" style={{ color: seal.color }}>{seal.name}</p>
            <p className="text-xs text-ash mt-1">主体性 {Math.max(0, Math.min(9, gameContext.finalScore))}/9</p>
          </div>

          <div className="flex-1 text-center md:text-left">
            <p className="text-sm leading-8 text-ink-light mb-4">{recap}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start text-xs mb-4">
              <span className="px-2 py-1 rounded" style={{ background: `${type.color}18`, color: type.color }}>{type.label}族</span>
              <span className="px-2 py-1 rounded" style={{ background: `${enc?.themeColor || '#6B5B4E'}18`, color: enc?.themeColor || '#6B5B4E' }}>
                {enc?.label || '避世潜修'}
              </span>
              <span className="px-2 py-1 rounded bg-ink/5 text-ink">{gameContext.finalStratKey}</span>
              {gameContext.transferred && <span className="px-2 py-1 rounded bg-vermillion/10 text-vermillion">已转换</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
              <div className="p-3 border border-ink/10 bg-paper/50">
                <p className="text-xl font-serif text-ink">{pathMatches.length}</p>
                <p className="text-xs text-ash tracking-widest mt-1">同类路径记录</p>
              </div>
              <div className="p-3 border border-ink/10 bg-paper/50">
                <p className="text-xl font-serif" style={{ color: seal.color }}>{gameContext.finalScore}</p>
                <p className="text-xs text-ash tracking-widest mt-1">你的主体性</p>
              </div>
              <div className="p-3 border border-ink/10 bg-paper/50">
                <p className="text-xl font-serif text-ink">
                  {pathAvg != null ? pathAvg.toFixed(1) : '—'}
                </p>
                <p className="text-xs text-ash tracking-widest mt-1">同类均值</p>
              </div>
            </div>

            {pathAvg != null && (
              <p className="text-xs text-ash mt-3 leading-7">
                {gameContext.finalScore > pathAvg
                  ? `你的主体性高于同类均值 ${(gameContext.finalScore - pathAvg).toFixed(1)} 分，在${sealShort}档中偏强。`
                  : gameContext.finalScore < pathAvg
                    ? `你的主体性低于同类均值 ${(pathAvg - gameContext.finalScore).toFixed(1)} 分，在${sealShort}档中偏弱。`
                    : `你的主体性与同类均值持平（${pathAvg.toFixed(1)}）。`}
                {pathData && <> 数据集标注中此路径共 {pathData.count} 例。</>}
              </p>
            )}

            {isHermit && (
              <p className="text-xs text-ash mt-3 leading-7 italic">
                避世线不在五类策略统计内；下方展示同类型异类记录供参照。
              </p>
            )}
          </div>
        </div>

        {preview.length > 0 && (
          <div className="mt-8 pt-6 border-t border-ink/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <p className="text-xs text-ash tracking-widest">与你路径相近的卷宗</p>
              <button
                type="button"
                onClick={onExploreSimilar}
                className="text-xs text-gold hover:text-ink tracking-widest underline underline-offset-4 transition-colors"
              >
                在卷宗检阅中查看全部 {pathMatches.length} 条 →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {preview.map((entry) => (
                <EntryCard key={`${entry['语料库']}-${entry['序号']}`} entry={entry} compact onOpen={onOpenEntry} />
              ))}
            </div>
          </div>
        )}

        {preview.length === 0 && (
          <p className="mt-6 pt-6 border-t border-ink/10 text-xs text-ash text-center tracking-widest">
            数据集中暂无完全匹配的路径记录，可在卷宗检阅中按类型或策略筛选。
          </p>
        )}
      </div>
    </section>
  );
}
