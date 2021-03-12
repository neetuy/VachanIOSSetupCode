import { FETCH_VERSION_LANGUAGE, VERSION_LANGUAGE_SUCCESS, VERSION_LANGUAGE_FAILURE } from "../../actionsType";


export const fetchVersionLanguage = payload =>({
  type: FETCH_VERSION_LANGUAGE,
  payload
})

export const versionLanguageSuccess= payload => ({
  type: VERSION_LANGUAGE_SUCCESS,
  payload
})

export const versionLanguageFailure = error => ({
  type: VERSION_LANGUAGE_FAILURE,
  error:error,
})

