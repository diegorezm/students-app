"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Encrypter = require('../hooks/Encrypter'); var _Encrypter2 = _interopRequireDefault(_Encrypter);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _QueryHelper = require('../hooks/QueryHelper'); var _QueryHelper2 = _interopRequireDefault(_QueryHelper);
class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({
          error: "Please provide all the necessary information.",
        });
      }
      const user = await _QueryHelper2.default.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({
          error: "User not found!",
        });
      }
      const password_hash = user.password;

      const passFound = await _Encrypter2.default.decrypt(password, password_hash);
      console.log(passFound);

      if (!passFound) {
        return res.status("401").json({
          error: "Invalid password.",
        });
      }
      const { id } = user;

      const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: "2d",
      });

      return res.json({
        success: true,
        token: token,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }
}
exports. default = new TokenController();
