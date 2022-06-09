"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StockController_1 = require("../controller/StockController");
const router = express_1.default.Router();
const stockController = new StockController_1.StockController();
router.get("/get-info/:id", stockController.getInfo);
router.put("update-info/:id", stockController.updateInfo);
router.delete("/:id", stockController.deleteInfo);
exports.default = router;
