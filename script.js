// ═══════════════════════════════════════════════
//  WATI v4 — 网络安全生态位人格测试
//  16 角色 · 15 维度 · AI+安全 · 研究方向细分 · 岗位猜测
// ═══════════════════════════════════════════════

const groupLabel = {
  TECH: "技术风格",
  WORK: "工作风格",
  PARTY_A: "甲方场景",
  PARTY_B: "乙方场景",
  AI: "AI × 安全",
  POS: "岗位画像",
};

const dimensionMeta = {
  OF: {
    label: "攻防偏好",
    kind: "binary",
    order: ["A", "D"],
    options: { A: "攻击导向", D: "防御导向" },
  },
  BE: {
    label: "建设偏好",
    kind: "binary",
    order: ["E", "O"],
    options: { E: "工程建设", O: "运营治理" },
  },
  SL: {
    label: "技术水平",
    kind: "binary",
    order: ["H", "L"],
    options: { H: "高水平", L: "成长中" },
  },
  AT: {
    label: "工作态度",
    kind: "binary",
    order: ["G", "N"],
    options: { G: "建设型", N: "摆烂型" },
  },
  ST: {
    label: "工作立场",
    kind: "binary",
    order: ["J", "Y"],
    options: { J: "甲方视角", Y: "乙方视角" },
  },
  AG: {
    label: "主体性",
    kind: "binary",
    order: ["P", "W"],
    options: { P: "主动推动", W: "被动执行" },
  },
  ORG: {
    label: "组织身份认知",
    kind: "multi",
    order: ["A", "B", "O", "I"],
    options: { A: "甲方", B: "乙方", O: "外包", I: "中介", M: "混合认知" },
  },
  EX: {
    label: "产出类型",
    kind: "multi",
    order: ["C", "D", "P"],
    options: { C: "漏洞与实战", D: "文档与流程", P: "平台与工具" },
  },
  TL: {
    label: "工具路线",
    kind: "binary",
    order: ["X", "S"],
    options: { X: "原理优先", S: "脚本优先" },
  },
  PR: {
    label: "职业呈现",
    kind: "binary",
    order: ["K", "T"],
    options: { K: "专业可信", T: "随性不修边幅" },
  },
  SP: {
    label: "处置节奏",
    kind: "binary",
    order: ["F", "M"],
    options: { F: "快节奏", M: "慢热派" },
  },
  SC: {
    label: "甲方子领域",
    kind: "multi",
    order: ["AS", "IS", "OS"],
    options: { AS: "应用安全团队", IS: "基础设施安全团队", OS: "攻击安全团队", N: "非甲方" },
  },
  AI: {
    label: "AI 态度",
    kind: "binary",
    order: ["Y", "N"],
    options: { Y: "积极拥抱", N: "谨慎观望" },
  },
  RS: {
    label: "研究方向",
    kind: "multi",
    order: ["V", "B", "R"],
    options: { V: "漏洞挖掘", B: "二进制逆向", R: "红队攻防" },
    hidden: true,
  },
  WP: {
    label: "实际岗位信号",
    kind: "multi",
    order: ["JA", "YB"],
    options: { JA: "甲方在职", YB: "乙方在职" },
    hidden: true,
  },
};

const ROLE_NAMES = [
  "技术砖家", "安全平台工程师", "安全评审工程师", "安全运营官",
  "安全治理工程师", "甲方红队", "安全研究员", "合格的乙方工程师",
  "乙方售前", "驻场安服", "乙方安全开发", "大甲方",
  "脚本小子", "吗喽", "臭外包", "牛马",
];

const ROLE_ORDER = Object.fromEntries(ROLE_NAMES.map((n, i) => [n, i]));

const roleDescriptions = {
  技术砖家: "总而言之，你现在感觉自己是一个专家！能挖洞能推方案能写工具，穿不穿拖鞋讲 0day 都不影响你的实力。在甲方能打穿也能讲明白，在乙方能交付也能研究。",
  安全平台工程师: "你写的代码比渗透测试的人多三倍，产出的是静态分析引擎、安全信息平台、扫描器而不是漏洞报告。安全团队里最像开发的人。",
  安全评审工程师: "你的日常是安全评审、安全开发生命周期流程、威胁建模。你是业务团队最怕看到的人——因为你总能在需求文档里挑出安全问题。",
  安全运营官: "你的武器不是 Burp Suite 而是 Jira/Excel/邮件。漏洞扫描、工单跟踪、修复推动、度量指标——你是安全团队的项目经理，报告模板离了你整个团队都会瘫痪。",
  安全治理工程师: "你的战场是基线配置、合规审计和安全策略。服务器开了什么端口、密码策略是否达标、补丁打没打——每一条基线背后都是你的心血。",
  甲方红队: "你从外部黑客视角模拟 APT 攻击，目标不是交报告而是证明防线有洞。打穿之后你最期待的是蓝队的脸色。",
  安全研究员: "你追踪最新的 CVE 和攻击技术，写 PoC 的速度比厂商发补丁快。IDA、Ghidra、武器库、SRC 排行榜——你的 GitHub 比你的简历更能说明实力。外界看你是黑客，你自己觉得是科学家。",
  合格的乙方工程师: "每天脸上挂着命很苦的商业化笑容。甲方说啥就是啥，报告写到天亮，第二天还要笑着去客户现场。",
  乙方售前: "你的 PPT 比你的 PoC 精美十倍。安全方案写得天花乱坠，但真正落地的时候你已经去下一个客户那了。",
  驻场安服: "你人在甲方办公室，工位在角落，OA 权限只有一半。名义上是乙方工程师，实际上是甲方的编外安全运维。",
  乙方安全开发: "你在安全厂商里写产品代码——防火墙引擎、检测规则、扫描器内核。你不挖洞，但挖洞的人用的武器都是你造的。",
  大甲方: "大甲方驾到通通闪开！你定规则、批预算、拍板安全策略。乙方见你都自动降价三成。",
  脚本小子: "跟我的 xray/awvs/nuclei 说去吧！大河之剑天上来，御剑御剑御剑！漏洞数量就是正义。",
  吗喽: "你不关心别的，只关心下午茶。安全？那是领导操心的事。你是一颗不会思考的芦苇，等行业报告出了再说，稳一点。",
  臭外包: "你不关心别的，只关心甲方的下午茶。劳动法在哪？同工不同酬了解一下？",
  牛马: "不是这砖怎么搬不完啊？？？默默背锅，默默加班，默默承受一切。",
};

