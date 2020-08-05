import React, { Component, PropTypes } from 'react';
import { Json } from 'auth0-extension-ui';

import connectContainer from 'redux-static';

export default connectContainer(class extends Component {
  static stateToProps = (state) => ({
    user: (state.auth.get('user') && state.auth.get('user').toJS()) || {},
    depnotes: (state.depnotes.get('data') && state.depnotes.get('data').toJS()) || {}
  });

  static propTypes = {
    user: PropTypes.object,
    depnotes: PropTypes.object
  }

  render() {
    const { user, depnotes } = this.props;

    return (
      <div className="configuration">
        <div className="row content-header">
          <div className="col-xs-12 user-table-content">
            <h2>Hello</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Json jsonObject={user} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Json jsonObject={depnotes} />
          </div>
        </div>
      </div>
    );
  }
});
