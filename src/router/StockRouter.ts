import express from "express"
import { StockController } from "../controller/StockController"
const router = express.Router()
const stockController = new StockController()

router.get("/get-info/:id", stockController.getInfo)
router.put("/update-info/:id", stockController.updateInfo)
router.delete("/:id", stockController.delete)
router.get("/get-data-with-month/:month/:year/:id", stockController.getDataWithMonth)
export default router