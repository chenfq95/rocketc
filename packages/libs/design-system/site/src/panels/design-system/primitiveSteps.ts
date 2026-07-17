export const spaceSteps = [
  ['0', '0'],
  ['px', '1px'],
  ['0.5', '2px', '0-5'],
  ['1', '4px'],
  ['1.5', '6px', '1-5'],
  ['2', '8px'],
  ['2.5', '10px', '2-5'],
  ['3', '12px'],
  ['3.5', '14px', '3-5'],
  ['4', '16px'],
  ['4.5', '18px', '4-5'],
  ['5', '20px'],
  ['6', '24px'],
  ['7', '28px'],
  ['8', '32px'],
  ['9', '36px'],
  ['10', '40px'],
  ['11', '44px'],
  ['12', '48px'],
  ['14', '56px'],
  ['16', '64px'],
  ['20', '80px'],
  ['24', '96px'],
  ['28', '112px'],
  ['32', '128px'],
  ['40', '160px'],
  ['48', '192px'],
  ['56', '224px'],
  ['64', '256px'],
] as const;

export const singleColors = [
  ['black', 'rgb(0 0 0)'],
  ['white', 'rgb(255 255 255)'],
] as const;

export const sizeSteps = [
  ['0', '0'],
  ['px', '1px'],
  ['1', '4px'],
  ['2', '8px'],
  ['3', '12px'],
  ['4', '16px'],
  ['5', '20px'],
  ['6', '24px'],
  ['8', '32px'],
  ['10', '40px'],
  ['12', '48px'],
  ['16', '64px'],
  ['20', '80px'],
  ['24', '96px'],
  ['32', '128px'],
  ['40', '160px'],
  ['48', '192px'],
  ['64', '256px'],
] as const;

export const measureSteps = [
  ['xs', '480px'],
  ['sm', '640px'],
  ['md', '768px'],
  ['lg', '1024px'],
  ['xl', '1180px'],
  ['2xl', '1440px'],
  ['full', '100%'],
] as const;

export const radiusSteps = [
  ['none', '0'],
  ['xs', '2px'],
  ['sm', '4px'],
  ['md', '6px'],
  ['lg', '8px'],
  ['xl', '12px'],
  ['2xl', '16px'],
  ['3xl', '24px'],
  ['full', '999px'],
] as const;

export const borderSteps = [
  ['none', '0'],
  ['xs', '0.5px'],
  ['sm', '1px'],
  ['md', '2px'],
  ['lg', '4px'],
] as const;

export const breakpointSteps = [
  ['sm', '640px'],
  ['md', '768px'],
  ['lg', '1024px'],
  ['xl', '1280px'],
  ['2xl', '1536px'],
] as const;

export const typographySizes = [
  ['xs', '12px'],
  ['sm', '14px'],
  ['md', '16px'],
  ['lg', '18px'],
  ['xl', '20px'],
  ['2xl', '24px'],
  ['3xl', '30px'],
  ['4xl', '36px'],
  ['5xl', '48px'],
  ['6xl', '60px'],
  ['7xl', '72px'],
] as const;

export const typographyWeights = [
  ['thin', '100'],
  ['extralight', '200'],
  ['light', '300'],
  ['normal', '400'],
  ['medium', '500'],
  ['semibold', '600'],
  ['bold', '700'],
  ['extrabold', '800'],
  ['black', '900'],
] as const;

export const lineHeights = [
  ['none', '1'],
  ['tight', '1.15'],
  ['snug', '1.25'],
  ['normal', '1.5'],
  ['relaxed', '1.625'],
  ['loose', '2'],
] as const;

export const letterSpacings = [
  ['tighter', '-0.6px'],
  ['tight', '-0.3px'],
  ['normal', '0'],
  ['wide', '0.3px'],
  ['wider', '0.5px'],
] as const;

export const shadowSteps = [
  ['none', '0 0 0 0 / 0'],
  ['xs', '0 1px 1px / 0.05'],
  ['sm', '0 1px 2px / 0.08'],
  ['md', '0 8px 20px -2px / 0.12'],
  ['lg', '0 18px 44px -4px / 0.2'],
  ['xl', '0 28px 64px / 0.22'],
] as const;

export const opacitySteps = [
  ['0', '0'],
  ['4', '0.04'],
  ['5', '0.05'],
  ['8', '0.08'],
  ['10', '0.1'],
  ['12', '0.12'],
  ['20', '0.2'],
  ['24', '0.24'],
  ['30', '0.3'],
  ['38', '0.38'],
  ['40', '0.4'],
  ['50', '0.5'],
  ['60', '0.6'],
  ['70', '0.7'],
  ['80', '0.8'],
  ['90', '0.9'],
  ['100', '1'],
] as const;

export const blurSteps = [
  ['none', '0'],
  ['xs', '2px'],
  ['sm', '4px'],
  ['md', '8px'],
  ['lg', '12px'],
  ['xl', '16px'],
  ['2xl', '24px'],
] as const;

export const durationSteps = [
  ['instant', '0', '48px'],
  ['fast', '120ms', '78px'],
  ['normal', '180ms', '94px'],
  ['slow', '260ms', '114px'],
  ['slower', '360ms', '140px'],
] as const;

export const easingSteps = [
  ['linear', 'cubic-bezier(0, 0, 1, 1)'],
  ['standard', 'cubic-bezier(0.2, 0, 0, 1)'],
  ['enter', 'cubic-bezier(0.16, 1, 0.3, 1)'],
  ['exit', 'cubic-bezier(0.7, 0, 0.84, 0)'],
  ['emphasized', 'cubic-bezier(0.2, 0, 0, 1.2)'],
] as const;

export const zIndexSteps = [
  ['-1', '-1', '1'],
  ['0', '0'],
  ['10', '10'],
  ['100', '100'],
  ['200', '200'],
  ['300', '300'],
  ['400', '400'],
  ['500', '500'],
  ['600', '600'],
  ['700', '700'],
] as const;
