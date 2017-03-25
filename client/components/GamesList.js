import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

class GamesList extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { gamesList } = this.props;

    return (<div>
        { gamesList.lastGame ?
            <div>
              <div className="row">
                <div className="col-md-12">
                  <h3 className="text-center">
                    Идентификатор игры: { gamesList.lastGame.game }
                  </h3>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6">
                  <p className="text-center">
                    <div className="location">
                      <img src={gamesList.lastGame.image} className="img-responsive center-block img-rounded" />
                        { gamesList.lastGame.location ?
                            <div className="location-name"><div className="card-text">{ gamesList.lastGame.location }</div></div>
                            :
                            null
                        }
                      <div className="location-role"><div className="card-text">{ gamesList.lastGame.role }</div></div>
                    </div>
                  </p>
                </div>
                <div className="col-md-3">
                </div>
              </div>
            </div>
          :
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-center">
              Начните игру
              </h3>
            </div>
          </div>
        }
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    gamesList: state.gamesList
  };
}

export default connect(
  mapStateToProps
)(GamesList);
