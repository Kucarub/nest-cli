/*
 * @Author: clark
 * @Date: 2019-07-08 13:27:49
 * @LastEditTime: 2019-07-09 10:47:18
 * @Description: 通过正则表达式来验证的工具函数
 */
/**
 * 验证火车车次
 * @param { string } value
 */
export const isTrainNum = value => /^[GCDZTSPKXLY1-9]\d{1,4}$/g.test(value)
/**
 *  验证手机机身码(IMEI)
 *  @param { string } value
 */
export const isIMEI = value => /^\d{15,17}$/g.test(value)
/**
 * 验证必须带端口号的网址(或ip)
 * @param { string } value
 */
export const isHttpAndPort = value => /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/g.test(value)
/**
 *  验证网址(支持端口和"?+参数"和"#+参数)
 *  @param { string } value
 */
export const isRightWebsite = value => /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/g.test(value)
/**
 *  验证统一社会信用代码
 *  @param { string } value
 */
export const isCreditCode = value => /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g.test(value)
/**
 *  验证迅雷链接
 *  @param { string } value
 */
export const isThunderLink = value => /^thunderx?:\/\/[a-zA-Z\d]+=$/g.test(value)
/**
 *  验证linux隐藏文件路径
 *  @param { string } value
 */
export const isLinuxHiddenFilePath = value => /^\/(?:[^\/]+\/)*\.[^\/]*/g.test(value)
/**
 *  验证linux文件夹路径
 *  @param { string } value
 */
export const isLinuxFolderPath = value => /^\/(?:[^\/]+\/)*[^\/]+$/g.test(value)
/**
 *  验证linux文件路径
 *  @param { string } value
 */
export const isLinuxFilePath = value => /^\/(?:[^/]+\/)*[^/]+$/g.test(value)
/**
 *  验证window"文件夹"路径
 *  @param { string } value
 */
export const isWindowsFolderPath = value => /^[a-zA-Z]:\\(?:\w+\\?)*$/g.test(value)
/**
 *  验证window下"文件"路径
 *  @param { string } value
 */
export const isWindowsFilePath = value => /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/g.test(value)
/**
 *  验证数字/货币金额（支持负数、千分位分隔符）
 * @param { string } value
 */
export const isMoneyAll = value => /^-?\d+(,\d{3})*(\.\d{1,2})?$/g.test(value)
/**
 *  验证数字/货币金额 (只支持正数、不支持校验千分位分隔符)
 * @param { string } value
 */
export const isMoney = value => /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0){1}$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/g.test(value)
/**
 *  验证中文姓名
 * @param { string } value
 */
export const isChineseName = value => /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value)
/**
 *  验证英文姓名
 * @param { string } value
 */
export const isEnglishName = value => /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/g.test(value)
/**
 *  验证车牌号(新能源+非新能源)
 * @param { string } value
 */
export const isLicensePlateNumber = value => /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z][A-HJ-NP-Z](?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳])$/g.test(value)

/**
 *  验证手机号中国(严谨), 根据工信部2019年最新公布的手机号段
 * @param { string } value
 */
export const isMPStrict = value => /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(value)
/**
 *  验证手机号中国(宽松), 只要是13,14,15,16,17,18,19开头即可
 * @param { string } value
 */
export const isMPRelaxed = value => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value)

/**
 *  验证手机号中国(最宽松), 只要是1开头即可, 如果你的手机号是用来接收短信, 优先建议选择这一条
 * @param { string } value
 */
export const isMPMostRelaxed = value => /^(?:(?:\+|00)86)?1\d{10}$/g.test(value)
/**
 *  验证email(邮箱)
 * @param { string } value
 */
export const isEmail = value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(value)
/**
 *  身份证号, 支持1/2代(15位/18位数字)
 * @param { string } value
 */
export const isIDCard = value => /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g.test(value)
/**
 *  验证护照（包含香港、澳门）
 * @param { string } value
 */
export const isPassport = value => /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g.test(value)
/**
 * 验证密码强度，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
 * @param { string } value
 */
export const isCorrectFormatPassword = value => /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/g.test(value)
/**
 * 验证邮政编码(中国)
 * @param { string } value
 */
export const isPostcode = value => /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(value)
