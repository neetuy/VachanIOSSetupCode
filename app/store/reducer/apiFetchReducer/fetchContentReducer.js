import { FETCH_ALL_CONTENT, FECTH_ALL_LANGUAGE, ALL_LANGUAGE_SUCCESS, ALL_CONTENT_SUCCESS, ALL_LANGUAGE_FAILURE, ALL_CONTENT_FAILURE } from '../../action/actionsType'

const initialState = {
    contentLanguages: [],
    allLanguages: [],
    error: null,
    loading: false
}
function fetchContentReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_CONTENT:
            return {
                ...state,
                loading: true,
            }
        case ALL_CONTENT_SUCCESS:
            return {
                ...state,
                loading: false,
                contentLanguages: action.payload
            }
        case ALL_CONTENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case FECTH_ALL_LANGUAGE:
            return {
                ...state,
                loading: true,
            }
        case ALL_LANGUAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                allLanguages: action.payload
            }
        case ALL_LANGUAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default fetchContentReducer