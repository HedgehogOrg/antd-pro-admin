import React, { Component } from 'react'
import Go from '../../../components/Go';
import ChartsArea from '../components/ChartsArea';
import { observer } from 'mobx-react';
import user from '../../../stores/user';
import { Link } from 'react-router-dom';

interface Props {

}
interface State {

}

@observer
class Dashboard extends Component<Props, State> {

  render() {
    return (
      <div>
        dashboard
        user: {JSON.stringify(user.user)}
        <Link to={'/404'}>404</Link>
        <Go url="/login"></Go>
        <ChartsArea></ChartsArea>
      </div>
    )
  }
}

export default Dashboard
