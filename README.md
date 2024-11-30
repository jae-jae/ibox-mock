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

// 推送数据
ibox.push([
  {
    url: "https://example.com/item1",
    title: "示例1",
  },
]); // 输出: [IBOX:PUSH] [{"url": "https://example.com/item1", "title": "示例1"}]

// 完成数据处理
ibox.done([
  {
    url: "https://example.com/item1",
    title: "示例1",
    content: "处理完成的内容",
  },
]); // 输出: [IBOX:DONE] [{"url": "https://example.com/item1", "title": "示例1", "content": "处理完成的内容"}]

// 处理空数据
ibox.push(); // 输出: [IBOX:PUSH] []
ibox.done(null); // 输出: [IBOX:DONE] []
```

## API

### IBox()

创建一个新的 IBox 实例。

### ibox.push(items?: Array<{ url: string, [key: string]: any }>)

推送数据项到处理队列。

- `items`: 包含数据项的数组，每个数据项必须包含 `url` 属性，可以包含其他任意属性
- 如果 `items` 为 `undefined` 或 `null`，将输出空数组
- 数组中不包含 `url` 属性的项目会被自动过滤掉

示例：

```javascript
// 正常使用
ibox.push([
  {
    url: "https://example.com/item1",
    title: "示例1",
  },
  {
    url: "https://example.com/item2",
    title: "示例2",
  },
]);
// 输出:
// [IBOX:PUSH] [
//   {
//     "url": "https://example.com/item1",
//     "title": "示例1"
//   },
//   {
//     "url": "https://example.com/item2",
//     "title": "示例2"
//   }
// ]

// 处理空值
ibox.push(); // 输出: [IBOX:PUSH] []
ibox.push(null); // 输出: [IBOX:PUSH] []

// 自动过滤无效项
ibox.push([
  { url: "https://example.com/valid" },
  { title: "无效项" }, // 这一项会被过滤掉
  null, // 这一项会被过滤掉
]);
// 输出:
// [IBOX:PUSH] [
//   {
//     "url": "https://example.com/valid"
//   }
// ]
```

### ibox.done(items?: Array<{ url: string, [key: string]: any }>)

标记数据项为已完成状态。

- `items`: 包含数据项的数组，每个数据项必须包含 `url` 属性，可以包含其他任意属性
- 如果 `items` 为 `undefined` 或 `null`，将输出空数组
- 数组中不包含 `url` 属性的项目会被自动过滤掉

示例：

```javascript
// 正常使用
ibox.done([
  {
    url: "https://example.com/item1",
    title: "示例1",
    content: "处理完成的内容",
  },
]);
// 输出:
// [IBOX:DONE] [
//   {
//     "url": "https://example.com/item1",
//     "title": "示例1",
//     "content": "处理完成的内容"
//   }
// ]

// 处理空值
ibox.done(); // 输出: [IBOX:DONE] []
ibox.done(null); // 输出: [IBOX:DONE] []

// 自动过滤无效项
ibox.done([
  { url: "https://example.com/valid", content: "有效内容" },
  { content: "无效项" }, // 这一项会被过滤掉
  null, // 这一项会被过滤掉
]);
// 输出:
// [IBOX:DONE] [
//   {
//     "url": "https://example.com/valid",
//     "content": "有效内容"
//   }
// ]
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
