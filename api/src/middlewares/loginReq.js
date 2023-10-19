import jwt from "jsonwebtoken";
import QueryHelper from "../hooks/QueryHelper";
export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: "Login required.",
    });
  }
  const [ , token] = authorization.split(" ");
  try{
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email} = data;
    const uEmail = await QueryHelper.findUserByEmail(email);
    const uId = await QueryHelper.findUserById(id);
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
