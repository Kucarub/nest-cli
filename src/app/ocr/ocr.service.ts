import * as path from 'path'
import * as fs from 'fs'
import * as shell from 'shelljs'
import * as urllib from 'url'

import { Injectable } from '@nestjs/common'
import { config } from '@/config'
import { plainToClass } from 'class-transformer'
import Logger from '@/libs/logger'
import { UserEntity } from '@/entities/User.entity'

@Injectable()
export class OcrService {
  async test(): Promise<any> {
    return 'success'
  }
}
