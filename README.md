# ibox-mock

一个用于模拟 ibox 功能的 npm 包。

## 安装

```bash
npm install ibox-mock
```

## 使用方法

```javascript
import IBox from "ibox-mock";

// 创建实例
const ibox = IBox();

// 使用 toast 显示消息
ibox.toast.info("这是一条通知消息"); // 输出: [INFO] 这是一条通知消息
ibox.toast.success("操作成功"); // 输出: [SUCCESS] 操作成功
ibox.toast.error("发生错误"); // 输出: [ERROR] 发生错误

// 加载页面并获取 cheerio 实例
const $ = await ibox.loadPage("https://example.com");
console.log($("title").text());

// 使用内置的 ky 实例发起 HTTP 请求
const response = await ibox.ky.get("https://api.example.com/data");

// 使用 cheerio 解析 HTML
const html = await response.text();
const $doc = ibox.cheerio.load(html);

// 使用 licia 工具函数
const randomStr = ibox.licia.random();

// 使用默认的 push 实现
ibox.push(
  { url: "https://example.com/item1", title: "示例1" },
  { url: "https://example.com/item2", title: "示例2" }
);
// 输出:
// [IBOX:PUSH] [
//   { "url": "https://example.com/item1", "title": "示例1" },
//   { "url": "https://example.com/item2", "title": "示例2" }
// ]

// 使用自定义的 push 实现
const customIBox = IBox({
  push: (...items) => {
    // 自定义处理逻辑
    items.forEach((item) => {
      console.log(`处理项目：${item.url}`);
    });
  },
});

customIBox.push(
  { url: "https://example.com/item1", title: "示例1" },
  { url: "https://example.com/item2", title: "示例2" }
);
// 输出:
// 处理项目：https://example.com/item1
// 处理项目：https://example.com/item2
```

## API

### IBox(options?: IBoxOptions)

创建一个新的 IBox 实例。

- `options.push`: 可选的自定义 push 处理函数，接收任意数量的数据项作为参数

### ibox.push(...items: Array<{ url: string, [key: string]: any }>)

推送数据项到处理队列。

- `items`: 包含数据项的列表，每个数据项必须包含 `url` 属性，可以包含其他任意属性
- 如果在创建实例时提供了自定义的 `push` 函数，将使用该函数处理数据项
- 否则，将以 JSON 格式输出数据项到控制台

示例：

```javascript
// 使用默认实现
ibox.push(
  { url: "https://example.com/item1", title: "示例1" },
  { url: "https://example.com/item2", title: "示例2" }
);

// 使用自定义实现
const customIBox = IBox({
  push: (...items) => {
    items.forEach((item) => {
      // 自定义处理逻辑
      console.log(`处理项目：${item.url}`);
    });
  },
});

customIBox.push(
  { url: "https://example.com/item1", title: "示例1" },
  { url: "https://example.com/item2", title: "示例2" }
);
```

### ibox.toast

提供消息提示功能的对象，包含以下方法：

- `ibox.toast.info(message: string)`: 显示信息提示
- `ibox.toast.success(message: string)`: 显示成功提示
- `ibox.toast.error(message: string)`: 显示错误提示

示例：

```javascript
ibox.toast.info("这是一条通知消息"); // 输出: [INFO] 这是一条通知消息
ibox.toast.success("操作成功"); // 输出: [SUCCESS] 操作成功
ibox.toast.error("发生错误"); // 输出: [ERROR] 发生错误
```

### ibox.loadPage(url: string, options?: object)

加载指定 URL 的页面，并返回一个 cheerio 实例。

- `url`: 要加载的页面 URL
- `options`: 可选的 HTTP 请求选项，与 ky 的选项相同
- 返回: Promise<cheerio.CheerioAPI>

示例：

```javascript
const $ = await ibox.loadPage("https://example.com");
console.log($("title").text());
```

### ibox.ky

访问内置的 `ky` HTTP 客户端实例。你可以使用它来发起 HTTP 请求，例如：

- `ibox.ky.get(url)`
- `ibox.ky.post(url, options)`
- `ibox.ky.put(url, options)`
- 更多用法请参考 [ky 文档](https://github.com/sindresorhus/ky)

### ibox.cheerio

访问内置的 `cheerio` 实例，用于解析和操作 HTML。使用方法类似于 jQuery：

- `ibox.cheerio.load(html)` - 加载 HTML 字符串
- 更多用法请参考 [cheerio 文档](https://github.com/cheeriojs/cheerio)

### ibox.licia

访问内置的 `licia` 工具库，提供了大量实用的 JavaScript 工具函数：

- 字符串处理
- 数组操作
- 日期处理
- 更多用法请参考 [licia 文档](https://github.com/liriliri/licia)

## License

ISC
