"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsedStockManagerController_1 = require("../controller/UsedStockManagerController");
const router = express_1.default.Router();
const usedStockManagerController = new UsedStockManagerController_1.UsedStockManagerController();
router.post("/get-data-with-range/:rawId/:cbproductionId", usedStockManagerController.getDataWithRange);
exports.default = router;