const questions = [
  { id: 1, group: "TECH", dimension: "OF", text: "你刚接到一个新系统评估，咖啡还没喝完第一口，你先开哪条线？", options: [
    { text: "先冲攻击面，看看哪里能打穿。", effects: { OF: "A", EX: "C" } },
    { text: "先盘资产和边界，把防线立起来。", effects: { OF: "D", EX: "D" } },
    { text: "先看架构图，想想怎么做自动化检测。", effects: { OF: "D", BE: "E", EX: "P" } },
    { text: "先拿固件 dump 下来逆向看看有没有后门。", effects: { OF: "A", TL: "X", SL: "H", RS: "B" }, roleBoost: { 安全研究员: 2 } },
  ]},
  { id: 2, group: "TECH", dimension: "SL", text: "群里甩来一个 0day 通告，你的真实状态更像？", options: [
    { text: "先复现再说，顺手写个利用脚本。", effects: { SL: "H", TL: "X", OF: "A", RS: "V" }, roleBoost: { 安全研究员: 2 } },
    { text: "先看社区分析，再决定自己要不要动手。", effects: { SL: "L", TL: "S" } },
    { text: "等现成 PoC 和攻略，按说明走。", effects: { SL: "L", TL: "S" }, roleBoost: { 脚本小子: 2 } },
    { text: "先查影响范围，看我们哪些系统受影响。", effects: { SL: "H", BE: "O", SC: "IS" } },
    { text: "下载补丁逆向分析，还原漏洞触发路径。", effects: { SL: "H", TL: "X", OF: "A", RS: "B" }, roleBoost: { 安全研究员: 4 } },
  ]},
  { id: 3, group: "TECH", dimension: "TL", text: "拿到一批目标资产后，你最先打开的是？", options: [
    { text: "笔记本和白板：先建模后开打。", effects: { TL: "X", SL: "H", EX: "D" } },
    { text: "自己写的扫描平台：一键分发任务。", effects: { TL: "X", SL: "H", EX: "P", BE: "E" }, roleBoost: { 安全平台工程师: 2 } },
    { text: "脚本仓库：先跑一轮，结果再说。", effects: { TL: "S", SL: "L", EX: "C" } },
    { text: "IDA/Ghidra：先把二进制拖进去看看。", effects: { TL: "X", SL: "H", OF: "A", RS: "B" }, roleBoost: { 安全研究员: 3 } },
    { text: "神器全家桶：先把漏洞数量拉满。", effects: { TL: "S", SL: "L", EX: "C" }, roleBoost: { 脚本小子: 3 } },
  ]},
  { id: 4, group: "TECH", dimension: "EX", text: "交付前你最先补的是？", options: [
    { text: "流程图、操作手册、责任边界。", effects: { EX: "D", ST: "J", PR: "K" } },
    { text: "PoC、验证脚本、复现步骤。", effects: { EX: "C", OF: "A", PR: "K" } },
    { text: "把检测能力沉淀成自动化插件。", effects: { EX: "P", BE: "E", SL: "H" }, roleBoost: { 安全平台工程师: 2 } },
    { text: "先把模板复制好，细节后面补。", effects: { EX: "D", AT: "N", PR: "T" } },
  ]},
  { id: 5, group: "TECH", dimension: "TL", text: "BP 是？", options: [
    { text: "打嗝套装", effects: { TL: "S", SL: "L" }, roleBoost: { 脚本小子: 2 } },
    { text: "吃饭的家伙", effects: { TL: "S", OF: "A" }, roleBoost: { 脚本小子: 1 } },
    { text: "一款Web应用程序安全测试集成平台，通过代理拦截HTTP/S流量，提供爬虫、扫描、自动化攻击等工具链。", effects: { TL: "X", SL: "H", EX: "D" } },
    { text: "我用 yakit", effects: { TL: "S", OF: "A" }, roleBoost: { 脚本小子: 2 } },
    { text: "我不做渗透，我写检测规则。", effects: { OF: "D", BE: "E", EX: "P" }, roleBoost: { 安全平台工程师: 1, 安全评审工程师: 1 } },
  ]},
  { id: 6, group: "TECH", dimension: "OF", text: "演练里你最爽的瞬间是？", options: [
    { text: "拿下入口点后一路横向到域控。", effects: { OF: "A", AG: "P", EX: "C", RS: "R" }, roleBoost: { 甲方红队: 2, 安全研究员: 1 } },
    { text: "规则生效后一波告警全收网。", effects: { OF: "D", AG: "P", BE: "E" } },
    { text: "看到自己写的检测系统成功拦截了攻击。", effects: { OF: "D", BE: "E", EX: "P" }, roleBoost: { 安全平台工程师: 3, 乙方安全开发: 1 } },
    { text: "先截图发群问「这算不算风险」。", effects: { OF: "D", AG: "W", AT: "N" } },
  ]},
  { id: 7, group: "TECH", dimension: "PR", text: "客户问「这个洞为什么成立」，你会？", options: [
    { text: "白板讲原理，从协议层讲到利用链。", effects: { PR: "K", SL: "H", TL: "X" } },
    { text: "我把截图发你，自己悟。", effects: { PR: "T", SL: "L", TL: "S" } },
    { text: "能讲，但不太想讲，懂的都懂。", effects: { PR: "T", SL: "H" }, roleBoost: { 技术砖家: 2 } },
    { text: "画一张调用链关系图，标出每一步的数据流向。", effects: { PR: "K", SL: "H", TL: "X", RS: "B" }, roleBoost: { 安全研究员: 1 } },
  ]},
  { id: 8, group: "TECH", dimension: "BE", text: "你上周写的代码主要是？", options: [
    { text: "exploit / PoC / Fuzzer 脚本", effects: { EX: "C", OF: "A", BE: "E", RS: "V" }, roleBoost: { 安全研究员: 3 } },
    { text: "扫描器规则 / 检测引擎 / 安全 SDK", effects: { EX: "P", BE: "E", OF: "D" }, roleBoost: { 安全平台工程师: 2, 乙方安全开发: 2 } },
    { text: "自动化运维 / 基线检查 / 资产管理脚本", effects: { EX: "P", BE: "O", OF: "D" }, roleBoost: { 安全运营官: 1, 安全治理工程师: 2 } },
    { text: "上周没写代码，写了三份报告。", effects: { EX: "D", BE: "O" }, roleBoost: { 安全运营官: 2 } },
    { text: "上周没写代码，也没写报告。", effects: { AT: "N", AG: "W" }, roleBoost: { 吗喽: 3 } },
  ]},
  { id: 9, group: "TECH", dimension: "SP", text: "发现高危漏洞后的处置节奏，你更像？", options: [
    { text: "先止血，今晚就把关键风险压下去。", effects: { SP: "F", AG: "P", AT: "G" } },
    { text: "先下发临时基线策略封堵攻击面，再推长期修复。", effects: { SP: "F", AG: "P", BE: "O" }, roleBoost: { 安全治理工程师: 2 } },
    { text: "排进迭代，等测试窗口统一处理。", effects: { SP: "M", AG: "W" } },
    { text: "先观望行业案例，避免误操作。", effects: { SP: "M", AG: "W" }, roleBoost: { 吗喽: 1 } },
  ]},
  { id: 10, group: "TECH", dimension: "TL", text: "一批资产要排查漏洞，你更常见的路线是？", options: [
    { text: "先批量扫，先看漏洞数。", effects: { TL: "S", SL: "L", EX: "C" }, roleBoost: { 脚本小子: 2 } },
    { text: "先挑高价值目标，精扫深挖。", effects: { TL: "X", SL: "H", EX: "C" } },
    { text: "先确认资产归属，通知负责人后再扫。", effects: { BE: "O", ST: "J", AG: "P" }, roleBoost: { 安全运营官: 2 } },
    { text: "先对照安全基线清单检查配置合规性。", effects: { BE: "O", OF: "D", SC: "IS" }, roleBoost: { 安全治理工程师: 3 } },
  ]},
  // ── 甲方场景 (11-19) ──
  { id: 11, group: "PARTY_A", dimension: "SC", text: "0day 爆了，你第一反应是？", options: [
    { text: "写 PoC 验证可利用性，通知蓝队。", effects: { SC: "OS", OF: "A", SL: "H", RS: "V" }, roleBoost: { 甲方红队: 3, 安全研究员: 2 } },
    { text: "用成分分析和黑盒扫描器扫全量仓库，确认影响范围。", effects: { SC: "AS", BE: "E", EX: "P" }, roleBoost: { 安全评审工程师: 2, 安全平台工程师: 1 } },
    { text: "查资产管理系统和主机入侵检测，看哪些主机受影响。", effects: { SC: "IS", BE: "O", OF: "D" }, roleBoost: { 安全运营官: 2 } },
    { text: "发邮件通知业务团队，启动应急响应流程。", effects: { BE: "O", AG: "P", ST: "J" }, roleBoost: { 安全运营官: 3, 大甲方: 1 } },
    { text: "不知道啊，我是臭乙方。", effects: { ST: "Y", ORG: "B", WP: "YB" }, roleBoost: { 合格的乙方工程师: 1 } },
  ]},
  { id: 12, group: "PARTY_A", dimension: "SC", text: "业务团队说「这个漏洞优先级不高，下个季度再修」，你会？", options: [
    { text: "摆数据、讲风险、升级到他们老板。", effects: { AG: "P", AT: "G", ST: "J" }, roleBoost: { 大甲方: 2, 安全运营官: 2 } },
    { text: "直接做 APT 模拟，用实际攻击链证明危害。", effects: { OF: "A", SL: "H", SC: "OS", RS: "R" }, roleBoost: { 甲方红队: 4 } },
    { text: "记录在案，加入漏洞管理看板持续跟踪。", effects: { BE: "O", EX: "D", AG: "P" }, roleBoost: { 安全运营官: 2, 安全评审工程师: 1 } },
    { text: "行吧，反正不是我的系统。", effects: { AT: "N", AG: "W" }, roleBoost: { 吗喽: 3 } },
    { text: "不知道啊，我是臭乙方，修不修关我啥事。", effects: { ST: "Y", ORG: "B", WP: "YB" } },
  ]},
  { id: 13, group: "PARTY_A", dimension: "SC", text: "新项目上线前的安全评审，你最关注什么？", options: [
    { text: "威胁建模 + 架构层面的安全设计是否合理。", effects: { SC: "AS", SL: "H", EX: "D" }, roleBoost: { 安全评审工程师: 4, 技术砖家: 1 } },
    { text: "网络隔离、权限控制、基线配置是否到位。", effects: { SC: "IS", OF: "D", BE: "O" }, roleBoost: { 安全治理工程师: 3, 安全运营官: 1 } },
    { text: "能不能从外网打进来，先做一轮渗透。", effects: { SC: "OS", OF: "A", EX: "C", RS: "R" }, roleBoost: { 甲方红队: 3 } },
    { text: "代码扫描和成分分析结果是否全部清零。", effects: { SC: "AS", BE: "E", EX: "P" }, roleBoost: { 安全平台工程师: 2, 安全评审工程师: 2 } },
    { text: "安全评审是啥？我是臭乙方。", effects: { ST: "Y", ORG: "B", WP: "YB" } },
  ]},
  { id: 14, group: "PARTY_A", dimension: "BE", text: "领导让你为团队做一个安全能力建设方案，你会重点投入？", options: [
    { text: "自研安全平台：安全信息中心、主机检测、扫描器一体化。", effects: { BE: "E", EX: "P", SL: "H" }, roleBoost: { 安全平台工程师: 4 } },
    { text: "完善安全开发生命周期流程：安全左移，从源头治理。", effects: { BE: "O", EX: "D", SC: "AS" }, roleBoost: { 安全评审工程师: 4 } },
    { text: "组建红队，定期对内做攻防演练。", effects: { OF: "A", SC: "OS", AG: "P", RS: "R" }, roleBoost: { 甲方红队: 4 } },
    { text: "建立安全基线体系，覆盖全量主机和服务的合规检查。", effects: { BE: "O", SC: "IS", OF: "D" }, roleBoost: { 安全治理工程师: 5 } },
    { text: "我是乙方，我的领导只让我做项目。", effects: { ST: "Y", ORG: "B", WP: "YB" }, roleBoost: { 合格的乙方工程师: 1 } },
  ]},
  { id: 15, group: "PARTY_A", dimension: "SC", text: "应用安全团队和基础设施安全团队在争论 Log4j 谁负责，你觉得？", options: [
    { text: "自研代码里引用的归应用安全，第三方系统归基础设施安全。", effects: { SC: "AS", SL: "H", BE: "O" }, roleBoost: { 安全评审工程师: 2 } },
    { text: "谁的扫描器先扫到谁负责。", effects: { BE: "E", EX: "P" }, roleBoost: { 安全平台工程师: 1 } },
    { text: "管他谁负责，我先写 PoC 验证一下。", effects: { OF: "A", SC: "OS", SL: "H", RS: "V" }, roleBoost: { 甲方红队: 2, 安全研究员: 2 } },
    { text: "别吵了，先通知业务团队止血。", effects: { AG: "P", AT: "G", SP: "F" }, roleBoost: { 安全运营官: 3 } },
  ]},
  { id: 16, group: "PARTY_A", dimension: "AG", text: "你在安全团队里，最常和谁打交道？", options: [
    { text: "业务开发团队——天天找他们修漏洞。", effects: { SC: "AS", AG: "P", ST: "J" }, roleBoost: { 安全评审工程师: 2, 安全运营官: 1 } },
    { text: "运维团队——配基线、改配置、查日志。", effects: { SC: "IS", BE: "O", OF: "D" }, roleBoost: { 安全治理工程师: 2, 安全运营官: 1 } },
    { text: "没有人——我一个人在角落默默挖洞。", effects: { OF: "A", AG: "W", SC: "OS" }, roleBoost: { 安全研究员: 2, 技术砖家: 1 } },
    { text: "乙方供应商——采购安全产品、协调驻场。", effects: { ST: "J", BE: "O", ORG: "A" }, roleBoost: { 大甲方: 3 } },
  ]},
  { id: 17, group: "PARTY_A", dimension: "BE", text: "如果你可以许一个愿望给安全团队，你会选？", options: [
    { text: "所有代码仓库都接入代码扫描和成分分析流水线。", effects: { BE: "E", EX: "P", SC: "AS" }, roleBoost: { 安全平台工程师: 3, 安全评审工程师: 2 } },
    { text: "全公司资产 100% 合规，基线全绿。", effects: { BE: "O", OF: "D", SC: "IS" }, roleBoost: { 安全治理工程师: 4 } },
    { text: "红蓝对抗中攻击方永远赢。", effects: { OF: "A", SC: "OS", RS: "R" }, roleBoost: { 甲方红队: 3 } },
    { text: "业务团队主动来找安全做评审。", effects: { AT: "G", AG: "P", ST: "J" }, roleBoost: { 安全评审工程师: 3 } },
  ]},
  { id: 18, group: "PARTY_A", dimension: "EX", text: "周报里你最稳的内容通常是？", options: [
    { text: "处置流程、资产分层和整改计划。", effects: { EX: "D", ST: "J", PR: "K" } },
    { text: "payload、截图、漏洞复现链接。", effects: { EX: "C", OF: "A" } },
    { text: "平台功能迭代进度、流水线集成覆盖率。", effects: { EX: "P", BE: "E" }, roleBoost: { 安全平台工程师: 2 } },
    { text: "基线合规率、补丁覆盖率、策略执行情况。", effects: { EX: "D", BE: "O", SC: "IS" }, roleBoost: { 安全治理工程师: 3 } },
    { text: "复制上周内容，把日期改一下。", effects: { EX: "D", AT: "N", PR: "T" }, roleBoost: { 吗喽: 2 } },
  ]},
  { id: 19, group: "PARTY_A", dimension: "SC", text: "一台线上服务器被发现 SSH 弱密码且未装主机安全 agent，你的第一反应？", options: [
    { text: "这是基线问题，立刻拉对照表看全量主机达标率。", effects: { SC: "IS", BE: "O", OF: "D" }, roleBoost: { 安全治理工程师: 4 } },
    { text: "先用弱密码尝试横向，看看能走多远。", effects: { SC: "OS", OF: "A", SL: "H", RS: "R" }, roleBoost: { 甲方红队: 3 } },
    { text: "提工单给运维，推动加固。", effects: { AG: "P", BE: "O", ST: "J" }, roleBoost: { 安全运营官: 3 } },
    { text: "检查这个镜像的安全配置模板是否缺失。", effects: { SC: "IS", BE: "E", EX: "P" }, roleBoost: { 安全平台工程师: 2 } },
    { text: "不知道这些，我是臭乙方。", effects: { ST: "Y", ORG: "B", WP: "YB" } },
  ]},
  // ── 工作风格 (20-23) ──
  { id: 20, group: "WORK", dimension: "ORG", text: "首先：", options: [
    { text: "甲方 Lives matter，这群臭外包每天就知道吃香蕉", effects: { ORG: "A", ST: "J", AT: "N" }, roleBoost: { 大甲方: 2 } },
    { text: "乙方 Lives matter，这群死甲方每天发些鬼都看不懂的需求", effects: { ORG: "B", ST: "Y", AT: "N" }, roleBoost: { 合格的乙方工程师: 1 } },
    { text: "外包 Lives matter，劳动法在哪？", effects: { ORG: "O", ST: "Y", AT: "G" }, roleBoost: { 臭外包: 3 } },
    { text: "我是臭中介", effects: { ORG: "I", ST: "Y", AT: "N" }, roleBoost: { 吗喽: 1 } },
  ]},
  { id: 21, group: "WORK", dimension: "AT", text: "我是：", options: [
    { text: "吗喽", effects: { AT: "N", AG: "W", SL: "L" }, roleBoost: { 吗喽: 6 } },
    { text: "新时代复合型全能网络安全人才", effects: { AT: "G", AG: "P", SL: "H" }, roleBoost: { 技术砖家: 4 } },
    { text: "一颗会思考的芦苇", effects: { SP: "M", AT: "N" }, roleBoost: { 吗喽: 4 } },
    { text: "臭外包", effects: { ORG: "O", ST: "Y", AG: "W" }, roleBoost: { 臭外包: 7 } },
    { text: "黑客", effects: { OF: "A", SL: "H", AG: "P" }, roleBoost: { 技术砖家: 2, 甲方红队: 1, 安全研究员: 1 } },
  ]},
  { id: 22, group: "WORK", dimension: "AG", text: "复盘会上已经开始互相甩锅，你更像？", options: [
    { text: "贴时间线，对事不对人。", effects: { AG: "P", AT: "G", ST: "J" } },
    { text: "顺手把锅甩给最菜的同事。", effects: { AG: "P", AT: "N", ST: "Y" }, roleBoost: { 吗喽: 2 } },
    { text: "不开麦，等会议结束。", effects: { AG: "W", AT: "N" }, roleBoost: { 吗喽: 1 } },
    { text: "默默把锅背了，然后继续搬砖。", effects: { AG: "W", AT: "G" }, roleBoost: { 牛马: 4 } },
  ]},
  { id: 23, group: "WORK", dimension: "ST", text: "你在甲乙两边的表现通常是？", options: [
    { text: "在甲方像甲方，在乙方像乙方。", effects: { ST: "J", PR: "K" } },
    { text: "在甲方像乙方，疯狂接活。", effects: { ORG: "A", ST: "Y", AT: "N" } },
    { text: "在乙方像甲方，疯狂拍板。", effects: { ORG: "B", ST: "J", AT: "N" } },
    { text: "我自己都不知道我是哪方。", effects: { ORG: "I", ST: "Y", PR: "T" }, roleBoost: { 吗喽: 2 } },
  ]},
  // ── 乙方场景 (24-33) ──
  { id: 24, group: "PARTY_B", dimension: "ORG", text: "作为乙方，你最擅长的是？", options: [
    { text: "渗透测试 + 出具高质量漏洞报告。", effects: { ORG: "B", EX: "C", OF: "A" }, roleBoost: { 合格的乙方工程师: 3 } },
    { text: "安全方案设计 + 客户汇报 PPT。", effects: { ORG: "B", EX: "D", PR: "K" }, roleBoost: { 乙方售前: 4 } },
    { text: "驻场服务 + 日常安全运维。", effects: { ORG: "B", BE: "O", AG: "W" }, roleBoost: { 驻场安服: 4 } },
    { text: "漏洞研究 + 逆向分析 + 攻防技术沉淀。", effects: { ORG: "B", OF: "A", SL: "H" }, roleBoost: { 安全研究员: 5 } },
    { text: "安全产品核心引擎的开发和维护。", effects: { ORG: "B", BE: "E", EX: "P" }, roleBoost: { 乙方安全开发: 4 } },
    { text: "我不是乙方啊，我是臭甲方。", effects: { ST: "J", ORG: "A", WP: "JA" }, roleBoost: { 大甲方: 1 } },
  ]},
  { id: 25, group: "PARTY_B", dimension: "PR", text: "甲方说「你们报告里的漏洞我们都知道，有没有新的？」你的反应？", options: [
    { text: "那我换个角度打，用 APT 手法从内网试试。", effects: { OF: "A", SL: "H", TL: "X", RS: "R" }, roleBoost: { 安全研究员: 2, 技术砖家: 1 } },
    { text: "重新梳理攻击面，找到被忽略的边缘资产。", effects: { OF: "A", SL: "H", BE: "O" }, roleBoost: { 合格的乙方工程师: 2 } },
    { text: "行吧，多跑几个扫描器凑凑数。", effects: { TL: "S", AT: "N", SL: "L" }, roleBoost: { 脚本小子: 3 } },
    { text: "换个漂亮的模板重新包装一下。", effects: { EX: "D", PR: "K", AT: "N" }, roleBoost: { 乙方售前: 2 } },
  ]},
  { id: 26, group: "PARTY_B", dimension: "ORG", text: "驻场第三个月，甲方把你当成了他们自己人，你的感受是？", options: [
    { text: "挺好，融入团队效率高。", effects: { ORG: "B", AT: "G", AG: "P" }, roleBoost: { 驻场安服: 3 } },
    { text: "别搞错了，我是乙方，该收的钱一分不少。", effects: { ORG: "B", ST: "Y", PR: "K" }, roleBoost: { 合格的乙方工程师: 2 } },
    { text: "我已经忘了自己是乙方了……", effects: { ORG: "I", ST: "Y" }, roleBoost: { 驻场安服: 2, 吗喽: 1 } },
    { text: "我是甲方，不存在这种问题。", effects: { ST: "J", ORG: "A", WP: "JA" } },
  ]},
  { id: 27, group: "PARTY_B", dimension: "AT", text: "乙方周报里你的「本周工作成果」通常是？", options: [
    { text: "漏洞数量 + 风险评级 + 修复建议。", effects: { EX: "C", OF: "A", PR: "K" }, roleBoost: { 合格的乙方工程师: 2 } },
    { text: "安全培训、方案汇报、客户关系维护。", effects: { EX: "D", PR: "K", ST: "Y" }, roleBoost: { 乙方售前: 3 } },
    { text: "巡检报告、日志审计、策略调优。", effects: { BE: "O", OF: "D", EX: "D" }, roleBoost: { 驻场安服: 3 } },
    { text: "产品引擎优化、规则更新、性能调优。", effects: { BE: "E", EX: "P", OF: "D" }, roleBoost: { 乙方安全开发: 3 } },
    { text: "把上周的复制一份改个日期。", effects: { AT: "N", AG: "W" }, roleBoost: { 吗喽: 3 } },
  ]},
  { id: 28, group: "PARTY_B", dimension: "ST", text: "项目快结束了，甲方突然加需求要免费做，你会？", options: [
    { text: "据理力争，超出范围的必须加钱。", effects: { ST: "Y", AG: "P", PR: "K" }, roleBoost: { 合格的乙方工程师: 3 } },
    { text: "笑着答应，回去吐血加班。", effects: { ST: "Y", AG: "W", AT: "N" }, roleBoost: { 牛马: 4, 驻场安服: 1 } },
    { text: "先答应下来，做个样子交差。", effects: { AT: "N", AG: "W", PR: "T" }, roleBoost: { 吗喽: 2 } },
    { text: "当场开始讲增值服务方案，趁机 upsell。", effects: { ST: "Y", AG: "P", PR: "K" }, roleBoost: { 乙方售前: 4 } },
  ]},
  { id: 29, group: "PARTY_B", dimension: "OF", text: "你在乙方安全公司的日常工作更多的是？", options: [
    { text: "研究新型攻击手法，逆向分析，写武器库和知识库。", effects: { OF: "A", SL: "H", TL: "X", EX: "C", RS: "B" }, roleBoost: { 安全研究员: 6 } },
    { text: "挖各种 SRC 和 Bug Bounty，赚赏金攒 CVE。", effects: { OF: "A", SL: "H", EX: "C", RS: "V" }, roleBoost: { 安全研究员: 4, 技术砖家: 1 } },
    { text: "给公司的安全产品写检测规则和扫描模块。", effects: { OF: "D", BE: "E", EX: "P" }, roleBoost: { 乙方安全开发: 4 } },
    { text: "做项目交付，写渗透报告。", effects: { OF: "A", EX: "C", ST: "Y" }, roleBoost: { 合格的乙方工程师: 3 } },
    { text: "我是甲方的，不在乙方上班。", effects: { ST: "J", ORG: "A", WP: "JA" } },
  ]},
  { id: 30, group: "PARTY_B", dimension: "EX", text: "你最引以为傲的成果是？", options: [
    { text: "挖到关键漏洞拿了高额赏金 / 拿了 CVE 编号。", effects: { OF: "A", SL: "H", EX: "C", RS: "V" }, roleBoost: { 安全研究员: 5 } },
    { text: "发表过攻防技术文章或在安全会议上做过分享。", effects: { OF: "A", SL: "H", PR: "K", RS: "R" }, roleBoost: { 安全研究员: 3, 技术砖家: 2 } },
    { text: "逆向了一个复杂的加密协议或恶意软件家族。", effects: { OF: "A", SL: "H", TL: "X", RS: "B" }, roleBoost: { 安全研究员: 5 } },
    { text: "主导开发了公司核心安全产品的某个关键模块。", effects: { BE: "E", EX: "P", SL: "H" }, roleBoost: { 乙方安全开发: 5 } },
    { text: "活着就是最大的成就。", effects: { AT: "N", AG: "W" }, roleBoost: { 牛马: 3 } },
  ]},
  { id: 31, group: "PARTY_B", dimension: "BE", text: "你写的安全产品代码，最核心的部分是？", options: [
    { text: "检测引擎 / 规则匹配 / 协议解析器。", effects: { BE: "E", EX: "P", SL: "H" }, roleBoost: { 乙方安全开发: 4 } },
    { text: "漏洞利用框架 / 自动化渗透工具链。", effects: { OF: "A", EX: "P", SL: "H", RS: "R" }, roleBoost: { 安全研究员: 2, 乙方安全开发: 2 } },
    { text: "我不写产品代码，我写漏洞报告和 PoC。", effects: { EX: "C", OF: "A" }, roleBoost: { 合格的乙方工程师: 2 } },
    { text: "我不写代码。", effects: { AT: "N", AG: "W" }, roleBoost: { 乙方售前: 1, 吗喽: 1 } },
  ]},
  { id: 32, group: "PARTY_B", dimension: "PR", text: "你穿着拖鞋讲 0day 时，客户最可能的反应是？", options: [
    { text: "懂了懂了，老师继续。", effects: { PR: "K", SL: "H" }, roleBoost: { 技术砖家: 2 } },
    { text: "你技术可能很强，但我还是不太敢信。", effects: { PR: "T", SL: "H" }, roleBoost: { 技术砖家: 3 } },
    { text: "你先把 PPT 格式统一一下再说。", effects: { PR: "T", EX: "D" }, roleBoost: { 吗喽: 1 } },
  ]},
  { id: 33, group: "PARTY_B", dimension: "SP", text: "一个漏洞从曝光到落地修复，你的实际速度更像？", options: [
    { text: "当天推进，当周闭环。", effects: { SP: "F", AG: "P", AT: "G" } },
    { text: "先开会，再开会，然后再开会。", effects: { SP: "M", AG: "W", AT: "N" }, roleBoost: { 吗喽: 2 } },
    { text: "等行业报告出了再说，稳一点。", effects: { SP: "M", AG: "W" }, roleBoost: { 吗喽: 3 } },
  ]},
  // ── AI × 安全 (34-37) ──
  { id: 34, group: "AI", dimension: "AI", text: "领导说「我们要把 AI 融入安全工作流」，你的第一反应？", options: [
    { text: "好事，我已经在用大模型辅助代码审计了。", effects: { AI: "Y", SL: "H", BE: "E" }, roleBoost: { 安全平台工程师: 2, 技术砖家: 1 } },
    { text: "想搞，但还没找到好的落地场景。", effects: { AI: "Y", AT: "G" } },
    { text: "AI 幻觉问题没解决，安全场景不敢用。", effects: { AI: "N", SL: "H" } },
    { text: "又要加班学新东西了……", effects: { AI: "N", AT: "N" }, roleBoost: { 牛马: 1 } },
    { text: "AI 是啥？能挖洞吗？", effects: { AI: "N", SL: "L" }, roleBoost: { 脚本小子: 1, 吗喽: 1 } },
  ]},
  { id: 35, group: "AI", dimension: "AI", text: "你目前用 AI（大模型/Copilot 等）做安全工作的方式更接近？", options: [
    { text: "辅助写检测规则、扫描器插件，提效明显。", effects: { AI: "Y", BE: "E", EX: "P" }, roleBoost: { 安全平台工程师: 2, 乙方安全开发: 2 } },
    { text: "辅助分析漏洞、逆向代码，当半个研究助手。", effects: { AI: "Y", OF: "A", SL: "H" }, roleBoost: { 安全研究员: 2, 技术砖家: 1 } },
    { text: "用来写报告、润色文档、生成 PPT 大纲。", effects: { AI: "Y", EX: "D", PR: "K" }, roleBoost: { 乙方售前: 2, 安全运营官: 1 } },
    { text: "试过，但效果一般，还是靠自己手工。", effects: { AI: "N", TL: "X" } },
    { text: "完全没用过，不信 AI 在安全领域能行。", effects: { AI: "N", SP: "M" }, roleBoost: { 吗喽: 1 } },
  ]},
  { id: 36, group: "AI", dimension: "AI", text: "如果给你预算和时间做一个 AI+安全 项目，你会做什么？", options: [
    { text: "AI 驱动的自动化漏洞挖掘 / Fuzzing 系统。", effects: { AI: "Y", OF: "A", SL: "H", EX: "P", RS: "V" }, roleBoost: { 安全研究员: 3, 安全平台工程师: 1 } },
    { text: "基于大模型的安全评审辅助：自动分析需求文档风险点。", effects: { AI: "Y", OF: "D", SC: "AS", EX: "P" }, roleBoost: { 安全评审工程师: 3 } },
    { text: "AI 安全运营助手：告警降噪、自动研判、工单分发。", effects: { AI: "Y", BE: "O", OF: "D" }, roleBoost: { 安全运营官: 3, 安全治理工程师: 1 } },
    { text: "拿 AI 来写安全产品的检测引擎和规则。", effects: { AI: "Y", BE: "E", EX: "P" }, roleBoost: { 乙方安全开发: 3 } },
    { text: "做 AI 本身的安全研究：提示注入、模型越狱、数据投毒。", effects: { AI: "Y", OF: "A", SL: "H", RS: "V" }, roleBoost: { 安全研究员: 4 } },
    { text: "不想做，怕被 AI 替代。", effects: { AI: "N", AT: "N" }, roleBoost: { 吗喽: 2 } },
  ]},
  { id: 37, group: "AI", dimension: "AI", text: "你觉得未来 3 年 AI 对安全行业最大的影响是？", options: [
    { text: "攻击门槛大幅降低，脚本小子直接升级成 AI 小子。", effects: { AI: "Y", OF: "A" }, roleBoost: { 脚本小子: 1 } },
    { text: "安全运营效率飞升，大量重复工作会被自动化。", effects: { AI: "Y", BE: "O" }, roleBoost: { 安全运营官: 1 } },
    { text: "安全开发会被彻底改变，AI 写规则比人快十倍。", effects: { AI: "Y", BE: "E", EX: "P" }, roleBoost: { 安全平台工程师: 1, 乙方安全开发: 1 } },
    { text: "AI 本身会成为最大的攻击面。", effects: { AI: "Y", OF: "A", SL: "H" }, roleBoost: { 安全研究员: 2 } },
    { text: "炒概念罢了，基本功还是手工渗透。", effects: { AI: "N", TL: "X" } },
  ]},
  // ── 岗位画像 (38-42) ──
  { id: 38, group: "POS", dimension: "WP", text: "你的日常工作节奏更像？", options: [
    { text: "按项目走：接单 → 测试 → 出报告 → 下一个客户。", effects: { WP: "YB", ST: "Y", ORG: "B" } },
    { text: "按流程走：评审 → 扫描 → 推修 → 度量 → 汇报。", effects: { WP: "JA", ST: "J", BE: "O" } },
    { text: "按研究走：跟踪漏洞 → 复现 → 写文章 → 偶尔做项目。", effects: { WP: "YB", OF: "A", SL: "H" }, roleBoost: { 安全研究员: 1 } },
    { text: "按冲刺走：做功能 → 提测 → 发版 → 修 bug → 下个迭代。", effects: { WP: "YB", BE: "E", EX: "P" }, roleBoost: { 乙方安全开发: 1 } },
  ]},
  { id: 39, group: "POS", dimension: "WP", text: "你的 KPI / 绩效指标里最可能出现的是？", options: [
    { text: "漏洞修复率、安全评审覆盖率、基线合规率。", effects: { WP: "JA", ST: "J", BE: "O" } },
    { text: "项目交付数量、客户满意度、续签率。", effects: { WP: "YB", ST: "Y", PR: "K" } },
    { text: "挖洞数量、CVE 数量、赏金总额。", effects: { WP: "YB", OF: "A", EX: "C", RS: "V" }, roleBoost: { 安全研究员: 2 } },
    { text: "产品版本发布数、功能上线率、线上故障率。", effects: { WP: "YB", BE: "E", EX: "P" }, roleBoost: { 乙方安全开发: 2 } },
    { text: "什么是 KPI？", effects: { AT: "N", AG: "W" }, roleBoost: { 吗喽: 1 } },
  ]},
  { id: 40, group: "POS", dimension: "WP", text: "你最近一次和「业务团队开发人员」沟通，是因为？", options: [
    { text: "他们代码里有漏洞，催他们修。", effects: { WP: "JA", SC: "AS", AG: "P" } },
    { text: "我在做他们系统的渗透测试，需要测试账号。", effects: { WP: "YB", OF: "A", EX: "C" } },
    { text: "我不跟业务团队沟通，我只跟安全团队的人说话。", effects: { WP: "YB", OF: "A", AG: "W" }, roleBoost: { 安全研究员: 1 } },
    { text: "我在帮他们在代码流水线里集成安全检查。", effects: { WP: "JA", BE: "E", SC: "AS" }, roleBoost: { 安全平台工程师: 1 } },
  ]},
  { id: 41, group: "POS", dimension: "WP", text: "你的直属领导更可能是？", options: [
    { text: "安全总监 / 首席安全官", effects: { WP: "JA", ST: "J", ORG: "A" } },
    { text: "项目经理 / 交付经理", effects: { WP: "YB", ST: "Y", ORG: "B" } },
    { text: "研究院院长 / 技术总监", effects: { WP: "YB", SL: "H", ORG: "B" }, roleBoost: { 安全研究员: 1 } },
    { text: "产品线负责人 / 研发总监", effects: { WP: "YB", BE: "E", ORG: "B" }, roleBoost: { 乙方安全开发: 1 } },
    { text: "我也不知道我的领导是谁", effects: { AT: "N", AG: "W" }, roleBoost: { 吗喽: 1 } },
  ]},
  { id: 42, group: "POS", dimension: "WP", text: "护网/攻防演练对你来说意味着？", options: [
    { text: "全员备战，我负责守：查日志、封 IP、写报告。", effects: { WP: "JA", OF: "D", SC: "IS" } },
    { text: "带队出征，甲方花钱请我们来打他们。", effects: { WP: "YB", OF: "A", ST: "Y", RS: "R" } },
    { text: "写检测规则，给安全产品加 buff。", effects: { WP: "YB", BE: "E", EX: "P" }, roleBoost: { 乙方安全开发: 2 } },
    { text: "喜欢", effects: { AT: "G", OF: "A", AG: "P" } },
    { text: "感到恶心", effects: { AT: "N", AG: "W", SP: "M" }, roleBoost: { 吗喽: 2 } },
  ]},
];

