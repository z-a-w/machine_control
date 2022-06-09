import express from "express"
import { WareHouseController } from "../controller/WarehouseController"

const router = express.Router()
const warehouseController = new WareHouseController()

router.post("/create-new-stock/:id",warehouseController.createNewStock)
router.get("/get-stock/:id",warehouseController.getStock)
router.put("/stock-in/:id",warehouseController.stockIn)
router.put("/stock-out/:id",warehouseController.stockOut)

export default router