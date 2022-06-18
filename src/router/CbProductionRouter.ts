import express from "express"
import { CbProductionController } from "../controller/CbProductionController"

const router = express.Router()
const cbProductionController = new CbProductionController()

router.get("/get-info/:id", cbProductionController.getInfo)
router.put("/update-info/", cbProductionController.updateInfo)
router.delete("/:id", cbProductionController.delete)
router.patch("/insert-raw/:id/:rawId", cbProductionController.insertRaw)
router.patch("/remove-raw/:id/:rawId", cbProductionController.removeRaw)
router.put("/get-raw/:id", cbProductionController.changeRaw)

export default router