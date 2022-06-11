import express from "express"
import { StockRecordController } from "../controller/StockRecordController"


const router = express.Router()
const stockRecordController = new StockRecordController()

router.get("/get-info/:id",stockRecordController.getInfo)
router.put("/update-info/:id",stockRecordController.updateInfo)
router.delete("/:id",stockRecordController.delete)

export default router