/** Semantic token meanings shown in the Design System preview (product-facing roles). */

export type GlossaryEntry = {
  token: string;
  meaning: string;
};

export type GlossarySection = {
  title: string;
  blurb: string;
  entries: GlossaryEntry[];
};

export const semanticGlossarySections: GlossarySection[] = [
  {
    title: 'Surface',
    blurb: 'Stage vs content fills—not Material elevation numbers.',
    entries: [
      { token: 'surface.canvas', meaning: 'Page stage behind content / 内容背后的页面舞台' },
      { token: 'surface.panel', meaning: 'Resting content fill / 贴地内容填充' },
      {
        token: 'surface.elevated',
        meaning: 'Lifted fill; pair with shadow.raised / 抬起填充，配对 raised 阴影',
      },
      { token: 'surface.inverse', meaning: 'Inverted band / 反转带' },
    ],
  },
  {
    title: 'Text & border',
    blurb: 'Content hierarchy and structural edges.',
    entries: [
      { token: 'text.primary', meaning: 'Default readable copy / 默认可读正文' },
      { token: 'text.secondary', meaning: 'Supporting copy / 次要说明' },
      { token: 'text.muted', meaning: 'Meta, placeholders / 元信息、占位' },
      { token: 'text.inverse', meaning: 'On inverse or solid bands / 反转带上文字' },
      { token: 'border.subtle', meaning: 'Hairline structure / 细结构线' },
      { token: 'border.default', meaning: 'Standard control and card edges / 常规边' },
      { token: 'border.strong', meaning: 'Strong separation / hover borders / 强分隔' },
      {
        token: 'border.focus',
        meaning: 'Neutral focus outline color (not brand) / 中性聚焦描边色',
      },
    ],
  },
  {
    title: 'Action',
    blurb: 'Shared ambient interaction chrome (rows, menus, nav)—not a full button recipe.',
    entries: [
      { token: 'action.fg', meaning: 'Resting interactive foreground / 静止交互前景' },
      { token: 'action.fgDisabled', meaning: 'Disabled interactive foreground / 禁用前景' },
      { token: 'action.bgHover', meaning: 'Hover wash / 悬停叠色' },
      { token: 'action.bgActive', meaning: 'Pressed wash (transient) / 按下叠色（瞬时）' },
      { token: 'action.bgSelected', meaning: 'Selected / toggled-on fill / 选中填充' },
      { token: 'action.bgDisabled', meaning: 'Disabled hit-target fill / 禁用热区填充' },
      {
        token: 'action.bgFocus',
        meaning: 'Keyboard focus wash (not the ring) / 键盘聚焦叠色（非焦点环）',
      },
    ],
  },
  {
    title: 'Control',
    blurb: 'Complete control recipe for bounded chrome. Filled labels use fgContrast.',
    entries: [
      { token: 'control.*.bg', meaning: 'Resting background / 静止背景' },
      { token: 'control.*.bgHover', meaning: 'Hover background / 悬停背景' },
      { token: 'control.*.bgActive', meaning: 'Pressed / active background / 按下背景' },
      {
        token: 'control.*.fg',
        meaning: 'Outline / ghost / soft label color / 描边、幽灵、soft 字色',
      },
      {
        token: 'control.*.fgContrast',
        meaning: 'Label on solid resting fill / 实心底上的标签色',
      },
      { token: 'control.*.border', meaning: 'Resting border / 静止描边' },
      { token: 'control.*.borderHover', meaning: 'Hover border / 悬停描边' },
      {
        token: 'control.primary',
        meaning: 'Main CTA; tracks brand solid ladder / 主 CTA，跟随品牌实心阶',
      },
      {
        token: 'control.secondary',
        meaning: 'Quiet bordered control on the stage / 舞台上安静描边控件',
      },
    ],
  },
  {
    title: 'Brand & status palettes',
    blurb: 'Shared slots for brand / success / warning / danger / info. Stay inside one family.',
    entries: [
      {
        token: '*.soft / softHover / softActive',
        meaning: 'Low-emphasis fills / 低强调填充',
      },
      {
        token: '*.solid / solidHover / solidActive',
        meaning: 'Filled emphasis / 实心强调',
      },
      { token: '*.fg', meaning: 'Foreground on soft or canvas / soft 或画布上前景' },
      { token: '*.contrast', meaning: 'Foreground on solid / solid 上前景' },
      { token: '*.border', meaning: 'Outline / accent border / 描边' },
      {
        token: '*.focusRing',
        meaning: 'Keyboard focus indicator color / 键盘焦点指示色',
      },
      {
        token: 'brand.*',
        meaning: 'Identity accents (non-control) / 身份强调（非控件）',
      },
      {
        token: 'success|warning|danger.*',
        meaning: 'Status only—never decoration / 仅状态，不作装饰',
      },
      { token: 'info.*', meaning: 'Informational chrome / 信息性 chrome' },
      {
        token: 'common.black|white',
        meaning: 'Absolute contrast anchors / 对比度绝对锚点',
      },
    ],
  },
  {
    title: 'Typography',
    blurb: 'One sans family; hierarchy via size, weight, leading, tracking.',
    entries: [
      { token: 'typography.display', meaning: 'Hero / rare large title / 稀有大标题' },
      { token: 'typography.title', meaning: 'Page / section title / 页、节标题' },
      { token: 'typography.heading', meaning: 'In-page heading / 页内标题' },
      { token: 'typography.subheading', meaning: 'Subsection / 小节' },
      { token: 'typography.body', meaning: 'Default UI copy / 默认正文' },
      { token: 'typography.bodySmall', meaning: 'Compact secondary copy / 紧凑次要正文' },
      { token: 'typography.label', meaning: 'Control labels / 控件标签' },
      { token: 'typography.caption', meaning: 'Meta / helper / 元信息、辅助' },
      { token: 'typography.code', meaning: 'Mono snippets / 等宽片段' },
    ],
  },
  {
    title: 'Elevation & shadow',
    blurb: 'Three depth steps. Elevated surfaces must pair with raised/overlay shadow.',
    entries: [
      {
        token: 'shadow.surface',
        meaning: 'Resting content on the stage / 贴地内容弱影',
      },
      {
        token: 'shadow.raised',
        meaning: 'Required with surface.elevated / 浮起必配对',
      },
      {
        token: 'shadow.overlay',
        meaning: 'Modal / menu / top chrome / 顶层模态与菜单',
      },
      {
        token: 'shadow.focus',
        meaning: 'Neutral focus ring (not brand glow) / 中性焦点环',
      },
    ],
  },
  {
    title: 'Layout & stacking',
    blurb: 'Shell geometry and z-order roles—prefer these over magic numbers.',
    entries: [
      { token: 'layout.page.maxWidth', meaning: 'Shell max width / 壳层最大宽' },
      { token: 'layout.page.gutter', meaning: 'Page gutter / 页边距' },
      { token: 'layout.reading.maxWidth', meaning: 'Long-form reading column / 长文阅读栏' },
      { token: 'layout.header.height', meaning: 'Top bar height / 顶栏高度' },
      { token: 'layout.toolbar.height', meaning: 'Toolbar height / 工具栏高度' },
      { token: 'layout.sidebar.width', meaning: 'Sidebar width / 侧栏宽度' },
      {
        token: 'layout.sidebar.collapsedWidth',
        meaning: 'Collapsed sidebar rail / 收起侧栏',
      },
      { token: 'layout.content.maxWidth', meaning: 'Content column cap / 内容栏上限' },
      {
        token: 'zIndex.base → tooltip',
        meaning: 'base · raised · dropdown · sticky · overlay · modal · popover · toast · tooltip',
      },
      {
        token: 'opacity.disabled|hover|pressed|muted|overlay|scrim',
        meaning: 'State and backdrop alphas / 状态与遮罩透明度',
      },
      {
        token: 'opacity.action.*',
        meaning: 'Fine-grained action overlays / 细粒度 action 叠色',
      },
    ],
  },
];
