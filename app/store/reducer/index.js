
import { combineReducers } from 'redux'

import updateVersionReducer from './updateVersionReducer';
import updateStylingReducer from './updateStylingReducer';
import fetchVersionReducer from './apiFetchReducer/fetchVersionReducer'
import vachanAPIFetch from './apiFetchReducer/vachanAPIFetch'
import fetchContentReducer from './apiFetchReducer/fetchContentReducer'
import parallelBibleReducer from './apiFetchReducer/parallelBibleReducer'
import userInfo from './UserInfoReducer'
import selectContent from './selectContent'


const rootReducer = combineReducers({
    updateVersion: updateVersionReducer,
    updateStyling: updateStylingReducer,
    versionFetch: fetchVersionReducer,
    vachanAPIFetch:vachanAPIFetch,
    contents: fetchContentReducer,
    parallel: parallelBibleReducer,
    userInfo: userInfo,
    selectContent:selectContent
})

export default rootReducer