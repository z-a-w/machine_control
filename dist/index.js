"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_validator_1 = __importDefault(require("express-validator"));
const fileUpload = require("express-fileupload");
const SystemRouter_1 = __importDefault(require("./router/SystemRouter"));
const WarehouseRouter_1 = __importDefault(require("./router/WarehouseRouter"));
const StockRecordRouter_1 = __importDefault(require("./router/StockRecordRouter"));
const StockRouter_1 = __importDefault(require("./router/StockRouter"));
const Authrouter_1 = __importDefault(require("./router/Authrouter"));
class App {
    constructor() {
        this.port = 3000;
        this.configs = [
            {
                name: "Access-Control-Allow-Origin",
                val: "*",
            },
            {
                name: "Access-Control-Allow-Methods",
                val: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            },
            {
                name: "Access-Control-Allow-Headers",
                val: "Origin, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,Content-Type, Date, X-Api-Version, x-access-token",
            },
        ];
        this.setupApplication();
    }
    setupApplication() {
        this.app = (0, express_1.default)();
        // Use third party libries
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, express_validator_1.default)());
        this.app.use(fileUpload({ createParentPath: true }));
        // Use express application configs
        this.app.use((req, res, next) => { this.configs.map((config) => res.set(config.name, config.val)); next(); });
        // Use routes
        this.app.use("/api/system", SystemRouter_1.default);
        this.app.use("/api/warehouse", WarehouseRouter_1.default);
        this.app.use("/api/stock-record", StockRecordRouter_1.default);
        this.app.use("/api/stock", StockRouter_1.default);
        this.app.use("/api/auth/", Authrouter_1.default);
    }
    startServer() {
        this.app.listen(this.port, () => {
            console.log("Server is running on port " + this.port + ". \n ^c to exit.");
        });
    }
}
const expressApp = new App();
expressApp.startServer();
