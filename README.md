# tt-f2 —— @antv/f2 的字节跳动/头条/飞书小程序适配版

当前支持除 `chart.guide().html()` 之外的 f2 功能。

## 说明

目前仅对字节跳动/头条/飞书小程序（后简称 tt/头条 小程序）直接引入 f2 时无法直接适配的部分做了修改，没有封装组件。除了因为小程序运行环境问题，不支持在图表中插入自定义 HTML 元素功能外，其他功能可以按照 [f2 官方文档及 DEMO](https://antv-f2.gitee.io/zh) 使用，只有初步接入传入 Canvas Context 时不同。

## 用法

### 安装依赖

```
npm install tt-f2 --save
or
yarn add tt-f2
```

### 引入规则

头条小程序对 f2 的不适配之处主要是其实现的 Canvas 上下文环境、API 不同。`tt-f2` 中做了适配，每次初始化时需要获取创建好的 Canvas 元素上下文，并传入包中完成初始化，后续的 chart 图形语法就与原版无异了。

#### 简单示例

```
// 从适配包 tt-f2 引入 F2，与官方版本对应，tt-f2 提供了三个版本的 F2，分别是：

import F2 from 'tt-f2/index';
import F2 from 'tt-f2/index-simple';
import F2 from 'tt-f2/index-all';
// all 版本支持所有功能，不必额外注册插件

// 如页面上创建的 canvas 元素为：
<canvas canvas-id="f2-canvas" class="f2"></canvas>

// 绘图逻辑中首先要拿到头条小程序中该 canvas 的元素本身，在这里可以获取元素元信息加入配置
const canvasNode = tt.createSelectorQuery().select('.f2');

canvasNode
  .fields({
    rect: true
  })
  .exec((res) => {
    const {width, height} = res[0];

    // 使用头条小程序 api 获取当前 Canvas 上下文
    const context = tt.createCanvasContext('f2-canvas');
    // 获取像素比，配置图表适配清晰度
    const {pixelRatio} = tt.getSystemInfoSync();

    const chart = F2.ttChart({
      context,
      width,
      height,
      pixelRatio,
    });
    // 至此图表已经创建完成，直接使用 F2 的图形语法画出好看的交互式图表吧！

    ......

    // demo 源[官方演示](https://antv-f2.gitee.io/zh/examples/column/basic#gradient)
    const data = [{
      year: '1996 年',
      sales: 531
    }, {
      year: '1997 年',
      sales: 852
    }, {
      year: '1998 年',
      sales: 1023
    }, {
      year: '1999 年',
      sales: 1515
    }, {
      year: '2000 年',
      sales: 1988
    }];

    chart.source(data, {
      sales: {
        tickCount: 5
      }
    });
    chart.tooltip({
      showItemMarker: false,
      onShow: function onShow(ev) {
        const items = ev.items;
        items[0].name = null;
        items[0].name = items[0].title;
        items[0].value = '¥ ' + items[0].value;
      }
    });

    chart.interval()
      .position('year*sales')
      .color('l(90) 0:#1890ff 1:#70cdd0');

    chart.render();
  });
```

### one more thing...

至此我们已经能用 f2 在头条小程序上实现丰富的图表效果，还有一件事情目前没能在封装包中完成适配，即说好的“交互式”。这是由于小程序中的 Canvas 响应事件差异，我们在开发时给 Canvas 元素绑定 2/3 个（取决于想要的交互效果，详见 [F2 官方 Tooltip 文档](https://antv-f2.gitee.io/zh/docs/api/chart/tooltip) 中 `trigger` 相关部分）。

用头条小程序组件的 bind 方法为 Canvas 元素绑定事件：

```
chartRef 是需要维护的 chart 实例
const touchStart = (e) => {
  chartRef.get('el').dispatchEvent('touchstart', e);
};

const touchMove = (e) => {
  chartRef.get('el').dispatchEvent('touchmove', e);
};

const touchEnd = (e) => {
  chartRef.get('el').dispatchEvent('touchend', e);
};

<canvas
  canvas-id="f2-canvas"
  class="f2"
  bindtouchstart="touchStart"
  bindtouchmove="touchMove"
  bindtouchend="touchEnd"
/>
```

以此使小程序页面中的 Canvas 元素正常响应点击事件，实现图表交互，常见的就有 Tooltip 点击显示详细数据展开信息等。

### 上面的 demo 最终长这样

![tt-f2 interval demo](https://p1-g.byteimg.com/tos-cn-i-8vc7tlzf3c/dc953c1acaa24aaf9a5c6cd13683e663~tplv-8vc7tlzf3c-raw.png)

## TODO

- [x] 头条 Canvas Context 适配
- [x] RGB HEX 缩写替换  
- [ ] DEMO 小程序展示功能
- [ ] 仓库规范
- [x] ... 欢迎一起交流学习！