export type RcOpenString<T extends string> = T | (string & Record<never, never>);

export type RcSpaceValue = RcOpenString<
  | 'none'
  | 'px'
  | '0'
  | '0.5'
  | '1'
  | '1.5'
  | '2'
  | '2.5'
  | '3'
  | '3.5'
  | '4'
  | '4.5'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '14'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '40'
  | '48'
  | '56'
  | '64'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
>;

export type RcSurfaceValue = RcOpenString<
  'transparent' | 'canvas' | 'panel' | 'elevated' | 'inverse'
>;
export type RcTextColorValue = RcOpenString<'primary' | 'secondary' | 'muted' | 'inverse'>;
export type RcBorderWidthValue = RcOpenString<'none' | 'xs' | 'sm' | 'md' | 'lg'>;
export type RcRadiusValue = RcOpenString<
  'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
>;
export type RcTypographyValue = RcOpenString<
  | 'display'
  | 'title'
  | 'heading'
  | 'subheading'
  | 'body'
  | 'body-small'
  | 'label'
  | 'caption'
  | 'code'
>;
export type RcFontWeightValue = RcOpenString<'regular' | 'medium' | 'semibold' | 'bold'>;
export type RcJustifyValue = RcOpenString<
  'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
>;

export interface RcStyleProps {
  pd: RcSpaceValue;
  px: RcSpaceValue;
  py: RcSpaceValue;
  mg: RcSpaceValue;
  mx: RcSpaceValue;
  my: RcSpaceValue;
  display: string;
  gap: RcSpaceValue;
  alignItems: string;
  justify: RcJustifyValue;
  position: string;
  overflow: string;
  width: string;
  height: string;
  minWidth: string;
  maxWidth: string;
  minHeight: string;
  maxHeight: string;
  border: string;
  borderWidth: RcBorderWidthValue;
  borderStyle: string;
  borderColor: string;
  borderRadius: RcRadiusValue;
  bg: RcSurfaceValue;
  color: RcTextColorValue;
  fontSize: RcTypographyValue;
  fontWeight: RcFontWeightValue;
  lineHeight: RcTypographyValue;
  textAlign: string;
}

export type RcStylePropertyName = keyof RcStyleProps;
export type RcStyleResolver =
  | 'raw'
  | 'space'
  | 'size'
  | 'surface'
  | 'text-color'
  | 'justify'
  | 'border'
  | 'border-width'
  | 'border-color'
  | 'radius'
  | 'font-size'
  | 'font-weight'
  | 'line-height';

export type RcStylePropertyDefinition = {
  property: RcStylePropertyName;
  attribute: string;
  cssProperty: string;
  resolver: RcStyleResolver;
};

export const rcStyleProperties: readonly RcStylePropertyDefinition[] = [
  { property: 'pd', attribute: 'pd', cssProperty: 'padding', resolver: 'space' },
  { property: 'px', attribute: 'px', cssProperty: 'padding-inline', resolver: 'space' },
  { property: 'py', attribute: 'py', cssProperty: 'padding-block', resolver: 'space' },
  { property: 'mg', attribute: 'mg', cssProperty: 'margin', resolver: 'space' },
  { property: 'mx', attribute: 'mx', cssProperty: 'margin-inline', resolver: 'space' },
  { property: 'my', attribute: 'my', cssProperty: 'margin-block', resolver: 'space' },
  { property: 'display', attribute: 'display', cssProperty: 'display', resolver: 'raw' },
  { property: 'gap', attribute: 'gap', cssProperty: 'gap', resolver: 'space' },
  {
    property: 'alignItems',
    attribute: 'align-items',
    cssProperty: 'align-items',
    resolver: 'raw',
  },
  {
    property: 'justify',
    attribute: 'justify',
    cssProperty: 'justify-content',
    resolver: 'justify',
  },
  { property: 'position', attribute: 'position', cssProperty: 'position', resolver: 'raw' },
  { property: 'overflow', attribute: 'overflow', cssProperty: 'overflow', resolver: 'raw' },
  { property: 'width', attribute: 'width', cssProperty: 'width', resolver: 'size' },
  { property: 'height', attribute: 'height', cssProperty: 'height', resolver: 'size' },
  {
    property: 'minWidth',
    attribute: 'min-width',
    cssProperty: 'min-width',
    resolver: 'size',
  },
  {
    property: 'maxWidth',
    attribute: 'max-width',
    cssProperty: 'max-width',
    resolver: 'size',
  },
  {
    property: 'minHeight',
    attribute: 'min-height',
    cssProperty: 'min-height',
    resolver: 'size',
  },
  {
    property: 'maxHeight',
    attribute: 'max-height',
    cssProperty: 'max-height',
    resolver: 'size',
  },
  { property: 'border', attribute: 'border', cssProperty: 'border', resolver: 'border' },
  {
    property: 'borderWidth',
    attribute: 'border-width',
    cssProperty: 'border-width',
    resolver: 'border-width',
  },
  {
    property: 'borderStyle',
    attribute: 'border-style',
    cssProperty: 'border-style',
    resolver: 'raw',
  },
  {
    property: 'borderColor',
    attribute: 'border-color',
    cssProperty: 'border-color',
    resolver: 'border-color',
  },
  {
    property: 'borderRadius',
    attribute: 'border-radius',
    cssProperty: 'border-radius',
    resolver: 'radius',
  },
  { property: 'bg', attribute: 'bg', cssProperty: 'background', resolver: 'surface' },
  { property: 'color', attribute: 'color', cssProperty: 'color', resolver: 'text-color' },
  {
    property: 'fontSize',
    attribute: 'font-size',
    cssProperty: 'font-size',
    resolver: 'font-size',
  },
  {
    property: 'fontWeight',
    attribute: 'font-weight',
    cssProperty: 'font-weight',
    resolver: 'font-weight',
  },
  {
    property: 'lineHeight',
    attribute: 'line-height',
    cssProperty: 'line-height',
    resolver: 'line-height',
  },
  {
    property: 'textAlign',
    attribute: 'text-align',
    cssProperty: 'text-align',
    resolver: 'raw',
  },
];
