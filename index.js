import saveNewRegistration from "./registration";
import userData from "./userData";
import {combineReducers} from "redux";

const allReducers = combineReducers({saveNewRegistration,userData});

export default allReducers;