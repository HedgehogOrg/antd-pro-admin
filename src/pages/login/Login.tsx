import React, { Component } from 'react'
import Go from '../../components/Go';

interface Props {

}
interface State {

}

export default class Login extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>
          login
          <Go url="/dashboard"></Go>
      </div>
    )
  }
}
