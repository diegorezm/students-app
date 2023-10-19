import {call, put, all, takeLatest, take} from "redux-saga/effects";
import * as action from './actions'
import * as types from '../types'
import axios from "../../../services/axios";
import toast from "react-hot-toast";
import {ToastStyleError, ToastStyleSuccess} from "../../../styles/GlobalStyles";
import ColorScheme from "../../../types/ColorScheme";
import { User } from "../../../types/UserInterface";


interface props {
  password: string,
  email: string,
  colorScheme: ColorScheme,
  navigator: () => void
}

function* loginRequest({ payload }: props) {
  try {
    const {email, password} = payload
    const response = yield call(axios.post, 'token/', {email, password})
    yield put(action.loginSuccess({...response.data}))
    toast.success("Success!", ToastStyleSuccess(payload.colorScheme))
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`
    payload.navigator("/students")
  } catch (e: any) {
    console.error(e.message)
    toast.error(e.response.data.error, ToastStyleError(payload.colorScheme))
    yield put(action.loginError())
  }
}

function persistHydrate({payload}) {
  const token = payload.user.token
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`
}

interface update{
  email?: string,
  user_email?: string,
  username?: string,
  profile_pic?:string,
  navigator: () => void
}

function* updateRequest({ payload }: update){
  try {
    const {email, username,user_email, profile_pic, navigator} = payload
    let response
    console.log(profile_pic)
    if(profile_pic){
      response = yield call(axios.put, 'users/', { profile_pic })
      console.log(response.data)
      yield put(action.profilePicSuccess({ ...response.data }))
      return null
    }
    
    response = yield call(axios.put, 'users/', { email, username})
    if(email != user_email){
      toast.success("If you changed your email, please login again!", ToastStyleSuccess(payload.colorScheme))
      yield put(action.loginError())
      navigator("/login")
    }
    yield put(action.updateSucces({ ...response.data }))
    toast.success("Success!", ToastStyleSuccess(payload.colorScheme))

  } catch (e: any) {
    console.error(e.message)
    toast.error("Something went wrong!", ToastStyleError(payload.colorScheme))
  }
}

export default all([
  takeLatest(types.FORM_LOGIN_ACTION_REQUEST, loginRequest),
  takeLatest(types.USER_UPDATE_REQUEST, updateRequest),
  takeLatest(types.USER_UPDATE_PROFILE_PIC, updateRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistHydrate)
                  ])
