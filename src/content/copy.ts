/**
 * 全站文案的唯一来源。改字只改这里，组件不用动。
 *
 * 每条后面的注释是排版长度提醒：
 * - 首屏大标题是 nowrap + 17.5vw，英文约 12 个字符正好铺满一屏，中文建议不超过 5 字
 * - 项目名在横向 flex 里，中文 4–6 字、英文 12–20 字符都安全
 */

/** 逐字显影段落的一行；emphasis 为加粗高亮 */
export type TextLine = {
  text: string;
  emphasis?: boolean;
};

export const site = {
  /** 浏览器标签页标题（也在 index.html 的 <title> 里，两处需一致） */
  title: "王诚-体验设计师",
};

export const common = {
  /** 所有联系按钮的文案 */
  cta: "联系我",
};

export const contact = {
  heading: "Let's talk",
  intro: "有合适的机会、合作意向，或只是想聊聊设计与 AI，欢迎随时找我。",
  phone: "15928188814",
  phoneDisplay: "159 2818 8814",
  email: "2658228385@qq.com",
  wechatNote: "扫码添加微信",
  qrAlt: "王诚的微信好友二维码",
  qrHint: "微信扫码",
  footer: "© 2026 王诚 · 体验设计师",
};

export const hero = {
  nav: [
    { label: "About", href: "#about" },
    { label: "Price", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  /** 首屏大标题，13 字符，贴边铺满一屏 */
  heading: "Hi, i'm swain",
  /** 副标题，首屏左下角，建议 60–80 字（中文） */
  tagline:
    "你好，我是王诚，一名专注于产品体验、用户增长与视觉设计的体验设计师，曾参与拼多多、TEMU、百度网盘等产品，并持续探索AI与设计的结合",
  portraitAlt: "王诚的人像",
};

export const about = {
  /** 80 字符以内更稳 */
  heading: "About me",
  /**
   * 逐字显影段落。每一条是独立一行（硬换行），
   * emphasis 的片段会加粗并提亮，用来做「灰底 + 重点句」的排版节奏。
   */
  lines: [
    { text: "3+年C端产品设计经验的体验设计师，曾参与" },
    { text: "拼多多、TEMU、百度网盘", emphasis: true },
    { text: "等产品，专注" },
    { text: "产品体验与用户增长。", emphasis: true },
    { text: "我相信好的设计不是加法——是" },
    { text: "在正确的位置说最少的话。", emphasis: true },
    { text: "近期正在探索" },
    { text: "AI辅助设计与 Vibe Coding，", emphasis: true },
    { text: "持续拓展设计的边界。" },
  ] as TextLine[],
};

export const services = {
  heading: "Skills",
  items: [
    {
      number: "01",
      name: "UI/UX设计",
      description:
        "通过用户研究、信息架构与界面设计，打造直观易用的数字产品体验，兼顾用户需求、视觉美感与业务目标。",
    },
    {
      number: "02",
      name: "用户增长设计",
      description:
        "围绕用户获取、留存与转化等关键目标，通过激励机制设计、用户路径优化与数据驱动的持续迭代，提升产品增长效果。",
    },
    {
      number: "03",
      name: "AI辅助设计",
      description:
        "将AI工具与Vibe Coding融入设计流程，加速创意探索、视觉方案生成、交互原型搭建与产品实现，提升设计效率。",
    },
    {
      number: "04",
      name: "动效与3D设计",
      description:
        "通过动态图形、3D建模与视觉叙事，为数字产品注入活力，增强用户参与感，塑造更具表现力与辨识度的视觉体验。",
    },
  ],
};

export const projects = {
  /** 注意是大写的单数 Project */
  heading: "Project",
  cta: "项目详情",
  items: [
    { number: "01", category: "用户增长", name: "TEMU-Farmland" },
    { number: "02", category: "用户增长", name: "拼多多-省钱月卡" },
    { number: "03", category: "用户增长", name: "TEMU-Circle" },
    { number: "04", category: "个人成长", name: "其他设计" },
  ],
};

/**
 * 项目详情页内容（框架参考旧版作品集 works/*.html）。
 * number 对应 projects.items 的编号。
 * meta：客户/时间/角色/平台 四格；results：左侧目录下的关键结果；parts：分章（标题+导语）。
 * 图：hero 与图库复用封面 project-0N-a/b/c，加图按 project-0N-d / -e … 命名放进 src/assets/local/。
 */
export type ProjectSection = {
  title: string;
  /** 过程图编号（对应旧版 farmland-process-NN，图片文件名 case-0N-process-XX） */
  images?: number[];
};

export type ProjectPart = {
  title: string;
  intro?: string;
  sections?: ProjectSection[];
  /** 不分小节、直属本章的图（如项目总结） */
  images?: number[];
};

export type ProjectDetail = {
  number: string;
  tagline: string;
  meta: { label: string; value: string }[];
  results: string[];
  parts: ProjectPart[];
  /** 详情页末尾是否展示过程图库（project-0N-b/c/d…），默认 true */
  showGallery?: boolean;
};

export const projectDetails: ProjectDetail[] = [
  {
    number: "01",
    tagline:
      "540+ 天持续迭代，以体验设计主导的农场经营玩法。从概念定义、2.5D 视觉体系、组件规范，到上线反馈与自研新玩法，构建「种植—收获—兑换」的长期留存闭环。",
    meta: [
      { label: "客户 / Client", value: "拼多多 · TEMU" },
      { label: "时间 / Year", value: "2024.07 – 2025.09" },
      { label: "角色 / Role", value: "体验设计师（主设计）" },
      { label: "平台 / Platform", value: "TEMU · 移动端" },
    ],
    results: ["下单用户占比 +18.6%", "场景 GMV +16.7%", "留存率 +8.1%", "540+ 天持续迭代"],
    showGallery: false,
    parts: [
      {
        title: "项目概览",
        intro:
          "Farmland 是 TEMU 的游戏化留存项目：把「农场经营」植入电商 App，让用户在购物之外拥有一块可经营的土地。7 天设计冲刺定下方向后，项目进入 540+ 天的长线迭代。前期我用体验五要素与 Why-What-How 框架建立策略判断，再快速产出交互低保真对齐团队。",
        sections: [
          { title: "项目背景与业务目标", images: [1] },
          { title: "项目规划 · 7 天冲刺", images: [2] },
          { title: "产品设计策略", images: [3] },
        ],
      },
      {
        title: "概念与视觉探索",
        intro:
          "视觉方向不是一次成型的：从第一轮风格探索到多轮演变，每一步都回到三个修订目标——BEAUTY（美）、TRUTH（真）、HAPPY（乐）。最终收敛出 CORE DESIGN CONCEPT，作为整个项目 540+ 天迭代的设计北极星。",
        sections: [{ title: "设计理念", images: [4] }],
      },
      {
        title: "视觉语言与规范",
        intro:
          "概念落地为可执行的视觉体系：从「形、色、字、构、质」五个维度定义设计语言，建立空间结构与元素组件，最终落到颜色与文字的应用规范，让 1000+ 页面的长线迭代保持一致的体验与品牌感。",
        sections: [
          { title: "设计语言规范", images: [5] },
          { title: "视觉风格", images: [6] },
          { title: "空间结构", images: [7] },
          { title: "元素设计", images: [8] },
          { title: "颜色规范", images: [9] },
          { title: "字体应用", images: [10] },
        ],
      },
      {
        title: "洞察与设计目标",
        intro:
          "上线不等于结束：从项目现状与问题洞察出发——入口点击率低、认知建设不足、数据转化低、增量提升缓慢，拆解业务目标与玩法脉络，明确四个方向的解决方案与设计目标。",
        sections: [
          { title: "项目现状与问题洞察", images: [11] },
          { title: "面临的挑战", images: [12] },
          { title: "业务目标拆解及玩法梳理", images: [13] },
          { title: "解决方案与设计目标", images: [14] },
        ],
      },
      {
        title: "多路径触达，强化利益感知",
        intro:
          "如何让用户感知到活动？用触达多样、利益点透传清晰的方式回答：首页入口、活动中心、首页扑脸弹窗三个层面同时发力，入口点击率分别提升 12.8% 与 8.3%。",
        sections: [
          { title: "方案总览", images: [15] },
          { title: "首页入口", images: [16] },
          { title: "活动中心入口", images: [17] },
          { title: "首页扑脸弹窗", images: [18] },
        ],
      },
      {
        title: "简化开团流程，优化开团包装",
        intro:
          "开团流程较长，划分为开团包装换皮、选品落地页布局调整、打包/补仓流程简化三个部分分别进行 AB 测试：点击率分别提升 16.12%、11.2%、10.64%，开团率与次留同步正向。",
        sections: [
          { title: "方案总览", images: [19] },
          { title: "开团包装换皮", images: [20] },
          { title: "选品落地页布局调整", images: [21] },
          { title: "打包 / 补底仓流程简化", images: [22] },
        ],
      },
      {
        title: "构建持续激励机制",
        intro:
          "针对玩法相对单一的问题，新增水滴消耗型与获取型二级玩法，形成「参与玩法—获取水滴—消耗水滴」的激励闭环：浇水竞赛、合成玩法、大富翁、羊了个羊，把低门槛触点铺满用户的一天。",
        sections: [
          { title: "方案总览", images: [23] },
          { title: "浇水竞赛", images: [24, 25] },
          { title: "首页入口 Icon", images: [26] },
          { title: "二级小玩法", images: [27] },
        ],
      },
      {
        title: "打通激励与交易链路",
        intro:
          "早期庄园以用户留存为主、支付转化工具少。引入笔笔返、随单赠品等转化工具，并从三个设计落点强化交易链路：强化奖励与下单的关联、降低选品与决策成本、透明呈现规则与收益。",
        sections: [
          { title: "方案总览", images: [28] },
          { title: "新增转化工具", images: [29] },
          { title: "下单转化节点优化", images: [30] },
          { title: "设计落点 · 强化奖励与下单的关联", images: [31] },
          { title: "设计落点 · 降低选品与决策成本", images: [32] },
          { title: "设计落点 · 透明呈现规则与收益", images: [33] },
        ],
      },
      {
        title: "动效与规范沉淀",
        intro:
          "以动带静的沉浸体验：在交互过程中加入趣味动效反馈，激发用户探索欲；同时把设计规范与动效组件沉淀为可复用资产，让后续迭代可以快速搭建。",
        sections: [
          { title: "以动带静，沉浸体验", images: [34] },
          { title: "设计规范整理", images: [35] },
          { title: "动效组件库搭建", images: [36] },
        ],
      },
      {
        title: "项目总结",
        intro:
          "540+ 天、1000+ 页面、60+ 动效、200+ 需求——Farmland 让我完整经历了「从 0 到 1 定义体系，从 1 到 100 维持体系」的全过程；数据侧下单用户占比、场景 GMV、留存率分别录得 18.6% / 16.7% / 8.1% 的正向反馈。",
        sections: [
          { title: "贡献与收获", images: [37] },
          { title: "业务支持", images: [38] },
          { title: "数据反馈", images: [39] },
        ],
      },
    ],
  },
  {
    number: "02",
    tagline:
      "二期优化迭代期间，负责月卡参与模块的全链路体验设计。从前期洞察、业务支持到自驱设计与组件沉淀，验证多条增长路径。",
    meta: [
      { label: "客户 / Client", value: "拼多多 · TEMU" },
      { label: "时间 / Year", value: "2022.09 – 2023.04" },
      { label: "角色 / Role", value: "体验设计师（主设计）" },
      { label: "协作 / Team", value: "3 产品 + 3 开发" },
    ],
    results: ["会员体量 +200%", "2 亿+ 增量 GMV", "5000 万+ 会员体量", "ROI 1 : 18"],
    showGallery: false,
    parts: [
      {
        title: "前期工作",
        intro:
          "2022.09 入项时，省钱月卡已经从「体量」目标切换为「ROI + 增量 GMV」。前期我用 3 个问题快速建立产品判断：入口是否明显、能否新增入口、视觉主色为何。结论是——保持「红包红」主色不动，UI 与动效需要同步升级，入口需要在不干扰用户的前提下重新植入。",
        sections: [
          { title: "项目背景与设计价值", images: [3, 4] },
        ],
      },
      {
        title: "业务支持",
        intro:
          "围绕「会员体量」与「增量 GMV」两条核心线，承接开通包装、续费包装两个高频业务场景。在 ROI 不退化的前提下持续拉新与促活——开通红包方案让会员体量提升 200%，从 3000 万做到 5000 万+。",
        sections: [
          { title: "参与模块全景", images: [5] },
          { title: "会员体量 · 3000万到5000万+", images: [6] },
          { title: "开通包装", images: [7] },
          { title: "续费包装", images: [8] },
        ],
      },
      {
        title: "自驱设计",
        intro:
          "主动发现产品问题并给出可落地方案。从留存玩法（花钱抽券）到订单页 banner A/B，再到月卡开通页 UI 大改版与秒杀包装——把设计师的判断与验证，沉淀为可量化的增长杠杆。",
        sections: [
          { title: "自驱设计的定义", images: [14] },
          { title: "留存玩法 · 花钱抽券", images: [9, 10, 11] },
          { title: "导流 · 订单页banner AB测试", images: [12, 13] },
          { title: "月卡开通页迭代 · UI方案新尝试", images: [15, 16, 17] },
          { title: "秒杀包装尝试", images: [18, 19, 20] },
        ],
      },
      {
        title: "组件库搭建",
        intro:
          "项目后期把高频复用的视觉样式、动效、素材沉淀为可复用资产，让后续活动与版本迭代可以快速搭建，并保持一致的品牌感。",
        sections: [
          { title: "基础组件整理", images: [21] },
          { title: "可复用素材库整理", images: [23] },
        ],
      },
    ],
  },
  {
    number: "03",
    tagline:
      "从免费权益运营转向付费会员经营，以TEMU Circle承接更广泛的高价值用户，提升用户复购与长期商业价值。",
    meta: [
      { label: "客户 / Client", value: "TEMU" },
      { label: "时间 / Year", value: "2023.04 – 2024.07" },
      { label: "角色 / Role", value: "体验设计师" },
      { label: "平台 / Platform", value: "TEMU · 移动端" },
    ],
    results: ["上线4周核心数据持续增长", "覆盖开通前-开通后全旅程", "7大权益矩阵完整落地"],
    showGallery: false,
    parts: [
      {
        title: "项目概览",
        intro:
          "作为跨境电商的新起之秀，TEMU购物APP的用户量呈暴涨趋势，如何留住用户是急需解决的问题。会员是通过对会员权益激励用户行为、帮助用户持续使用产品并促进消费的一种运营方式——在免费会员向付费会员转型的节点，需要进一步提高用户的粘性。",
        sections: [{ title: "为什么要这么做", images: [2] }],
      },
      {
        title: "设计策略与体验流程",
        intro:
          "从业务诉求（提升付费转化、提升复购与消费频次、建立统一会员心智）与用户痛点（对付费价值缺乏认知、难以感知长期优惠价值、权益多理解成本高）出发，确立视觉层、交互层、体验层三层设计目标，并规划「开通页-开通叙事-开通后承接-使用权益」的核心体验流程。",
        sections: [
          { title: "明确设计策略", images: [3] },
          { title: "设计目标与核心体验流程", images: [4] },
        ],
      },
      {
        title: "产品定位与权益设计",
        intro:
          "以持续优惠与会员权益为核心的付费会员产品：围绕「提升复购、提升用户长期价值」的业务目标，搭建商业价值（Credit Back、Daily Coupons、Circle Deals、Free Items）、服务价值（Premium Service）与周期/情感价值（Circle Day、Circle Cares）三类权益矩阵。",
        sections: [{ title: "权益矩阵", images: [5] }],
      },
      {
        title: "开通前 · 让「值不值」一眼可判断",
        intro:
          "开通前页面回答「为什么值得加入」：品牌化强化Circle会员标识、突出核心利益点，用大数字直接呈现Credit reward权益，将免费商品作为核心权益前置展示，配合「高价值/低成本」的价格心智推动开通；FAQ消除付费顾虑，底部商品承接区让用户自然过渡到会员权益。",
        sections: [
          { title: "开通前页面 · 品牌与核心权益", images: [6] },
          { title: "其他权益 · FAQ · 商品承接区", images: [7] },
        ],
      },
      {
        title: "开通后 · 持续强化价值感知",
        intro:
          "开通后页面回答「加入后如何持续获得价值」：会员身份区强化账户状态感知，赚钱提效区突出即时收益引导进入购物场景，权益卡片聚合展示可领优惠；六类权益各自落地，空态设计降低理解成本、避免流失。",
        sections: [
          { title: "开通后页面 · 身份与提效", images: [8] },
          { title: "其他权益详情落地", images: [9] },
          { title: "缺省状态设计", images: [12] },
        ],
      },
      {
        title: "开通叙事与承接",
        intro:
          "开通叙事包装在用户进入开通页前强化会员价值并提供一个开卡的理由——转盘抽取开卡折扣带来惊喜感；开通后通过信封开箱、会员证书与权益解锁动画承接，快速建立尊贵感与对会员的认知。",
        sections: [
          { title: "开通叙事包装 · 转盘抽取开卡价格", images: [10] },
          { title: "开通后承接 · 证书与权益解锁", images: [11] },
        ],
      },
      {
        title: "组件规范与界面展示",
        intro:
          "把高频样式沉淀为基础组件与空态规范，按钮点击态、展开态等交互动效形成统一规范，保证多权益、多页面下的一致体验与品牌感。",
        sections: [
          { title: "基础组件与规范", images: [13] },
          { title: "界面展示", images: [14] },
        ],
      },
      {
        title: "数据反馈",
        intro:
          "上线一周数据：首周开通率、首单转化率、复购率均录得正向反馈（已脱敏）。上线四周后核心数据持续增长，后续将围绕「感知价值-首次使用-持续收益-复购」持续优化会员体验，提升用户长期价值。",
        sections: [{ title: "上线数据反馈", images: [15] }],
      },
    ],
  },
  {
    number: "04",
    tagline:
      "多个小项目的合集：百度网盘SVIPtab首屏焕新与MBTI营销活动，实习工作复盘，以及Blender三维建模练习。",
    meta: [
      { label: "客户 / Client", value: "百度网盘" },
      { label: "时间 / Year", value: "2021 – 2026" },
      { label: "角色 / Role", value: "体验设计师" },
      { label: "平台 / Platform", value: "移动端 · 3D" },
    ],
    results: ["NA 12.0 全量上线 · 点击率+4.18PP", "40+ 工具图标 / 50+ 文件图标", "Teracleaner 0→1 设计", "Teratransfer 交互动效demo"],
    showGallery: false,
    parts: [
      {
        title: "项目概览",
        intro:
          "这一项目收录百度网盘相关的多个小项目：收银台SVIP tab首屏焕新、网盘文库MBTI营销活动，以及实习工作复盘——NA端12.0版本迭代升级、Teracleaner清理工具、Teratransfer动效等。它们覆盖体验升级、0→1产品设计与动效表达三条线，另附Blender三维建模练习。",
        sections: [{ title: "百度网盘 · 项目封面", images: [1] }],
      },
      {
        title: "SVIP tab 首屏焕新",
        intro:
          "百度网盘汇聚海量资源，会员商品涉及场景多、逻辑复杂。痛点集中在三处——信息层级：页面信息多、关键信息不突出，决策引导不足；视觉：SVIP会员沉浸感不足；体验：市面上会员收银台页面千篇一律。设计策略对应三点：关键信息突出与相似信息整合、放大决策按钮，头部氛围营造沉浸感，打破原有框架、创新UI动势提升转化氛围。",
        sections: [
          { title: "背景 · 痛点 · 设计策略", images: [2] },
          { title: "方案一 / 方案二", images: [3] },
        ],
      },
      {
        title: "MBTI 营销活动",
        intro:
          "网盘文库结合自身AI能力为用户提供垂直玩法，带动DAU和付费提升。本次基于MBTI人格测试产品demo设计营销视觉页：核心用户为年轻化、情绪驱动型人群，使用动机来自自我探索、社交表达与内容消费。关键词提炼为AI、年轻化、情绪驱动、视觉冲击力、低决策成本。",
        sections: [
          { title: "背景与用户分析", images: [4] },
          { title: "设计目标与策略", images: [5] },
          { title: "设计思路 · 形色质构", images: [6] },
          { title: "AI辅助", images: [7] },
        ],
      },
      {
        title: "页面展示",
        intro:
          "两组Before/After对照：网盘收银台SVIP tab从平铺信息到沉浸式会员氛围；MBTI人格测试demo从灰度原型到3D粘土风格的完整营销页——已通过测试验证。",
        sections: [{ title: "Before / After", images: [8] }],
      },
      {
        title: "实习复盘 · NA 12.0 版本迭代升级",
        intro:
          "网盘用户的需求逐步呈现多样性和差异性。本次迭代从「多元化服务、专属个性化定制、全新视觉设计语言」三方面展开体验升级：基于数据洞察、业务诉求与产品问题拆解出增存优化、商业增益、体验进阶三个优化方向，并沉淀了以网盘主色#06A7FF与辅助色、F1-F9字阶为核心的设计规范。",
        sections: [
          { title: "实习复盘 · 封面与目录", images: [9, 11] },
          { title: "项目背景与设计方向", images: [12, 13] },
          { title: "设计规范", images: [14] },
          { title: "多元 · 更丰富的服务体验", images: [15] },
          { title: "专属 · 更智能、尊享的体验", images: [16, 17] },
          { title: "全新视觉设计语言", images: [18] },
          { title: "卡片容器与信息分层", images: [19, 20, 21, 22] },
          { title: "图标焕新", images: [23, 24, 25, 26, 27] },
          { title: "自动备份与登录页", images: [28, 29] },
          { title: "界面展示", images: [30] },
          { title: "全量上线数据反馈", images: [40] },
        ],
      },
      {
        title: "实习复盘 · Teracleaner",
        intro:
          "Teracleaner为安卓清理工具，作为Terabox产品矩阵计划的一部分，目标是为Terabox导流、增加产品曝光度。设计策略三方面：组件与规范——与Terabox使用同一组件库保证视觉统一；用户体验——以同理心预判用户下一步操作、及时反馈；动画效果——清理过程本就枯燥，用「清晰、简洁、聚焦」的动效吸引用户驻足。LOGO经A/B两版对比，最终采用扫帚主体结合品牌蓝的方案B。",
        sections: [
          { title: "项目背景", images: [31] },
          { title: "设计策略", images: [32] },
          { title: "设计规范", images: [33] },
          { title: "LOGO 设计", images: [34] },
          { title: "主要页面", images: [35] },
        ],
      },
      {
        title: "实习复盘 · Teratransfer 动效",
        intro:
          "为新增的Teratransfer网页提供完整操作流程的交互动效demo。交互动效的核心是告诉用户操作从哪里来、往哪里去，同时淡化等待时间、提升趣味性与满意度——好的动效应兼顾节奏、动静平衡与流畅。策略上运用较多缓动与延迟效果，让动画脱离尖锐和生硬，形成更强的对比。",
        sections: [
          { title: "需求与挑战", images: [36] },
          { title: "设计策略", images: [37, 38] },
        ],
      },
      {
        title: "Blender 建模练习",
        intro:
          "工作之余持续用Blender做三维建模与渲染练习：从潮玩IP场景到角色小品，覆盖建模、材质、灯光与渲染的完整流程，探索三维视觉在运营活动与品牌表达中的更多可能。",
        sections: [{ title: "建模练习合辑", images: [39] }],
      },
    ],
  },
];
