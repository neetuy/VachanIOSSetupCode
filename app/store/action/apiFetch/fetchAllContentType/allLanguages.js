import {FECTH_ALL_LANGUAGE, ALL_LANGUAGE_SUCCESS, ALL_LANGUAGE_FAILURE } from "../../actionsType";


export const fetchAllLanguage =()=>({
  type: FECTH_ALL_LANGUAGE,
})

export const allLanguageSuccess= payload => ({
  type: ALL_LANGUAGE_SUCCESS,
  payload
})

export const allLanguageFailure = error => ({
  type: ALL_LANGUAGE_FAILURE,
  error:error,
})

