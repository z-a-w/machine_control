import express from "express"
import { FileController } from "../controller/FileController"
const router = express.Router()
const fileController = new FileController()

router.post("/upload/:folder",fileController.uploadFile)
router.delete("/delete-file/:folder/:fileName",fileController.deletePhoto)

export default router