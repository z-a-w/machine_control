"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StockReocordMangerController_1 = require("../controller/StockReocordMangerController");
const router = express_1.default.Router();
const stockRecordManagerController = new StockReocordMangerController_1.StockRecordManagerController();
router.post("/get-record-with-date/:warehouseId/:itemId", stockRecordManagerController.getRecordWithDateAndRange);
exports.default = router;
