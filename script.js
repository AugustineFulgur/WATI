const groupLabel = {
  TECH: "技术风格",
  WORK: "工作风格",
};

const dimensionMeta = {
  RB: {
    label: "技术方向",
    kind: "binary",
    order: ["R", "B"],
    options: {
      R: "红队导向",
      B: "蓝队导向",
    },
  },
  SL: {
    label: "技术水平",
    kind: "binary",
    order: ["H", "L"],
    options: {
      H: "高水平",
      L: "成长中",
    },
  },
  AT: {
    label: "工作态度",
    kind: "binary",
    order: ["G", "N"],
    options: {
      G: "建设型",
      N: "摆烂型",
    },
  },
  ST: {
    label: "工作立场",
    kind: "binary",
    order: ["J", "Y"],
    options: {
      J: "甲方视角",
      Y: "乙方视角",
    },
  },
  AG: {
    label: "主体性",
    kind: "binary",
    order: ["P", "W"],
    options: {
      P: "主动推动",
      W: "被动执行",
    },
  },
  ORG: {
    label: "组织身份认知",
    kind: "multi",
    order: ["A", "B", "O", "I"],
    options: {
      A: "甲方",
      B: "乙方",
      O: "外包",
      I: "中介",
      M: "混合认知",
    },
  },
  EX: {
    label: "输出偏好",
    kind: "binary",
    order: ["C", "D"],
    options: {
      C: "代码与实战",
      D: "文档与流程",
    },
  },
  TL: {
    label: "工具路线",
    kind: "binary",
    order: ["X", "S"],
    options: {
      X: "原理优先",
      S: "脚本优先",
    },
  },
  PR: {
    label: "职业呈现",
    kind: "binary",
    order: ["K", "T"],
    options: {
      K: "专业可信",
      T: "随性不修边幅",
    },
  },
  SP: {
    label: "处置节奏",
    kind: "binary",
    order: ["F", "M"],
    options: {
      F: "快节奏",
      M: "慢热派",
    },
  },
};

const ROLE_NAMES = [
  "技术砖家",
  "文档工程师",
  "吗喽",
  "臭外包",
  "伪人",
  "大甲方",
  "合格的乙方工程师",
  "工贼",
  "两面派",
  "脚本小子",
  "技术*丝",
  "牛马",
  "慢热派",
];

const ROLE_ORDER = Object.fromEntries(ROLE_NAMES.map((name, index) => [name, index]));

const roleDescriptions = {
  技术砖家: "总而言之，你现在感觉自己是一个专家！",
  文档工程师: "虽然你是一个技术。但你有时候会想面向文档安全真的是技术吗？",
  吗喽: "你不关心别的，只关心下午茶。",
  臭外包: "你不关心别的，只关心甲方的下午茶。",
  伪人: "其实你也不知道你要干啥，可能人是一颗不会思考的芦苇吧。",
  大甲方: "大甲方驾到通通闪开！",
  合格的乙方工程师: "每天脸上挂着命很苦的商业化笑容。",
  工贼: "什么叫做你把同事的剩余价值献给领导了？",
  两面派: "在甲方活得不像甲方；在乙方活得不像乙方，这个世界到底怎么了？",
  脚本小子: "跟我的xray/awvs/dddd/nuclei说去吧/大河之剑天上来，御剑御剑御剑！",
  "技术*丝": "虽然你的技术已经够得上当专家了，但由内而外的*丝气质让客户完全不能信任你。",
  牛马: "不是这砖怎么搬不完啊？？？",
  慢热派: "当你用上这个洞时，世界上99%存在这个漏洞的系统都已经被修了。",
};

