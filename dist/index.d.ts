import ky from "ky";
import * as cheerio from "cheerio";
import * as licia from "licia";
interface IBoxOptions {
}
interface Toast {
    info(message: string): void;
    success(message: string): void;
    error(message: string): void;
}
interface DataItem {
    url: string;
    [key: string]: any;
}
declare class IBox {
    private options;
    readonly ky: typeof ky;
    readonly cheerio: typeof cheerio;
    readonly licia: typeof licia;
    readonly toast: Toast;
    constructor(options?: IBoxOptions);
    loadPage(url: string, options?: any): Promise<cheerio.CheerioAPI>;
    push(items?: DataItem[] | null): void;
    done(items?: DataItem[] | null): void;
}
export default function createIBox(options?: IBoxOptions): IBox;
export {};
