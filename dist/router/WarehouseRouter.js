"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WarehouseController_1 = require("../controller/WarehouseController");
const router = express_1.default.Router();
const warehouseController = new WarehouseController_1.WareHouseController();
router.get("/get-info/:id", warehouseController.getInfo);
router.put("/update-info/:id", warehouseController.updateInfo);
router.delete("/:id", warehouseController.delete);
router.post("/create-new-stock/:id", warehouseController.createNewStock);
router.get("/get-stock/:id", warehouseController.getStock);
router.put("/stock-in/:warehouseId/:stockId", warehouseController.stockIn);
router.put("/stock-out/:id", warehouseController.stockOut);
exports.default = router;
