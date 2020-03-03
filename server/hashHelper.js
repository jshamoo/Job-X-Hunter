const crypto = require('crypto');

module.exports = {
  createHash: (password, salt='') => {
    const hash = crypto.createHash('sha256');
    hash.update(`${password}${salt}`);
    return hash.digest('hex')
  },
  compareHash: (inputPwd, storedHash, salt) => {
    const inputHash = module.exports.createHash(inputPwd, salt);
    return inputHash === storedHash;
  },
  createSalt: () => {
    return crypto.randomBytes(32).toString('hex');
  }
}
