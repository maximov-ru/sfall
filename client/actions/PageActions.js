import {
  CALLBACK_GAME_ROLE,
  CALLBACK_GAME_TIMER,
  CALLBACK_PLAYERS_COUNT,
  CALLBACK_LOCATIONS_LIST,
  REQUEST_START_GAME
} from '../constants/ActionTypes';

import { socket } from './ServerActions';

export function requestStartGame() {
  return () => {
    console.log('strGame');
    socket.emit('requestStartGame');
  }
}

export function callbackGameRole(info) {
  return {
      type: CALLBACK_GAME_ROLE,
      payload: info
    };
}

export function callbackGameTimer(info) {
  return {
    type: CALLBACK_GAME_TIMER,
    payload: info
  };
}

export function callbackPlayersCount(info) {
  return {
    type: CALLBACK_PLAYERS_COUNT,
    payload: info
  };
}

export function callbackLocationsList(info) {
  return {
    type: CALLBACK_LOCATIONS_LIST,
    payload: info
  };
}
