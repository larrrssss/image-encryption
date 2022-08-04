import * as crypto from 'crypto';

/**
 * Encrypt an image buffer with a given secret
 * 
 * @param buffer - image buffer
 * @param secret - personal token
 * @param algorithm - algorithm to use (default: 'aes-256-ctr')
 * @returns encrypted buffer
 */
export function encrypt(buffer: Buffer, secret: string, algorithm = 'aes-256-ctr'): Buffer {
  const key = crypto
    .createHash('sha256')
    .update(secret)
    .digest('base64')
    .substr(0, 32);

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
  
  return result;
}

/**
 * Decrypt an encrypted image buffer if the scret is the right one
 * 
 * @param encrypted - encrypted image buffer
 * @param secret - personal token
 * @param algorithm - algorithm to use (default: 'aes-256-ctr')
 * @returns decrypted image buffer
 */
export function decrypt(encrypted: Buffer, secret: string, algorithm = 'aes-256-ctr'): Buffer {
  const key = crypto
    .createHash('sha256')
    .update(secret)
    .digest('base64')
    .substr(0, 32);
  
  const iv = encrypted
    .slice(0, 16)
    .slice(16);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);   
  
  return result;
}
