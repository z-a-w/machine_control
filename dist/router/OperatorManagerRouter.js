"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Operator_MangerController_1 = require("../controller/Operator MangerController");
const router = express_1.default.Router();
const operatorManagerController = new Operator_MangerController_1.OperatorManagerController();
router.get("/total-operator", operatorManagerController.totalOperator);
router.post("/operator-with-range", operatorManagerController.operatorWithRange);
router.get("/search-operator/:searchText", operatorManagerController.searchOperator);
exports.default = router;
