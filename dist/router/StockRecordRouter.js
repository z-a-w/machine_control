"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StockRecordController_1 = require("../controller/StockRecordController");
const router = express_1.default.Router();
const stockRecordController = new StockRecordController_1.StockRecordController();
router.get("/get-info/:id", stockRecordController.getInfo);
router.put("/update-info/:id", stockRecordController.updateInfo);
router.delete("/:id", stockRecordController.delete);
exports.default = router;
