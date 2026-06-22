import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
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
    <div className="flex flex-col items-center justify-center gap-3 mb-10 mt-16 animate-fade-up">
      <div className="flex items-center gap-4 w-full max-w-sm">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40"></div>
        <h2 className="text-2xl font-serif text-ink tracking-widest-plus text-center" style={{ fontFamily: "'Ma Shan Zheng', serif" }}>
          {children}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40"></div>
      </div>
      <div className="w-12 h-[2px] bg-gold/40"></div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="p-4 border bg-paper/95 backdrop-blur shadow-sm" style={{
      borderColor: 'rgba(74,55,40,0.2)',
      fontFamily: "'Noto Serif SC', serif",
    }}>
      <p className="font-bold mb-2 text-ink text-sm">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="text-sm tracking-widest flex justify-between gap-4" style={{ color: p.color || 'var(--ink)' }}>
          <span>{p.name}：</span>
          <span>{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function Dashboard({ stats }) {
  // Safety check to ensure we don't crash if stats are empty
  if (!stats || !stats.globalStats) return (
    <div className="py-20 text-center text-ash tracking-widest">
      无法解析案卷数据，请检查 data.json 格式。
    </div>
  );
  
  const { globalStats } = stats;

  // Safe fallbacks for all data extractions
  const strategyDist = globalStats.strategy_dist || {};
  const scoreDistRaw = globalStats.score_dist || Array(10).fill(0);
  const byCorpus = globalStats.by_corpus || {};
  const transferRate = globalStats.transfer_rate || {};
  const scoreAvg = globalStats.score_avg || {};

  const stratTotal = STRAT_ORDER.map(s => ({
    name: s.replace('型','').replace('非自主','认命'),
    数量: strategyDist[s] || 0,
    fill: PALETTE[s],
  }));

  const scoreDist = scoreDistRaw.map((cnt, i) => ({
    name: String(i),
    数量: cnt || 0,
    fill: i <= 2 ? '#6B5B4E' : i <= 5 ? '#7C8FA0' : i <= 7 ? '#A07820' : '#8B1A1A',
  }));

  const corpusData = [
    { name: '聊斋志异', 条目: byCorpus['聊斋志异'] || 0, 转换率: transferRate['聊斋志异'] || 0, 主体性均值: scoreAvg['聊斋志异'] || 0 },
    { name: '阅微草堂笔记', 条目: byCorpus['阅微草堂笔记'] || 0, 转换率: transferRate['阅微草堂笔记'] || 0, 主体性均值: scoreAvg['阅微草堂笔记'] || 0 },
    { name: '子不语', 条目: byCorpus['子不语'] || 0, 转换率: transferRate['子不语'] || 0, 主体性均值: scoreAvg['子不语'] || 0 },
  ];

  const outcomeData = (globalStats.outcome_top || []).slice(0, 8).map((o) => ({
    name: o.label && o.label.length > 8 ? o.label.slice(0,8)+'…' : (o.label || '未知'),
    value: o.count || 0,
  }));
  
  const PIE_COLORS = ['#8B1A1A','#A07820','#2C4A3E','#7C8FA0','#6B5B4E','#9DB5C8','#C8982A','#3D6B5C'];
  const boyiCount = strategyDist['博弈型'] || 0;
  const totalEntries = globalStats.total || 1;
  const boyiPercent = Math.round((boyiCount / totalEntries) * 100) || 0;

  return (
    <div className="animate-fade-up flex flex-col items-center w-full">
      <SectionTitle>三书全览考</SectionTitle>
      
      {/* 居中三书数据卡片 */}
      <div className="flex flex-col md:flex-row justify-center gap-6 mb-16 w-full max-w-5xl">
        {corpusData.map(c => (
          <div key={c.name} className="relative p-6 bg-paper-dark/20 palace-border hover-glow flex flex-col items-center justify-center flex-1">
            <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: PALETTE[c.name] }}></div>
            <h3 className="text-xl mb-6 text-center tracking-widest-plus mt-2" style={{ color: PALETTE[c.name], fontFamily: "'Ma Shan Zheng', serif" }}>
              {c.name}
            </h3>
            <div className="space-y-4 text-sm font-serif w-full max-w-[200px]">
              <div className="flex justify-between items-center border-b border-ink/10 pb-2">
                <span className="text-ash tracking-widest">录入案卷</span>
                <span className="text-xl text-ink font-bold">{c.条目}</span>
              </div>
              <div className="flex justify-between items-center border-b border-ink/10 pb-2">
                <span className="text-ash tracking-widest">平均主体性</span>
                <span className="text-xl font-bold" style={{ color: PALETTE[c.name] }}>{Number(c.主体性均值).toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-ash tracking-widest">策略转换率</span>
                <span className="text-xl text-ink font-bold">{c.转换率}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-12 mb-16 w-full max-w-5xl">
        {/* 策略流派志 居中 */}
        <div className="flex flex-col items-center flex-1">
          <SectionTitle>策略流派志</SectionTitle>
          <div className="bg-paper-dark/20 palace-border p-6 shadow-sm w-full flex flex-col items-center">
            <div className="h-[280px] w-full max-w-sm">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stratTotal} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 13, fontFamily: "'Noto Serif SC', serif", fill: 'var(--ink)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--ash)' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(194, 156, 87, 0.05)' }} />
                  <Bar dataKey="数量" radius={[2,2,0,0]} maxBarSize={50}>
                    {stratTotal.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-ash mt-4 text-center tracking-widest-plus border-t border-ink/5 pt-4 w-full">
              博弈型主导（{boyiCount} 例，占 {boyiPercent}%），印证了异类在人间生存之务实。
            </p>
          </div>
        </div>

        {/* 主体性评分图 居中 */}
        <div className="flex flex-col items-center flex-1">
          <SectionTitle>主体性评分图</SectionTitle>
          <div className="bg-paper-dark/20 palace-border p-6 shadow-sm w-full flex flex-col items-center">
            <div className="h-[280px] w-full max-w-sm">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDist} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 13, fontFamily: "'Noto Serif SC', serif", fill: 'var(--ink)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--ash)' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(194, 156, 87, 0.05)' }} />
                  <Bar dataKey="数量" radius={[2,2,0,0]} maxBarSize={40}>
                    {scoreDist.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-ink/5 text-xs text-ash tracking-widest w-full">
              <span className="flex items-center justify-center gap-1"><div className="w-2 h-2 bg-[#6B5B4E]"></div> 灰烬</span>
              <span className="flex items-center justify-center gap-1"><div className="w-2 h-2 bg-[#7C8FA0]"></div> 银辉</span>
              <span className="flex items-center justify-center gap-1"><div className="w-2 h-2 bg-[#A07820]"></div> 金焰</span>
              <span className="flex items-center justify-center gap-1"><div className="w-2 h-2 bg-[#8B1A1A]"></div> 朱砂</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-16 w-full max-w-5xl justify-center">
        {/* 终局走势 居中 */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <SectionTitle>终局走势</SectionTitle>
          <div className="bg-paper-dark/20 palace-border p-6 h-[320px] w-full flex flex-col items-center justify-center">
            {outcomeData.length > 0 ? (
              <div className="w-full h-full max-w-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={outcomeData} cx="50%" cy="50%" innerRadius={40} outerRadius={90}
                      dataKey="value" nameKey="name" label={({ name }) => `${name}`}
                      labelLine={false}
                      stroke="var(--paper)" strokeWidth={2}
                      style={{ fontSize: '11px', fontFamily: "'Noto Serif SC',serif", fill: 'var(--ink)' }}>
                      {outcomeData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <span className="text-ash text-sm tracking-widest-plus text-center">暂无终局数据</span>
            )}
          </div>
        </div>

        {/* 核心考语 完全居中 */}
        <div className="w-full lg:w-2/3 flex flex-col items-center">
          <SectionTitle>核心考语</SectionTitle>
          <div className="flex flex-col sm:flex-row gap-6 h-auto sm:h-[320px] w-full justify-center">
            <div className="flex-1 p-8 palace-border bg-gradient-to-br from-paper to-gold/5 flex flex-col justify-center items-center text-center">
              <h4 className="text-xl font-serif mb-6 tracking-widest-plus text-ink" style={{ fontFamily: "'Ma Shan Zheng', serif" }}>聊斋变局最频</h4>
              <p className="text-sm leading-loose text-ink-light tracking-widest text-center max-w-[240px]">
                45.3% 的聊斋异类在叙事中改变了应对策略，远高于阅微（19.9%）与子不语（26.8%）。蒲松龄赋予了她们更幽深的叙事空间，使她们得以在绝境中完成从妥协到觉醒的心理蜕变。
              </p>
            </div>
            <div className="flex-1 p-8 palace-border bg-gradient-to-br from-paper to-[#1E3D31]/5 flex flex-col justify-center items-center text-center">
              <h4 className="text-xl font-serif mb-6 tracking-widest-plus text-[#1E3D31]" style={{ fontFamily: "'Ma Shan Zheng', serif" }}>子不语独见抗争</h4>
              <p className="text-sm leading-loose text-ink-light tracking-widest text-center max-w-[240px]">
                全样本中仅有的 8 例极端「抗争型」策略，竟悉数出自《子不语》。在袁枚笔下的市井江湖中，异类不再一味隐忍，她们敢于撕破脸皮，以暴烈之姿向礼教与天威拔剑。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
