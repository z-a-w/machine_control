"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LeaderController_1 = require("../controller/LeaderController");
const router = express_1.default.Router();
const leaderController = new LeaderController_1.LeaderController();
router.get("/get-info/:id", leaderController.getInfo);
router.put("/update-info/:id", leaderController.updateInfo);
router.delete("/:id", leaderController.delete);
router.post("/assign/:leaderId", leaderController.assign);
exports.default = router;
