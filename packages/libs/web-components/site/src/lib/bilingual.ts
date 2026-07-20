const categoryNames: Record<string, string> = {
  basic: '基础',
  data: '数据展示',
  feedback: '反馈',
  layout: '布局',
  navigation: '导航',
  overlay: '浮层',
  surfaces: '容器',
};

const componentNames: Record<string, string> = {
  accordion: '手风琴',
  alert: '警告提示',
  avatar: '头像',
  badge: '徽标',
  banner: '横幅',
  box: '盒容器',
  breadcrumb: '面包屑',
  button: '按钮',
  'button-group': '按钮组',
  'button group': '按钮组',
  card: '卡片',
  center: '居中布局',
  checkbox: '复选框',
  'color-picker': '颜色选择器',
  'color picker': '颜色选择器',
  combobox: '组合框',
  details: '详情折叠',
  dialog: '对话框',
  divider: '分隔线',
  drawer: '抽屉',
  dropdown: '下拉菜单',
  empty: '空状态',
  field: '表单字段',
  fieldset: '字段组',
  'file-upload': '文件上传',
  'file upload': '文件上传',
  flex: '弹性布局',
  grid: '网格布局',
  'hover-card': '悬浮卡片',
  'hover card': '悬浮卡片',
  input: '输入框',
  label: '标签',
  link: '链接',
  list: '列表',
  menu: '菜单',
  meter: '计量器',
  'number-input': '数字输入框',
  'number input': '数字输入框',
  pagination: '分页',
  panel: '面板',
  'password-input': '密码输入框',
  'password input': '密码输入框',
  'pin-input': '验证码输入框',
  'pin input': '验证码输入框',
  popover: '弹出框',
  progress: '进度',
  radio: '单选框',
  rating: '评分',
  'scroll-area': '滚动区域',
  'scroll area': '滚动区域',
  segment: '分段控件',
  select: '选择器',
  separator: '分隔符',
  sheet: '侧边面板',
  sidebar: '侧边栏',
  skeleton: '骨架屏',
  slider: '滑块',
  snackbar: '消息条',
  stack: '堆叠布局',
  stat: '统计数据',
  steps: '步骤条',
  switch: '开关',
  table: '表格',
  tabs: '标签页',
  'tags-input': '标签输入框',
  'tags input': '标签输入框',
  textarea: '文本域',
  timeline: '时间线',
  toast: '通知',
  'toggle-tip': '点击提示',
  'toggle tip': '点击提示',
  tooltip: '工具提示',
  typography: '排版',
};

const demoTitles: Record<string, string> = {
  Action: '操作',
  Align: '对齐',
  'All variants': '全部变体',
  Badge: '徽标',
  Basic: '基础',
  Block: '块级布局',
  Bounds: '边界',
  Chrome: '结构区域',
  Collapsed: '折叠',
  Colors: '颜色',
  Columns: '列',
  Content: '内容',
  Directions: '方向',
  Disabled: '禁用',
  Filled: '已填充',
  'Full width': '全宽',
  Gaps: '间距',
  Heights: '高度',
  Helper: '帮助文本',
  'Icon and close buttons': '图标与关闭按钮',
  'With icons': '带图标',
  Indeterminate: '不确定进度',
  Info: '信息',
  Interactive: '交互',
  Invalid: '无效状态',
  Justify: '主轴分布',
  Levels: '级别',
  Loading: '加载',
  Menu: '菜单',
  Multiple: '多选',
  Open: '展开',
  Orientation: '方向',
  Orientations: '方向',
  Pairing: '关联',
  Placement: '位置',
  Range: '范围',
  Resize: '调整尺寸',
  Rich: '丰富内容',
  Separated: '分隔',
  Separator: '分隔符',
  Siblings: '相邻页',
  Sides: '侧边位置',
  Simple: '简洁',
  Sizes: '尺寸',
  Slots: '插槽',
  Spacing: '间距',
  States: '状态',
  Styles: '样式',
  Surfaces: '表面',
  Tag: '标签',
  Trends: '趋势',
  Types: '类型',
  Values: '取值',
  Variants: '变体',
  Vertical: '垂直排列',
  'With icon buttons': '图标按钮',
};

