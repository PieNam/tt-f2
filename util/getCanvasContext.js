const MAP = {
  fillStyle: "setFillStyle",
  font: "setFontSize",
  globalAlpha: "setGlobalAlpha",
  lineCap: "setLineCap",
  lineJoin: "setLineJoin",
  lineWidth: "setLineWidth",
  miterLimit: "setMiterLimit",
  shadowOffsetX: "setShadow",
  shadowOffsetY: "setShadow",
  shadowBlur: "setShadow",
  shadowColor: "setShadow",
  strokeStyle: "setStrokeStyle",
  textAlign: "setTextAlign",
  textBaseline: "setTextBaseline",
};

// 提取可配置的 fontSize，支持整数 / 浮点数
const fontSizeReg = /([1-9]*\d?(\.\d{1,2})?)px/;

export default (ctx) => {
  Object.keys(MAP).forEach((key) => {
    Object.defineProperty(ctx, key, {
      set(val) {
        const setter = MAP[key];
        if (!ctx[setter]) {
          return;
        }
        // 对设置 font 的请求，只使用 setFontSize 设置字号
        if (key === "font" && fontSizeReg.test(val)) {
          const match = fontSizeReg.exec(val);
          ctx[setter](match[1]);
          return;
        }
        // 考虑自行添加变量保存 shadow 各字段
        // 每次都调用 setShadow 进行全量设置
        // 这样的粗暴实现其实会导致全局 shadow 相关属性污染，每次都要全部 set 一遍
        if (setter === "setShadow") {
          ctx[`_${key}`] = val;
          ctx[setter](
            ctx._shadowOffsetX || 0,
            ctx._shadowOffsetY || 0,
            ctx._shadowBlur || 0,
            ctx._shadowColor || ""
          );
          return;
        }
        ctx[setter](val);
      },
    });
  });
  return ctx;
};
