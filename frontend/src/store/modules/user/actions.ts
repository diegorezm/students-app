import * as types from '../types'
//login
export function loginRequest(payload){
  return {
    type: types.FORM_LOGIN_ACTION_REQUEST,
    payload
    
  }
}
export function loginSuccess(payload){
  return {
    type: types.FORM_LOGIN_ACTION_SUCCESS,
    payload
  }
}
export function loginError(){
  return {
    type: types.FORM_LOGIN_ACTION_ERROR
  }
}

// update
export function updateRequest(payload){
  return {
    type:types.USER_UPDATE_REQUEST,
    payload
  }
}

export function updateSucces(payload){
  return {
    type: types.USER_UPDATE_SUCCESS,
    payload
  }
}

export function profilePicRequest(payload){
  return {
    type: types.USER_UPDATE_PROFILE_PIC,
    payload
  }
}

export function profilePicSuccess(payload){
  return {
    type: types.USER_UPDATE_PROFILE_PIC_SUCESS,
    payload
  }
}