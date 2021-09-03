import * as path from 'path'
import * as fs from 'fs'
import * as shell from 'shelljs'
import * as urllib from 'url'

import { Injectable } from '@nestjs/common'
import { config } from '@/config'
import { plainToClass } from 'class-transformer'
import { FileDto, SaveResultDto } from '@/app/upload/upload.dto'
import Logger from '@/libs/logger'
import { UserEntity } from '@/entities/User.entity'

@Injectable()
export class UploadService {
  // 工具允许的压缩包类型
  private readonly KIT_ALLOW_MIMETYPES = new Set([
    'application/zip', // mac/linux .zip
    'application/x-zip-compressed', // windows .zip
    'application/x-tar', // .tar
    'application/x-7z-compressed', // .7z
    'application/x-gzip', // .gz .tgz
  ])

  constructor() {
    this.initDirectory()
  }

  /**
   * 批量处理文件
   */
  async saveFiles(user: UserEntity, files: FileDto[]): Promise<SaveResultDto[]> {
    return Promise.all(files.map(file => this.saveFile(user, file)))
  }

  /**
   * 保存文件
   */
  async saveFile(user: UserEntity, file: FileDto): Promise<SaveResultDto> {
    if (file.size <= 0) {
      throw new Error('文件已损坏')
    }
    const fileName = UploadService.fileRename(file)
    const fileTarget = path.join(config.APP.STATIC_LOCAL_PATH, config.APP.FILE_SITE_PREFIX, fileName)
    fs.writeFileSync(fileTarget, file.buffer)
    const fileUrl = path.join(config.APP.STATIC_LOCAL_PATH, config.APP.FILE_SITE_PREFIX, fileName)
    Logger.append(`uploadFile<uid:${user.id}>:<username:${user.username}><fileName:${fileName}>`)
    return plainToClass(SaveResultDto, {
      result: true,
      url: fileUrl,
    })
  }

  /**
   * 初始化目录，不存在则创建
   */
  private initDirectory() {
    shell.mkdir('-p', path.join(config.APP.STATIC_LOCAL_PATH, config.APP.FILE_SITE_PREFIX))
    shell.mkdir('-p', path.join(config.APP.STATIC_LOCAL_PATH, config.APP.KIT_SITE_PREFIX))
  }

  /**
   * 获取用户归档文件名
   */
  private static fileRename(file: FileDto): string {
    const lastIndex = file.originalname.lastIndexOf('.')
    const tail = lastIndex === -1 ? file.originalname.length : lastIndex
    const origin = file.originalname.slice(0, tail)
    const ext = path.extname(file.originalname)
    return `${origin}${new Date().getTime()}${ext}`
  }
}
