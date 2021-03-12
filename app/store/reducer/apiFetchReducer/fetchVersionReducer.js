import {
    FETCH_VERSION_LANGUAGE, FETCH_VERSION_BOOKS, FETCH_VERSION_CONTENT, VERSION_LANGUAGE_SUCCESS,
    VERSION_BOOKS_SUCCESS, VERSION_CONTENT_SUCCESS, VERSION_LANGUAGE_FAILURE, VERSION_BOOKS_FAILURE,
    VERSION_CONTENT_FAILURE, QUERY_DOWNLOADED_BOOK, DOWNLOADED_BOOK_SUCCESS, DOWNLOADED_BOOK_FAILURE
} from '../../action/actionsType'

const initialState = {
    data: [],
    bible:{},
    chapterContent: [],
    downloadedBook: [],
    error: null,
    loading: false
}
function fetchVersionReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_VERSION_LANGUAGE:
            return {
                ...state,
                loading: true,
            }
        case VERSION_LANGUAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                bible: action.payload[0]  
            }
        case VERSION_LANGUAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case FETCH_VERSION_BOOKS:
            return {
                ...state,
                loading: true,
            }
        case VERSION_BOOKS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case VERSION_BOOKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case FETCH_VERSION_CONTENT:
            return {
                ...state,
                loading: true,
            }
        case VERSION_CONTENT_SUCCESS:
            return {
                ...state,
                loading: false,
                chapterContent: action.payload.chapterContent,
            }
        case VERSION_CONTENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case QUERY_DOWNLOADED_BOOK:
            return {
                ...state,
                loading: true,
            }
        case DOWNLOADED_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                downloadedBook: action.payload,
            }
        case DOWNLOADED_BOOK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default fetchVersionReducer