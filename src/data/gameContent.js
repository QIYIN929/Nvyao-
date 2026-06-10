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

export const TYPES = {
  狐: {
    key: '狐', label: '狐', score: 3,
    subtitle: '魅影绰约，然心窍玲珑',
    desc: '以幻化之术游走人间，深谙世情，长于权衡。她的眼眸里藏着千年的算计，也藏着真实的情欲。',
    color: '#A07820'
  },
  鬼: {
    key: '鬼', label: '鬼', score: 1,
    subtitle: '执念不消，化形留人间',
    desc: '死亡不是终点，而是另一种存在的开端。她以执念为骨，以记忆为肉，游荡在阴阳之间，不肯散去。',
    color: '#7C8FA0'
  },
  精: {
    key: '精', label: '精', score: 1,
    subtitle: '草木感灵，初涉尘世',
    desc: '山石草木，经年累月，终于在某个清晨睁开了眼。人间于她是陌生的迷宫，危险而令人着迷。',
    color: '#2C4A3E'
  },
  仙: {
    key: '仙', label: '仙', score: 3,
    subtitle: '谪落凡胎，天规在颈',
    desc: '天庭的诫令刻在她的魂魄深处，人间的烟火却也点燃了她的眼睛。规则与欲望之间，她必须做出选择。',
    color: '#8B1A1A'
  },
};

export const ENCOUNTERS = [
  {
    key: 'lover', label: '纯良痴情者',
    desc: '心思纯明，纵然知晓异类身份，亦不改初衷。',
    crisisKey: 'lover_crisis',
    themeColor: '#7C8FA0'
  },
  {
    key: 'scholar', label: '落魄儒生',
    desc: '才情出众却手无缚鸡之力，渴望红袖添香，更惧世俗门风。',
    crisisKey: 'scholar_crisis',
    themeColor: '#6B5B4E'
  },
  {
    key: 'merchant', label: '豪商权贵',
    desc: '见多识广，贪婪无餍。不信鬼神，只信强权与利益。',
    crisisKey: 'merchant_crisis',
    themeColor: '#A07820'
  },
  {
    key: 'monk', label: '无情法师',
    desc: '手持桃木法器，以斩妖除魔为己任，绝不通融。',
    crisisKey: 'monk_crisis',
    themeColor: '#8B1A1A'
  },
  {
    key: 'hermit', label: '避世潜修',
    desc: '不入滚滚红尘，结庐深山，吐纳天地日月之精华。',
    crisisKey: null,
    themeColor: '#2C4A3E'
  }
];

export const PROBES = [
  { key: 'hide', label: '隐瞒躲避', desc: '假称抱恙，闭门不出，祈祷风波自行平息。' },
  { key: 'bribe', label: '暗施小惠', desc: '施法变出些许金银财物，试图堵住悠悠众口。' },
  { key: 'charm', label: '魅惑镇压', desc: '动用妖术，令起疑之人神智昏聩，忘却此事。' }
];

