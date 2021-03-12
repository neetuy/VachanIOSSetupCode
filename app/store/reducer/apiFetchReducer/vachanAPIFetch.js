import { VACHAN_API_FETCH, VACHAN_API_FAILURE, VACHAN_API_SUCCESS } from '../../action/actionsType'

const initialState = {
    commentaryContent: [],
    error: null,
    loading: false
}
function fetchCommentaryReducer(state = initialState, action) {
    switch (action.type) {
        case VACHAN_API_FETCH:
            return {
                ...state,
                loading: true,
            }
        case VACHAN_API_SUCCESS:
            return {
                ...state,
                loading: false,
                apiData: action.payload
            }
        case VACHAN_API_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default fetchCommentaryReducer