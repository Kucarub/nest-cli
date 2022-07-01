import { Controller, Post, UploadedFile, UploadedFiles, Delete, Body, Get, Query, ValidationPipe, UseInterceptors, Res } from '@nestjs/common'
import { ApiUseTags, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { UserRole, UserEntity } from '@/entities/user.entity'
import { CommonService } from './common.service'
import { Authorization, UserParam } from '@/decorators/auth.decorator'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { CommonDto } from './common.dto'
import { FileDto, SaveResultDto } from '@/app/upload/upload.dto'
import { Response } from 'express'

@Controller('/common')
@ApiUseTags('通用模块')
export class CommonController {
  constructor(private readonly commonService: CommonService) {
  }

  @Post('/inputExcel')
  @Authorization(UserRole.Member)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOkResponse({ description: '导入成功' })
  @ApiBadRequestResponse({ description: '导入失败' })
  async uploadFiles(@UserParam() user: UserEntity, @UploadedFiles() files: FileDto[]): Promise<CommonDto[]> {
    return await this.commonService.inputExcels(user, files)
  }

  @Get('/outputDoc')
  // @Authorization(UserRole.Member)
  @ApiOkResponse({ description: '导出成功' })
  @ApiBadRequestResponse({ description: '导出失败' })
  async test(@Res() res: Response): Promise<any> {
    const url = await this.commonService.outputDoc()
    res.sendFile(url)
    return
  }
}
