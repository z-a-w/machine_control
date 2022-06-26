"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
    constructor() {
        this.uploadTempDir = "/root/express-server/dist/uploads";
        this.uploadDistDir = "/mnt/uploads";
        // staticRoute: string = "http://192.168.39.5:3000"
        this.staticRoute = "http://localhost:3000";
    }
}
exports.Config = Config;
