"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../config/database');
var _Encrypter = require('../hooks/Encrypter'); var _Encrypter2 = _interopRequireDefault(_Encrypter);
var _QueryHelper = require('../hooks/QueryHelper'); var _QueryHelper2 = _interopRequireDefault(_QueryHelper);

class UserController {
  async get(req, res) {
    try {
      const user = await _QueryHelper2.default.findUserById(req.userId);
      const { id, username, email } = user;
      return res.json({
        id: id,
        username: username,
        email: email,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Internal server error.",
      });
    }
  }

  async index(req, res) {
    try {
      const users = await _QueryHelper2.default.findAllUsers();
      console.log(users);
      if (!users || users.length === 0) {
        return res.status(403).json({
          error: "Not found!",
        });
      }
      const filteredUsers = users.map(user => {
        const { id , username, email} = user;
        return { id , username, email};
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
      const user = await _QueryHelper2.default.findUserById(id);
      if (!user) {
        return res.status(404).json({
          error: "User not found!",
        });
      }
      const { username, email } = req.body;
      if (!username && !email) {
        throw new Error("Please provide a username or email.");
      }

      // text: "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *",
      const updateQuery = {
        text: "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *",
        values: [username || user.username, email || user.email, id]
      };

      const { rows } = await _database.client.query(updateQuery);

      return res.json({
        message: "User updated successfully!",
        success: true,
        user: {
          id: rows[0].id,
          username: rows[0].username,
          email: rows[0].email,
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
      const user = await _QueryHelper2.default.findUserById(id);
      if (!user) {
        return res.status(404).json({
          error: "User not found!",
        });
      }

      const deleteUserById = {
        text: "DELETE FROM users WHERE id=$1",
        values: [id],
      };
      await _database.client.query(deleteUserById);
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

      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({
          error: "Please provide all the necessary information! (username, email , password)"
        });
      }
      const userEmail = await _QueryHelper2.default.findUserByEmail(email);
      if (userEmail) {
        return res.status(401).json({
          error: "User already exists!"
        });
      }
      const hash_passwd = await _Encrypter2.default.encrypt(password);
      const inserQuery = {
        text: `INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING *`,
        values: [username, email, hash_passwd],
      };
      const rows = await _database.client.query(inserQuery);
      const user = rows.rows[0];
      return res.json({
        message: "User created successfully!",
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
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

exports. default = new UserController();
