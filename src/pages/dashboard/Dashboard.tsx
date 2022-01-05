import React, { Component } from 'react'
import Go from '../../components/Go';


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
      </div>
    )
  }
}

export default Dashboard