// ═══════════════════════════════════════════════
//  DOM & State
// ═══════════════════════════════════════════════
const startView=document.getElementById("start-view"),quizView=document.getElementById("quiz-view"),resultView=document.getElementById("result-view");
const startBtn=document.getElementById("start-btn"),prevBtn=document.getElementById("prev-btn"),resultBtn=document.getElementById("result-btn"),restartBtn=document.getElementById("restart-btn");
const progressText=document.getElementById("progress-text"),answeredText=document.getElementById("answered-text"),progressFill=document.getElementById("progress-fill");
const questionTag=document.getElementById("question-tag"),questionText=document.getElementById("question-text"),optionList=document.getElementById("option-list");
const resultRole=document.getElementById("result-role"),resultCode=document.getElementById("result-code"),resultOrg=document.getElementById("result-org");
const resultSub=document.getElementById("result-sub"),resultGuess=document.getElementById("result-guess"),resultAI=document.getElementById("result-ai");
const resultResearch=document.getElementById("result-research"),resultDesc=document.getElementById("result-desc");
const dimensionGrid=document.getElementById("dimension-grid"),roleScoreBars=document.getElementById("role-score-bars");
let currentIndex=0,answers=Array(questions.length).fill(null);

function switchView(t){startView.classList.toggle("hidden",t!=="start");quizView.classList.toggle("hidden",t!=="quiz");resultView.classList.toggle("hidden",t!=="result");}
function countAnswered(){return answers.filter(a=>a!==null).length;}
function allAnswered(){return answers.every(a=>a!==null);}
function updateProgress(){const a=countAnswered();progressText.textContent=`第 ${currentIndex+1} / ${questions.length} 题`;answeredText.textContent=`已答 ${a} 题`;progressFill.style.width=`${((currentIndex+1)/questions.length)*100}%`;resultBtn.disabled=!allAnswered();}
function selectOption(idx){answers[currentIndex]=idx;if(currentIndex<questions.length-1)currentIndex+=1;renderQuestion();}
function renderQuestion(){const q=questions[currentIndex],dim=dimensionMeta[q.dimension];questionTag.textContent=`${groupLabel[q.group]} · ${dim.label}`;questionText.textContent=`${q.id}. ${q.text}`;optionList.innerHTML="";q.options.forEach((opt,i)=>{const btn=document.createElement("button");btn.className="option-btn";btn.type="button";btn.textContent=opt.text;if(answers[currentIndex]===i)btn.classList.add("active");btn.addEventListener("click",()=>selectOption(i));optionList.appendChild(btn);});prevBtn.disabled=currentIndex===0;updateProgress();}

