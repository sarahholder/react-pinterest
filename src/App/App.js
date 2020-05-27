import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import BoardContainer from '../components/BoardContainer/BoardContainer';
import SingleBoard from '../components/SingleBoard/SingleBoard';

import './App.scss';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
    singleBoardId: '',
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  setSingleBoard = (boardId) => {
    this.setState({ singleBoardId: boardId });
  }

  render() {
    const { authed, singleBoardId } = this.state;

    const loadComponent = () => {
      let componentToLoad = '';
      if (authed && singleBoardId.length === 0) {
        componentToLoad = <BoardContainer setSingleBoard={this.setSingleBoard}/>;
      } else if (authed && singleBoardId.length > 0) {
        componentToLoad = <SingleBoard boardId={singleBoardId} setSingleBoard={this.setSingleBoard}/>;
      } else {
        componentToLoad = <Auth />;
      }
      return componentToLoad;
    };

    return (
      <div className="App">
        <MyNavbar authed={authed}/>
        <h1>React Pinterest</h1>
        {loadComponent()}
      </div>
    );
  }
}

export default App;