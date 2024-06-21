import * as crypto from "crypto";
/**
 *
 *
 * @description 随即盐，产生随机字符串
 * @param {number} [len=3]
 * @return {string}  产生随机字符串
 */
export function makeSalt(len: number = 3): string {
  return crypto.randomBytes(len).toString('base64')
}


/**
 *
 *
 * @export
 * @param {string} password
 * @param {string} salt 随机盐
 * @return {*}  {string} 加密后的字符串
 */
export function encrytPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return ''
  }
  const tempSalt = Buffer.from(salt, "base64");
  return crypto.pbkdf2Sync(password, tempSalt, 1000, 16, 'sha1').toString('base64')
}

/**
 *
 *
 * @description 获取文件 hash 值 
 * @param {Buffer} buffer
 * @return {string} hash 值 
 */
export function encryptFileMD5(buffer: Buffer): string {
  const md5 = crypto.createHash('md5');
  return md5.update(buffer).digest('hex')
}