const questions = [
  {
    id: 1,
    group: "TECH",
    dimension: "RB",
    text: "你刚接到一个新系统评估，咖啡还没喝完第一口，你先开哪条线？",
    options: [
      { text: "先冲攻击面，看看哪里能打穿。", effects: { RB: "R", EX: "C" } },
      { text: "先盘资产和边界，把防线立起来。", effects: { RB: "B", EX: "D" } },
      { text: "先把咖啡喝完。", effects: { SP: "M", AG: "W" }, roleBoost: { 慢热派: 1 } },
    ],
  },
  {
    id: 2,
    group: "TECH",
    dimension: "SL",
    text: "群里甩来一个 0day 通告，你的真实状态更像？",
    options: [
      { text: "先复现再说，顺手给出修复姿势。", effects: { SL: "H", TL: "X" } },
      { text: "先看社区分析，再决定自己要不要动手。", effects: { SL: "L", TL: "S" } },
      { text: "等现成 PoC 和攻略，按说明走。", effects: { SL: "L", TL: "S" }, roleBoost: { 脚本小子: 1 } },
    ],
  },
  {
    id: 3,
    group: "TECH",
    dimension: "TL",
    text: "拿到一批目标资产后，你最先打开的是？",
    options: [
      { text: "笔记本和白板：先建模后开打。", effects: { TL: "X", SL: "H", EX: "D" } },
      { text: "脚本仓库：先跑一轮，结果再说。", effects: { TL: "S", SL: "L", EX: "C" } },
      { text: "神器全家桶：先把漏洞数量拉满。", effects: { TL: "S", SL: "L", EX: "C" }, roleBoost: { 脚本小子: 2 } },
    ],
  },
  {
    id: 4,
    group: "TECH",
    dimension: "EX",
    text: "交付前你最先补的是？",
    options: [
      { text: "流程图、操作手册、责任边界。", effects: { EX: "D", ST: "J", PR: "K" } },
      { text: "PoC、验证脚本、复现步骤。", effects: { EX: "C", RB: "R", PR: "K" } },
      { text: "先把模板复制好，细节后面补。", effects: { EX: "D", AT: "N", PR: "T" } },
    ],
  },
  {
    id: 5,
    group: "TECH",
    dimension: "TL",
    text: "BP是",
    options: [
      { text: "打嗝套装", effects: { TL: "S", SL: "L" }, roleBoost: { 脚本小子: 2 } },
      { text: "吃饭的家伙", effects: { TL: "S", RB: "R" }, roleBoost: { 脚本小子: 1 } },
      {
        text: "一款英语开发的Web应用程序安全测试集成平台。该平台通过代理服务器拦截HTTP/S通信流量，提供Spider爬虫、Scanner漏洞扫描（专业版功能）、Intruder自动化攻击等工具链。支持对请求报文进行任意字段编辑、重放与序列篡改，内置Repeater请求重复验证、Decoder编码解码转换、Comparer数据对比等辅助模块，可实现对Web应用全流程交互行为的深度监控与自定义干预。平台支持扩展插件生态，用户可通过第三方扩展增强指纹识别、漏洞利用、流量加密绕过等能力，广泛用于渗透测试、漏洞挖掘与安全审计场景，具备操作直观、模块化程度高、适配复杂业务架构等特点，是行业内主流的应用安全评估解决方案之一。",
        effects: { TL: "X", SL: "H", EX: "D" },
      },
      { text: "我用yakit", effects: { TL: "S", RB: "R" }, roleBoost: { 脚本小子: 2 } },
    ],
  },
  {
    id: 6,
    group: "TECH",
    dimension: "RB",
    text: "演练里你最爽的瞬间是？",
    options: [
      { text: "拿下入口点后一路横向。", effects: { RB: "R", AG: "P", EX: "C" } },
      { text: "规则生效后一波告警全收网。", effects: { RB: "B", AG: "P", EX: "D" } },
      { text: "先截图发群问“这算不算风险”。", effects: { RB: "B", AG: "W", AT: "N" } },
    ],
  },
  {
    id: 7,
    group: "TECH",
    dimension: "PR",
    text: "客户问“这个洞为什么成立”，你会？",
    options: [
      { text: "白板讲原理，讲到对方点头。", effects: { PR: "K", SL: "H", TL: "X" } },
      { text: "我把截图发你，自己悟。", effects: { PR: "T", SL: "L", TL: "S" } },
      { text: "能讲，但不太想讲，懂的都懂。", effects: { PR: "T", SL: "H" }, roleBoost: { "技术*丝": 2 } },
    ],
  },
  {
    id: 8,
    group: "TECH",
    dimension: "EX",
    text: "你周报里最稳的内容通常是？",
    options: [
      { text: "处置流程、资产分层和整改计划。", effects: { EX: "D", ST: "J", PR: "K" } },
      { text: "payload、截图、漏洞复现链接。", effects: { EX: "C", RB: "R" } },
      { text: "复制上周内容，把日期改一下。", effects: { EX: "D", AT: "N", PR: "T" }, roleBoost: { 伪人: 1 } },
    ],
  },
  {
    id: 9,
    group: "TECH",
    dimension: "TL",
    text: "一批资产要排查漏洞，你更常见的路线是？",
    options: [
      { text: "先批量扫，先看漏洞数。", effects: { TL: "S", SL: "L", EX: "C" }, roleBoost: { 脚本小子: 2 } },
      { text: "先挑高价值目标，精扫深挖。", effects: { TL: "X", SL: "H", EX: "C" } },
      { text: "先按模板跑一轮，让报表整齐。", effects: { TL: "S", EX: "D", AT: "N" } },
    ],
  },
  {
    id: 10,
    group: "TECH",
    dimension: "SP",
    text: "发现高危漏洞后的处置节奏，你更像？",
    options: [
      { text: "先止血，今晚就把关键风险压下去。", effects: { SP: "F", AG: "P", AT: "G" } },
      { text: "排进迭代，等测试窗口统一处理。", effects: { SP: "M", AG: "W" } },
      { text: "先观望行业案例，避免误操作。", effects: { SP: "M", AG: "W" }, roleBoost: { 慢热派: 1 } },
    ],
  },
  {
    id: 11,
    group: "WORK",
    dimension: "ORG",
    text: "首先：",
    options: [
      {
        text: "甲方Lives matter，这群臭外包每天就知道吃香蕉",
        effects: { ORG: "A", ST: "J", AT: "N" },
        roleBoost: { 大甲方: 2 },
      },
      {
        text: "乙方Lives matter，这群死甲方每天发些鬼都看不懂的需求",
        effects: { ORG: "B", ST: "Y", AT: "N" },
        roleBoost: { 合格的乙方工程师: 1 },
      },
      {
        text: "外包 Lives matter，因为我就是外包，你们就这样欺负一个外包？劳动法在哪？",
        effects: { ORG: "O", ST: "Y", AT: "G" },
        roleBoost: { 臭外包: 3 },
      },
      {
        text: "我是臭中介",
        effects: { ORG: "I", ST: "Y", AT: "N" },
        roleBoost: { 工贼: 2 },
      },
    ],
  },
  {
    id: 12,
    group: "WORK",
    dimension: "AT",
    text: "怎么不聊了？",
    options: [
      {
        text: "周五了忏悔了？又要努力给资本家吸血了？什么时候能站起来啊？都把手机掏出来！扔老板脸上！聊！做新时代的主人！做领导的奶奶！我觉得有些群员心态还是没有放稳，现在这么好的带薪聊天机会，不珍惜，你给老板打工搬砖，你能学到东西吗？你在群里聊天，你培养的交际能力，是实打实的呀，是跟着你一辈子的呀，不要把眼光老是放在工资工资上面，你将来能力有了，你去哪儿不能高就？说了这么多，一起摸鱼吧。怎么回事，好久没人讲话了，今天是工作日啊，工作日不在群里讲话是想干什么，给资本家当走狗吗？我工作日一看到群里的消息断了，我的心就发痛",
        effects: { AT: "N", AG: "P" },
      },
      { text: "因为领导来了", effects: { AT: "N", AG: "W", ST: "J" } },
      { text: "因为甲方来了", effects: { AT: "N", AG: "W", ST: "Y", ORG: "B" } },
      { text: "因为HR来了", effects: { AT: "N", AG: "W" } },
    ],
  },
  {
    id: 13,
    group: "WORK",
    dimension: "AT",
    text: "我是：",
    options: [
      { text: "吗喽", effects: { AT: "N", AG: "W", SL: "L" }, roleBoost: { 吗喽: 6 } },
      { text: "新时代复合型全能网络安全人才", effects: { AT: "G", AG: "P", SL: "H" }, roleBoost: { 技术砖家: 4 } },
      { text: "一颗会思考的芦苇🌾", effects: { SP: "M", AT: "N" }, roleBoost: { 伪人: 4, 慢热派: 2 } },
      { text: "臭外包", effects: { ORG: "O", ST: "Y", AG: "W" }, roleBoost: { 臭外包: 7 } },
      { text: "黑客", effects: { RB: "R", SL: "H", AG: "P" }, roleBoost: { 技术砖家: 4 } },
    ],
  },
  {
    id: 14,
    group: "WORK",
    dimension: "AT",
    text: "护网让我",
    options: [
      { text: "喜欢", effects: { AT: "G", AG: "P", SP: "F" } },
      { text: "讨厌", effects: { AT: "N", AG: "W" } },
      { text: "感到恶心", effects: { AT: "N", AG: "W", SP: "M" }, roleBoost: { 吗喽: 2 } },
    ],
  },
  {
    id: 15,
    group: "WORK",
    dimension: "ST",
    text: "项目会上，需求和安全冲突时你会？",
    options: [
      { text: "先把风险和底线摆清楚，再谈工期。", effects: { ST: "J", AT: "G", AG: "P" } },
      { text: "先满足交付，风险后面补票。", effects: { ST: "Y", AT: "N", AG: "W" } },
      { text: "看谁声音大就跟谁。", effects: { ST: "Y", AT: "N", AG: "W" }, roleBoost: { 伪人: 2 } },
    ],
  },
  {
    id: 16,
    group: "WORK",
    dimension: "AG",
    text: "复盘会上已经开始互相甩锅，你更像？",
    options: [
      { text: "贴时间线，对事不对人。", effects: { AG: "P", AT: "G", ST: "J" } },
      { text: "顺手把锅甩给最菜的同事。", effects: { AG: "P", AT: "N", ST: "Y" }, roleBoost: { 工贼: 3 } },
      { text: "不开麦，等会议结束。", effects: { AG: "W", AT: "N" } },
      { text: "默默把锅背了，然后继续搬砖。", effects: { AG: "W", AT: "G" }, roleBoost: { 牛马: 3 } },
    ],
  },
  {
    id: 17,
    group: "WORK",
    dimension: "ORG",
    text: "如果工位上只能挂一个身份牌，你会挂：",
    options: [
      { text: "大甲方", effects: { ORG: "A", ST: "J", PR: "K" }, roleBoost: { 大甲方: 3 } },
      {
        text: "合格的乙方工程师",
        effects: { ORG: "B", ST: "Y", AT: "G", PR: "K" },
        roleBoost: { 合格的乙方工程师: 4 },
      },
      { text: "臭外包", effects: { ORG: "O", ST: "Y", AG: "W" }, roleBoost: { 臭外包: 4 } },
      { text: "中介协调员", effects: { ORG: "I", ST: "Y", AG: "P" }, roleBoost: { 工贼: 2 } },
    ],
  },
  {
    id: 18,
    group: "WORK",
    dimension: "EX",
    text: "交付前最后一天，你优先补哪块？",
    options: [
      { text: "文档、流程、证据链写到谁看都懂。", effects: { EX: "D", ST: "J", PR: "K" }, roleBoost: { 文档工程师: 3 } },
      { text: "PoC 和脚本再抛光一遍。", effects: { EX: "C", RB: "R", TL: "S" }, roleBoost: { 技术砖家: 1 } },
      { text: "先把漏洞数量做漂亮，细节回头补。", effects: { EX: "C", TL: "S", AT: "N" }, roleBoost: { 脚本小子: 2 } },
    ],
  },
  {
    id: 19,
    group: "WORK",
    dimension: "PR",
    text: "客户说“你看起来不太像专家”，你第一反应是？",
    options: [
      { text: "拿白板讲原理，讲到他点头。", effects: { PR: "K", SL: "H", TL: "X" } },
      { text: "技术我有，但懒得解释，爱信不信。", effects: { PR: "T", SL: "H" }, roleBoost: { "技术*丝": 4 } },
      { text: "先把帽衫换成衬衫，再来一遍。", effects: { PR: "K", SL: "H" } },
      { text: "先把报告模板套上再说。", effects: { PR: "T", EX: "D" }, roleBoost: { 文档工程师: 1 } },
    ],
  },
  {
    id: 20,
    group: "WORK",
    dimension: "SP",
    text: "碰到高危漏洞修复窗口，你的节奏是？",
    options: [
      { text: "今晚就修，先止血再优化。", effects: { SP: "F", AG: "P", AT: "G" } },
      { text: "排进下个迭代，先观察一阵。", effects: { SP: "M", AG: "W" } },
      { text: "等行业案例出来再决定。", effects: { SP: "M", AG: "W" }, roleBoost: { 慢热派: 3 } },
      { text: "这个洞很新，等它变旧一点再说。", effects: { SP: "M", AG: "W", AT: "N" }, roleBoost: { 慢热派: 4 } },
    ],
  },
  {
    id: 21,
    group: "WORK",
    dimension: "ORG",
    text: "周会里你最常说的一句是？",
    options: [
      { text: "我们是甲方，这个规则就这么定。", effects: { ORG: "A", ST: "J", PR: "K" }, roleBoost: { 大甲方: 2 } },
      { text: "我们是乙方，先把这单交付再说。", effects: { ORG: "B", ST: "Y", PR: "K" }, roleBoost: { 合格的乙方工程师: 2 } },
      { text: "我只是外包，别问我为什么。", effects: { ORG: "O", ST: "Y", AG: "W" }, roleBoost: { 臭外包: 2 } },
      { text: "别分甲乙了，我两边都得陪笑。", effects: { ORG: "I", ST: "Y", PR: "T" }, roleBoost: { 两面派: 4 } },
    ],
  },
  {
    id: 22,
    group: "WORK",
    dimension: "ST",
    text: "你在甲乙两边的表现通常是？",
    options: [
      { text: "在甲方像甲方，在乙方像乙方。", effects: { ST: "J", PR: "K" } },
      { text: "在甲方像乙方，疯狂接活。", effects: { ORG: "A", ST: "Y", AT: "N" }, roleBoost: { 两面派: 5 } },
      { text: "在乙方像甲方，疯狂拍板。", effects: { ORG: "B", ST: "J", AT: "N" }, roleBoost: { 两面派: 5 } },
      { text: "我自己都不知道我是哪方。", effects: { ORG: "I", ST: "Y", PR: "T" }, roleBoost: { 两面派: 4, 伪人: 1 } },
    ],
  },
  {
    id: 23,
    group: "TECH",
    dimension: "TL",
    text: "周报里“漏洞数”三个字最容易让你？",
    options: [
      { text: "兴奋：数字就是战绩！", effects: { TL: "S", EX: "C", AT: "N" }, roleBoost: { 脚本小子: 3 } },
      { text: "冷静：漏洞数只是参考，得看可利用性。", effects: { TL: "X", SL: "H", PR: "K" }, roleBoost: { 技术砖家: 1 } },
      { text: "纠结：先把表做漂亮，逻辑慢慢补。", effects: { TL: "S", EX: "D", PR: "T" }, roleBoost: { 文档工程师: 1 } },
    ],
  },
  {
    id: 24,
    group: "TECH",
    dimension: "PR",
    text: "你穿着拖鞋讲 0day 时，客户最可能的反应是？",
    options: [
      { text: "懂了懂了，老师继续。", effects: { PR: "K", SL: "H" }, roleBoost: { 技术砖家: 1 } },
      { text: "你先把PPT格式统一一下。", effects: { PR: "T", EX: "D" }, roleBoost: { "技术*丝": 3 } },
      { text: "你技术可能很强，但我还是不太敢信。", effects: { PR: "T", SL: "H" }, roleBoost: { "技术*丝": 5 } },
    ],
  },
  {
    id: 25,
    group: "WORK",
    dimension: "SP",
    text: "一个漏洞从曝光到落地修复，你的实际速度更像？",
    options: [
      { text: "当天推进，当周闭环。", effects: { SP: "F", AG: "P", AT: "G" } },
      { text: "先开会，再开会，然后再开会。", effects: { SP: "M", AG: "W", AT: "N" }, roleBoost: { 慢热派: 2 } },
      { text: "等行业报告出了再说，稳一点。", effects: { SP: "M", AG: "W" }, roleBoost: { 慢热派: 4 } },
    ],
  },
];

