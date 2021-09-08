import { ForbiddenException, Injectable } from '@nestjs/common'
import { Response } from 'express'
import { config } from '@/config'
import * as path from 'path'
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
import * as Ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs'

@Injectable()
export class VideoService {
  async waterMarkedFile(res: Response): Promise<any> {
    const filePath = path.join(config.APP.STATIC_LOCAL_PATH, config.APP.FILE_SITE_PREFIX, 'video1631071752163.mp4')
    const imgPath = path.join(config.APP.STATIC_LOCAL_PATH, config.APP.FILE_SITE_PREFIX, 'p305782481630653919894.jpg')
    const outPath = path.join(config.APP.STATIC_LOCAL_PATH, config.APP.FILE_SITE_PREFIX, 'out.mp4')
    // await VideoService.textWaterMarked(filePath, outPath)
    const pp = await VideoService.imageWaterMarked(filePath, imgPath, outPath)
    // await VideoService.imageToVideo(imgPath, outPath)
    return res.sendFile(pp)
  }

  private static async textWaterMarked(inputPath: string, outPath: string): Promise<any> {
    try {
      const command = new Ffmpeg({
        source: inputPath,
        nolog: true,
      }).setFfmpegPath(ffmpegPath)
        .videoFilters('drawtext=fontfile=simhei.ttf:text=\'tttttTTT\':x=100:y=10:fontsize=24:fontcolor=yellow:shadowy=2')
        .on('end', () => {
          console.log('file has been converted succesfully')
        }).on('error', (err) => {
          console.log('an error happened: ' + err.message)
        }).saveToFile(outPath)
    } catch (e) {
      throw new Error(e)
    }
  }

  private static async imageToVideo(inputPath: string, outPath: string): Promise<any> {
    const proc = new Ffmpeg({ source: inputPath, nolog: true })
      .setFfmpegPath(ffmpegPath)
      .loop(5)
      .withFps(25)
      .on('end', () => {
        console.log('file has been converted succesfully')
      })
      .on('error', (err) => {
        console.log('an error happened: ' + err.message)
      })
      .saveToFile(outPath)
  }

  private static async imageWaterMarked(inputVideoPath: string, inputImgPath: string, outPath: string): Promise<Promise<any>> {
    try {
      return new Promise<any>((resolve => {
        new Ffmpeg({
          source: inputVideoPath,
          nolog: true,
        }).setFfmpegPath(ffmpegPath)
          .input(inputImgPath)
          .inputOptions('-filter_complex', 'overlay=10:10')
          .on('end', () => {
            console.log('file has been converted succesfully')
            resolve(outPath)
          }).on('error', (err) => {
          console.log('an error happened: ' + err.message)
        }).saveToFile(outPath)
      }))
    } catch (e) {
      throw new Error(e)
    }
  }
}
