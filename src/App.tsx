import React, { Component } from "react";
import './App.css'
import { Outlet } from 'react-router-dom';
import UserInfo from './stores/user'
import { observer } from "mobx-react";

interface Props {}
interface State {}


@observer
class App extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div>
        {String(UserInfo.login)}
        {<Outlet />}
      </div>
    );
  }
}

export default App;
