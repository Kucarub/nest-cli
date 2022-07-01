import { Injectable } from '@nestjs/common'
import { config } from '@/config'
import { FileDto } from '@/app/upload/upload.dto'
import { UserEntity } from '@/entities/User.entity'
import * as path from 'path'
import * as fs from 'fs'
import xlsx from 'node-xlsx'
import { UploadService } from '@/app/upload/upload.service'
import { CacheService } from '@/app/cache/cache.service'
import * as officegen from 'officegen'

@Injectable()
export class CommonService {
  private readonly FILE_ALLOW_MIMETYPES = new Set([
    'application/vnd.ms-excel',
  ])

  constructor(
    private readonly uploadService: UploadService,
    private readonly cacheService: CacheService,
  ) {
  }

  /**
   * 批量处理文件
   */
  async inputExcels(user: UserEntity, files: FileDto[]): Promise<any> {
    return Promise.all(files.map(file => this.inputExcel(user, file)))
  }

  /**
   * 单个处理
   */
  async inputExcel(user: UserEntity, file: FileDto): Promise<any> {
    if (!this.FILE_ALLOW_MIMETYPES.has(file.mimetype)) {
      throw new TypeError(`${file.mimetype} mimetype is not allowed`)
    }
    const { url } = await this.uploadService.saveFile(user, file)
    const filePath = path.join(config.APP.ROOT_LOCAL_PATH, 'data', url)
    const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(filePath))
    console.log(workSheetsFromBuffer)
  }

  async outputDoc(): Promise<any> {
    const docx = officegen('docx')
    docx.on('finalize', (written) => {
      console.log(
        'Finish to create a Microsoft Word document.',
      )
    })
    const pObj = docx.createP()
    pObj.addText('Simple')
    pObj.addText(' with color', { color: '000088' })
    pObj.addText(' and back color.', { color: '00ffff', back: '000088' })
    const fileTarget = path.join(config.APP.STATIC_LOCAL_PATH, config.APP.FILE_SITE_PREFIX)
    const out = fs.createWriteStream(path.join(fileTarget, 'example.docx'))
    docx.generate(out)
    out.on('error', (err) => {
      console.log(err)
    })
    return path.join(fileTarget, 'example.docx')
  }

  async test(): Promise<any> {
    // await this.cacheService.set('test', '1')
    // return await this.cacheService.get('test')
    // return 'success'
  }

  /**
   * 获取文件后缀名
   * @param {String} filename
   */
  async getExt(filename: string): Promise<string> {
    return filename
      .split('.')
      .pop()
      .toLowerCase()
  }

  /**
   * 复制内容到剪贴板
   * @param {any} value
   */
  async copyToBoard(value: any) {
    const element = document.createElement('textarea')
    document.body.appendChild(element)
    element.value = value
    element.select()
    if (document.execCommand('copy')) {
      document.execCommand('copy')
      document.body.removeChild(element)
      return true
    }
    document.body.removeChild(element)
    return false
  }

  /**
   * 复制内容到剪贴板
   * @param {any} text
   */
  copyToClipboard(text) {
    navigator.clipboard.writeText(text)
  }

  /**
   * 休眠xxx ms
   * @param {Number} milliseconds
   */
  sleep(milliseconds: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  /**
   * 通过二进制数据下载文件
   * @param {Blob} data
   * @param {string} fileName
   */
  downloadFile(data, fileName) {
    if (!data) {
      return
    }
    const blob = new Blob([data])
    if ('download' in document.createElement('a')) {
      // 不是IE浏览器
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      link.click()
      window.URL.revokeObjectURL(url) // 释放掉blob对象
    } else {
      // IE 10+
      window.navigator.msSaveBlob(blob, fileName)
    }
  }

  /**
   * blob 转为json，处理服务器返回的错误信息
   * 用于下载文件等返回二进制数据接口错误时使用
   * @param blob 数据
   */
  blobToText(blob) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsText(blob)
      fileReader.onload = function() {
        try {
          let result
          if (typeof this.result === 'string') {
            result = JSON.parse(this.result)
          } else {
            reject(new Error())
          }
          if (result && result.code !== 0) {
            resolve(result)
          } else {
            reject(new Error())
          }
        } catch (e) {
          reject(new Error())
        }
      }
    })
  }

  /**
   * 求两天之间的天数
   * @param { date } date1
   * @param { date } date2
   */
  dayDif(date1, date2) {
    Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)
  }

  /**
   * B转换到KB,MB,GB并保留两位小数
   * @param { number } fileSize
   */
  formatFileSize(fileSize: number): string {
    let temp
    if (fileSize < 1024) {
      return fileSize + 'B'
    } else if (fileSize < (1024 * 1024)) {
      temp = fileSize / 1024
      temp = temp.toFixed(2)
      return temp + 'KB'
    } else if (fileSize < (1024 * 1024 * 1024)) {
      temp = fileSize / (1024 * 1024)
      temp = temp.toFixed(2)
      return temp + 'MB'
    } else {
      temp = fileSize / (1024 * 1024 * 1024)
      temp = temp.toFixed(2)
      return temp + 'GB'
    }
  }

  /**
   * 根据pid生成树形结构
   *  @param { object } items 后台获取的数据
   *  @param { * } id 数据中的id
   *  @param { * } link 生成树形结构的依据
   */
  createTree = (items, id = null, link: string = 'pid') => {
    items.filter(item => item[link] === id).map(item => ({ ...item, children: this.createTree(items, item.id) }))
  }

  /**
   * 根据关键词排序
   *  @param { object } items 后台获取的数据
   *  @param { string } key 排序依据词
   *  @param { 'asc' | 'desc' } sort 排序方式
   */
  sortByKey(items, key: string, sort: 'asc' | 'desc') {
    if (sort === 'asc') {
      items[key].sort((a, b) => a - b)
    } else {
      items[key].sort((a, b) => b - a)
    }
  }

  /**
   * 查询数组中是否存在某个元素并返回元素第一次出现的下标
   * @param { * } item
   * @param { array } data
   */
  inArray(data: Array<string | number>, item: string | number): number[] | number {
    const arr = []
    for (let i = 0; i < data.length; i++) {
      if (item === data[i]) {
        arr.push(i)
      }
    }
    return arr.length > 0 ? arr : -1
  }

  /**
   *  Windows根据详细版本号判断当前系统名称
   * @param { string } osVersion
   */
  OutOsName(osVersion: string) {
    if (!osVersion) {
      return
    }
    const str = osVersion.substr(0, 3)
    if (str === '5.0') {
      return 'Win 2000'
    } else if (str === '5.1') {
      return 'Win XP'
    } else if (str === '5.2') {
      return 'Win XP64'
    } else if (str === '6.0') {
      return 'Win Vista'
    } else if (str === '6.1') {
      return 'Win 7'
    } else if (str === '6.2') {
      return 'Win 8'
    } else if (str === '6.3') {
      return 'Win 8.1'
    } else if (str === '10.') {
      return 'Win 10'
    } else {
      return 'Win'
    }
  }

  /**
   * 判断手机是Android还是IOS
   *  0: ios
   *  1: android
   *  2: 其它
   */
  getOSType() {
    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isIOS) {
      return 0
    }
    if (isAndroid) {
      return 1
    }
    return 2
  }

  /**
   * @Author: clark
   * @Description:
   * @param {string | number} target
   * @param {string[][]} dyadicArr
   * @LastEditTime:2021-12-30 13:58:42
   */
  findKeyByVal(target: string | number, dyadicArr: string[][]): string | number {
    for (const [key, val] of dyadicArr) {
      if (val === target) {
        return key
      }
    }
  }

  /**
   * @Author: clark
   * @Description:
   * @param {string | number} target
   * @param {string[][]} dyadicArr
   * @LastEditTime:2021-12-30 13:58:42
   */
  findValByKey(target: string | number, dyadicArr: string[][]): string | number {
    for (const [key, val] of dyadicArr) {
      if (key === target) {
        return val
      }
    }
  }

  /**
   * 数组交集
   * @param { array} arr1
   * @param { array } arr2
   */
  similarity = (arr1, arr2) => arr1.filter(v => arr2.includes(v))

  /**
   * 加法函数（精度丢失问题）
   * @param { number } arg1
   * @param { number } arg2
   */
  add(arg1, arg2) {
    // tslint:disable-next-line:one-variable-per-declaration
    let r1, r2, m
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  }

  /**
   * 去除空格
   * @param { string } str 待处理字符串
   * @param  { number } type 去除空格类型 1-所有空格  2-前后空格  3-前空格 4-后空格 默认为1
   */
  trim(str, type: number = 1) {
    switch (type) {
      case 1:
        return str.replace(/\s/g, '')
      case 2:
        return str.replace(/(^\s)|(\s*$)/g, '')
      case 3:
        return str.replace(/(^\s)/g, '')
      case 4:
        return str.replace(/(\s$)/g, '')
      default:
        return str
    }
  }

  /**
   * 随机16进制颜色 randomHexColorCode
   */
  randomHexColorCode(): string {
    const n = (Math.random() * 0xfffff * 1000000).toString(16)
    return '#' + n.slice(0, 6)
  }

  /**
   * 转义html(防XSS攻击)
   */
  escapeHTML(str) {
    str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '\'': '&#39;',
        '"': '&quot;',
      }[tag] || tag),
    )
  }

  /**
   * 检测移动/PC设备
   */
  detectDeviceType() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
  }

  /**
   * 返回指定元素的生效样式
   * @param { node } el  元素节点
   * @param { string } ruleName  指定元素的名称
   */
  getStyle = (el, ruleName) => getComputedStyle(el)[ruleName]

  /**
   * 将阿拉伯数字翻译成中文的大写数字
   * @param { number } num
   */
  numberToChinese(num: number): string {
    const AA = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
    const BB = ['', '十', '百', '仟', '萬', '億', '点', '']
    const a = ('' + num).replace(/(^0*)/g, '').split('.')
    let k = 0
    let re = ''
    for (let i = a[0].length - 1; i >= 0; i--) {
      switch (k) {
        case 0:
          re = BB[7] + re
          break
        case 4:
          if (!new RegExp('0{4}//d{' + (a[0].length - i - 1) + '}$')
            .test(a[0])) {
            re = BB[4] + re
          }
          break
        case 8:
          re = BB[5] + re
          BB[7] = BB[5]
          k = 0
          break
      }
      if (k % 4 === 2 && a[0].charAt(i + 2) !== '0' && a[0].charAt(i + 1) === '0') {
        re = AA[0] + re
      }
      if (a[0].charAt(i) !== '0') {
        re = AA[a[0].charAt(i)] + BB[k % 4] + re
      }
      k++
    }
    if (a.length > 1) {
      re += BB[6]
      for (let i = 0; i < a[1].length; i++) {
        re += AA[a[1].charAt(i)]
      }
    }
    if (re === '一十') {
      re = '十'
    }
    if (re.match(/^一/) && re.length === 3) {
      re = re.replace('一', '')
    }
    return re
  }

  /**
   * 取出字符串中括号"{{}}"内的内容
   * 他类型的括号同理修改正则/\{\{(.*?)\}\}/g，如需取 "()"中的值，则可以这样：/\((.*?)\)/g
   * @param {string} text
   * @returns {Array}
   */
  getBracketStr(text: string) {
    const result = []
    if (text === '') {
      return result
    }
    const options = text.match(/\{\{(.*?)\}\}/g)
    if (options) {
      options.forEach((item) => {
        const res = item.replace(/\{/gi, '').replace(/\}/gi, '')
        if (res) {
          result.push(res)
        }
      })
    }
    return result
  }

  /**
   * 获取url参数
   * @param {*} name
   * @param {*} url
   */
  getUrlKey(name, url) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [undefined, ''])[1].replace(/\+/g, '%20')) || null
  }

  /**
   * 获取窗口可视范围的高度
   */
  getClientHeight() {
    let clientHeight = 0
    if (document.body.clientHeight && document.documentElement.clientHeight) {
      clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
    } else {
      clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
    }
    return clientHeight
  }

  /**
   * 获取窗口可视范围宽度
   */
  getPageViewWidth() {
    const d = document
    const a = d.compatMode === 'BackCompat' ? d.body : d.documentElement
    return a.clientWidth
  }

  /**
   * 开启全屏
   * @param {*} element
   */
  launchFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen()
    }
  }

  /**
   * 平滑滚动到页面顶部
   */
  scrollToTop() {
    const c = document.documentElement.scrollTop || document.body.scrollTop
    if (c > 0) {
      window.requestAnimationFrame(this.scrollToTop)
      window.scrollTo(0, c - c / 8)
    }
  }

  /**
   * @Author: clark
   * @Description: input format number， add num and avoid float number
   * @CreateTime:2022-05-13 08:51:09
   */
  formatNumber(value: any, allowDot: boolean, allowMinus: boolean): string {
    if (allowDot === void 0) {
      allowDot = true
    }
    if (allowMinus === void 0) {
      allowMinus = true
    }
    if (allowDot) {
      value = this.trimExtraChar(value, '.', /\./g)
    } else {
      value = value.split('.')[0]
    }
    if (allowMinus) {
      value = this.trimExtraChar(value, '-', /-/g)
    } else {
      value = value.replace(/-/, '')
    }
    const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g
    return value.replace(regExp, '')
  }

  // tslint:disable-next-line:variable-name
  trimExtraChar(value, _char, regExp) {
    const index = value.indexOf(_char)
    let prefix = ''

    if (index === -1) {
      return value
    }

    if (_char === '-' && index !== 0) {
      return value.slice(0, index)
    }

    if (_char === '.' && value.match(/^(\.|-\.)/)) {
      prefix = index ? '-0' : '0'
    }

    return prefix + value.slice(0, index + 1) + value.slice(index).replace(regExp, '')
  }
}