const specialDemoDescriptions: Record<string, string> = {
  'Adds helper text to explain the expected field value.': '添加帮助文本，说明字段的预期值。',
  'Places decorative icons before or after the label; loading overlays a spinner without shifting layout.':
    '在标签前后放置装饰性图标；加载时 spinner 叠在内容上方，尺寸保持不变。',
  'Places decorative icons before or after the label; loading replaces the leading icon with a spinner.':
    '在标签前后放置装饰性图标；加载时前置图标会被 spinner 替换。',
  'Attaches related actions into one segmented control; provide an aria-label.':
    '将相关操作贴合为一组分段控件；请提供 aria-label。',
  'Arranges grouped buttons horizontally or vertically.': '水平或垂直排列分组按钮。',
  'With separated, buttons keep spacing instead of attaching.':
    '使用 separated 时按钮以间距分开排列，不再贴合。',
  'Combines with rc-icon-button for compact toolbars.': '可与 rc-icon-button 组合用于紧凑工具栏。',
  'Compares button emphasis from solid and subtle through outline, ghost, and destructive actions.':
    '对比实心、柔和、描边、幽灵和危险操作等按钮强调级别。',
  'Compares fixed-height scroll area containers with overflowing content.':
    '对比内容溢出时不同固定高度的滚动区域。',
  'Compares how flex distributes items along its main axis.': '对比弹性布局沿主轴分布项目的方式。',
  'Compares icon-only and close actions; icons are provided by the consumer via slot.':
    '对比纯图标操作、专用关闭操作及其无障碍标签；图标由使用方通过 slot 传入。',
  'Compares icon-only and close actions built on rc-button icon mode, with accessible labels.':
    '对比纯图标操作、专用关闭操作及其无障碍标签；二者均基于 rc-button 的 icon 模式。',
  'Compares positive, negative, and neutral trends displayed by stat.':
    '对比统计数据展示的正向、负向和中性趋势。',
  'Compares semantic surface backgrounds and borders on box.': '对比盒容器的语义化表面背景与边框。',
  'Compares small, medium, and large buttons for different interface densities.':
    '对比适用于不同界面密度的小、中、大尺寸按钮。',
  'Compares the spacing presets available to stack.': '对比堆叠布局可用的间距预设。',
  'Compares the supported input types and their browser semantics for input.':
    '对比输入框支持的输入类型及其浏览器语义。',
  'Compares the text alignment options supported by typography.': '对比排版支持的文本对齐选项。',
  'Compares the optional visual treatments available to table.': '对比表格可选的视觉样式。',
  'Compares the padding and margin presets available to box.': '对比盒容器可用的内外边距预设。',
  'Compares the resize behaviors supported by textarea.': '对比文本域支持的尺寸调整行为。',
  'Compares the semantic color options available to typography.': '对比排版可用的语义颜色。',
  'Compares value levels and threshold states represented by meter.':
    '对比计量器表示的数值级别与阈值状态。',
  'Demonstrates how grid distributes content across columns.': '演示网格如何在各列间分布内容。',
  'Demonstrates how named slots structure content inside dialog.':
    '演示命名插槽如何组织对话框内容。',
  'Demonstrates interactive list items and their affordances.': '演示可交互列表项及其操作提示。',
  'Demonstrates minimum, maximum, and step constraints for number input.':
    '演示数字输入框的最小值、最大值和步长约束。',
  'Demonstrates the accessible relationship between label and a form control.':
    '演示标签与表单控件之间的无障碍关联。',
  'Presents every badge variant together for visual comparison.':
    '集中展示全部徽标变体以便视觉对比。',
  'Shows a custom separator between items in breadcrumb.': '展示面包屑项目之间的自定义分隔符。',
  'Shows a minimal card with only essential content.': '展示仅包含必要内容的简洁卡片。',
  'Shows a removable tag for selected values and active filters.':
    '展示用于已选值和生效筛选项的可移除标签。',
  'Shows accordion accepting or displaying multiple values at once.':
    '展示手风琴同时接收或显示多个值。',
  'Shows badge variants for compact status and category labels.':
    '展示适用于紧凑状态和分类标签的徽标变体。',
  'Shows buttons while an asynchronous action is pending, with interaction temporarily blocked.':
    '展示异步操作等待期间暂时阻止交互的按钮。',
  'Shows center filling a block-level container.': '展示居中布局填满块级容器。',
  'Shows color picker initialized with different values.': '展示使用不同初始值的颜色选择器。',
  'Shows empty with a related action users can take.': '展示带有相关用户操作的空状态。',
  'Shows file upload accepting or displaying multiple values at once.':
    '展示文件上传同时接收或显示多个值。',
  'Shows how field presents validation errors and recovery guidance.':
    '展示表单字段如何呈现校验错误和修复指引。',
  'Shows how fieldset communicates and handles a disabled state.':
    '展示字段组如何表达并处理禁用状态。',
  'Shows how pagination adjusts the number of neighboring pages.': '展示分页如何调整相邻页数量。',
  'Shows how radio communicates and handles a disabled state.':
    '展示单选框如何表达并处理禁用状态。',
  'Shows how tabs communicates and handles a disabled state.': '展示标签页如何表达并处理禁用状态。',
  'Shows panel with header, body, and footer chrome.': '展示包含页眉、主体和页脚区域的面板。',
  'Shows progress when completion progress is not yet known.': '展示尚无法确定完成进度时的状态。',
  'Shows radio arranged vertically for easier scanning.': '展示便于浏览的垂直排列单选框。',
  'Shows richer slotted content inside hover card.': '展示悬浮卡片中的丰富插槽内容。',
  'Shows richer slotted content inside toggle tip.': '展示点击提示中的丰富插槽内容。',
  'Shows segment expanding to the full width of its container.': '展示分段控件扩展至容器全宽。',
  'Shows slider selecting a bounded range with two values.': '展示使用两个值选择有界范围的滑块。',
  'Shows snackbar with a related action users can take.': '展示带有相关用户操作的消息条。',
  'Shows tags input populated with existing values.': '展示已填充现有值的标签输入框。',
  'Shows the compact collapsed state of sidebar.': '展示侧边栏紧凑的折叠状态。',
  'Shows the expanded state of combobox with its available options.':
    '展示组合框展开后的可用选项。',
  'Shows the informational presentation and content structure of alert.':
    '展示警告提示的信息样式和内容结构。',
  'Shows timeline with richer titles, descriptions, and supporting content.':
    '展示包含更丰富标题、说明和辅助内容的时间线。',
  'Uses dropdown with a menu trigger and selectable actions.':
    '展示带菜单触发器和可选操作的下拉菜单。',
};

