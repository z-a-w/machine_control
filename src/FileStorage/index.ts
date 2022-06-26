import fs = require("fs-extra")
import { Config } from "../Config"
class FileStorage {
    config: any

    constructor() {
        this.config = new Config()
    }

    async uploadFile(folder: string, fileName: string) {
        try {
            fs.move(
                `${this.config.uploadTempDir}/${fileName}`,
                `${this.config.uploadDistDir}/${folder}/${fileName}`
            )

            return `/${folder}/${fileName}`
        } catch (error) {
            throw 500
        }
    }

    async deleteFile(folder: string, fileName: string) {
        let exists = await fs.exists(`${this.config.uploadDistDir}/${folder}/${fileName}`)
        if (!exists) return false

        try {
            await fs.unlink(`${this.config.uploadDistDir}/${folder}/${fileName}`)
            return
        } catch (error) {
            throw 500
        }
    }

}

export {FileStorage}