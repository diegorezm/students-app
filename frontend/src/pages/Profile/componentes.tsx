import {Form} from "../../styles/GlobalStyles"
import {Button, BtnDel, ModalContainer, ButtonDelete} from "./styles"
import ModalBg from "../../components/ModalBg"
import LabelInput from "../../components/LabelInput"
import {FaWindowClose} from "react-icons/fa"
import {User} from "../../types/UserInterface"
import ColorScheme from "../../types/ColorScheme"
import React from "react"

interface props {
  setFormValues: (user: User) => void,
  showHideModal: () => void,
  handleEditForm: (e: React.FormEvent<HTMLFormElement>) => void,
  formValues:User,
  colorScheme: ColorScheme,
}

export const Modal = ({setFormValues, formValues, showHideModal, handleEditForm, colorScheme}: props) => {
  return (
    <ModalBg>
      <ModalContainer colors={colorScheme}>
        <div className="btn">
          <BtnDel colors={colorScheme} onClick={showHideModal} type="button">
            <FaWindowClose />
          </BtnDel>
        </div>
        <Form onSubmit={handleEditForm} colors={colorScheme}>
          <LabelInput
            colors={colorScheme}
            label="Username"
            type="text"
            value={formValues.username}
            onChange={e => setFormValues({...formValues, username: e})}
          />
          <LabelInput
            colors={colorScheme}
            label="Email"
            type="email"
            value={formValues.email}
            onChange={e => setFormValues({...formValues, email: e})}
          />
          <Button type="submit" colors={colorScheme}>Edit</Button>
        </Form>
      </ModalContainer>
    </ModalBg >
  )
}

interface props_pfp {
  showHidePfpModal: () => void,
  setFormValues: (user: User) => void,
  handlePfpForm: (e: React.FormEvent<HTMLFormElement>) => void,
  formValues:User,
  colorScheme: ColorScheme,
}
export const ChangeProfilePic = ({handlePfpForm,showHidePfpModal,setFormValues , formValues,colorScheme}:props_pfp) => {
  return (
    <ModalBg>
      <ModalContainer colors={colorScheme}>
        <div className="btn">
          <BtnDel colors={colorScheme} onClick={showHidePfpModal} type="button">
            <FaWindowClose />
          </BtnDel>
        </div>
        <Form onSubmit={handlePfpForm} colors={colorScheme}>
          <LabelInput
            colors={colorScheme}
            label="Change your profile pic!"
            type="text"
            onChange={e => setFormValues( { ...formValues,profile_pic: e } )}
          />
          <Button type="submit" colors={colorScheme}>Edit</Button>
          <span style={{
            fontSize: 16
          }}>type 'none' if you want to remove your profile pic...</span>
        </Form>
      </ModalContainer>
    </ModalBg >


  )
}
