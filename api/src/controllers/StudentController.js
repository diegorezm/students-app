import { client } from "../config/database";
import QueryHelper from "../hooks/QueryHelper";

class StudentController {
  async update(req, res) {
    try {
      const { id,name, age, course , email} = req.body;
      if(!id){
        return res.status(400).json({
          error: "Please provide an id."
        });
      }
      const student = await QueryHelper.findAlunoById(id);
      if (!student) {
        return res.status(404).json({
          error: "Student not found.",
        });
      }
      const query = "UPDATE students SET name = $1, age = $2, course = $3 , email = $4 WHERE id = $5 RETURNING *";
      const values = [
        name || student.name,
        age || student.age,
        course || student.course,
        email || student.email,
        id
      ];

      const updated_student = await client.query(query, values);

      return res.json({
        message: "Student updated!",
        success: true,
        student: updated_student.rows[0]
      });


    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id }= req.params;
      console.log(req.params);
      if (!id) {
        return res.status(400).json({
          error: "Please provide an id.",
        });
      }
      const student = await QueryHelper.findAlunoById(id);
      if (!student) {
        return res.status(404).json({
          error: "Student not found!",
        });
      }

      const deleteAlunoById = {
        text: "DELETE FROM students WHERE id=$1",
        values: [id],
      };
      await client.query(deleteAlunoById);

      return res.json({
        message: "Student deleted successfully!",
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
      const {  name, age, course , email} = req.body;
      if (!name || !age || !course || !email) {
        return res.status(400).json({
          error:
            "Please provide all the necessary information. (nome, age , curso)",
        });
      }
      const inserQuery = {
        text: `INSERT INTO students (name, age, course, email) VALUES ($1,$2,$3,$4)`,
        values: [name, age, course, email],
      };
      await client.query(inserQuery);
      res.json({
        success: true,
        message: "Student record inserted successfully",
        data: {
          name: name,
          age: age,
          course: course,
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
      const result = await client.query("SELECT * FROM students");
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

export default new StudentController();
