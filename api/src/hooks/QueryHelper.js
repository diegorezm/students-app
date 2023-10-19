import { client } from "../config/database";
class QueryHelper {
  static async findAllUsers() {
    try {
      const users = await client.query("SELECT * FROM users");
      console.log(users);
      return users.rows;
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }
  static async findUserByEmail(email) {
    try {
      const query = {
        text: "SELECT * FROM users WHERE email=$1",
        values: [email],
      };
      const user = await client.query(query);
      if (!user) {
        return null;
      }
      return user.rows[0];
    } catch (err) {
      return err.message;
    }
  }
  static async findUserById(id) {
    try {
      const query = {
        text: "SELECT * FROM users WHERE id=$1",
        values: [id],
      };
      const user = await client.query(query);
      if (!user) {
        return null;
      }
      return user.rows[0];
    } catch (err) {
      return err.message;
    }
  }
  static async findAlunoById(id) {
    try {
      const query = {
        text: "SELECT * FROM alunos WHERE id=$1",
        values: [id],
      };
      const aluno = await client.query(query);
      if (!aluno) {
        return null;
      }
      return aluno.rows[0];
    } catch (err) {
      return err.message;
    }
  }

  static async findAlunoByName(name) {
    try {
      const query = {
        text: "SELECT * FROM users WHERE nome=$1",
        values: [name],
      };
      const aluno = await client.query(query);
      if (!aluno) {
        return null;
      }
      return aluno.rows[0];
    } catch (err) {
      return err.message;
    }
  }
}
export default QueryHelper;