const startView = document.getElementById("start-view");
const quizView = document.getElementById("quiz-view");
const resultView = document.getElementById("result-view");

const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const resultBtn = document.getElementById("result-btn");
const restartBtn = document.getElementById("restart-btn");

const progressText = document.getElementById("progress-text");
const answeredText = document.getElementById("answered-text");
const progressFill = document.getElementById("progress-fill");

const questionTag = document.getElementById("question-tag");
const questionText = document.getElementById("question-text");
const optionList = document.getElementById("option-list");

const resultRole = document.getElementById("result-role");
const resultCode = document.getElementById("result-code");
const resultOrg = document.getElementById("result-org");
const resultDesc = document.getElementById("result-desc");
const dimensionGrid = document.getElementById("dimension-grid");
const roleScoreBars = document.getElementById("role-score-bars");

let currentIndex = 0;
let answers = Array(questions.length).fill(null);

function switchView(target) {
  startView.classList.toggle("hidden", target !== "start");
  quizView.classList.toggle("hidden", target !== "quiz");
  resultView.classList.toggle("hidden", target !== "result");
}

function countAnswered() {
  return answers.filter((item) => item !== null).length;
}

function allAnswered() {
  return answers.every((item) => item !== null);
}

function updateProgress() {
  const answered = countAnswered();
  progressText.textContent = `第 ${currentIndex + 1} / ${questions.length} 题`;
  answeredText.textContent = `已答 ${answered} 题`;
  progressFill.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  resultBtn.disabled = !allAnswered();
}

