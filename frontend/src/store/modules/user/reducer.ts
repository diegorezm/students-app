import { User } from "../../../types/UserInterface"
import * as types from '../types'

const initialState = {
  isAuth: false,
  token: false,
  user: {} as User,
  isLoading: false
}

export default function(state = initialState, action)  {
  switch(action.type){
    case types.FORM_LOGIN_ACTION_REQUEST:{
      const newState = { ...initialState }
      newState.isLoading = true
      return newState
    }
    case types.FORM_LOGIN_ACTION_ERROR:{
      const newState = { ...initialState }
      return newState
    }
    case types.FORM_LOGIN_ACTION_SUCCESS:{
      const newState = { ...initialState }
      newState.isAuth = true
      newState.token = action.payload.token
      newState.user = action.payload.user
      newState.isLoading = false
      return newState
    }
    case types.USER_UPDATE_REQUEST: {
      const newState = { ...state }
      newState.isLoading = true
      return newState
    }
    case types.USER_UPDATE_SUCCESS: {
      const newState = { ...state }
      newState.isLoading = false
      newState.user = action.payload.user
      return newState
    }
    case  types.USER_UPDATE_PROFILE_PIC_SUCESS:{
      const newState = { ...state }
      newState.user.profile_pic = action.payload.user.profile_pic
      return newState
    }
    
    default:
      return state
  }
}
