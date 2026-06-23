// 游戏叙事内容数据与数值系统

export const PROLOGUE_TEXT = [
  '这是一份被学者捡到的手稿。',
  '纸页泛黄，笔迹时而工整，时而潦草。',
  '某些关键处，留下了明显的涂改痕迹——',
  '仿佛执笔之人曾回头，',
  '不甘于命运已写就的结局，',
  '将某些字句重重划去，另起新篇。',
  '',
  '执笔者的名字，已不可考。',
  '只在扉页，留下四个字：',
];

export const TYPE_PANELS = {
  狐: {
    key: '狐', label: '狐', score: 3,
    verse: '狡而不邪，媚而有灵。通人性，善幻化。',
    bg: 'linear-gradient(180deg, #E8DCC4 0%, #D4C4A0 45%, #C8B890 100%)',
    accent: '#8A7340',
    color: '#8A7340',
    silhouette: 'fox',
  },
  鬼: {
    key: '鬼', label: '鬼', score: 1,
    verse: '怨而有情，执念难消。隐于暗，摄人心。',
    bg: 'linear-gradient(180deg, #E8D0D0 0%, #D4A8A8 45%, #C89898 100%)',
    accent: '#8A5050',
    color: '#8A5050',
    silhouette: 'ghost',
  },
  精: {
    key: '精', label: '精', score: 1,
    verse: '生于天地，灵慧通真。草木石，皆有灵。',
    bg: 'linear-gradient(180deg, #D8E4D0 0%, #B8C8B0 45%, #A0B098 100%)',
    accent: '#4A6048',
    color: '#4A6048',
    silhouette: 'spirit',
  },
  仙: {
    key: '仙', label: '仙', score: 3,
    verse: '超凡脱俗，道通无尘。修大道，参天机。',
    bg: 'linear-gradient(180deg, #D0DCE8 0%, #A8B8C8 45%, #90A4B8 100%)',
    accent: '#4A6078',
    color: '#4A6078',
    silhouette: 'immortal',
  },
};

export const TYPES = TYPE_PANELS;

/** 策略小标签（UI 展示；内部 key 仍对接研究分类） */
export const STRATEGY_TAGS = {
  情动: '以情',
  博弈: '以计',
  顺从: '以顺',
  抗争: '以争',
  认命: '以命',
};

/** 游戏内策略 key → 研究数据路径 key */
export const STRATEGY_RESEARCH_KEYS = {
  情动: '情感型',
  博弈: '博弈型',
  顺从: '顺从型',
  抗争: '抗争型',
  认命: '非自主',
};

/** 各卷统一章节引导 */
export const CHAPTER_INTROS = {
  vol2: { num: '卷 二', title: '涉红尘', tagline: '红尘初涉' },
  vol3: { num: '卷 三', title: '劫雷至', tagline: '劫至门庭' },
  vol4: { num: '卷 四', title: '破与立', tagline: '策穷另择' },
  vol5: { num: '卷 五', title: '索代价', tagline: '胜局索价' },
  vol6: { num: '卷 六', title: '终局', tagline: '印记既成' },
};

export const ENCOUNTERS = [
  {
    key: 'lover', label: '纯良痴情者',
    desc: '心窍清明，虽知卿非生人，情意却不改初时。',
    crisisKey: 'lover_crisis',
    themeColor: '#7C8FA0'
  },
  {
    key: 'scholar', label: '落魄儒生',
    desc: '笔有锦绣而手无缚鸡之力，渴红袖之温，更惧门第森严。',
    crisisKey: 'scholar_crisis',
    themeColor: '#6B5B4E'
  },
  {
    key: 'merchant', label: '豪商权贵',
    desc: '惯历世态，唯利是趋；不信鬼神之说，只信权与货。',
    crisisKey: 'merchant_crisis',
    themeColor: '#A07820'
  },
  {
    key: 'monk', label: '无情法师',
    desc: '手持桃木符剑，以斩妖除魔为业，法眼之下不容半分私情。',
    crisisKey: 'monk_crisis',
    themeColor: '#8B1A1A'
  },
  {
    key: 'hermit', label: '避世潜修',
    desc: '不入红尘，结庐深谷，但觉日月精华入怀，万缘渐淡。',
    crisisKey: null,
    themeColor: '#2C4A3E'
  }
];

