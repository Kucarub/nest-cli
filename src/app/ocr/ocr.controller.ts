import { Controller, Post, UploadedFile, UploadedFiles, Delete, Body, Get, Query, ValidationPipe, UseInterceptors } from '@nestjs/common'
import { ApiUseTags, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { UserRole, UserEntity } from '@/entities/user.entity'
import { Authorization, UserParam } from '@/decorators/auth.decorator'
import { OcrService } from '@/app/ocr/ocr.service'

@Controller('/ocr')
@ApiUseTags('上传模块')
export class OcrController {
  constructor(
    private readonly ocrService: OcrService,
  ) {

  }

  @Post('/')
  @Authorization(UserRole.Member)
  @ApiOkResponse({ description: '上传成功' })
  @ApiBadRequestResponse({ description: '上传失败' })
  async test(): Promise<void> {
    return await this.ocrService.test()
  }
}
