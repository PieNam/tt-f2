const F2 = require('@antv/f2');
const TTCanvasContext = require('./util/TTCanvasContext').default;

F2.ttChart = ({context, ...config}) => new F2.Chart({context: TTCanvasContext(context), ...config});

export default F2;