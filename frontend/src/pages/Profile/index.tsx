import React, {useContext, useState} from "react"
import {ChangeProfilePic, Modal} from "./componentes"
import {FaEdit, FaEnvelope, FaUserAlt, FaUserTie} from "react-icons/fa"
import {useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {ThemeContext} from "../../context/ThemeProvider"
import {User} from "../../types/UserInterface"
import {BtnEdit, Container} from './styles'

import * as action from '../../store/modules/user/actions'


export default function Profile() {
  const {colorScheme} = useContext(ThemeContext)
  const user: User = useSelector(state => state.user.user)

  const [showPfpModal, setShowPfpModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [formValues, setFormValues] = useState({...user});

  const navigator = useNavigate()
  const dispatch = useDispatch()
  
  const showHideModal = () => {
    setShowModal(!showModal)
  }

  const showHidePfpModal = () => {
    setShowPfpModal(!showPfpModal)
  }

  const handleEditForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const updatedUser = { ...user , username: formValues.username, email: formValues.email}
    dispatch(action.updateRequest({username: updatedUser.username,email: updatedUser.email,user_email: user.email, colorScheme: colorScheme,navigator: navigator}))
    showHideModal()
  }

  const handlePfpForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(action.updateRequest({profile_pic:formValues.profile_pic,colorScheme: colorScheme,navigator: navigator}))
    showHidePfpModal()
  }

  return (
    <>
      {
        showPfpModal ? <ChangeProfilePic
          handlePfpForm={handlePfpForm}
          showHidePfpModal={showHidePfpModal}
          setFormValues={setFormValues}
          formValues={formValues}
          colorScheme={colorScheme}
        />
          :
          null
      }

      {
        showModal ? <Modal
          showHideModal={showHideModal}
          setFormValues={setFormValues}
          formValues={formValues}
          handleEditForm={handleEditForm}
          colorScheme={colorScheme}
        /> :
          null
      }
      <Container colors={colorScheme}>
        <div className="btn">
          <BtnEdit onClick={showHideModal} colors={colorScheme}><FaEdit /></BtnEdit>
        </div>
        <div className="profile-pic">
          {formValues.profile_pic !== 'none' ? <img onClick={showHidePfpModal} src={formValues.profile_pic} alt="pfp" /> : <FaUserAlt onClick={showHidePfpModal} className="default-icon" />}
        </div>
        <div>
          <p>
            <FaUserTie /> {user.username}
          </p>
          <p>
            <FaEnvelope /> {user.email}
          </p>
        </div>
      </Container>
    </>
  )
}
