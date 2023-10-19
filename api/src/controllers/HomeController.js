class HomeController {
  async index(req , res){
    return res.json({
      message:"There is nothing to be done here!"
    });
  }
}
export default new HomeController();