function buildScores(){const s={};Object.keys(dimensionMeta).forEach(k=>s[k]={});answers.forEach((ai,qi)=>{if(ai===null)return;const e=questions[qi].options[ai].effects||{};Object.entries(e).forEach(([d,v])=>{if(!s[d])return;s[d][v]=(s[d][v]||0)+1;});});return s;}
function buildRoleBoosts(){const b={};answers.forEach((ai,qi)=>{if(ai===null)return;const r=questions[qi].options[ai].roleBoost||{};Object.entries(r).forEach(([role,s])=>{b[role]=(b[role]||0)+s;});});return b;}
function resolveDimensionScores(scores){const r={};Object.keys(dimensionMeta).forEach(key=>{const m=dimensionMeta[key],rk=m.order.map(v=>({value:v,score:scores[key][v]||0})).sort((a,b)=>b.score-a.score);const tie=rk.length>1&&rk[0].score===rk[1].score;let d=rk[0].value;if(tie&&m.kind==="multi")d="M";else if(tie&&m.kind==="binary")d=m.order[0];r[key]={dominant:d,tie,ranking:rk};});return r;}

function guessPosition(scores,traits){const ja=scores.WP.JA||0,yb=scores.WP.YB||0,tot=ja+yb;if(tot===0)return{side:"未知",confidence:0,detail:"岗位信号不足，无法判断。"};const jaPct=Math.round((ja/tot)*100),ybPct=100-jaPct;let side,confidence,detail;if(jaPct>=65){side="甲方";confidence=jaPct;const sub=traits.SC,subMap={AS:"应用安全方向",IS:"基础设施安全方向",OS:"攻击安全/红队方向"};detail=`你大概率是甲方安全团队的成员（${jaPct}% 甲方信号），倾向于${subMap[sub]||"综合安全"}。`;}else if(ybPct>=65){side="乙方";confidence=ybPct;let h;if(traits.BE==="E"&&traits.EX==="P")h="安全产品开发岗";else if(traits.OF==="A"&&traits.SL==="H")h="攻防研究/渗透测试岗";else if(traits.EX==="D"&&traits.PR==="K")h="安全咨询/售前岗";else if(traits.BE==="O"&&traits.AG==="W")h="驻场安服岗";else h="安全服务岗";detail=`你大概率是乙方安全公司的成员（${ybPct}% 乙方信号），倾向于${h}。`;}else{side="甲乙交界";confidence=Math.max(jaPct,ybPct);detail=`你的工作兼具甲方和乙方特征（${jaPct}% 甲方 / ${ybPct}% 乙方），可能是驻场、外包或频繁切换甲乙方的角色。`;}return{side,confidence,detail};}

