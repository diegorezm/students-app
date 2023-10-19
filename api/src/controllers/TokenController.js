import Encrypter from "../hooks/Encrypter";
import jwt from "jsonwebtoken";
import QueryHelper from "../hooks/QueryHelper";
class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({
          error: "Please provide all the necessary information.",
        });
      }
      const user = await QueryHelper.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({
          error: "User not found!",
        });
      }
      const password_hash = user.password;

      const passFound = await Encrypter.decrypt(password, password_hash);

      if (!passFound) {
        return res.status("401").json({
          error: "Invalid password.",
        });
      }
      const { id  , profile_pic} = user;

      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: "2d",
      });

      return res.json({
        success: true,
        token: token,
        user: { username: user.username,  id: id , email: email, profile_pic: profile_pic}
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }
}
export default new TokenController();
