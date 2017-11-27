import {
  callbackGameRole,
  callbackGameTimer,
  callbackPlayersCount,
  callbackLocationList
} from './PageActions';

export const socket = window.io();

export function init(store) {
  console.log('serv init');
  socket.on('gameRole', (response) => {
    console.log('gameRole',response);
    store.dispatch(callbackGameRole(response));
  });

  socket.on('gameTimer', (response) => {
    console.log('gameTimer',response);
    store.dispatch(callbackGameTimer(response));
  });

  socket.on('playersCount', (response) => {
    console.log('playersCount',response);
    store.dispatch(callbackPlayersCount(response));
  });

  socket.on('locationList', (response) => {
    console.log('locationList',response);
    store.dispatch(callbackLocationList(response));
  });

  socket.on('connect',()=>{
    console.log('serv conn');
    var loc = window.location.href.toString();
    var ind = loc.lastIndexOf('#');
    if(ind != -1){
      loc = loc.substr(ind+1);
    }else{
      loc = '';
    }
    socket.emit('setKey',{gameKey: loc});
    console.log('location', loc);
  });
}