export const HERMIT_OUTCOME = {
  outcomeStr: '避迹山林，化入烟霞',
  epilogue: '不涉情劫，不历尘网，或得道飞升，或化为山神，终在人间簿册之外。',
};

export const CRISES = {
  lover_crisis: {
    title: '阴阳殊途 · 天律森然',
    scene: '他情意愈深，你却察得阳气日损，如灯油将尽。再迟片刻，雷火将至，人亦不能久留。',
    strategies: [
      { key: '情动', label: '誓与同归', desc: '不顾天谴，只将他紧拥怀中，泣言宁共黄泉，不独生世间。', score: 1, success: true, costType: 'lover_succ_qing' },
      { key: '博弈', label: '剖丹续命', desc: '忍痛剖出百年内丹，强续他阳寿，以换天道一线容身。', score: 2, success: true, costType: 'lover_succ_bo' },
      { key: '顺从', label: '敛形夜别', desc: '为不连累他，收尽妖气，趁月色未深，悄然远去。', score: -1, success: true, costType: 'lover_succ_shun' },
      { key: '抗争', label: '引雷承劫', desc: '强开法相，引天雷入体，欲以一身承劫，与天地法则争命。', score: 3, success: false, failText: '雷火贯体，焦烟四起。你识得天地不仁，凭一己蛮力，终难逆天。' }
    ]
  },
  scholar_crisis: {
    title: '礼教森严 · 门风如铁',
    scene: '宗族长辈携家法符水堵门，斥他中邪失心。他缩在人后，唇动而无声。',
    strategies: [
      { key: '博弈', label: '掷金买路', desc: '冷笑间满室金珠滚落，许以三代富贵，换得门楣一时默许。', score: 2, success: true, costType: 'scholar_succ_bo' },
      { key: '顺从', label: '跪伏认罚', desc: '敛尽妖力，伏于堂前，言愿为婢为奴，只求留一条生路。', score: -1, success: true, costType: 'scholar_succ_shun' },
      { key: '情动', label: '剪烛陈情', desc: '含泪望他，问可还记得西窗夜话、剪烛西窗的旧谊。', score: 1, success: false, failText: '泪痕未干，他已退后半步。长辈冷笑如刃，将你的痴心一寸寸凌迟。' },
      { key: '抗争', label: '掀案显形', desc: '推倒香案，现出法相，尖啸震瓦，教这深宅片刻不得安宁。', score: 3, success: false, failText: '梁尘簌落，他眼中却只剩惧意。你忽而明白，这一闹，情分已碎。' }
    ]
  },
  merchant_crisis: {
    title: '负心断义 · 杀机暗伏',
    scene: '杯中有雄黄毒意，门外刀斧隐现。他新欢在侧，旧情成刃，欲取你性命。',
    strategies: [
      { key: '博弈', label: '扣脉索赎', desc: '不动声色扼住他的要害，言明家产须分一半，方可两讫。', score: 2, success: true, costType: 'merchant_succ_bo' },
      { key: '抗争', label: '利爪讨债', desc: '爪锋乍现——既然真心错付，便教负心人亲见因果。', score: 3, success: true, costType: 'merchant_succ_kang' },
      { key: '情动', label: '执手问旧', desc: '强忍毒意握住他手，盼他念及前缘，悬崖勒马。', score: 1, success: false, failText: '他甩袖高呼斩妖，冷箭穿肩。你倾注的情意，只换得一声喝杀。' },
      { key: '顺从', label: '断尾脱身', desc: '自损修为破阵，弃甲而逃，如失巢之禽，越墙而去。', score: -1, success: false, failText: '你退一寸，他进一尺。重金聘得法师，全城搜捕，再无容身。' }
    ]
  },
  monk_crisis: {
    title: '法难临顶 · 照妖悬锋',
    scene: '无名法师布下金光罗网，照妖镜下原形难隐。剑锋已抵咽喉，毫厘之间无转圜。',
    strategies: [
      { key: '抗争', label: '焚修斗法', desc: '燃尽百年修为，化作冲天妖气，与这方士拼个玉石俱焚。', score: 3, success: true, costType: 'monk_succ_kang' },
      { key: '情动', label: '泣诉冤情', desc: '凄然泪下，陈百年苦修不易，言未曾害人，乞一线生路。', score: 1, success: false, failText: '「妖孽多言！」掌雷已至，三魂七魄几欲离体，辩解无人肯听。' },
      { key: '博弈', label: '献宝求赎', desc: '吐出本命秘宝，愿与法师做一场不见天日的暗交易。', score: 2, success: false, failText: '他收宝于袖，反手又是一剑。「除恶务尽，此物亦归贫道。」你才知人心比妖更险。' },
      { key: '顺从', label: '叩首乞怜', desc: '伏地叩首，求念上天好生之德，网开一面。', score: -1, success: false, failText: '剑穿灵脉，声息俱寂。「人妖殊途，留你不得。」——这是你听到的最后一语。' }
    ]
  }
};