export const CRISES = {
  lover_crisis: {
    title: '阴阳殊途·天道不容',
    scene: '他虽情深，但你发现天地法则正在吸食他的阳气。若再不决断，天雷将至，他亦会枯竭而死。',
    strategies: [
      { key: '情动', label: '生死相许', desc: '不顾天谴将至，紧紧抱住他，泣诉宁可同死也不独生。', score: 0, success: true, costType: 'lover_succ_qing' },
      { key: '博弈', label: '逆天改命', desc: '剖出百年内丹强行续他的阳寿，以此换取天道的宽恕。', score: 2, success: true, costType: 'lover_succ_bo' },
      { key: '顺从', label: '黯然抽身', desc: '为了不连累他，你收敛气息，趁夜色不告而别。', score: -2, success: true, costType: 'lover_succ_shun' },
      { key: '抗争', label: '直面天劫', desc: '强开法相，引雷劫入体，誓要以一己之力抗衡天地法则。', score: 3, success: false, failText: '蚍蜉撼树，天雷贯体。你浑身焦黑，他亦被震飞。你意识到天地不仁，凭蛮力绝无生路。' }
    ]
  },
  scholar_crisis: {
    title: '礼教绞杀·门风如铁',
    scene: '他的宗族长辈带着家法与符水堵在门外，痛斥他被邪祟迷了心窍。他躲在人后，一言不发。',
    strategies: [
      { key: '博弈', label: '抛金掷银', desc: '冷笑一声，挥手变出满地金珠，许诺能保家族三代富贵。', score: 2, success: true, costType: 'scholar_succ_bo' },
      { key: '顺从', label: '忍辱负重', desc: '收起妖力跪伏在堂前，发誓甘愿为奴为婢绝无二心。', score: -2, success: true, costType: 'scholar_succ_shun' },
      { key: '情动', label: '垂泪苦求', desc: '凄楚地看向书生，质问他难道忘了西窗剪烛的恩情。', score: 0, success: false, failText: '眼泪并未唤醒他的勇气，他在宗族的怒喝下退缩了。长辈的冷笑如刀，将你的痴心寸寸凌迟。' },
      { key: '抗争', label: '大闹厅堂', desc: '掀翻香案显出骇人法相，尖啸着让这腐朽的家族鸡犬不宁。', score: 3, success: false, failText: '你虽砸碎了厅堂，却看到书生眼中那毫不掩饰的恐惧与厌恶。那一刻你明白，情分已被亲手撕碎。' }
    ]
  },
  merchant_crisis: {
    title: '渣男背叛·后院倾轧',
    scene: '你在杯中嗅到了雄黄与毒药的气息。他不仅结了新欢，还在门外埋伏了刀斧手，想要你的命。',
    strategies: [
      { key: '博弈', label: '抽薪止沸', desc: '不动声色扣住他的命脉，要求拿走家产的一半作为封口费。', score: 2, success: true, costType: 'merchant_succ_bo' },
      { key: '抗争', label: '血刃负心', desc: '利爪骤现，既然真心错付，便要将这薄情寡义的心肝挖出来看看！', score: 3, success: true, costType: 'merchant_succ_kang' },
      { key: '情动', label: '哀诉前缘', desc: '强忍灼痛握住他的手，期盼他能念及旧情悬崖勒马。', score: 0, success: false, failText: '他厌恶地甩开你的手，大呼“斩妖”。你倾注的心血，换来的是穿透肩胛的一支冷箭。' },
      { key: '顺从', label: '断尾求生', desc: '自废修为挣脱阵法，如丧家之犬般狼狈逃出高墙。', score: -2, success: false, failText: '你的退让换来的是斩草除根。他嫌你不死，又花重金请来法师封锁了全城。' }
    ]
  },
  monk_crisis: {
    title: '天威法难·照妖悬顶',
    scene: '无名法师布下天罗地网，金光大阵压得你现出原形。他剑锋直指你的咽喉，绝无转圜。',
    strategies: [
      { key: '抗争', label: '抵死斗法', desc: '燃尽百年修为化作冲天妖气，与这牛鼻子拼个鱼死网破。', score: 3, success: true, costType: 'monk_succ_kang' },
      { key: '情动', label: '泣诉身世', desc: '凄然泪下，讲述自己百年苦修的不易与未曾害人的冤屈。', score: 0, success: false, failText: '“妖孽休要多言！”法师根本不听辩解，一道掌心雷劈得你三魂七魄将要离体。' },
      { key: '博弈', label: '献宝求生', desc: '吐出千金难买的本命秘宝，试图与法师做一场不见光的交易。', score: 2, success: false, failText: '法师贪婪地收下宝物，反手却又是一剑。“除恶务尽，宝物亦是贫道的！”你才知人心险恶。' },
      { key: '顺从', label: '伏地乞怜', desc: '叩首如捣蒜，哀求法师念在天道好生，网开一面。', score: -2, success: false, failText: '剑锋毫不留情地穿透你的灵脉。“人妖殊途，留你不得。”这是你听到的最后一句话。' }
    ]
  }
};

export const TRANSITIONS = {
  lover_crisis: [
    { key: '博弈', label: '逆天改命', action: '散尽修为，强行替他挡下劫数。', scoreChange: 3, strategyKey: '博弈型' },
    { key: '情动', label: '同赴黄泉', action: '既然天不容情，那便黄泉路上一同走。', scoreChange: 0, strategyKey: '情感型' },
    { key: '认命', label: '绝望认命', action: '闭上双眼，任凭天雷将自己劈作飞灰。', scoreChange: -3, strategyKey: '非自主' }
  ],
  scholar_crisis: [
    { key: '博弈', label: '冷酷清算', action: '擦干眼泪，将助他发家的银两尽数讨回。', scoreChange: 3, strategyKey: '博弈型' },
    { key: '抗争', label: '大闹厅堂', action: '既然无情，便掀翻这虚伪的深宅大院。', scoreChange: 4, strategyKey: '抗争型' },
    { key: '认命', label: '绝望认命', action: '心死如灰，任由他们将自己绑上火刑架。', scoreChange: -3, strategyKey: '非自主' }
  ],
  merchant_crisis: [
    { key: '博弈', label: '抽薪止沸', action: '强忍悲痛，用致命把柄要挟他放行。', scoreChange: 3, strategyKey: '博弈型' },
    { key: '抗争', label: '血刃负心', action: '怒极反笑，化作恶厉生撕了这负心人。', scoreChange: 4, strategyKey: '抗争型' },
    { key: '认命', label: '绝望认命', action: '毒发攻心，在冷眼与嘲笑中凄凉消散。', scoreChange: -3, strategyKey: '非自主' }
  ],
  monk_crisis: [
    { key: '抗争', label: '抵死反扑', action: '燃烧最后的一丝元神，引爆内丹。', scoreChange: 4, strategyKey: '抗争型' },
    { key: '顺从', label: '自缚锁妖', action: '放弃抵抗，甘愿被收入锁妖塔中永受折磨。', scoreChange: -2, strategyKey: '顺从型' },
    { key: '认命', label: '绝望认命', action: '法身溃散，在阵法中化为一滩劫灰。', scoreChange: -3, strategyKey: '非自主' }
  ]
};

