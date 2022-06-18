import express from "express"
import { AuthController} from "../controller/AuthController"


const router = express.Router()
const authController = new AuthController()

router.post("/register-operator",authController.registerOperator)
router.post("/login-operator",authController.loginOperator)
router.get("/verify-operator",authController.verifyOperator)
router.post("/register-leader",authController.registerLeader)
router.post("/login-leader",authController.loginLeader)


export default router