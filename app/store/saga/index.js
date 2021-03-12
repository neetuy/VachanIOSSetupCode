import { all } from 'redux-saga/effects'
import { watchVersion } from './apiFetch/fetchVersion'
import { watchAllContent } from './apiFetch/fetchAllContent'
import { watchParallelBible } from './apiFetch/parallelBible'
import {watchVachanAPI} from './apiFetch/vachanAPIFetch'


export default function* rootSaga() {
  yield all([
    ...watchVersion,
    ...watchAllContent,
    ...watchParallelBible,
    ...watchVachanAPI
  ])
}
//all saga put here its a root of all saga
