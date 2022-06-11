"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SystemController_1 = require("../controller/SystemController");
const router = express_1.default.Router();
const systemController = new SystemController_1.SystemController();
router.post("/create-warehouse", systemController.createWarehouse);
router.get("/get-warehouses", systemController.getWarehouses);
router.post("/create-cbproduction", systemController.createCbProduction);
router.get("/get-cbproductions", systemController.getCbProductions);
exports.default = router;
