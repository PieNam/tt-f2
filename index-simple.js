const F2 = require('@antv/f2/lib/index-simple');
const getCanvasContext = require('./util/getCanvasContext').default;

class ttChart extends F2.Chart {
  constructor({context, ...args}) {
    const ttContext =  getCanvasContext(context);
    super({context: ttContext, ...args});
  }
}

F2.Chart = ttChart;

export default F2;