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
  font: 'Font',
};

export default (ctx) => {
  Object.keys(TT_CANVAS_CONTEXT_MAP).map(key => {
    Object.defineProperty(ctx, key, {
      set(val) {
        const name = `set${TT_CANVAS_CONTEXT_MAP[key]}`;
        if (!ctx[name]) {
          return;
        }
        if (key === 'shadow' && Array.isArray(val)) {
          ctx[name](...val);
          return;
        }
        ctx[name](val);
      }
    });
    return key;
  });
  return ctx;
}