export const TRANSITIONS = {
  lover_crisis: [
    { key: '博弈', label: '散功挡劫', action: '散尽修为，以身代受雷火，换他一线生机。', scoreChange: 2, strategyKey: '博弈型' },
    { key: '情动', label: '同赴黄泉', action: '天既不容，便携手入冥，黄泉路上不再独行。', scoreChange: 0, strategyKey: '情感型' },
    { key: '认命', label: '闭目受劫', action: '阖目不语，任雷火加身，化作飞灰。', scoreChange: -2, strategyKey: '非自主' }
  ],
  scholar_crisis: [
    { key: '博弈', label: '讨银清算', action: '拭泪收情，将他借你发家的银两，一文不少尽数讨回。', scoreChange: 2, strategyKey: '博弈型' },
    { key: '抗争', label: '掀宅而去', action: '既然无情，便教这虚伪深宅，一夜倾覆。', scoreChange: 3, strategyKey: '抗争型' },
    { key: '认命', label: '缚赴火刑', action: '心若死灰，任他们绑赴柴堆，不再挣扎。', scoreChange: -2, strategyKey: '非自主' }
  ],
  merchant_crisis: [
    { key: '博弈', label: '握把放行', action: '忍悲扼腕，以致命把柄换得出城一线。', scoreChange: 2, strategyKey: '博弈型' },
    { key: '抗争', label: '血偿负心', action: '怒极反笑，化作厉影，教负心人血债血偿。', scoreChange: 3, strategyKey: '抗争型' },
    { key: '认命', label: '毒尽魂消', action: '毒入骨髓，在冷眼与讥笑中，魂散灯灭。', scoreChange: -2, strategyKey: '非自主' }
  ],
  monk_crisis: [
    { key: '抗争', label: '焚丹同尽', action: '燃尽最后一缕元神，引爆内丹，与阵法同毁。', scoreChange: 3, strategyKey: '抗争型' },
    { key: '顺从', label: '自入塔中', action: '弃抵抗，任锁妖塔收押，永受煎熬。', scoreChange: -1, strategyKey: '顺从型' },
    { key: '认命', label: '法身溃散', action: '在金光阵中，形神俱灭，化为劫灰。', scoreChange: -2, strategyKey: '非自主' }
  ]
};

