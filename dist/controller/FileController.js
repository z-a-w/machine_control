"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const FileStorage_1 = require("../FileStorage");
const Config_1 = require("../Config");
class FileController {
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("folder", "Folder name should not be empty").notEmpty();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            let config = new Config_1.Config();
            let file = req.files.file;
            let fileName = new Date().getTime() + file.name;
            file.mv(`${config.uploadTempDir}/${fileName}`);
            try {
                let fileStorage = new FileStorage_1.FileStorage();
                let url = yield fileStorage.uploadPhoto(req.params.folder, fileName);
                res.status(200).json(url);
            }
            catch (error) {
                res.status(error).json({ msg: "Unable to upload file" });
            }
        });
    }
    deletePhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("folder", "Folder name should not be empty").notEmpty();
            req.checkParams("fileName", "fileName should not be empty").notEmpty();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            try {
                let fileStorage = new FileStorage_1.FileStorage();
                yield fileStorage.deletePhoto(req.params.folder, req.params.fileName);
                res.status(200).json({ msg: "File deleted !" });
            }
            catch (error) {
                res.status(error).json({ msg: "Unable to delete file" });
            }
        });
    }
}
exports.FileController = FileController;
