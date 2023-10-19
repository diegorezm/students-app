"use strict";Object.defineProperty(exports, "__esModule", {value: true});class HomeController {
  async index(req , res){
    return res.json({
      message:"There is nothing to be done here!"
    });
  }
}
exports. default = new HomeController();
