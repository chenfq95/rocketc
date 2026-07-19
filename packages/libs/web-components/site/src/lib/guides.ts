export type GuidePage = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export const guidePages: GuidePage[] = [
  {
    id: 'installation',
    title: '安装与使用 / Installation & Usage',
    description:
      '安装组件库、注册元素并渲染第一个组件。 / Install the library, register its elements, and render the first component.',
    href: '/guides/installation/',
  },
  {
    id: 'design-system',
    title: '设计系统 / Design System',
    description:
      '加载主题、切换模式并使用语义 Token。 / Load themes, switch modes, and consume semantic tokens.',
    href: '/guides/design-system/',
  },
  {
    id: 'host-styles',
    title: '通用宿主样式 / Common Host Styles',
    description:
      '通过属性定制所有组件的宿主布局与外观。 / Customize every component host through layout and appearance attributes.',
    href: '/guides/host-styles/',
  },
];
