import express from "express"
import { SystemController } from "../controller/SystemController"

const router = express.Router()
const systemController = new SystemController()

router.post("/create-warehouse",systemController.createWarehouse)





export default router