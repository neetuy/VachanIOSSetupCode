import { createStore, applyMiddleware } from "redux";
import { AsyncStorage } from 'react-native';
import rootReducer from '../store/reducer/';
import { persistReducer } from 'redux-persist';

import createSagaMiddleware from 'redux-saga'
import rootSaga from '../store/saga/'

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['updateVersion', 'updateStyling', 'userInfo'],
};
const reducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

export default store;

// // initiate redux with our without logger
// const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);
// const store = createStoreWithMiddleware(reducer);
