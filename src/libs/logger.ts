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
import { config } from '@/config'
import * as path from 'path'

shell.mkdir('-p', path.join(config.APP.STATIC_LOCAL_PATH, config.APP.LOG_SITE_PREFIX))

const LOGGER_FILE = join(config.APP.STATIC_LOCAL_PATH, config.APP.LOG_SITE_PREFIX, '.log')

export default class Logger {
  static append(str: string) {
    appendFileSync(LOGGER_FILE, `[${datetimeFormat(new Date().toISOString())}]: ${str}\n`)
  }
}

export function datetimeFormat(dateStr: string, format = 'YYYY-MM-DD HH:mm:ss', noVal = '未指定时间') {
  return dateStr ? Moment(new Date(dateStr)).format(format) : noVal
}
