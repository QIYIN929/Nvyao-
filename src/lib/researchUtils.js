import { getSealTier } from '../data/gameContent';

export function formatEntryTitle(raw) {
  return String(raw || '')
    .replace(/子不语卷[^ ]*-/, '')
    .replace(/聊斋志异-/, '')
    .replace(/阅微草堂笔记-/, '');
}

export function getSealShort(seal) {
  return (seal?.name || '').replace('之印', '');
}

export function entryInSealTier(entry, sealShort) {
  if (!sealShort || sealShort === '全部') return true;
  const tier = getSealTier(entry._主体性 ?? 0);
  return getSealShort(tier) === sealShort;
}

/** 按游戏路径匹配 entries.json 记录 */
export function filterByGamePath(entries, { typeKey, finalStratKey, transferred }) {
  if (!typeKey) return [];

  return (entries || []).filter((e) => {
    if (e._异类简称 !== typeKey) return false;
    if (finalStratKey === '避世') return true;
    if (finalStratKey && e._策略简称 !== finalStratKey) return false;
    const trans = transferred ? '是' : '否';
    if (e['策略转换'] !== trans) return false;
    return true;
  });
}

export function avgSubjectivity(entries) {
  if (!entries?.length) return null;
  const sum = entries.reduce((s, e) => s + (e._主体性 ?? 0), 0);
  return sum / entries.length;
}

export function pathKeyFromContext({ typeKey, finalStratKey, transferred }) {
  if (!typeKey || !finalStratKey) return null;
  return `${typeKey}|${finalStratKey}|${transferred ? '是' : '否'}`;
}
