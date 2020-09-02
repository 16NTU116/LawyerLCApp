import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import store from './src/store/index';

import { Provider } from "react-redux";

const appRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => appRedux);
