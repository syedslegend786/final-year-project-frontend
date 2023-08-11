import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import car from './slices/car.slice'
// slices

const rootPersistConfig = {
    key: "root",
    storage,
    keyPrefix: "redux-",
    // white-lists
    // black lists
    // blacklist: ['add']
};

const rootReducer = combineReducers({
    car,
});
export { rootReducer, rootPersistConfig };