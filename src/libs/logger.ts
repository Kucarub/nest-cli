/*
 * @Author: Cphayim
 * @Date: 2020-08-21 17:05:01
 * @LastEditTime: 2020-08-21 17:20:31
 * @Description: 日志存储
 */
import { join } from 'path'
import { appendFileSync } from 'fs'
import * as shell from 'shelljs'
import * as Moment from 'moment'

import { logger } from '@/config'

shell.mkdir('-p', logger.STATIC_LOCAL_PATH)

const LOGGER_FILE = join(logger.STATIC_LOCAL_PATH, '.log')

export default class Logger {
  static append(str: string) {
    appendFileSync(LOGGER_FILE, `[${datetimeFormat(new Date().toISOString())}]: ${str}\n`)
  }
}

export function datetimeFormat(dateStr: string, format = 'YYYY-MM-DD HH:mm:ss', noVal = '未指定时间') {
  return dateStr ? Moment(new Date(dateStr)).format(format) : noVal
}
