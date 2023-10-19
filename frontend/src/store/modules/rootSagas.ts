import { all } from "redux-saga/effects";
import userSaga from './user/saga'

export default function* rootSaga(){
  return yield all([userSaga])
}
