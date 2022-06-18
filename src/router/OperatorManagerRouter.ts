import express from "express"
import { OperatorManagerController } from "../controller/Operator MangerController"

const router = express.Router()
const operatorManagerController = new OperatorManagerController()

router.get("/total-operator",operatorManagerController.totalOperator)
router.post("/operator-with-range",operatorManagerController.operatorWithRange)
router.get("/search-operator/:searchText",operatorManagerController.searchOperator)

export default router