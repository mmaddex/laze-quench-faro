import React, { Component, PropTypes } from 'react';
import { Json } from 'auth0-extension-ui';

import connectContainer from 'redux-static';

export default connectContainer(class extends Component {
  static stateToProps = (state) => ({
    user: (state.auth.get('user') && state.auth.get('user').toJS()) || {},
    depnotes: (state.depnotes.get('data') && state.depnotes.get('data').toJS()) || []
  });

  static propTypes = {
    user: PropTypes.object,
    depnotes: PropTypes.array
  }

  render() {
    const { user, depnotes } = this.props;

    return (
      <div className="configuration">
        <div className="row content-header">
          <div className="col-xs-12 user-table-content">
            <h2>Deprecations</h2>
          </div>
        </div>
        <div>
          {depnotes.map((d) => (
            <div className="row" key={d.title}>
              <div className="col-xs-12">
                <h3>{d.title}</h3>
                <ul style={{'listStyleType':'none'}}>
                  <li><b>Migration window:</b> {d.migration_window}</li>
                  <li><b>Last request:</b> {d.last_request}</li>
                  <li><b>Migration guide:</b> <a href={d.migration_guide}>{d.migration_guide}</a></li>
                  <li><b>Details</b> <Json jsonObject={d.details} /></li>
                </ul>
              </div>
            </div>
          ))} 
        </div>
        <div>
        </div>
      </div>
    );
  }
});
