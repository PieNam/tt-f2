const TT_CANVAS_CONTEXT_MAP = {
  fillStyle: 'FillStyle',
  fontSize: 'FontSize',
  globalAlpha: 'GlobalAlpha',
  opacity: 'GlobalAlpha',
  lineCap: 'LineCap',
  lineJoin: 'LineJoin',
  lineWidth: 'LineWidth',
  miterLimit: 'MiterLimit',
  strokeStyle: 'StrokeStyle',
  textAlign: 'TextAlign',
  textBaseline: 'TextBaseline',
  shadow: 'Shadow',
  font: 'FontSize',
};

// 头条小程序目前仅支持 setFontSize
// f2 会将所有属性整合为 font 简写，从中提取 fontSize 支持
const fontSizeReg = /(\d*)px/;

export default (ctx) => {
  Object.keys(TT_CANVAS_CONTEXT_MAP).forEach(key => {
    Object.defineProperty(ctx, key, {
      set(val) {
        const name = `set${TT_CANVAS_CONTEXT_MAP[key]}`;
        if (!ctx[name]) {
          return;
        }
        if (key === 'font' && fontSizeReg.test(val)) {
          const match = fontSizeReg.exec(val);
          ctx[name](match[1]);
          return;
        }
        if (key === 'shadow' && Array.isArray(val)) {
          ctx[name](...val);
          return;
        }
        ctx[name](val);
      }
    });
  });
  return ctx;
}