import { Module } from '@nestjs/common'
import { OcrService } from '@/app/ocr/ocr.service'
import { OcrController } from '@/app/ocr/ocr.controller'

@Module({
  controllers: [OcrController],
  providers: [OcrService],
  exports: [OcrService],
})
export class OcrModule {
}
