import React, { Component } from 'react'
import Go from '../../../components/Go';
import ChartsArea from '../components/ChartsArea';


interface Props {

}
interface State {

}

class Dashboard extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>
        dashboard
        <Go url="/login"></Go>
        <ChartsArea></ChartsArea>
      </div>
    )
  }
}

export default Dashboard
