import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GameControl from '../components/GameControl';
import GamesList from '../components/GamesList';

import * as pageActions from '../actions/PageActions';


class App extends Component {

  render() {


    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="page-header">
              <h1>
                Игра: находка для шпиона
              </h1>
            </div>
            <GameControl></GameControl>
          </div>
        </div>
        <GamesList></GamesList>
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    gamesList: state.gamesList
  };
}

/**
 * Binding actions
 * @param  {function}
 */
function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
