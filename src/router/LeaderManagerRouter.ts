import express from "express"
import { LeaderManagerController } from "../controller/LeaderManagerController"

const router = express.Router()
const leaderManagerController = new LeaderManagerController()

router.get("/total-leader",leaderManagerController.totalLeader)
router.post("/leader-with-range",leaderManagerController.leaderWithRange)
router.get("/search-leader/:searchText",leaderManagerController.searchLeader)

export default router