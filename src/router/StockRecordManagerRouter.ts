import express  from "express"
import { StockRecordManagerController } from "../controller/StockReocordMangerController"

const router  = express.Router()
const  stockRecordManagerController = new StockRecordManagerController()

router.post("/get-record-with-date/:warehouseId/:itemId",stockRecordManagerController.getRecordWithDateAndRange)

export default router