function selectOption(optionIndex) {
  answers[currentIndex] = optionIndex;
  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    renderQuestion();
    return;
  }
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentIndex];
  const dimension = dimensionMeta[question.dimension];
  questionTag.textContent = `${groupLabel[question.group]} · ${dimension.label}`;
  questionText.textContent = `${question.id}. ${question.text}`;
  optionList.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.type = "button";
    button.textContent = option.text;
    if (answers[currentIndex] === index) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => selectOption(index));
    optionList.appendChild(button);
  });

  prevBtn.disabled = currentIndex === 0;
  updateProgress();
}

function buildScores() {
  const scores = {};
  Object.keys(dimensionMeta).forEach((key) => {
    scores[key] = {};
  });

  answers.forEach((answerIndex, idx) => {
    if (answerIndex === null) {
      return;
    }

    const selectedOption = questions[idx].options[answerIndex];
    const effects = selectedOption.effects || {};
    Object.entries(effects).forEach(([dimension, value]) => {
      if (!scores[dimension]) {
        return;
      }
      scores[dimension][value] = (scores[dimension][value] || 0) + 1;
    });
  });

  return scores;
}

function buildRoleBoosts() {
  const boosts = {};
  answers.forEach((answerIndex, idx) => {
    if (answerIndex === null) {
      return;
    }
    const selectedOption = questions[idx].options[answerIndex];
    const roleBoost = selectedOption.roleBoost || {};
    Object.entries(roleBoost).forEach(([role, score]) => {
      boosts[role] = (boosts[role] || 0) + score;
    });
  });
  return boosts;
}

