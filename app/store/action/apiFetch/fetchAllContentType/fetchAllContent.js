import { FETCH_ALL_CONTENT, ALL_CONTENT_SUCCESS, ALL_CONTENT_FAILURE } from "../../actionsType";


export const fetchAllContent =()=>({
  type: FETCH_ALL_CONTENT,
})

export const allContentSuccess= payload => ({
  type: ALL_CONTENT_SUCCESS,
  payload
})

export const allContentFailure = error => ({
  type: ALL_CONTENT_FAILURE,
  error:error,
})

