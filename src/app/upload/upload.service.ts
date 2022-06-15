import * as path from 'path'
import * as fs from 'fs'
import * as shell from 'shelljs'
import * as urllib from 'url'

import { Injectable } from '@nestjs/common'
import { config } from '@/config'
import { plainToClass } from 'class-transformer'
import { BigFileDto, FileDto, SaveResultDto } from '@/app/upload/upload.dto'
import Logger from '@/libs/logger'
import { UserEntity } from '@/entities/User.entity'
import { WriteStream } from 'fs'

@Injectable()
export class UploadService {
  constructor() {
    UploadService.initDirectory()
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
    const fileUrl = path.join(config.APP.STATIC_SITE_PREFIX, config.APP.FILE_SITE_PREFIX, fileName)
    Logger.append(`uploadFile<uid:${user.id}>:<username:${user.username}><fileName:${fileName}><fileUrl:${fileUrl}>`)
    return plainToClass(SaveResultDto, {
      result: true,
      url: fileUrl,
    })
  }

  /**
   * 保存大文件
   */
  async saveBigFile(file: FileDto, dto: BigFileDto): Promise<SaveResultDto> {
    if (file.size <= 0) {
      throw new Error('文件已损坏')
    }
    console.log(file)
    const { fileName, fileHash, fileIndex } = dto
    if (!fs.existsSync(path.join(config.APP.STATIC_LOCAL_PATH, config.APP.FILE_SITE_PREFIX, fileHash))) {
      fs.mkdirSync(path.join(config.APP.STATIC_LOCAL_PATH, config.APP.FILE_SITE_PREFIX, fileHash))
    }
    const fileTarget = path.join(config.APP.STATIC_LOCAL_PATH, config.APP.FILE_SITE_PREFIX, fileHash, fileName)
    fs.writeFileSync(fileTarget, file.buffer)
    const fileUrl = path.join(config.APP.STATIC_SITE_PREFIX, config.APP.FILE_SITE_PREFIX, fileHash, fileName)
    Logger.append(`saveBigFile<fileName:${fileName}><fileUrl:${fileUrl}>`)
    return plainToClass(SaveResultDto, {
      result: true,
      url: 'fileUrl',
    })
  }

  /**
   * 合并切片
   */
  async mergeFileChunk(fileHash: string, chunkSize: number): Promise<void> {
    const chunkDir = path.join(config.APP.STATIC_LOCAL_PATH, config.APP.FILE_SITE_PREFIX, fileHash)
    const chunkPaths = fs.readdirSync(chunkDir)
    if (!chunkPaths.length) {
      return
    }
    await Promise.all(chunkPaths.map((chunkPath, index) => {
      UploadService.pipeStream(
        path.resolve(chunkDir, chunkPath),
        fs.createWriteStream(path.join(chunkDir, fileHash + chunkPaths[0]), {
          start: index * chunkSize,
        }),
      )
    }))
    return
  }

  private static pipeStream(p: string, writeStream: WriteStream): Promise<Promise<null>> {
    return new Promise(resolve => {
      const readStream = fs.createReadStream(p)
      readStream.pipe(writeStream)
      readStream.on('end', () => {
        fs.unlinkSync(p)
        resolve(null)
      })
    })
  }

  /**
   * 初始化目录，不存在则创建
   */
  private static initDirectory() {
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