function resolveDimensionScores(scores) {
  const resolved = {};

  Object.keys(dimensionMeta).forEach((key) => {
    const meta = dimensionMeta[key];
    const ranking = meta.order
      .map((value) => ({ value, score: scores[key][value] || 0 }))
      .sort((a, b) => b.score - a.score);

    const tie = ranking.length > 1 && ranking[0].score === ranking[1].score;
    let dominant = ranking[0].value;
    if (tie && meta.kind === "multi") {
      dominant = "M";
    } else if (tie && meta.kind === "binary") {
      dominant = meta.order[0];
    }

    resolved[key] = {
      dominant,
      tie,
      ranking,
    };
  });

  return resolved;
}

function resolveRole(traits, roleBoosts) {
  const roleScore = Object.fromEntries(ROLE_NAMES.map((name) => [name, 0]));
  const add = (role, score) => {
    roleScore[role] = (roleScore[role] || 0) + score;
  };

  Object.entries(roleBoosts).forEach(([role, score]) => {
    if (roleScore[role] !== undefined) {
      add(role, score);
    }
  });

  if (traits.RB === "R") {
    add("技术砖家", 2);
    add("脚本小子", 1);
    add("技术*丝", 1);
  } else {
    add("文档工程师", 2);
    add("大甲方", 1);
    add("合格的乙方工程师", 1);
  }

  if (traits.SL === "H") {
    add("技术砖家", 6);
    add("技术*丝", 3);
    add("大甲方", 1);
    add("合格的乙方工程师", 1);
  } else {
    add("脚本小子", 5);
    add("吗喽", 3);
    add("牛马", 2);
    add("臭外包", 1);
  }

  if (traits.AT === "G") {
    add("技术砖家", 2);
    add("合格的乙方工程师", 3);
    add("牛马", 1);
    add("大甲方", 1);
  } else {
    add("吗喽", 4);
    add("伪人", 3);
    add("工贼", 3);
    add("臭外包", 2);
  }

  if (traits.ST === "J") {
    add("大甲方", 7);
    add("文档工程师", 2);
    add("两面派", 1);
  } else {
    add("合格的乙方工程师", 7);
    add("工贼", 3);
    add("臭外包", 2);
    add("伪人", 1);
    add("两面派", 1);
  }

  if (traits.AG === "P") {
    add("技术砖家", 2);
    add("合格的乙方工程师", 2);
    add("工贼", 2);
  } else {
    add("牛马", 5);
    add("吗喽", 3);
    add("伪人", 2);
    add("臭外包", 2);
  }

  if (traits.ORG === "A") {
    add("大甲方", 10);
    add("文档工程师", 1);
  } else if (traits.ORG === "B") {
    add("合格的乙方工程师", 10);
    add("工贼", 1);
  } else if (traits.ORG === "O") {
    add("臭外包", 10);
    add("牛马", 2);
    add("吗喽", 1);
  } else if (traits.ORG === "I") {
    add("工贼", 6);
    add("伪人", 2);
    add("合格的乙方工程师", 1);
    add("两面派", 5);
  } else {
    add("牛马", 1);
    add("伪人", 1);
    add("两面派", 8);
  }

  if (traits.EX === "D") {
    add("文档工程师", 9);
    add("大甲方", 1);
  } else {
    add("技术砖家", 3);
    add("脚本小子", 2);
  }

  if (traits.TL === "S") {
    add("脚本小子", 10);
    add("技术*丝", 2);
  } else {
    add("技术砖家", 4);
    add("文档工程师", 1);
  }

  if (traits.PR === "T") {
    add("技术*丝", 10);
    add("伪人", 1);
    add("两面派", 1);
  } else {
    add("技术砖家", 2);
    add("合格的乙方工程师", 2);
    add("大甲方", 1);
  }

  if (traits.SP === "M") {
    add("慢热派", 12);
    add("牛马", 1);
  } else {
    add("技术砖家", 1);
    add("合格的乙方工程师", 1);
  }

  if (traits.SL === "H" && traits.PR === "T") {
    add("技术*丝", 10);
  }
  if (traits.EX === "D" && traits.ST === "J") {
    add("文档工程师", 8);
  }
  if (traits.AT === "N" && traits.AG === "W") {
    add("吗喽", 8);
  }
  if (traits.AT === "N" && traits.AG === "W" && traits.PR === "T") {
    add("伪人", 8);
  }
  if (traits.ORG === "O" && traits.AT === "N") {
    add("臭外包", 8);
  }
  if (traits.AT === "G" && traits.AG === "W") {
    add("牛马", 9);
  }
  if (traits.ST === "Y" && traits.AT === "N" && traits.AG === "P") {
    add("工贼", 10);
  }
  if (traits.ST === "Y" && traits.AT === "G" && traits.AG === "P") {
    add("合格的乙方工程师", 8);
  }
  if (traits.TL === "S" && traits.SL === "L") {
    add("脚本小子", 10);
  }
  if (traits.SP === "M" && traits.AG === "W") {
    add("慢热派", 5);
  }
  if (traits.ORG === "A" && traits.ST === "J" && traits.AT === "G") {
    add("大甲方", 8);
  }
  if (traits.ORG === "B" && traits.ST === "Y" && traits.AT === "G") {
    add("合格的乙方工程师", 6);
  }
  if (traits.ORG === "I" && traits.ST === "Y" && traits.AT === "N") {
    add("工贼", 6);
  }
  if ((traits.ORG === "A" && traits.ST === "Y") || (traits.ORG === "B" && traits.ST === "J")) {
    add("两面派", 14);
  }
  if (traits.ORG === "M") {
    add("两面派", 12);
  }
  if (traits.ORG === "I" && traits.PR === "T") {
    add("两面派", 6);
  }
  if (traits.RB === "R" && traits.SL === "H" && traits.AT === "G") {
    add("技术砖家", 6);
  }

  const ranking = Object.entries(roleScore).sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }
    return ROLE_ORDER[a[0]] - ROLE_ORDER[b[0]];
  });

  return {
    role: ranking[0][0],
    ranking,
    roleScore,
  };
}

