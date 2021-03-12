import { FETCH_PARALLEL_BIBLE, 
  PARALLEL_BIBLE_SUCCESS,
   PARALLEL_BIBLE_FAILURE,
   } from "../actionsType";


export const fetchParallelBible = payload=>({
  type: FETCH_PARALLEL_BIBLE,
  payload
})

export const parallelBibleSuccess= payload => ({
  type: PARALLEL_BIBLE_SUCCESS,
  payload
})

export const parallelBiblefailure = error => ({
  type: PARALLEL_BIBLE_FAILURE,
  error:error,
})


