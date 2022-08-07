import { Config } from "../Config";

const fs = require("fs-extra");

class FileStorage {
  config: any

  constructor() {
    this.config = new Config()
  }

  staticRoute: string = "http://localhost:3000";

  async uploadPhoto(folder: string, fileName: string) {
    try {
      //move file
      fs.move(
        `${this.config.uploadTempDir}/${fileName}`,
        `${this.config.uploadDistDir}/photos/${folder}/${fileName}`
      );
      //success return link
      return `/photos/${folder}/${fileName}`;
    } catch (error: any) {
      // onError return error
      throw 500
    }
  }

  async deletePhoto(folder: string, fileName: string) {
    try {
      let exists = await fs.exists(
        `${this.config.uploadDistDir}/photos/${folder}/${fileName}`
      );
      if (!exists) return;

      try {
        await fs.unlink(`${this.config.uploadDistDir}/photos/${folder}/${fileName}`);
        return;
      } catch (error) {
        throw 500;
      }
    } catch (error: any) {
      throw error;
    }
  }
}

export { FileStorage };
