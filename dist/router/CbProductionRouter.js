"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CbProductionController_1 = require("../controller/CbProductionController");
const router = express_1.default.Router();
const cbProductionController = new CbProductionController_1.CbProductionController();
router.get("/get-info/:id", cbProductionController.getInfo);
router.put("/update-info/", cbProductionController.updateInfo);
router.delete("/:id", cbProductionController.delete);
router.patch("/insert-raw/:id/:rawId", cbProductionController.insertRaw);
router.patch("/remove-raw/:id/:rawId", cbProductionController.removeRaw);
router.put("/get-raw/:id", cbProductionController.changeRaw);
exports.default = router;
