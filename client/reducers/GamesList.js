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
  timer: -1
};

export default function gamesList(state = initialState, action) {
  switch (action.type) {
    case CALLBACK_GAME_ROLE:
      return Object.assign({}, state, {games: state.games.concat([state.lastGame]), lastGame: action.payload});
    case CALLBACK_GAME_TIMER:
      return Object.assign({}, state, {timer: action.payload});
    case CALLBACK_PLAYERS_COUNT:
      return Object.assign({}, state, {players: action.payload});
    case SET_KEY:
      return Object.assign({}, state, {key: action.payload});
    default:
      return state;
  }
}