export const COSTS = {
  lover_succ_qing: {
    question: '你触怒了天道，雷劫已锁定了你们。代价已至：',
    choices: [
      { label: '双双赴死', desc: '紧紧相拥，化作飞灰。', outcome: '凄美殉情' },
      { label: '散功保他', desc: '将所有修为注入他体内，自己消散。', outcome: '护他一生' }
    ]
  },
  lover_succ_bo: {
    question: '天道收下了你的内丹，你们活了下来，但代价已至：',
    choices: [
      { label: '沦为凡人', desc: '生老病死，你将亲历人间至苦。', outcome: '沦为凡人' },
      { label: '借命延喘', desc: '以自己的寿命补他的寿命。', outcome: '折寿相伴' }
    ]
  },
  lover_succ_shun: {
    question: '你虽离开保全了他，但红尘孤寂，代价已至：',
    choices: [
      { label: '永不复见', desc: '斩断情丝，从此山高水长。', outcome: '黯然离去' },
      { label: '暗中护佑', desc: '在暗处看他娶妻生子，百年孤独。', outcome: '阴阳两隔' }
    ]
  },
  scholar_succ_bo: {
    question: '长辈看在钱财面上准你入门，但后院森森，代价已至：',
    choices: [
      { label: '隐忍伏低', desc: '收敛所有脾性，做个没有灵魂的贵妇。', outcome: '困于高墙' },
      { label: '夺取家权', desc: '步步算计，最终大权在握，却再无真心。', outcome: '冷酷当家' }
    ]
  },
  scholar_succ_shun: {
    question: '你委曲求全留在了后院，但正妻百般刁难，代价已至：',
    choices: [
      { label: '吞声饮泣', desc: '在折磨中耗尽芳华。', outcome: '憋屈一生' },
      { label: '寻机逃走', desc: '待防备松懈，舍弃一切净身出户。', outcome: '艰难自救' }
    ]
  },
  merchant_succ_bo: {
    question: '你成功拿回了一半家产，但他已怀恨在心，代价已至：',
    choices: [
      { label: '舍财保命', desc: '远走高飞，这笔钱也成了催命符。', outcome: '远遁他乡' },
      { label: '反坑一把', desc: '将他彻底搞破产，你带着钱逍遥。', outcome: '冷酷抽身' }
    ]
  },
  merchant_succ_kang: {
    question: '你满手鲜血，诛杀了负心汉，但天道大网已降，代价已至：',
    choices: [
      { label: '自毁修为', desc: '散尽道行以抵杀孽。', outcome: '沦为畜类' },
      { label: '亡命天涯', desc: '从此被正道四处追杀。', outcome: '血腥逃亡' }
    ]
  },
  monk_succ_kang: {
    question: '你拼着重伤斩杀了法师，但也成了妖界的众矢之的，代价已至：',
    choices: [
      { label: '兵解重修', desc: '舍弃肉身，重新化为草木。', outcome: '兵解重修' },
      { label: '屠尽仇寇', desc: '彻底入魔，化为一方大凶。', outcome: '凶焰滔天' }
    ]
  }
};

export const SEAL_TIERS = [
  {
    range: [-10, 2], name: '灰烬之印', iconChar: '灰',
    color: '#6B5B4E', colorLight: '#8A7568',
    desc: '如飘萍：完全失去自我主张，沦为欲望与礼教的牺牲品。',
    metaphor: '随风而灭，未曾真切地活过。她在这人间的簿册上，只是一个供人警醒或垂怜的注脚。'
  },
  {
    range: [3, 5], name: '银辉之印', iconChar: '银',
    color: '#7C8FA0', colorLight: '#9DB5C8',
    desc: '困樊笼：有心抗争，奈何天道与人情如网，最终只能妥协。',
    metaphor: '情丝千缕，终成樊笼。她保全了性命，却在这人间的规矩里，折断了原本属于山野的羽翼。'
  },
  {
    range: [6, 7], name: '金焰之印', iconChar: '金',
    color: '#A07820', colorLight: '#C8982A',
    desc: '善筹谋：极高的世俗智慧，用利益与规则换取了生存空间。',
    metaphor: '长袖善舞，进退有度。她用人间的规则赢得了敬畏，将一场本该是死局的异类之恋，下成了一盘棋。'
  },
  {
    range: [8, 20], name: '朱砂之印', iconChar: '朱',
    color: '#8B1A1A', colorLight: '#C53030',
    desc: '破天地：极度强烈的自我意志。宁可玉碎，绝不低头。',
    metaphor: '宁为玉碎，不入樊笼。哪怕法雷加身、名声扫地，她也要在这天地间，刻下只属于自己的名字。'
  }
];

export function getSealTier(score) {
  return SEAL_TIERS.find(t => score >= t.range[0] && score <= t.range[1]) || SEAL_TIERS[0];
}
