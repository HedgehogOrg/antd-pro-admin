import React, { Component } from 'react'
import Go from '../../../components/Go';
import ChartsArea from '../components/ChartsArea';
import { observer } from 'mobx-react';
import user from '../../../stores/user';

interface Props {

}
interface State {

}

@observer
class Dashboard extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>
        dashboard
        user: {JSON.stringify(user.user)}
        <Go url="/login"></Go>
        <ChartsArea></ChartsArea>
      </div>
    )
  }
}

export default Dashboard