function resolveResearchDirection(scores){const v=scores.RS.V||0,b=scores.RS.B||0,r=scores.RS.R||0,tot=v+b+r;if(tot===0)return null;const items=[{key:"V",label:"漏洞挖掘",score:v},{key:"B",label:"二进制逆向",score:b},{key:"R",label:"红队攻防",score:r}].sort((a,c)=>c.score-a.score);const parts=items.filter(x=>x.score>0).map(x=>`${x.label} ${Math.round((x.score/tot)*100)}%`);return{primary:items[0].label,breakdown:parts.join(" / ")};}

function resolveRole(traits,roleBoosts){
  const rs=Object.fromEntries(ROLE_NAMES.map(n=>[n,0]));const add=(r,s)=>{if(rs[r]!==undefined)rs[r]+=s;};
  Object.entries(roleBoosts).forEach(([r,s])=>{if(rs[r]!==undefined)add(r,s);});
  if(traits.OF==="A"){add("技术砖家",2);add("甲方红队",3);add("安全研究员",3);add("脚本小子",1);}else{add("安全平台工程师",2);add("安全运营官",2);add("安全评审工程师",2);add("安全治理工程师",2);add("乙方安全开发",1);}
  if(traits.BE==="E"){add("安全平台工程师",6);add("乙方安全开发",5);add("安全评审工程师",2);add("安全研究员",1);}else{add("安全运营官",5);add("安全治理工程师",4);add("驻场安服",2);add("大甲方",1);}
  if(traits.SL==="H"){add("技术砖家",5);add("安全研究员",4);add("安全平台工程师",3);add("乙方安全开发",2);add("甲方红队",2);add("安全评审工程师",1);}else{add("脚本小子",5);add("吗喽",3);add("牛马",2);add("臭外包",1);add("驻场安服",1);}
  if(traits.AT==="G"){add("技术砖家",2);add("合格的乙方工程师",3);add("安全评审工程师",2);add("安全运营官",2);add("安全治理工程师",1);add("牛马",1);}else{add("吗喽",5);add("臭外包",2);add("脚本小子",1);}
  if(traits.ST==="J"){add("大甲方",6);add("安全评审工程师",2);add("安全运营官",2);add("安全治理工程师",2);add("甲方红队",1);}else{add("合格的乙方工程师",6);add("乙方售前",3);add("驻场安服",3);add("乙方安全开发",2);add("安全研究员",1);add("臭外包",2);}
  if(traits.AG==="P"){add("技术砖家",2);add("甲方红队",2);add("安全运营官",2);add("合格的乙方工程师",1);}else{add("牛马",5);add("吗喽",3);add("臭外包",2);add("驻场安服",2);}
  if(traits.ORG==="A"){add("大甲方",8);add("甲方红队",2);add("安全平台工程师",1);add("安全评审工程师",1);add("安全治理工程师",1);}else if(traits.ORG==="B"){add("合格的乙方工程师",8);add("乙方售前",2);add("驻场安服",2);add("安全研究员",2);add("乙方安全开发",2);}else if(traits.ORG==="O"){add("臭外包",10);add("牛马",2);add("吗喽",1);}else if(traits.ORG==="I"){add("吗喽",5);add("臭外包",3);}else{add("吗喽",4);}
  if(traits.EX==="C"){add("技术砖家",3);add("甲方红队",2);add("安全研究员",3);add("脚本小子",2);}else if(traits.EX==="D"){add("安全运营官",4);add("乙方售前",3);add("安全评审工程师",2);add("安全治理工程师",2);add("大甲方",1);}else if(traits.EX==="P"){add("安全平台工程师",8);add("乙方安全开发",6);add("安全评审工程师",2);}else{add("安全运营官",3);add("安全平台工程师",3);}
  if(traits.TL==="S"){add("脚本小子",8);}else{add("技术砖家",3);add("安全研究员",3);add("安全平台工程师",1);}
  if(traits.PR==="T"){add("技术砖家",3);add("吗喽",1);}else{add("技术砖家",2);add("合格的乙方工程师",2);add("乙方售前",2);add("安全评审工程师",1);}
  if(traits.SP==="M"){add("吗喽",5);add("牛马",1);}else{add("技术砖家",1);add("安全运营官",2);add("甲方红队",1);add("安全治理工程师",1);}
  if(traits.SC==="AS"){add("安全评审工程师",6);add("安全平台工程师",3);}else if(traits.SC==="IS"){add("安全运营官",4);add("安全治理工程师",5);add("安全平台工程师",2);}else if(traits.SC==="OS"){add("甲方红队",6);add("安全研究员",3);}
  if(traits.AI==="Y"){add("安全平台工程师",2);add("乙方安全开发",2);add("技术砖家",1);}
  // combos
  if(traits.AT==="N"&&traits.AG==="W")add("吗喽",8);
  if(traits.ORG==="O"&&traits.AT==="N")add("臭外包",8);
  if(traits.AT==="G"&&traits.AG==="W")add("牛马",9);
  if(traits.TL==="S"&&traits.SL==="L")add("脚本小子",10);
  if(traits.ST==="Y"&&traits.AT==="G"&&traits.AG==="P")add("合格的乙方工程师",6);
  if(traits.ORG==="A"&&traits.ST==="J"&&traits.AT==="G")add("大甲方",6);
  if(traits.OF==="A"&&traits.SL==="H"&&traits.AT==="G")add("技术砖家",5);
  if(traits.OF==="A"&&traits.ORG==="A"&&traits.AG==="P")add("甲方红队",6);
  if(traits.BE==="E"&&traits.EX==="P"&&traits.SL==="H")add("安全平台工程师",6);
  if(traits.BE==="E"&&traits.EX==="P"&&traits.ORG==="B")add("乙方安全开发",6);
  if(traits.BE==="O"&&traits.ST==="J"&&traits.AG==="P")add("安全运营官",6);
  if(traits.BE==="O"&&traits.SC==="IS"&&traits.ST==="J")add("安全治理工程师",6);
  if(traits.OF==="D"&&traits.EX==="D"&&traits.SC==="AS")add("安全评审工程师",6);
  if(traits.OF==="A"&&traits.SL==="H"&&traits.TL==="X")add("安全研究员",6);
  if(traits.ORG==="B"&&traits.AG==="W"&&traits.BE==="O")add("驻场安服",6);
  if(traits.ORG==="B"&&traits.EX==="D"&&traits.PR==="K")add("乙方售前",6);
  const ranking=Object.entries(rs).sort((a,b)=>b[1]!==a[1]?b[1]-a[1]:ROLE_ORDER[a[0]]-ROLE_ORDER[b[0]]);
  return{role:ranking[0][0],ranking,roleScore:rs};
}

