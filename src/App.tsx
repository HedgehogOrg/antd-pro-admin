import './App.css'
import { Outlet } from 'react-router-dom';
import { observer } from "mobx-react";

const App = () => {
  return <Outlet />;
}

export default observer(App);
