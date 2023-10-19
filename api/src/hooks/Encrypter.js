import bcryptjs from "bcryptjs";
class Encrypter {
  static async encrypt(password) {
    return new Promise((resolve, rej) => {
      bcryptjs.hash(password, 8, (err, hash) => {
        if (err) {
          rej(err);
        } else {
          resolve(hash);
        }
      });
    });
  }
  static async decrypt(password, hash) {
    return await bcryptjs.compare(password, hash);
  }
}
export default Encrypter;
