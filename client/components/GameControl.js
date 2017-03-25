/**
 * Created by omaximov on 10/01/17.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as pageActions from '../actions/PageActions';


class GameControl extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {
      requestStartGame
      } = this.props.pageActions;
    let { gamesList } = this.props;

    return (
    <div className="jumbotron">
        <h2>
          Подключено игроков: { gamesList.players } | { gamesList.timer }
        </h2>
        <p>
            Когда подключатся все игроки, для распределения ролей нажмите кнопку старт
        </p>
        <p>
          <a className="btn btn-primary btn-large btn-success" href="#" onClick={ requestStartGame.bind(this) }>Старт</a>
        </p>
    </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    gamesList: state.gamesList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameControl);
