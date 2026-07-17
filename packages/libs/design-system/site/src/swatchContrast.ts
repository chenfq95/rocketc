/** Pick black/white ink for readable text on a solid `rgb(...)` / hex background. */
export const contrastOnBackground = (background: string): string => {
  const rgbMatch = background.match(/rgba?\(\s*([\d.]+)\s*[,/\s]\s*([\d.]+)\s*[,/\s]\s*([\d.]+)/i);
  let r = 128;
  let g = 128;
  let b = 128;

  if (rgbMatch) {
    r = Number(rgbMatch[1]);
    g = Number(rgbMatch[2]);
    b = Number(rgbMatch[3]);
  } else {
    const hex = background.trim().replace(/^#/, '');
    if (/^[0-9a-f]{3}$/i.test(hex)) {
      r = Number.parseInt(hex[0] + hex[0], 16);
      g = Number.parseInt(hex[1] + hex[1], 16);
      b = Number.parseInt(hex[2] + hex[2], 16);
    } else if (/^[0-9a-f]{6}$/i.test(hex)) {
      r = Number.parseInt(hex.slice(0, 2), 16);
      g = Number.parseInt(hex.slice(2, 4), 16);
      b = Number.parseInt(hex.slice(4, 6), 16);
    }
  }

  const channel = (value: number) => {
    const srgb = value / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

  return luminance > 0.179 ? 'rgb(8 8 8)' : 'rgb(255 255 255)';
};
