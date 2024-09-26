import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { ensureDir, outputFile } from "fs-extra";
import { encryptFileMD5 } from "../utils/cryptogram.util";
import { extname, join } from "path";

@Injectable()
export class UploadService {
  constructor() {}
  /**
   * 上传
   */
  async upload(file: Express.Multer.File) {
    // 判断是否存在此文件夹
    const uploadDir =
      !!process.env.UPLOAD_DIR && process.env.UPLOAD_DIR !== ""
        ? process.env.UPLOAD_DIR
        : join(__dirname, "../../..", "static/upload");

    await ensureDir(uploadDir);
    const currentSign = encryptFileMD5(file.buffer);

    const fileType = extname(file.originalname);

    const fileName = currentSign + fileType;

    const uploadPath = uploadDir + "/" + fileName;
    
    await outputFile(uploadPath, file.buffer);

    return {
      url: "/static/upload/" + fileName,
      path: uploadPath,
    };
  }
}
