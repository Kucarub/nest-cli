import { Body, Controller, Get, Res, Req, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { VideoService } from './video.service'
import { AuthService } from '@/app/auth/auth.service'
import { UserEntity, UserRole } from '@/entities/User.entity'
import { Authorization, UserParam } from '@/decorators/auth.decorator'
import { Response } from 'express'

@Controller('/video')
@ApiUseTags('视频模块')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
  ) {
  }

  @Get('/download')
  @ApiOkResponse({ description: '下载' })
  async queryArticleList(@Res() res: Response): Promise<any> {
    return await this.videoService.waterMarkedFile(res)
  }
}
