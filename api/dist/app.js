"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _tokenRouter = require('./routes/tokenRouter'); var _tokenRouter2 = _interopRequireDefault(_tokenRouter);
var _userRouter = require('./routes/userRouter'); var _userRouter2 = _interopRequireDefault(_userRouter);
var _homeRouter = require('./routes/homeRouter'); var _homeRouter2 = _interopRequireDefault(_homeRouter);
var _alunosRouter = require('./routes/alunosRouter'); var _alunosRouter2 = _interopRequireDefault(_alunosRouter);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();
class App {
  constructor(){
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(_express2.default.urlencoded({ extended: true}));
    this.app.use(_express2.default.json());
  }

  routes(){
    this.app.use("/", _homeRouter2.default);
    this.app.use('/token' , _tokenRouter2.default);
    this.app.use('/users' , _userRouter2.default);
    this.app.use('/alunos' , _alunosRouter2.default);
  }
}

exports. default = new App().app;
