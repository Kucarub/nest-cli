import { Module } from '@nestjs/common'
import { CommonController } from './common.controller'
import { CommonService } from './common.service'
import { UploadService } from '@/app/upload/upload.service'
import { CacheService } from '@/app/cache/cache.service'

@Module({
  controllers: [CommonController],
  providers: [CommonService, UploadService, CacheService],
  exports: [CommonService],
})
export class CommonModule {
}
