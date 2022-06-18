import express from "express"
import { AssignController } from "../controller/AssignController"

const router = express.Router()
const assignController = new AssignController()

router.get("/get-info/:id",assignController.getInfo)
router.put("/update-info/:id",assignController.updateInfo)
router.delete("/:id",assignController.delete)
router.patch("/done-assign/:id",assignController.doneAssign)
router.patch("/undone-assign/:id",assignController.unDoneAssign)

export default router