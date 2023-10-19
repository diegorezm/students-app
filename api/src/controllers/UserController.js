import { client } from "../config/database";
import Encrypter from "../hooks/Encrypter";
import QueryHelper from "../hooks/QueryHelper";

class UserController {
  async get(req, res) {
    try {
      const user = await QueryHelper.findUserById(req.userId);
      const { id, username, email , profile_pic} = user;
      return res.json({
        id: id,
        username: username,
        email: email,
        profile_pic: profile_pic 
      });
    } catch (err) {
      return res.status(500).json({
        error: "Internal server error.",
      });
    }
  }

  async index(req, res) {
    try {
      const users = await QueryHelper.findAllUsers();
      console.log(users);
      if (!users || users.length === 0) {
        return res.status(403).json({
          error: "Not found!",
        });
      }
      const filteredUsers = users.map(user => {
        const { id , username, email, profile_pic} = user;
        return { id , username, email , profile_pic};
      });
      return res.json({
        users: filteredUsers
      });
    } catch (err) {
      return res.status(500).json({
        error: "Internal server error.",
      });
    }
  }

  async update(req, res) {
    try {
      const id = req.userId;
      if (!id) {
        res.status(401).json({
          error: "Please login.",
        });
      }
      const user = await QueryHelper.findUserById(id);
      if (!user) {
        return res.status(404).json({
          error: "User not found!",
        });
      }
      const { username, email , profile_pic } = req.body;
      console.log(profile_pic);
      if (!username && !email && !profile_pic) {
        throw new Error("Nothing to be updated.");
      }

      const updateQuery = {
        text: "UPDATE users SET username = $1, email = $2, profile_pic =$3 WHERE id = $4 RETURNING *",
        values: [username || user.username, email || user.email,profile_pic || user.profile_pic, id]
      };

      const { rows } = await client.query(updateQuery);

      return res.json({
        message: "User updated successfully!",
        success: true,
        user: {
          id: rows[0].id,
          username: rows[0].username,
          email: rows[0].email,
          profile_pic: rows[0].profile_pic
        },
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.userId;
      if (!id) {
        res.status(401).json({
          error: "Please login.",
        });
      }
      const user = await QueryHelper.findUserById(id);
      if (!user) {
        return res.status(404).json({
          error: "User not found!",
        });
      }

      const deleteUserById = {
        text: "DELETE FROM users WHERE id=$1",
        values: [id],
      };
      await client.query(deleteUserById);
      return res.json({
        message: "User deleted successfully!",
        success: true,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  async create(req, res) {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new Error("Bad request!");
      }

      const { username, email, password , profile_pic} = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({
          error: "Please provide all the necessary information! (username, email , password)"
        });
      }
      const userEmail = await QueryHelper.findUserByEmail(email);
      if (userEmail) {
        return res.status(401).json({
          error: "User already exists!"
        });
      }
      const hash_passwd = await Encrypter.encrypt(password);
      const inserQuery = {
        text: `INSERT INTO users (username, email, password, profile_pic) VALUES ($1,$2,$3, $4) RETURNING *`,
        values: [username, email, hash_passwd, profile_pic || 'none'],
      };
      const rows = await client.query(inserQuery);
      const user = rows.rows[0];
      return res.json({
        message: "User created successfully!",
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          profile_pic: user.profile_pic
        }
      });
    } catch (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({
        error: err.message,
      });
    }
  }
}

export default new UserController();
