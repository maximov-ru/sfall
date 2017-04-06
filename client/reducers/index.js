import {combineReducers} from 'redux';
import gamesList from './GamesList';
import locationsList from './LocationsList';

const rootReducer = combineReducers({
  gamesList,
  locationsList
});

export default rootReducer;
