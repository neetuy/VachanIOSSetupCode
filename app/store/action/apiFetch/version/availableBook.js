import { FETCH_VERSION_BOOKS, VERSION_BOOKS_SUCCESS, VERSION_BOOKS_FAILURE } from "../../actionsType";


export const fetchVersionBooks = payload =>({
  type: FETCH_VERSION_BOOKS,
  payload
})

export const versionBooksSuccess = payload => ({
  type: VERSION_BOOKS_SUCCESS,
  payload
})

export const versionBooksFailure = error => ({
  type: VERSION_BOOKS_FAILURE,
  error:error,
})