const summaryNames: Record<string, string> = {
  'rc-accordion': '用于展开和收起多个内容区域的手风琴组。',
  'rc-accordion-item': '手风琴组中的单个内容项。',
  'rc-alert': '用于行内反馈的状态提示区域。',
  'rc-avatar': '支持图片或首字母回退的用户或实体头像。',
  'rc-badge': '用于紧凑展示状态或元信息的徽标。',
  'rc-banner': '用于持续展示状态的全宽横幅。',
  'rc-box': '通用布局与表面盒容器。',
  'rc-breadcrumb': '用于展示页面层级路径的面包屑。',
  'rc-button': '使用语义令牌呈现的主要操作按钮，支持前置/后置图标与 icon 方形模式。',
  'rc-button-group': '将相关操作按钮分组；默认贴合为分段条，可用 separated 分开排列。',
  'rc-card': '用于组织相关内容的表面容器。',
  'rc-center': '在两个轴向上居中子元素的布局容器。',
  'rc-checkbox': '二元或不确定状态的复选框控件。',
  'rc-close-button':
    '组合 rc-icon-button 的关闭按钮，默认 × 与 aria-label Close；可用 slot 替换图标。',
  'rc-color-picker': '结合色块与十六进制输入框的颜色选择器。',
  'rc-combobox': '支持筛选选项的组合框。',
  'rc-combobox-option': '组合框中的单个选项。',
  'rc-details': '基于原生详情元素的内容披露控件。',
  'rc-dialog': '基于原生对话框的模态或非模态容器。',
  'rc-divider': '支持内缩间距的布局分隔线。',
  'rc-drawer': '基于原生对话框的模态侧边抽屉。',
  'rc-dropdown': '由触发器和菜单内容组成的下拉控件。',
  'rc-empty': '用于无数据列表或页面的空状态占位。',
  'rc-field': '组合标签、控件、帮助和错误文本的字段容器。',
  'rc-fieldset': '基于原生字段组和图例的表单分组。',
  'rc-file-upload': '支持拖放与选择文件的上传控件。',
  'rc-flex': '默认横向排列的弹性布局基础组件。',
  'rc-grid': '响应式 CSS 网格布局基础组件。',
  'rc-hover-card': '在触发器悬浮或聚焦时显示内容的卡片。',
  'rc-icon-button':
    '组合 rc-button icon 模式的纯图标按钮，默认 ghost；图标由 slot 传入，需明确无障碍标签。',
  'rc-input': '使用设计系统表单令牌的单行输入框。',
  'rc-label': '通过 for 属性关联浅层 DOM 控件的表单标签。',
  'rc-link': '基于原生链接元素的文本链接。',
  'rc-list': '与列表项组合使用的样式化列表容器。',
  'rc-list-item': '列表中的单行内容项。',
  'rc-menu': '与菜单项组合使用的垂直菜单列表。',
  'rc-menu-item': '菜单中的单个操作项。',
  'rc-meter': '基于原生计量元素的标量计量器。',
  'rc-number-input': '支持步进操作的数字输入框。',
  'rc-pagination': '用于切换页面的分页控件。',
  'rc-panel': '默认无阴影的低调表面面板。',
  'rc-password-input': '带有密码显示切换功能的输入框。',
  'rc-pin-input': '用于输入验证码或 PIN 的分组数字输入框。',
  'rc-popover': '锚定到触发器显示的弹出表面。',
  'rc-progress': '基于原生进度元素的线性进度指示器。',
  'rc-progress-circle': '支持确定与不确定状态的圆形进度。',
  'rc-radio': '可独立使用或加入单选框组的单个选项。',
  'rc-radio-group': '支持方向键导航的单选框选项组。',
  'rc-rating': '用于选择星级分值的评分控件。',
  'rc-scroll-area': '在支持环境中使用令牌化滚动条的滚动区域。',
  'rc-segment': '用于互斥选项的分段控件。',
  'rc-segment-item': '分段控件中的单个选项。',
  'rc-select': '将浅层 DOM 选项同步到内部原生选择器的控件。',
  'rc-separator': '基于原生分隔语义的视觉分隔符。',
  'rc-sheet': '默认非模态的边缘锚定侧边面板。',
  'rc-sidebar': '应用侧边栏或导航栏的外壳。',
  'rc-skeleton': '带有微光动画的加载占位。',
  'rc-slider': '基于原生范围输入框的滑块。',
  'rc-snackbar': '底部锚定并支持可选操作的消息条。',
  'rc-spinner': '用于不确定加载状态的旋转指示器。',
  'rc-stack': '按方向和间距排列内容的弹性堆叠布局。',
  'rc-stat': '用于展示指标或关键绩效数据的组件。',
  'rc-step': '步骤条中的单个步骤。',
  'rc-steps': '用于展示多步骤进度的指示器。',
  'rc-switch': '表示开关状态的二元切换控件。',
  'rc-table': '用于承载原生表格标记的样式化外壳。',
  'rc-tab': '标签页组中的单个触发器。',
  'rc-tabs': '由标签触发器和对应面板组成的控件。',
  'rc-tag': '支持可选移除操作的分类标签。',
  'rc-tags-input': '使用逗号分隔值的多标签输入控件。',
  'rc-textarea': '用于输入多行文本的字段。',
  'rc-timeline': '用于按时间顺序展示事件的垂直时间线。',
  'rc-timeline-item': '时间线中的单个事件项。',
  'rc-toast': '支持自动关闭的临时通知。',
  'rc-toggle-tip': '点击触发、具有工具提示外观的弹出提示。',
  'rc-tooltip': '在触发器悬浮或聚焦时显示的工具提示。',
  'rc-typography': '将排版变体映射到语义令牌的文本组件。',
};

