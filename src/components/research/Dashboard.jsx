import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
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
    <div className="flex items-center gap-4 mb-8 mt-12">
      <h2 className="text-2xl font-serif text-ink tracking-widest" style={{ fontFamily: "'Ma Shan Zheng', serif" }}>
        {children}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-ink/20 to-transparent"></div>
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
  if (!stats) return null;
  const { globalStats } = stats;

  const stratTotal = STRAT_ORDER.map(s => ({
    name: s.replace('型','').replace('非自主','认命'),
    数量: globalStats.strategy_dist[s] || 0,
    fill: PALETTE[s],
  }));

  const scoreDist = globalStats.score_dist.map((cnt, i) => ({
    name: String(i),
    数量: cnt,
    fill: i <= 2 ? '#6B5B4E' : i <= 5 ? '#7C8FA0' : i <= 7 ? '#A07820' : '#8B1A1A',
  }));

  const corpusData = [
    { name: '聊斋志异', 条目: globalStats.by_corpus['聊斋志异'], 转换率: globalStats.transfer_rate['聊斋志异'], 主体性均值: globalStats.score_avg['聊斋志异'] },
    { name: '阅微草堂笔记', 条目: globalStats.by_corpus['阅微草堂笔记'], 转换率: globalStats.transfer_rate['阅微草堂笔记'], 主体性均值: globalStats.score_avg['阅微草堂笔记'] },
    { name: '子不语', 条目: globalStats.by_corpus['子不语'], 转换率: globalStats.transfer_rate['子不语'], 主体性均值: globalStats.score_avg['子不语'] },
  ];

  const outcomeData = (globalStats.outcome_top || []).slice(0, 8).map((o) => ({
    name: o.label.length > 8 ? o.label.slice(0,8)+'…' : o.label,
    value: o.count,
  }));
  const PIE_COLORS = ['#8B1A1A','#A07820','#2C4A3E','#7C8FA0','#6B5B4E','#9DB5C8','#C8982A','#3D6B5C'];

  return (
    <div className="animate-fade-up">
      <SectionTitle>三书全览考</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {corpusData.map(c => (
          <div key={c.name} className="relative p-6 bg-paper/40 border border-ink/10 hover:border-ink/30 transition-colors shadow-sm">
            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: PALETTE[c.name] }}></div>
            <h3 className="text-xl mb-6 text-center tracking-widest" style={{ color: PALETTE[c.name], fontFamily: "'Ma Shan Zheng', serif" }}>
              {c.name}
            </h3>
            <div className="space-y-4 text-sm font-serif">
              <div className="flex justify-between items-end border-b border-ink/5 pb-2">
                <span className="text-ash tracking-widest">录入案卷</span>
                <span className="text-xl text-ink">{c.条目}</span>
              </div>
              <div className="flex justify-between items-end border-b border-ink/5 pb-2">
                <span className="text-ash tracking-widest">平均主体性</span>
                <span className="text-xl" style={{ color: PALETTE[c.name] }}>{c.主体性均值}</span>
              </div>
              <div className="flex justify-between items-end pb-2">
                <span className="text-ash tracking-widest">策略转换率</span>
                <span className="text-xl text-ink">{c.转换率}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <SectionTitle>策略流派志</SectionTitle>
          <div className="bg-paper/40 border border-ink/10 p-6 shadow-sm">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stratTotal} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 13, fontFamily: "'Noto Serif SC', serif", fill: 'var(--ink)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--ash)' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(74,55,40,0.05)' }} />
                  <Bar dataKey="数量" radius={[2,2,0,0]} maxBarSize={50}>
                    {stratTotal.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-ash mt-4 text-center tracking-widest border-t border-ink/5 pt-4">
              博弈型主导（{globalStats.strategy_dist['博弈型']} 例，占 {Math.round(globalStats.strategy_dist['博弈型']/globalStats.total*100)}%），印证了异类在人间生存之务实。
            </p>
          </div>
        </div>

        <div>
          <SectionTitle>主体性评分图</SectionTitle>
          <div className="bg-paper/40 border border-ink/10 p-6 shadow-sm">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDist} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 13, fontFamily: "'Noto Serif SC', serif", fill: 'var(--ink)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--ash)' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(74,55,40,0.05)' }} />
                  <Bar dataKey="数量" radius={[2,2,0,0]} maxBarSize={40}>
                    {scoreDist.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-ink/5 text-xs text-ash tracking-widest">
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#6B5B4E]"></div> 灰烬</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#7C8FA0]"></div> 银辉</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#A07820]"></div> 金焰</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#8B1A1A]"></div> 朱砂</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-1">
          <SectionTitle>终局走势</SectionTitle>
          <div className="bg-paper/40 border border-ink/10 p-6 h-[320px] shadow-sm flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={outcomeData} cx="50%" cy="50%" innerRadius={40} outerRadius={90}
                  dataKey="value" nameKey="name" label={({ name, percent }) => `${name}`}
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
        </div>

        <div className="lg:col-span-2">
          <SectionTitle>核心考语</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-[320px]">
            <div className="p-6 bg-paper/40 border-l-2 shadow-sm flex flex-col justify-center" style={{ borderColor: '#8B1A1A' }}>
              <h4 className="text-lg font-serif mb-4 tracking-widest text-[#8B1A1A]">聊斋变局最频</h4>
              <p className="text-sm leading-relaxed text-ink-light tracking-wide text-justify">
                45.3% 的聊斋异类在叙事中改变了应对策略，远高于阅微（19.9%）与子不语（26.8%）。蒲松龄赋予了她们更幽深的叙事空间，使她们得以在绝境中完成从妥协到觉醒的心理蜕变。
              </p>
            </div>
            <div className="p-6 bg-paper/40 border-l-2 shadow-sm flex flex-col justify-center" style={{ borderColor: '#2C4A3E' }}>
              <h4 className="text-lg font-serif mb-4 tracking-widest text-[#2C4A3E]">子不语独见抗争</h4>
              <p className="text-sm leading-relaxed text-ink-light tracking-wide text-justify">
                全样本中仅有的 8 例极端「抗争型」策略，竟悉数出自《子不语》。在袁枚笔下的市井江湖中，异类不再一味隐忍，她们敢于撕破脸皮，以暴烈之姿向礼教与天威拔剑。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