export const COSTS = {
  lover_succ_qing: {
    question: '雷劫已至，情与劫皆不可避。天道索价，须择一而受：',
    choices: [
      { label: '双赴冥途', desc: '相拥不释，同归飞灰，留一段凄艳于人间传说。', outcome: '凄美殉情', scoreDelta: 1 },
      { label: '散功护人', desc: '以毕生修为注入他身，自身魂消形散。', outcome: '护他一生', scoreDelta: 0 }
    ]
  },
  lover_succ_bo: {
    question: '内丹已献，雷火暂息。生路虽开，代价随之而来：',
    choices: [
      { label: '堕作凡人', desc: '失去妖身，亲历生老病死，尝尽人间寒暑。', outcome: '沦为凡人', scoreDelta: 0 },
      { label: '借寿相守', desc: '以己寿命补他阳寿，相伴有期，却难长久。', outcome: '折寿相伴', scoreDelta: 1 }
    ]
  },
  lover_succ_shun: {
    question: '你敛形远去，他得保全。然红尘漫漫，孤寂即为代价：',
    choices: [
      { label: '永不相见', desc: '斩断情丝，山高水长，各自归于命途。', outcome: '黯然离去', scoreDelta: 1 },
      { label: '暗里护佑', desc: '隐于暗处，看他娶妻生子，独守百年。', outcome: '阴阳两隔', scoreDelta: 0 }
    ]
  },
  scholar_succ_bo: {
    question: '金帛买路，门第暂开。高墙之内，代价如影随形：',
    choices: [
      { label: '敛性伏低', desc: '收尽锋芒，作无声贵妇，灵魂困于礼法。', outcome: '困于高墙', scoreDelta: 0 },
      { label: '夺权当家', desc: '步步为营，终掌中馈，却再无人可诉真心。', outcome: '冷酷当家', scoreDelta: 1 }
    ]
  },
  scholar_succ_shun: {
    question: '你跪伏求存，得以留院。正室刁难，屈辱即为代价：',
    choices: [
      { label: '吞声度日', desc: '在冷眼与折磨中，耗尽芳华。', outcome: '憋屈一生', scoreDelta: 0 },
      { label: '伺机出走', desc: '待防备稍懈，弃财帛而净身，另觅生路。', outcome: '艰难自救', scoreDelta: 1 }
    ]
  },
  merchant_succ_bo: {
    question: '家产已分，仇隙亦生。财货在手，杀机未远：',
    choices: [
      { label: '携财远遁', desc: '连夜出走，银钱反成追索之引。', outcome: '远遁他乡', scoreDelta: 0 },
      { label: '反噬其产', desc: '设局倾其商路，携资逍遥，不留余地。', outcome: '冷酷抽身', scoreDelta: 1 }
    ]
  },
  merchant_succ_kang: {
    question: '血债已偿，天道记功亦记过。杀孽在肩，须择一以赎：',
    choices: [
      { label: '散道抵孽', desc: '废尽修为，以抵杀业，或堕为畜类。', outcome: '沦为畜类', scoreDelta: 0 },
      { label: '亡命江湖', desc: '从此遁走，正道追杀，无一日安宁。', outcome: '血腥逃亡', scoreDelta: 1 }
    ]
  },
  monk_succ_kang: {
    question: '法师已殁，你亦重伤。仇寇环伺，前路两条：',
    choices: [
      { label: '兵解重修', desc: '弃肉身于尘，魂入草木，再历百年。', outcome: '兵解重修', scoreDelta: 0 },
      { label: '入魔成凶', desc: '不再回头，化作一方凶焰，以杀止杀。', outcome: '凶焰滔天', scoreDelta: 1 }
    ]
  }
};

