import React, { ReactElement } from 'react'
import Go from '../../../components/Go';


export default function Page404(): ReactElement {
  return (
    <div>
      404
      <Go url="/login"></Go>
    </div>
  )
}