const slotDescriptions: Record<string, string> = {
  action: '操作控件',
  caption: '可选表格标题',
  content: '内容',
  default: '默认内容',
  description: '辅助说明',
  error: '错误文本',
  footer: '可选页脚',
  header: '可选页眉',
  helper: '帮助文本',
  icon: '可选图示或图标',
  label: '标签文本',
  legend: '图例标签',
  prefix: '前置媒体或图标',
  summary: '摘要或触发器标签',
  suffix: '后置元信息或操作',
  title: '标题文本',
  trend: '可选趋势文本',
  trigger: '触发控件',
  value: '数值内容',
};

function bilingual(chinese: string, english: string) {
  return `${chinese} / ${english}`;
}

function componentName(value: string) {
  return componentNames[value] ?? value;
}

export function bilingualCategory(value: string) {
  return bilingual(categoryNames[value] ?? value, value);
}

export function bilingualComponent(value: string) {
  return bilingual(componentName(value), value);
}

export function bilingualDemoTitle(value: string) {
  if (/\p{Script=Han}/u.test(value)) return value;
  return bilingual(demoTitles[value] ?? value, value);
}

export function bilingualDemoDescription(value: string) {
  if (/\p{Script=Han}/u.test(value)) return value;
  const practical = value.match(
    /^Shows a practical (.+) example with its default configuration\.$/,
  );
  if (practical)
    return bilingual(`展示使用默认配置的实用${componentName(practical[1])}示例。`, value);

  const sizes = value.match(/^Compares the available size presets for (.+)\.$/);
  if (sizes) return bilingual(`对比${componentName(sizes[1])}可用的尺寸预设。`, value);

  const states = value.match(/^Compares the primary interactive states supported by (.+)\.$/);
  if (states) return bilingual(`对比${componentName(states[1])}支持的主要交互状态。`, value);

  const variants = value.match(
    /^Compares the visual variants and emphasis levels available to (.+)\.$/,
  );
  if (variants)
    return bilingual(`对比${componentName(variants[1])}可用的视觉变体和强调级别。`, value);

  const directions = value.match(/^Compares the supported layout directions for (.+)\.$/);
  if (directions) return bilingual(`对比${componentName(directions[1])}支持的布局方向。`, value);

  const placements = value.match(
    /^Compares the supported placement options around the trigger for (.+)\.$/,
  );
  if (placements)
    return bilingual(`对比${componentName(placements[1])}在触发器周围支持的位置。`, value);

  const orientations = value.match(/^Compares horizontal and vertical orientations of (.+)\.$/);
  if (orientations)
    return bilingual(`对比${componentName(orientations[1])}的水平和垂直方向。`, value);

  const sides = value.match(/^Compares the sides from which (.+) can enter the viewport\.$/);
  if (sides) return bilingual(`对比${componentName(sides[1])}从不同侧边进入视口的效果。`, value);

  const translated = specialDemoDescriptions[value];
  return bilingual(translated ?? '展示此组件的相关用法。', value);
}

export function bilingualSummary(value: string, tag: string) {
  return bilingual(summaryNames[tag] ?? `${tag} 组件。`, value);
}

export function bilingualSlotDescription(value: string, name: string) {
  return bilingual(slotDescriptions[name] ?? '插槽内容', value || 'Slot content');
}

export function bilingualEventDescription(value: string, name: string) {
  const eventNames: Record<string, string> = {
    cancel: '取消时触发',
    change: '值或选择发生变化时触发',
    close: '关闭时触发',
    dismiss: '移除操作触发时触发',
    input: '输入过程中触发',
    'rc-menu-select': '菜单项激活时触发',
    'rc-segment-select': '分段选项激活时触发',
    toggle: '展开状态变化时触发',
  };
  return bilingual(eventNames[name] ?? '事件触发时通知', value || 'Event notification');
}
