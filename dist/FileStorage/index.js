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
exports.FileStorage = void 0;
const fs = require("fs-extra");
class FileStorage {
    constructor() {
        this.uploadTempDir = "/home/mohmoh/work/machine/machine_control/dist/uploads";
        this.uploadDistDir = "/mnt/uploads";
        this.staticRoute = "http://localhost:3000";
    }
    uploadPhoto(folder, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //move file
                fs.move(`${this.uploadTempDir}/${fileName}`, `${this.uploadDistDir}/photos/${folder}/${fileName}`);
                //success return link
                return `${this.staticRoute}/photos/${folder}/${fileName}`;
            }
            catch (error) {
                // onError return error
                console.log(error);
                throw new Error(error);
            }
        });
    }
    deletePhoto(folder, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let exists = yield fs.exists(`${this.uploadDistDir}/photos/${folder}/${fileName}`);
                if (!exists)
                    return;
                try {
                    yield fs.unlink(`${this.uploadDistDir}/photos/${folder}/${fileName}`);
                    return;
                }
                catch (error) {
                    throw 500;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.FileStorage = FileStorage;
