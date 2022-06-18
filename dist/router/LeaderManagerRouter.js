"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LeaderManagerController_1 = require("../controller/LeaderManagerController");
const router = express_1.default.Router();
const leaderManagerController = new LeaderManagerController_1.LeaderManagerController();
router.get("/total-leader", leaderManagerController.totalLeader);
router.post("/leader-with-range", leaderManagerController.leaderWithRange);
router.get("search-leader/:searchText", leaderManagerController.searchLeader);
exports.default = router;
