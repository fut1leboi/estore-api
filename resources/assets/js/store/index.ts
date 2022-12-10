import authStore from './auth';
import {combineReducers} from "redux";

export default combineReducers({
    auth: authStore
})
