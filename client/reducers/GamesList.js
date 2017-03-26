import {
  CALLBACK_GAME_ROLE,
  CALLBACK_GAME_TIMER,
  CALLBACK_PLAYERS_COUNT,
  SET_KEY
} from '../constants/ActionTypes';

const initialState = {
  games: [],
  lastGame: null,
  key: "",
  players: 0,
  timer: 0,
  isActiveStartButton: true
};

export default function gamesList(state = initialState, action) {
  switch (action.type) {
    case CALLBACK_GAME_ROLE:
      return Object.assign(
          {},
          state,
          {
            games: state.games.concat([state.lastGame]),
            lastGame: action.payload,
            isActiveStartButton: true
          }
      );
    case CALLBACK_GAME_TIMER:
        let obj = {timer: action.payload};
        if (action.payload === 3) {
          obj.isActiveStartButton = false;
        }
      return Object.assign({}, state, obj);
    case CALLBACK_PLAYERS_COUNT:
      return Object.assign({}, state, {players: action.payload});
    case SET_KEY:
      return Object.assign({}, state, {key: action.payload});
    default:
      return state;
  }
}

