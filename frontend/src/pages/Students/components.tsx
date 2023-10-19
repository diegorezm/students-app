import React from "react"
import ModalBg from "../../components/ModalBg"
import LabelInput from "../../components/LabelInput"
import { Form } from "../../styles/GlobalStyles"
import {FaWindowClose} from "react-icons/fa"
import { ModalContainer, Button , BtnDel} from "./styles"
import { StudentInterface } from "../../types/StudentInterface"
import ColorScheme from "../../types/ColorScheme"
interface props {
  setFormValues: (student: StudentInterface) => void,
  showHideModal: () => void,
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  operation: 'add' | 'edit',
  formValues:StudentInterface,
  colorScheme: ColorScheme,
}

export const Modal = ({ handleFormSubmit,showHideModal, formValues, setFormValues, operation ,colorScheme}) => {
  return (
    <ModalBg>
    <ModalContainer colors={colorScheme}>
      <div className="btn">
        <BtnDel colors={colorScheme} onClick={showHideModal} type="button">
          <FaWindowClose />
        </BtnDel>
      </div>
      <Form onSubmit={(e) => handleFormSubmit({e, operation})} colors={colorScheme}>
        <LabelInput
          colors={colorScheme}
          label="name"
          type="text"
          value={formValues.name}
          onChange={e => setFormValues({...formValues, name: e})}
        />
        <LabelInput
          colors={colorScheme}
          label="Email"
          type="email"
          value={formValues.email}
          onChange={e => setFormValues({...formValues, email: e})}
        />
        <LabelInput
          colors={colorScheme}
          label="Age"
          type="text"
          value={formValues.age}
          onChange={e => setFormValues({...formValues, age: e})}
        />
        <LabelInput
          colors={colorScheme}
          label="Course"
          type="text"
          value={formValues.course}
          onChange={e => setFormValues({...formValues, course: e})}
        />
        <Button type="submit" colors={colorScheme}>Edit</Button>
      </Form>
    </ModalContainer>
  </ModalBg >
  )
}