"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/AuthController");
const router = express_1.default.Router();
const authController = new AuthController_1.AuthController();
router.post("/register-operator", authController.registerOperator);
router.post("/login-operator", authController.loginOperator);
router.get("/verify-operator", authController.verifyOperator);
router.post("/register-leader", authController.registerLeader);
router.post("/login-leader", authController.loginLeader);
router.get("/verify-leader", authController.verifyLeader);
exports.default = router;
