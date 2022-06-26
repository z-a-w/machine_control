import { FileStorage } from "../FileStorage"
import { Config } from "../Config"

class FileController {

    async uploadFile(req: any, res: any) {
        req.checkParams("folder", "Folder name should not be empty").notEmpty()
        let validationErrors = req.validationErrors();
        if (validationErrors) return res.status(400).json(validationErrors)

        let config = new Config()
        let file = req.files.file
        let fileName = new Date().getTime() + file.name
        file.mv(`${config.uploadTempDir}/${fileName}`)

        try {
            let fileStorage = new FileStorage()
            let url = await fileStorage.uploadPhoto(req.params.folder, fileName)
            res.status(200).json(url)
        } catch (error) {
            res.status(error).json({msg: "Unable to upload file"})
        }
    }

    async deletePhoto(req:any, res:any) {
        req.checkParams("folder", "Folder name should not be empty").notEmpty()
        req.checkParams("fileName", "fileName should not be empty").notEmpty()
        let validationErrors = req.validationErrors();
        if (validationErrors) return res.status(400).json(validationErrors)

        try {
            let fileStorage = new FileStorage()
            await fileStorage.deletePhoto(req.params.folder, req.params.fileName)
            res.status(200).json({msg: "File deleted !"})
        } catch (error) {
            res.status(error).json({msg: "Unable to delete file"})
        }
    }

}

export { FileController }