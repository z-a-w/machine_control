import express from "express"
import { OperatorController } from "../controller/OperatorController"

const router = express.Router()
const operatorController = new OperatorController()

router.get("/get-info/:id",operatorController.getInfo)
router.put("/update-info/:id",operatorController.updateInfo)
router.delete("/:id",operatorController.delete)

export default router