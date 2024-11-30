import ky from "ky";
import * as cheerio from "cheerio";
import * as licia from "licia";
class IBox {
    constructor(options = {}) {
        this.options = options;
        this.ky = ky;
        this.cheerio = cheerio;
        this.licia = licia;
        this.toast = {
            info: (message) => {
                console.log(`[INFO] ${message}`);
            },
            success: (message) => {
                console.log(`[SUCCESS] ${message}`);
            },
            error: (message) => {
                console.log(`[ERROR] ${message}`);
            },
        };
    }
    async loadPage(url, options = {}) {
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
    push(items) {
        if (!items || !Array.isArray(items)) {
            console.log("[IBOX:PUSH] []");
            return;
        }
        console.log("[IBOX:PUSH]", JSON.stringify(items, null, 2));
    }
    done(items) {
        if (!items || !Array.isArray(items)) {
            console.log("[IBOX:DONE] []");
            return;
        }
        console.log("[IBOX:DONE]", JSON.stringify(items, null, 2));
    }
}
// 工厂函数
export default function createIBox(options) {
    return new IBox(options);
}
