const fs = require("fs-extra");
class FileStorage {
  uploadTempDir: string =
    "/home/zawhtetaung/Workspaces/machine_control/dist/uploads";
  uploadDistDir: string = "/mnt/uploads";
  staticRoute: string = "http://localhost:3000";

  async uploadPhoto(folder: string, fileName: string) {
    try {
      //move file
      fs.move(
        `${this.uploadTempDir}/${fileName}`,
        `${this.uploadDistDir}/photos/${folder}/${fileName}`
      );
      //success return link
      return `${this.staticRoute}/photos/${folder}/${fileName}`;
    } catch (error: any) {
      // onError return error
      console.log(error);
      throw new Error(error);
    }
  }

  async deletePhoto(folder: string, fileName: string) {
    try {
      let exists = await fs.exists(
        `${this.uploadDistDir}/photos/${folder}/${fileName}`
      );
      if (!exists) return ;

      try {
        await fs.unlink(`${this.uploadDistDir}/photos/${folder}/${fileName}`);
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
