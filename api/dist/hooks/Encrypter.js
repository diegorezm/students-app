"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
class Encrypter {
  static async encrypt(password) {
    return new Promise((resolve, rej) => {
      _bcryptjs2.default.hash(password, 8, (err, hash) => {
        if (err) {
          rej(err);
        } else {
          resolve(hash);
        }
      });
    });
  }
  static async decrypt(password, hash) {
    return await _bcryptjs2.default.compare(password, hash);
  }
}
exports. default = Encrypter;
