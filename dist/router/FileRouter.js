"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FileController_1 = require("../controller/FileController");
const router = express_1.default.Router();
const fileController = new FileController_1.FileController();
router.post("/upload/:folder", fileController.uploadFile);
router.delete("/delete-file/:folder/:fileName", fileController.deletePhoto);
exports.default = router;
