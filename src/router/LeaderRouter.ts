import express from "express"
import { LeaderController } from "../controller/LeaderController"

const router = express.Router()
const leaderController = new LeaderController()

router.get("/get-info/:id",leaderController.getInfo)
router.put("/update-info/:id",leaderController.updateInfo)
router.delete("/:id",leaderController.delete)
router.post("/assign/:leaderId",leaderController.assign)

export default router