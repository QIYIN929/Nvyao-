import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getSealTier } from '../../data/gameContent';
import {
  formatEntryTitle,
  getEntryOriginalText,
  getEntryWenyanText,
  getSealShort,
} from '../../lib/researchUtils';
import {
  CORPUS_COLOR,
  DETAIL_PANELS,
  EntryDataTable,
  VerticalReader,
} from './entryDetailParts';

function defaultPanel(wenyanText, translationText) {
  if (wenyanText) return 'wenyan';
  if (translationText) return 'translation';
  return 'data';
}

export default function EntryDetailPage({ entry, texts = {}, wenyanTexts = {}, onBack }) {
  const corpusColor = CORPUS_COLOR[entry['语料库']] || '#6B5B4E';
  const stratKey = entry['_策略简称'] || '';
  const score = entry['_主体性'] || 0;
  const seal = getSealTier(score);
  const sealShort = getSealShort(seal);
  const title = formatEntryTitle(entry['篇名']);
  const commentary = entry['备注'] || '';
  const wenyanText = getEntryWenyanText(entry, wenyanTexts);
  const translationText = getEntryOriginalText(entry, texts);
  const [panel, setPanel] = useState(() => defaultPanel(wenyanText, translationText));

  const commentaryText = commentary
    ? `${commentary}${commentary.endsWith('。') ? '' : '。'}`
    : '';

  return (
    <div className="entry-detail-page">
      <header className="entry-detail-page__header">
        <button type="button" className="entry-detail-page__back" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" />
          返回卷宗检阅
        </button>

        <div className="entry-detail-page__title-block">
          <span
            className="entry-detail-page__corpus"
            style={{ borderColor: `${corpusColor}40`, color: corpusColor, background: `${corpusColor}10` }}
          >
            {entry['语料库']}
          </span>
          <h1 className="entry-detail-page__title">《{title}》</h1>
          <p className="entry-detail-page__id">编号 {entry['序号']}</p>
        </div>

        <nav className="entry-detail-page__tabs" aria-label="卷宗阅览">
          {DETAIL_PANELS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setPanel(key)}
              className="entry-detail-page__tab"
              aria-current={panel === key ? 'page' : undefined}
              style={{
                borderColor: panel === key ? corpusColor : 'rgba(74,55,40,0.18)',
                color: panel === key ? corpusColor : '#8C7B6D',
                background: panel === key ? `${corpusColor}12` : 'transparent',
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="entry-detail-page__main">
        {panel === 'wenyan' && (
          <VerticalReader text={wenyanText} emptyText="本篇文言原文暂未编入馆藏。" />
        )}
        {panel === 'translation' && (
          <VerticalReader text={translationText} emptyText="本篇译文暂未编入馆藏。" />
        )}
        {panel === 'commentary' && (
          <VerticalReader text={commentaryText} emptyText="暂无考语。" />
        )}
        {panel === 'data' && (
          <EntryDataTable
            entry={entry}
            score={score}
            sealShort={sealShort}
            sealColor={seal.color}
            stratKey={stratKey}
          />
        )}
      </main>
    </div>
  );
}
