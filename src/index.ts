import ky from "ky";
import * as cheerio from "cheerio";
import * as licia from "licia";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

interface IBoxOptions {
  push?: (...items: DataItem[]) => void;
}

interface Toast {
  info(message: string): void;
  success(message: string): void;
  error(message: string): void;
}

interface DataItem {
  url: string;
  [key: string]: any; // 允许其他任意属性
}

class IBox {
  private options: IBoxOptions;
  public readonly ky: typeof ky;
  public readonly cheerio: typeof cheerio;
  public readonly licia: typeof licia;
  public readonly toast: Toast;

  constructor(options: IBoxOptions = {}) {
    this.options = options;
    this.ky = ky;
    this.cheerio = cheerio;
    this.licia = licia;
    this.toast = {
      info: (message: string) => {
        console.log(`[INFO] ${message}`);
      },
      success: (message: string) => {
        console.log(`[SUCCESS] ${message}`);
      },
      error: (message: string) => {
        console.log(`[ERROR] ${message}`);
      },
    };
  }

  async loadPage(url: string, options: any = {}): Promise<cheerio.CheerioAPI> {
    console.log("load url: " + url);
    const html = await ky
      .get(url, {
        https: {
          rejectUnauthorized: false,
        },
        ...options,
      })
      .text();
    return cheerio.load(html);
  }

  push(...items: DataItem[]): void {
    // 如果用户提供了自定义的 push 处理函数，则使用它
    if (this.options.push) {
      this.options.push(...items);
      return;
    }

    // 默认行为
    console.log("[IBOX:PUSH]", JSON.stringify(items, null, 2));
  }
}

// 工厂函数
export default function createIBox(options?: IBoxOptions): IBox {
  return new IBox(options);
}
