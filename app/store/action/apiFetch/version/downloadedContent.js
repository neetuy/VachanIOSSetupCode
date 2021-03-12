
import { QUERY_DOWNLOADED_BOOK,DOWNLOADED_BOOK_SUCCESS,DOWNLOADED_BOOK_FAILURE} from '../../actionsType';

export const queryDownloadedBook  = payload => ({
    type: QUERY_DOWNLOADED_BOOK,
    payload,
  })
  
  export const downloadedBookSuccess = payload => ({
    type: DOWNLOADED_BOOK_SUCCESS,
    payload,
  })
  
  export const downloadedBookFailure = error => ({
    type: DOWNLOADED_BOOK_FAILURE,
    error:error,
  })
  