import { Module } from '@nestjs/common'
import { CommonController } from './common.controller'
import { CommonService } from './common.service'
import { UploadService } from '@/app/upload/upload.service'

@Module({
  controllers: [CommonController],
  providers: [CommonService, UploadService],
  exports: [CommonService],
})
export class CommonModule {
}
