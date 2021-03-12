import { VACHAN_API_FETCH,VACHAN_API_SUCCESS,VACHAN_API_FAILURE } from '../actionsType';

export const vachanAPIFetch = url => ({
  type: VACHAN_API_FETCH,
  url
})

export const vachanAPISuccess = payload => ({
  type: VACHAN_API_SUCCESS,
  payload
})

export const vachanAPIFailure = error => ({
  type: VACHAN_API_FAILURE,
  error: error,
})
