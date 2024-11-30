import ky from "ky";
import * as cheerio from "cheerio";
import * as licia from "licia";

interface IBoxOptions {}

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
    return new Promise((resolve, reject) => {
      console.log("load url: " + url);
      ky.get(url, options)
        .text()
        .then((html) => {
          const $ = cheerio.load(html);
          resolve($);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  push(items?: DataItem[] | null): void {
    if (!items || !Array.isArray(items)) {
      console.log("[IBOX:PUSH] []");
      return;
    }

    console.log("[IBOX:PUSH]", JSON.stringify(items, null, 2));
  }

  done(items?: DataItem[] | null): void {
    if (!items || !Array.isArray(items)) {
      console.log("[IBOX:DONE] []");
      return;
    }

    console.log("[IBOX:DONE]", JSON.stringify(items, null, 2));
  }
}

// 工厂函数
export default function createIBox(options?: IBoxOptions): IBox {
  return new IBox(options);
}
