import React, { Component } from 'react'
import { Outlet } from 'react-router-dom';

interface Props {

}
interface State {

}

class PageLayout extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>
        PageLayout
        <Outlet></Outlet>
      </div>
    )
  }
}

export default PageLayout
