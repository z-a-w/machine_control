import express from "express"
import { SystemController } from "../controller/SystemController"

const router = express.Router()
const systemController = new SystemController()

router.post("/create-warehouse", systemController.createWarehouse)
router.get("/get-warehouses", systemController.getWarehouses)
router.post("/create-cbproduction", systemController.createCbProduction)
router.get("/get-cbproductions", systemController.getCbProductions)

export default router