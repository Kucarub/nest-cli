import { Module } from '@nestjs/common'
import { UploadService } from '@/app/upload/upload.service'
import { UploadController } from '@/app/upload/upload.controller'

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {
}
