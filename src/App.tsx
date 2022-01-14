import React, { Component } from "react";
import './App.css'
import { Outlet } from 'react-router-dom';
import { observer } from "mobx-react";

interface Props {}
interface State {}


@observer
class App extends Component<Props, State> {
  state = {};

  render() {
    return <Outlet />;
  }
}

export default App;
