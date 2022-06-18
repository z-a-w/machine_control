import express from "express"
import { UsedStockManagerController } from "../controller/UsedStockManagerController"

const router = express.Router()
const usedStockManagerController = new UsedStockManagerController()

router.post("/get-data-with-range/:rawId/:cbproductionId", usedStockManagerController.getDataWithRange)

export default router