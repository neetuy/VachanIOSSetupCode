import { VACHAN_API_FETCH } from '../../action/actionsType'
import { vachanAPISuccess, vachanAPIFailure } from '../../action/'
import { put, takeLatest, call } from 'redux-saga/effects'
import store from '../../../store'

function* vachanAPIFetch(value) {
    const state = store.getState()
    const res = yield call(fetch, state.updateVersion.baseAPI + value.url)
    if (res.ok && res.status == 200) {
      const result = yield res.json()
      yield put(vachanAPISuccess(result))
      yield put(vachanAPIFailure(null))
    } else {
      yield put(vachanAPIFailure({error:"Something Went Wrong , Try Again"}))
      yield put(vachanAPISuccess([]))
    }
}

export const watchVachanAPI= [
  takeLatest(VACHAN_API_FETCH, vachanAPIFetch)
]