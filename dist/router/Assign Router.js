"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AssignController_1 = require("../controller/AssignController");
const router = express_1.default.Router();
const assignController = new AssignController_1.AssignController();
router.get("/get-info/:id", assignController.getInfo);
router.put("/update-info/:id", assignController.updateInfo);
router.delete("/:id", assignController.delete);
router.patch("/done-assign/:id", assignController.doneAssign);
router.patch("/undone-assign/:id", assignController.unDoneAssign);
exports.default = router;
