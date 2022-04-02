import React from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react';

function App() {
  return <Outlet />;
}

export default observer(App);
