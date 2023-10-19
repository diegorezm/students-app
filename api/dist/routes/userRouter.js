"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginReq = require('../middlewares/loginReq'); var _loginReq2 = _interopRequireDefault(_loginReq);
const router = new (0, _express.Router)();

router.post("/", _UserController2.default.create);
router.put("/", _loginReq2.default,_UserController2.default.update);
router.get("/user", _loginReq2.default,_UserController2.default.get);
router.get("/", _UserController2.default.index);
router.delete("/",_loginReq2.default,_UserController2.default.delete);

exports. default = router;
