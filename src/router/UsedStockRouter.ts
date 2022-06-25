import express from "express"
import { UsedStockController } from "../controller/UsedStockController"

const router = express.Router()
const usedStockController = new UsedStockController()

router.get("/get-info/:id",usedStockController.getInfo)
router.delete("/:id",usedStockController.delete)