import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// 액션
import * as postActions from './shared/store/reducers/default-sample';
import * as sagaActions from './shared/sagas/saga';
import { fetchPostList } from './shared/actions';
import * as usersAction from './shared/store/reducers/users';
import { renderRoutes } from 'react-router-config';
import { Link, Router } from 'react-router-dom';
import DashboardApp from './modules/apps/dashboard/DashboardApp';
import HomeApp from './modules/apps/home/HomeApp';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class App extends Component {

  getPost = (event) => {
    event.preventDefault();
    console.log(this.props.PostActions.increment);
    this.props.PostActions.getPost(1);
  };

  increment = (event) => {
    event.preventDefault();
    this.props.PostActions.increment();
  };

  dispatchAsync = (event) => {
    event.preventDefault();
    this.props.PostActions.dispatchAsync();
  };

  test = () => {
    const result = this.props.UsersRxjsActions.getUsers();
    // dispatch 결과는 무엇일까?
    console.log('>', result);
  };

  render() {
    console.log('%cApp.render() 앱 속성', 'color: yellow;');
    console.log(this.props);
    console.log(this.props.PostsSagaActions.fetchPostList);

    return (
      <div className="App">
        {/*{renderRoutes(this.props.routes)}*/}
        <header>
          <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/dashboards">dashboards</Link></li>
          </ul>
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <Route exact path="/" component={HomeApp} />
          <Route path="/dashboards" component={DashboardApp} />
          {/*<Route path="/posts/:id" component={DashboardApp} />*/}
          <div>
            <h4>promise middleware : {this.props.defaults.number}</h4>
            <p>
              {this.props.defaults.title}
            </p>
            <button
              onClick={(event) => this.getPost(event)}
            >
              FETCH
            </button>
            <button
              onClick={(event) => this.increment(event)}
            >
              INCREMENT
            </button>
            <button
              onClick={(event) => this.dispatchAsync(event)}
            >
              DISPATCH
            </button>
            <hr />
          </div>

          <div>
            <h4>redux-saga : {this.props.saga.number}</h4>
            <p>
              {this.props.saga.title}
            </p>
            <button
              onClick={() => this.props.SagaActions.fetchData(1)}
            >
              FETCH
            </button>
            <button
              onClick={() => this.props.SagaActions.increment(2)}
            >
              INCREMENT
            </button>
            <button
              onClick={() => this.props.SagaActions.increment(2)}
            >
              DISPATCH
            </button>
            <hr />
          </div>

          <div>
            <h4>posts (saga) : {this.props.posts.number}</h4>
            <p>
              {this.props.posts.title}
            </p>
            <p style={{ color: 'red' }}>
              {this.props.posts.body}
            </p>
            <button
              onClick={() => this.props.PostsSagaActions.fetchPostList(1)}
            >
              FETCH
            </button>
            <button
              onClick={() => this.props.PostsSagaActions.fetchPostList(2)}
            >
              INCREMENT
            </button>
            <button
              onClick={() => this.props.PostsSagaActions.fetchPostList(3)}
            >
              DISPATCH
            </button>
          </div>

          <div>
            <h4>Users (rxjs) : {this.props.users.number}</h4>
            <p>
              [{this.props.users.users ? this.props.users.users.length : 0}]
            </p>
            {
              this.props.users.error && (<p style={{ color: 'red'}}>{this.props.users.message}</p>)
            }
            <p>
            </p>
            <ul>
              {
                this.props.users.users && this.props.users.users.map((item, index) => (
                  <li key={index}>
                    {index + 1} {item.name}
                  </li>
                ))
              }
            </ul>
            <button
              onClick={() => this.props.UsersRxjsActions.getUsers()}
            >
              FETCH
            </button>
            <button
              onClick={() => this.test()}
            >
              INCREMENT
            </button>
            <button
              onClick={() => this.props.UsersRxjsActions.getUsers()}
            >
              DISPATCH
            </button>
          </div>
        </header>
      </div>
    );
  }

  componentDidUpdate() {
    console.log('//////////', this.props);
  }
}

const mapStateToProps = (state) => ({
  defaults: state.defaults,
  saga: state.saga,
  posts: state.posts,
  users: state.users
});

const mapDispatchToProps = (dispatch) => ({
  PostActions: bindActionCreators(postActions, dispatch),
  SagaActions: bindActionCreators(sagaActions, dispatch),
  PostsSagaActions: bindActionCreators({
    fetchPostList
  }, dispatch),
  UsersRxjsActions: bindActionCreators(usersAction, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
