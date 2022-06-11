import express from "express"
import { AuthController} from "../controller/AuthController"


const router = express.Router()
const authController = new AuthController()

router.post("/register-operator",authController.registerOperator)
router.post("/login-operator",authController.loginOperator)
router.get("/verify-operator",authController.verifyOperator)

export default router