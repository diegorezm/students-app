"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../config/database');
var _QueryHelper = require('../hooks/QueryHelper'); var _QueryHelper2 = _interopRequireDefault(_QueryHelper);

class AlunoController {
  async update(req, res) {
    try {
      const { id,nome, idade, curso , email} = req.body;
      if(!id){
        return res.status(400).json({
          error: "Please provide an id."
        });
      }
      const aluno = await _QueryHelper2.default.findAlunoById(id);
      if (!aluno) {
        return res.status(404).json({
          error: "Aluno not found.",
        });
      }
      const query = "UPDATE alunos SET nome = $1, idade = $2, curso = $3 , email = $4 WHERE id = $5 RETURNING *";
      const values = [
        nome || aluno.nome,
        idade || aluno.idade,
        curso || aluno.curso,
        email || aluno.email,
        id
      ];

      const updated_aluno = await _database.client.query(query, values);

      return res.json({
        message: "Aluno updated!",
        success: true,
        aluno: updated_aluno.rows[0]
      });


    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id }= req.body;
      if (!id) {
        res.status(401).json({
          error: "Please login.",
        });
      }
      const aluno = await _QueryHelper2.default.findAlunoById(id);
      if (!aluno) {
        return res.status(404).json({
          error: "User not found!",
        });
      }

      const deleteAlunoById = {
        text: "DELETE FROM alunos WHERE id=$1",
        values: [id],
      };
      await _database.client.query(deleteAlunoById);

      return res.json({
        message: "Aluno deleted successfully!",
        success: true,
      });
    } 
    catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { nome, idade, curso , email} = req.body;
      if (!nome || !idade || !curso || !email) {
        return res.status(400).json({
          error:
            "Please provide all the necessary information. (nome, idade , curso)",
        });
      }
      const inserQuery = {
        text: `INSERT INTO alunos (nome, idade, curso, email) VALUES ($1,$2,$3,$4)`,
        values: [nome, idade, curso, email],
      };
      await _database.client.query(inserQuery);
      res.json({
        success: true,
        message: "Student record inserted successfully",
        data: {
          nome: nome,
          idade: idade,
          curso: curso,
          email: email
        },
      });
    } catch (err) {
      console.error(`Error while trying to create a row: ${err}`);
      res.status(500).json({ error: "Internal server error." });
    }
  }
  async get(req, res) {
    try {
      const result = await _database.client.query("SELECT * FROM alunos");
      res.json({
        success: true,
        data: result.rows,
      });
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

exports. default = new AlunoController();
