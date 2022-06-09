import express from "express"
import { StockController } from "../controller/StockController"
const router = express.Router()
const  stockController= new StockController()

router.get("/get-info/:id",stockController.getInfo)
router.put("update-info/:id",stockController.updateInfo)
router.delete("/:id",stockController.deleteInfo)
export default router