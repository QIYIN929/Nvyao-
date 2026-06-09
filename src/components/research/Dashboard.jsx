import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const PALETTE = {
  聊斋志异:   '#8B1A1A',
  阅微草堂笔记: '#2C4A3E',
  子不语:    '#A07820',
  博弈型: '#A07820', 情感型: '#8B1A1A', 顺从型: '#6B5B4E',
  抗争型: '#2C4A3E', 非自主: '#7C8FA0', '不适用/无': '#B0A090',
};

const STRAT_ORDER = ['博弈型','情感型','顺从型','抗争型','非自主'];

function SectionTitle({ children }) {
  return (
    <div className="chapter-line mb-6">
      <h3 style={{
        fontFamily: "'Noto Serif SC', serif",
        fontSize: '1rem',
        letterSpacing: '0.2em',
        color: 'var(--ink)',
        whiteSpace: 'nowrap',
      }}>{children}</h3>
    </div>
  );
}

function StatCard({ label, value, sub, color }) {
  return (
    <div className="p-4 border text-center"
      style={{ borderColor: color || 'rgba(74,55,40,0.2)', background: 'rgba(245,237,214,0.5)' }}>
      <div style={{
        fontSize: 'clamp(1.8rem,4vw,2.8rem)',
        fontFamily: "'Ma Shan Zheng', serif",
        color: color || 'var(--ink)',
        lineHeight: 1,
      }}>{value}</div>
      <div className="mt-1 text-xs" style={{ color: 'var(--ink-light)', letterSpacing: '0.1em' }}>{label}</div>
      {sub && <div className="text-xs mt-0.5" style={{ color: 'var(--ash)' }}>{sub}</div>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="p-3 border text-xs" style={{
      background: 'var(--paper)', borderColor: 'rgba(74,55,40,0.3)',
      fontFamily: "'Noto Serif SC', serif",
    }}>
      <p className="font-medium mb-1" style={{ color: 'var(--ink)' }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}：{p.value}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard({ stats }) {
  if (!stats) return null;
  const { globalStats } = stats;

  // Strategy bar chart data
  const stratData = STRAT_ORDER.map(s => ({
    name: s.replace('型',''),
    聊斋志异: stats.globalStats.strategy_dist[s] || 0,
    阅微草堂笔记: 0,
    子不语: 0,
  }));
  // We don't have per-corpus strat breakdown in data.json yet, use totals
  const stratTotal = STRAT_ORDER.map(s => ({
    name: s.replace('型','').replace('非自主','任命'),
    数量: globalStats.strategy_dist[s] || 0,
    fill: PALETTE[s],
  }));

  // Score distribution
  const scoreDist = globalStats.score_dist.map((cnt, i) => ({
    name: String(i),
    数量: cnt,
    fill: i <= 2 ? '#6B5B4E' : i <= 5 ? '#7C8FA0' : '#A07820',
  }));

  // Corpus comparison
  const corpusData = [
    { name: '聊斋志异', 条目: globalStats.by_corpus['聊斋志异'], 转换率: globalStats.transfer_rate['聊斋志异'], 主体性均值: globalStats.score_avg['聊斋志异'] },
    { name: '阅微草堂笔记', 条目: globalStats.by_corpus['阅微草堂笔记'], 转换率: globalStats.transfer_rate['阅微草堂笔记'], 主体性均值: globalStats.score_avg['阅微草堂笔记'] },
    { name: '子不语', 条目: globalStats.by_corpus['子不语'], 转换率: globalStats.transfer_rate['子不语'], 主体性均值: globalStats.score_avg['子不语'] },
  ];

  // Outcome pie
  const outcomeData = (globalStats.outcome_top || []).slice(0, 8).map((o, i) => ({
    name: o.label.length > 8 ? o.label.slice(0,8)+'…' : o.label,
    value: o.count,
  }));
  const PIE_COLORS = ['#8B1A1A','#A07820','#2C4A3E','#7C8FA0','#6B5B4E','#9DB5C8','#C8982A','#3D6B5C'];

  return (
    <div className="py-10 px-4 max-w-5xl mx-auto">
      {/* Hero stats */}
      <SectionTitle>一、总体规模</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        <StatCard label="有效标注条目" value={globalStats.total} color="var(--vermillion)" />
        <StatCard label="主体性均值" value={globalStats.score_avg['全部']} sub="满分 9 分" color="var(--gold)" />
        <StatCard label="策略转换率" value={`${globalStats.transfer_rate['全部']}%`} sub="有转换的比例" color="var(--jade)" />
        <StatCard label="涉及语料" value="三书" sub="聊斋·阅微·子不语" color="var(--ash)" />
      </div>

      {/* Corpus comparison */}
      <SectionTitle>二、三书对比</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
        {corpusData.map(c => (
          <div key={c.name} className="p-5 border" style={{
            borderColor: PALETTE[c.name] || 'rgba(74,55,40,0.2)',
            background: 'rgba(245,237,214,0.5)',
          }}>
            <p className="text-sm font-medium mb-3" style={{ color: PALETTE[c.name], letterSpacing: '0.1em' }}>
              {c.name}
            </p>
            <div className="space-y-2 text-xs" style={{ color: 'var(--ink-light)' }}>
              <div className="flex justify-between">
                <span>有效条目</span>
                <strong style={{ color: 'var(--ink)' }}>{c.条目} 篇</strong>
              </div>
              <div className="flex justify-between">
                <span>主体性均值</span>
                <strong style={{ color: PALETTE[c.name] }}>{c.主体性均值}</strong>
              </div>
              <div className="flex justify-between">
                <span>策略转换率</span>
                <strong style={{ color: 'var(--ink)' }}>{c.转换率}%</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Strategy distribution */}
      <SectionTitle>三、策略类型分布</SectionTitle>
      <div className="mb-10 p-4 border" style={{ borderColor: 'rgba(74,55,40,0.2)', background: 'rgba(245,237,214,0.4)' }}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={stratTotal} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: "'Noto Serif SC',serif", fill: '#4A3728' }} />
            <YAxis tick={{ fontSize: 11, fill: '#6B5B4E' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="数量" radius={[2,2,0,0]}>
              {stratTotal.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-center mt-2" style={{ color: 'var(--ash)', letterSpacing: '0.1em' }}>
          博弈型主导（{globalStats.strategy_dist['博弈型']} 例，占 {Math.round(globalStats.strategy_dist['博弈型']/globalStats.total*100)}%）
        </p>
      </div>

      {/* Score distribution */}
      <SectionTitle>四、主体性评分分布</SectionTitle>
      <div className="mb-10 p-4 border" style={{ borderColor: 'rgba(74,55,40,0.2)', background: 'rgba(245,237,214,0.4)' }}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={scoreDist} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: 'serif', fill: '#4A3728' }}
              label={{ value: '主体性评分', position: 'insideBottom', offset: -2, fontSize: 11, fill: '#6B5B4E' }} />
            <YAxis tick={{ fontSize: 11, fill: '#6B5B4E' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="数量" radius={[2,2,0,0]}>
              {scoreDist.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-2 text-xs" style={{ color: 'var(--ash)' }}>
          <span><span style={{ color: '#6B5B4E' }}>■</span> 灰烬（0-2）</span>
          <span><span style={{ color: '#7C8FA0' }}>■</span> 银辉（3-5）</span>
          <span><span style={{ color: '#A07820' }}>■</span> 金焰（6-9）</span>
        </div>
      </div>

      {/* Outcome distribution */}
      <SectionTitle>五、结局大类分布（TOP8）</SectionTitle>
      <div className="mb-10 p-4 border" style={{ borderColor: 'rgba(74,55,40,0.2)', background: 'rgba(245,237,214,0.4)' }}>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={outcomeData} cx="50%" cy="50%" outerRadius={90}
              dataKey="value" nameKey="name" label={({ name, percent }) =>
                `${name} ${(percent*100).toFixed(0)}%`}
              labelLine={false}
              style={{ fontSize: '11px', fontFamily: "'Noto Serif SC',serif" }}>
              {outcomeData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Key findings */}
      <SectionTitle>六、核心研究发现</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          {
            color: '#8B1A1A',
            title: '聊斋志异策略转换率最高',
            body: '45.3% 的聊斋异类女性在叙事中改变了应对策略，远高于阅微（19.9%）和子不语（26.8%）。聊斋故事篇幅更长，为策略演变提供了叙事空间。',
          },
          {
            color: '#2C4A3E',
            title: '阅微"情感型"异常集中',
            body: '阅微草堂笔记中情感型策略占 38.7%（101 例），远高于另两书。纪昀笔下的超自然女性更多以情感连结而非主动谋略应对人界，折射其保守道德立场。',
          },
          {
            color: '#A07820',
            title: '抗争型仅见于子不语',
            body: '全部 8 例抗争型策略全部来自子不语。另两书几乎不出现正面对抗，子不语的市井志怪语境为直接抗争提供了更多叙事合法性。',
          },
        ].map((f, i) => (
          <div key={i} className="p-5 border-l-2" style={{
            borderColor: f.color,
            background: 'rgba(245,237,214,0.5)',
          }}>
            <p className="text-sm font-medium mb-2" style={{ color: f.color, letterSpacing: '0.08em' }}>{f.title}</p>
            <p className="text-xs leading-6" style={{ color: 'var(--ink-light)' }}>{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
