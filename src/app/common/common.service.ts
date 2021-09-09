import { Injectable, UploadedFiles } from '@nestjs/common'
import { config } from '@/config'
import { plainToClass } from 'class-transformer'
import { FileDto, SaveResultDto } from '@/app/upload/upload.dto'
import { UserEntity } from '@/entities/User.entity'
import * as path from 'path'
import * as fs from 'fs'
import Logger from '@/libs/logger'
import xlsx from 'node-xlsx'
import { UploadService } from '@/app/upload/upload.service'

@Injectable()
export class CommonService {
  private readonly FILE_ALLOW_MIMETYPES = new Set([
    'application/vnd.ms-excel',
  ])

  constructor(private readonly uploadService: UploadService) {
  }

  /**
   * 批量处理文件
   */
  async inputExcels(user: UserEntity, files: FileDto[]): Promise<any> {
    return Promise.all(files.map(file => this.inputExcel(user, file)))
  }

  /**
   * 单个处理
   */
  async inputExcel(user: UserEntity, file: FileDto): Promise<any> {
    if (!this.FILE_ALLOW_MIMETYPES.has(file.mimetype)) {
      throw new TypeError(`${file.mimetype} mimetype is not allowed`)
    }
    const { url } = await this.uploadService.saveFile(user, file)
    const filePath = path.join(config.APP.ROOT_LOCAL_PATH, 'data', url)
    const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(filePath))
    console.log(workSheetsFromBuffer)
  }
}
