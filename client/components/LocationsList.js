/**
 * Created by omaximov on 10/01/17.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as pageActions from '../actions/PageActions';


class LocationsList extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { locationsList } = this.props;
    console.log(locationsList);
    return (
    <div className="location-list">
      {locationsList.locations.map( item => {
        return <div className="location">
            <img src={item.background}></img>
              <div className="location-name"><div className="card-text">{ item.title }</div></div>
              <div className="location-role"><div className="card-text">&nbsp;</div></div>
          </div>;
      })}
    </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    locationsList: state.locationsList
  };
}

export default connect(
  mapStateToProps
)(LocationsList);
