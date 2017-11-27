import {
  CALLBACK_LOCATIONS_LIST
} from '../constants/ActionTypes';

const initialState = {
  locations: []
};

export default function locationsList(state = initialState, action) {
  console.log('action', action);
  switch (action.type) {
    case CALLBACK_LOCATIONS_LIST:
      return Object.assign(
          {},
          state,
          {
            locations: action.payload
          }
      );
    default:
      return state;
  }
}