export const SEAL_TIERS = [
  {
    range: [0, 2], name: '灰烬之印', iconChar: '灰',
    color: '#6B5B4E', colorLight: '#8A7568',
    desc: '如飘萍：自主几近丧失，沦为礼教与欲望的牺牲品。',
    metaphor: '随风而灭，未曾真切地活过。她在这人间的簿册上，只是一个供人警醒或垂怜的注脚。',
    examples: [
      {
        title: '尸变', corpus: '聊斋志异', role: '灵堂女尸', score: 1,
        gist: '儿媳新亡，尸身停放灵堂，本无自主意识；只因尸变本能扑人，数息即被制伏——为本项目主体性最低之参照。',
      },
      {
        title: '狐嫁女', corpus: '聊斋志异', role: '待嫁狐女', score: 1,
        gist: '婚礼全由父母操办，本人无一言一行；殷公窥见仪仗，故事焦点却在人狐之交，狐女自身几近透明。',
      },
    ],
  },
  {
    range: [3, 4], name: '银辉之印', iconChar: '银',
    color: '#7C8FA0', colorLight: '#9DB5C8',
    desc: '困樊笼：有心自处，奈何天道与人情如网，终须妥协。',
    metaphor: '情丝千缕，终成樊笼。她保全了性命，却在这人间的规矩里，折断了原本属于山野的羽翼。',
    examples: [
      {
        title: '娇娜', corpus: '聊斋志异', role: '娇娜', score: 4,
        gist: '狐族少女随家借住，以法术与协商应对雷劫；与孔生情愫难成，终以「好了疮疤还没有忘记痛吗」自断边界，悄然离去。',
      },
      {
        title: '聂小倩', corpus: '聊斋志异', role: '聂小倩', score: 4,
        gist: '受妖精挟制，被迫害人取心；遇宁采臣刚直，遂以揭露、顺从与孝道为筹码，换得出世之机——策略转换后终得人间归宿。',
      },
    ],
  },
  {
    range: [5, 6], name: '金焰之印', iconChar: '金',
    color: '#A07820', colorLight: '#C8982A',
    desc: '善筹谋：以智谋与规则换取生路，进退有据。',
    metaphor: '长袖善舞，进退有度。她用人间的规则赢得了敬畏，将一场本该是死局的异类之恋，下成了一盘棋。',
    examples: [
      {
        title: '莲香', corpus: '聊斋志异', role: '莲香', score: 5,
        gist: '识得李姑娘是鬼，以医术与才智护桑生性命；自明「不是那类狐狸」，在情感依附与理性守护之间维持平衡。',
      },
      {
        title: '程家少女', corpus: '子不语', role: '程家狐精', score: 6,
        gist: '闻程家女儿受辱，一声不响离去；后派婢女设局惩戒恶霸，事毕方以三点比例原则完整自陈——战略沉默与精密报复兼而有之。',
      },
    ],
  },
  {
    range: [7, 9], name: '朱砂之印', iconChar: '朱',
    color: '#8B1A1A', colorLight: '#C53030',
    desc: '破天地：意志极坚，宁可玉碎，绝不低头。',
    metaphor: '宁为玉碎，不入樊笼。哪怕法雷加身、名声扫地，她也要在这天地间，刻下只属于自己的名字。',
    examples: [
      {
        title: '狐女供养公婆', corpus: '子不语', role: '守墓狐女', score: 7,
        gist: '夫死守墓，遇公婆于荒年，伏地坦承狐身，以六七年侍奉换得土地神感念；终蜕形成仙，仍携公婆同赴泰山。',
      },
      {
        title: '素秋', corpus: '聊斋志异', role: '素秋', score: 8,
        gist: '蠹鱼精化女，拒高门婚配；被卖后以蟒蛇法术脱身，预知战乱、传授法术后离去——婚配、去留皆由己断。',
      },
    ],
  },
];

export function getSealTier(score) {
  const clamped = Math.max(0, Math.min(9, score));
  return SEAL_TIERS.find(t => clamped >= t.range[0] && clamped <= t.range[1]) || SEAL_TIERS[0];
}

const RECAP_STRAT = {
  博弈型: '以计', 情感型: '以情', 顺从型: '以顺', 抗争型: '以争', 非自主: '以命', 避世: '避世',
};

/** 终局路径回顾（第二人称，约五十字） */
export function getPathRecap({ typeKey, encKey, finalStratKey, transferred, outcomeStr, score }) {
  const typeLabel = TYPE_PANELS[typeKey]?.label || typeKey;
  const enc = ENCOUNTERS.find(e => e.key === encKey);
  const strat = RECAP_STRAT[finalStratKey] || finalStratKey;
  const tier = getSealTier(score).name;

  if (encKey === 'hermit') {
    return `你选择避世潜修，不涉红尘情劫，终「${outcomeStr}」——万缘渐淡，此路由你自行斩断。`;
  }

  const encShort = enc?.label || '红尘';
  const trans = transferred ? '，初策既破另择生路' : '';

  if (tier === '灰烬之印') {
    return `你以${typeLabel}身遇${encShort}，一路退让认命${trans}，终「${outcomeStr}」——人世簿册上，几无你作主之时。`;
  }
  if (tier === '银辉之印') {
    return `你以${typeLabel}身涉${encShort}，${strat}周旋${trans}，终「${outcomeStr}」——命虽保住，樊笼仍在。`;
  }
  if (tier === '金焰之印') {
    return `你以${typeLabel}身遇${encShort}，善${strat}布局${trans}，终「${outcomeStr}」——进退有据，生路是你亲手博来。`;
  }
  return `你以${typeLabel}身闯${encShort}，宁可${strat}逆命${trans}，终「${outcomeStr}」——天地虽不容，名姓仍在你手。`;
}
