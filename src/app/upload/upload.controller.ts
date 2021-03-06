import { Controller, Post, UploadedFile, UploadedFiles, Delete, Body, Get, Query, ValidationPipe, UseInterceptors } from '@nestjs/common'
import { ApiUseTags, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { UserRole, UserEntity } from '@/entities/user.entity'
import { UploadService } from './upload.service'
import { Authorization, UserParam } from '@/decorators/auth.decorator'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { FileDto, SaveResultDto, BigFileDto, BigFileExistDto } from '@/app/upload/upload.dto'

@Controller('/upload')
@ApiUseTags('上传模块')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {
  }

  @Post('/')
  @Authorization(UserRole.Member)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOkResponse({ description: '上传成功' })
  @ApiBadRequestResponse({ description: '上传失败' })
  async uploadFiles(@UserParam() user: UserEntity, @UploadedFiles() files: FileDto[]): Promise<SaveResultDto[]> {
    return await this.uploadService.saveFiles(user, files)
  }

  @Post('/uploadBigFile')
  // @Authorization(UserRole.Member)
  @UseInterceptors(FilesInterceptor('file'))
  @ApiOkResponse({ description: '上传成功' })
  @ApiBadRequestResponse({ description: '上传失败' })
  async uploadBigFile(@UploadedFiles() file: FileDto, @Body() dto: BigFileDto): Promise<SaveResultDto> {
    return await this.uploadService.saveBigFile(file[0], dto)
  }

  @Post('/mergeChunks')
  // @Authorization(UserRole.Member)
  @ApiOkResponse({ description: '操作成功' })
  @ApiBadRequestResponse({ description: '操作失败' })
  async mergeChunks(@Body() body: BigFileExistDto): Promise<void> {
    return await this.uploadService.mergeFileChunk(body.fileHash, body.chunkSize)
  }
}
