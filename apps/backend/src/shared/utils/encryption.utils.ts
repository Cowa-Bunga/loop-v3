export const EncryptionConfig = {
  key: process.env.DATA_ENCRYPTION_KEY,
  algorithm: 'aes-256-cbc',
  ivLength: 16
}

export const JsonEncryptionConfig = {
  key: process.env.DATA_ENCRYPTION_KEY,
  algorithm: 'aes-256-cbc',
  ivLength: 16,
  iv: 'ff5ac19190424b1d88f9419ef949ae56'
}
