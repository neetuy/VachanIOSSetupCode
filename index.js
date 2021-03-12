import React, {Component} from 'react';
import createSagaMiddleware from 'redux-saga';
import {AppRegistry} from 'react-native';
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import App from './App';
import rootSaga from './app/store/saga/';
// import { typography } from './app/utils/typography';
import store from './app/store/';

const persistor = persistStore(store)

// typography()

class RNRedux extends Component{
 
    render(){
    return <Provider store={store}>
            <PersistGate persistor={persistor}>
              <App/>   
            </PersistGate>
            </Provider>
    }
}

AppRegistry.registerComponent('VachanGo', () => RNRedux ) ;