function renderRoleScoreBars(ranking, winnerRole) {
  roleScoreBars.innerHTML = "";
  const maxScore = Math.max(...ranking.map((item) => item[1]), 1);

  ranking.forEach(([roleName, score]) => {
    const row = document.createElement("div");
    row.className = "role-score-row";
    if (roleName === winnerRole) {
      row.classList.add("is-winner");
    }

    const widthPercent = Math.round((score / maxScore) * 100);
    row.innerHTML = `
      <div class="role-score-name">${roleName}</div>
      <div class="role-score-track">
        <div class="role-score-fill" style="width: ${widthPercent}%"></div>
      </div>
      <div class="role-score-value">${score}分</div>
    `;
    roleScoreBars.appendChild(row);
  });
}

function showResult() {
  if (!allAnswered()) {
    window.alert("请先完成全部题目。");
    return;
  }

  const scores = buildScores();
  const roleBoosts = buildRoleBoosts();
  const resolved = resolveDimensionScores(scores);
  const traits = {
    RB: resolved.RB.dominant,
    SL: resolved.SL.dominant,
    AT: resolved.AT.dominant,
    ST: resolved.ST.dominant,
    AG: resolved.AG.dominant,
    ORG: resolved.ORG.dominant,
    EX: resolved.EX.dominant,
    TL: resolved.TL.dominant,
    PR: resolved.PR.dominant,
    SP: resolved.SP.dominant,
  };

  const roleResult = resolveRole(traits, roleBoosts);
  const role = roleResult.role;
  const description = roleDescriptions[role];
  const orgLabel = dimensionMeta.ORG.options[traits.ORG];
  const personaCode = `${traits.RB}${traits.SL}${traits.AT}${traits.ST}${traits.AG}-${traits.ORG}${traits.EX}${traits.TL}${traits.PR}${traits.SP}`;

  resultRole.textContent = role;
  resultCode.textContent = `画像编码：${personaCode}`;
  resultOrg.textContent = `组织身份认知：${orgLabel}`;
  resultDesc.textContent = description;

  dimensionGrid.innerHTML = "";
  Object.keys(dimensionMeta).forEach((key) => {
    const meta = dimensionMeta[key];
    const row = document.createElement("div");
    row.className = "dimension-row";

    const scoreText = meta.order
      .map((value) => `${meta.options[value]}:${scores[key][value] || 0}`)
      .join(" / ");
    const dominantLabel = meta.options[resolved[key].dominant];
    const tieNote =
      resolved[key].tie && key === "ORG"
        ? "（平分，判定为混合认知）"
        : resolved[key].tie
          ? "（平分，按默认规则归类）"
          : "";

    row.innerHTML = `
      <div class="title">${meta.label} (${scoreText})</div>
      <div class="value">${dominantLabel}${tieNote}</div>
    `;
    dimensionGrid.appendChild(row);
  });

  renderRoleScoreBars(roleResult.ranking, role);

  switchView("result");
}

function restart() {
  answers = Array(questions.length).fill(null);
  currentIndex = 0;
  switchView("start");
}

startBtn.addEventListener("click", () => {
  answers = Array(questions.length).fill(null);
  currentIndex = 0;
  switchView("quiz");
  renderQuestion();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex === 0) {
    return;
  }
  currentIndex -= 1;
  renderQuestion();
});

resultBtn.addEventListener("click", showResult);
restartBtn.addEventListener("click", restart);

switchView("start");
