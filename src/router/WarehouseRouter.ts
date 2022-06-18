import express from "express"
import { WareHouseController } from "../controller/WarehouseController"

const router = express.Router()
const warehouseController = new WareHouseController()

router.get("/get-info/:id",warehouseController.getInfo)
router.put("/update-info/:id",warehouseController.updateInfo)
router.delete("/:id",warehouseController.delete)
router.post("/create-new-stock/:id",warehouseController.createNewStock)
router.get("/get-stock/:id",warehouseController.getStock)
router.put("/stock-in/:warehouseId/:stockId",warehouseController.stockIn)
router.put("/stock-out/:warehouseId/:stockId",warehouseController.stockOut)

export default router