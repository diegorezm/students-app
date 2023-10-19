import { useContext, useEffect, useState } from "react";
import { Title, TableButton, ToastStyleError, ToastStyleSuccess } from "../../styles/GlobalStyles"
import { StyledTable, BtnAdd } from "./styles";
import Loading from "../../components/Loading";
import { FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa'
import { ThemeContext } from "../../context/ThemeProvider";
import axios from "../../services/axios";
import { StudentInterface } from "../../types/StudentInterface";
import { Modal } from './components'
import toast from "react-hot-toast";

interface click {
  student: StudentInterface,
  operation: 'edit' | 'delete',
  index?: number
}


interface formSubmit {
  e:React.FormEvent<HTMLFormElement>,
  operation: 'add' | edit
}

export default function Alunos() {
  const [students, setStudents] = useState<StudentInterface[]>([])
  const { colorScheme } = useContext(ThemeContext)
  const baseStudent = {
    name: "",
    email: "",
    age: undefined,
    course: ""
  }
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [formValue, setFormValue] = useState<StudentInterface>({...baseStudent});
  
  const [operation, setOperation] = useState<string | undefined>(undefined)

  let editIndex = 0

  const handleAddClick = () => {
    setFormValue({...baseStudent})
    showHideModal("add")
  }

  const handleEditClick = async ({ student, operation, index }:click) => {
    if (operation === 'edit') {
      setFormValue(student)
      editIndex = index
      showHideModal("edit")
    }
    if (operation === 'delete') {
      const updatedStudents = [...students]
      updatedStudents.splice(index, 1)
      setStudents(updatedStudents)
      try {
        const { id } = student
        console.log(id)
        await axios.delete(`students/${id}`)
        toast.success("Student deleted successfully!", ToastStyleSuccess(colorScheme))
      } catch (error) {
        console.error(error.message)
        const error_msg = error.response.data.error || "Unable to delete student."
        toast.error(error_msg, ToastStyleError(colorScheme))
      }
  }
}

  const handleFormSubmit  = async ({e , operation }:formSubmit) => {
    e.preventDefault()
    if(operation === 'edit'){
      try {
        await axios.put('students/', formValue)
        toast.success("Edit was successful. Your changes have been saved!", ToastStyleSuccess(colorScheme))
        showHideModal()
      } catch (error: any) {
        console.error(error.message)
        const error_msg = error.response.data.error || "Edit was not successful."
        toast.error(error_msg, ToastStyleError(colorScheme))
      }
    }
    if(operation === 'add'){
      try {
        const { name , email, age, course} = formValue
        const response = await axios.post("students/", { name , email, age, course})
        const newStudent = response.data.data
        setStudents([...students, newStudent])
        toast.success("Student created successfully!", ToastStyleSuccess(colorScheme))
        showHideModal()
      } catch (error) {
        console.error(error.message)
        const error_msg = error.response.data.error || "Unable to create user."
        toast.error(error_msg, ToastStyleError(colorScheme))
      }
    }else{
      return null
    }
  }

  const showHideModal = (operation?: string) => {
    setShowModal(!showModal)
    setOperation(operation)
  }

  useEffect(() => {
    const getAlunos = async () => {
      try {
        setLoading(true)
        const req = await axios.get("/students");
        setStudents(req.data.data);
      } catch (e: any) {
        console.error(e.message);
      } finally {
        setLoading(false)
      }
    };
    getAlunos();
  }, [students]);
  
  return (
    <>
      <BtnAdd colors={colorScheme} onClick={handleAddClick}>
        <FaPlusCircle/>
      </BtnAdd>
      {
        showModal ? <Modal
          handleFormSubmit={handleFormSubmit}
          showHideModal={showHideModal}
          operation={operation}
          formValues={formValue}
          setFormValues={setFormValue}
          colorScheme={colorScheme}
        /> :
          null
      }

      {
        students.length === 0 ? <Title>{loading ? <Loading isLoading={loading} /> : "Nothing on the database :("}</Title> : (
          <>
            <Title>Students:</Title>
            <StyledTable colors={colorScheme}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student, i) => {
                  return (
                    <tr key={student.id}>
                      <td>{i + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.age}</td>
                      <td>{student.course}</td>
                      <td>
                        <TableButton
                          color={colorScheme.brightBlack}
                          focus={colorScheme.black}
                          onClick={() => handleEditClick({ student, index: i, operation: 'edit' })}
                        >
                          <FaEdit />
                        </TableButton>
                        <TableButton
                          color={colorScheme.brightRed}
                          focus={colorScheme.red}
                          onClick={() => handleEditClick({ student, index: i, operation: 'delete' })}
                        >
                          <FaTrash />
                        </TableButton>
                      </td>
                    </tr>
                  )
                })}

              </tbody>
            </StyledTable>
          </>
        )
      }
    </>
  )

}