function renderRoleScoreBars(ranking,winnerRole){roleScoreBars.innerHTML="";const mx=Math.max(...ranking.map(r=>r[1]),1);ranking.forEach(([name,score])=>{const row=document.createElement("div");row.className="role-score-row";if(name===winnerRole)row.classList.add("is-winner");const pct=Math.round((score/mx)*100);row.innerHTML=`<span class="role-score-name">${name}</span><span class="role-score-track"><span class="role-score-fill" style="width:${pct}%"></span></span><span class="role-score-value">${score}分</span>`;roleScoreBars.appendChild(row);});}

function showResult(){
  if(!allAnswered()){window.alert("请先完成全部题目。");return;}
  const scores=buildScores(),roleBoosts=buildRoleBoosts(),resolved=resolveDimensionScores(scores);
  const traits={};Object.keys(dimensionMeta).forEach(k=>traits[k]=resolved[k].dominant);
  const roleResult=resolveRole(traits,roleBoosts),role=roleResult.role,description=roleDescriptions[role];
  const orgLabel=dimensionMeta.ORG.options[traits.ORG],scLabel=dimensionMeta.SC.options[traits.SC]||"\u2014";
  const posResult=guessPosition(scores,traits),researchResult=resolveResearchDirection(scores);
  const aiY=scores.AI.Y||0,aiN=scores.AI.N||0,aiTot=aiY+aiN;
  let aiText;if(aiTot===0)aiText="AI 态度信号不足";else if(aiY>aiN)aiText=`积极拥抱 AI（${Math.round((aiY/aiTot)*100)}% 拥抱信号）`;else if(aiN>aiY)aiText=`谨慎观望 AI（${Math.round((aiN/aiTot)*100)}% 观望信号）`;else aiText="AI 态度中立（各半）";
  const codeKeys=["OF","BE","SL","AT","ST","AG","ORG","EX","TL","PR","SP"],personaCode=codeKeys.map(k=>traits[k]).join("");
  resultRole.textContent=role;resultCode.textContent=`画像编码：${personaCode}`;resultOrg.textContent=`组织身份认知：${orgLabel}`;resultSub.textContent=`甲方子领域倾向：${scLabel}`;
  resultGuess.textContent=posResult.detail;resultAI.textContent=`AI × 安全：${aiText}`;
  if(researchResult&&(role==="安全研究员"||role==="甲方红队"||(traits.OF==="A"&&traits.SL==="H"))){resultResearch.textContent=`研究方向倾向：${researchResult.breakdown}`;resultResearch.style.display="";}else{resultResearch.style.display="none";}
  resultDesc.textContent=description;
  dimensionGrid.innerHTML="";Object.keys(dimensionMeta).forEach(key=>{const meta=dimensionMeta[key];if(meta.hidden)return;const row=document.createElement("div");row.className="dimension-row";const st=meta.order.map(v=>`${meta.options[v]}:${scores[key][v]||0}`).join(" / ");const dl=meta.options[resolved[key].dominant]||resolved[key].dominant;const tn=resolved[key].tie&&meta.kind==="multi"?"（平分 → 混合）":resolved[key].tie?"（平分 → 默认）":"";row.innerHTML=`<div class="title">${meta.label} (${st})</div><div class="value">${dl}${tn}</div>`;dimensionGrid.appendChild(row);});
  renderRoleScoreBars(roleResult.ranking,role);switchView("result");
}

function restart(){answers=Array(questions.length).fill(null);currentIndex=0;switchView("start");}
startBtn.addEventListener("click",()=>{answers=Array(questions.length).fill(null);currentIndex=0;switchView("quiz");renderQuestion();});
prevBtn.addEventListener("click",()=>{if(currentIndex===0)return;currentIndex-=1;renderQuestion();});
resultBtn.addEventListener("click",showResult);restartBtn.addEventListener("click",restart);switchView("start");
