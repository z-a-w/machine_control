"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OperatorController_1 = require("../controller/OperatorController");
const router = express_1.default.Router();
const operatorController = new OperatorController_1.OperatorController();
router.get("/get-info/:id", operatorController.getInfo);
router.put("/update-info/:id", operatorController.updateInfo);
router.delete("/:id", operatorController.delete);
exports.default = router;
