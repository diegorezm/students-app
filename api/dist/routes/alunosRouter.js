"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _express = require('express');
var _AlunoController = require('../controllers/AlunoController'); var _AlunoController2 = _interopRequireDefault(_AlunoController);
var _loginReq = require('../middlewares/loginReq'); var _loginReq2 = _interopRequireDefault(_loginReq);

const router = new (0, _express.Router)();


router.post("/", _loginReq2.default,_AlunoController2.default.create);
router.put("/", _loginReq2.default,_AlunoController2.default.update);
router.get("/", _AlunoController2.default.get);
router.delete("/", _loginReq2.default,_AlunoController2.default.delete);


exports. default = router;
