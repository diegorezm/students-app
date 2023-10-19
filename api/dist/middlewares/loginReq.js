"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _QueryHelper = require('../hooks/QueryHelper'); var _QueryHelper2 = _interopRequireDefault(_QueryHelper);
exports. default = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: "Login required.",
    });
  }
  const [ , token] = authorization.split(" ");
  try{
    const data = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email} = data;
    const uEmail = await _QueryHelper2.default.findUserByEmail(email);
    const uId = await _QueryHelper2.default.findUserById(id);
    if(!uEmail || !uId){
      return res.status(401).json({
        error: "Invalid user."
      });
    }
    req.userId = id;
    req.userEmail = email;
    return next();
  }catch(err){
    return res.status(401).json({
      error: "Invalid token."
    });
  }
};
