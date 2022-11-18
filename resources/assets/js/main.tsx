import '../sass/main.scss';


import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import '@fortawesome/fontawesome-free/js/all'
import App from './App';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import {createStore} from "redux";
import store from './store';


const container = document.getElementById('root');
const root = createRoot(container!);
let initialStore = createStore(store);

root.render(
    <Provider store={initialStore}>
        <App/>
    </Provider>
);
