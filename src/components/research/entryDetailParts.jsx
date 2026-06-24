import { useEffect, useRef } from 'react';

export const CORPUS_COLOR = {
  '聊斋志异': '#8B1A1A',
  '阅微草堂笔记': '#2C4A3E',
  '子不语': '#A07820',
};

export const STRAT_COLORS = {
  博弈型: '#A07820', 情感型: '#8B1A1A', 顺从型: '#6B5B4E',
  抗争型: '#2C4A3E', 非自主: '#7C8FA0',
};

export const DETAIL_PANELS = [
  { key: 'wenyan', label: '原文' },
  { key: 'translation', label: '译文' },
  { key: 'commentary', label: '考语' },
  { key: 'data', label: '数据表格' },
];

export const DATA_ROWS = [
  ['语料库', '语料库'],
  ['序号', '序号'],
  ['篇名', '篇名'],
  ['异类类型', '异类类型'],
  ['策略类型', '策略类型_主'],
  ['策略转换', '策略转换'],
  ['主体性评分', '主体性评分'],
  ['初始处境', '初始处境'],
  ['核心困境', '核心困境'],
  ['主要手段', '主要手段'],
  ['最终结局', '最终结局_大类'],
  ['重大代价', '是否付出重大代价'],
  ['代价类型', '代价类型'],
  ['策略自反性', '策略自反性'],
  ['跨越人妖界限', '是否跨越人妖界限'],
  ['理论标签', '理论标签'],
  ['备注', '备注'],
];

export function VerticalReader({ text, emptyText }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth - el.clientWidth;
  }, [text]);

  if (!text) {
    return (
      <div className="entry-reader entry-reader--empty">
        <p>{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="entry-reader">
      <div className="entry-reader__scroll custom-scrollbar" ref={scrollRef}>
        <div className="entry-reader__columns vertical-text">
          {text.split(/(?<=。)/).map((sentence, idx) => (
            sentence.trim() ? <p key={idx}>{sentence.trim()}</p> : null
          ))}
        </div>
      </div>
    </div>
  );
}

export function EntryDataTable({ entry, score, sealShort, sealColor, stratKey }) {
  return (
    <div className="entry-data-panel custom-scrollbar">
      <table className="entry-data-table">
        <tbody>
          {DATA_ROWS.map(([label, field]) => {
            let value = entry[field];
            if (field === '主体性评分') value = `${score} / 9（${sealShort}）`;
            if (value === undefined || value === null || value === '') value = '—';
            const color = field === '策略类型_主' ? STRAT_COLORS[stratKey]
              : field === '主体性评分' ? sealColor : undefined;
            return (
              <tr key={field}>
                <th>{label}</th>
                <td style={color ? { color } : undefined}>{String(value)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
