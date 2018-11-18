import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import * as usersAction from '../../../shared/store/reducers/users';
import { withRouter } from 'react-router-dom';

class DashboardApp extends React.Component {
  render() {
    return (
      <div>
        Dashboard
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users
});

const mapDispatchToProps = (dispatch) => ({
  UsersRxjsActions: bindActionCreators(usersAction, dispatch)
});


// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardApp));
// export default DashboardApp;

export default connect(mapStateToProps, mapDispatchToProps)(DashboardApp);