import { Button } from "antd"
import { useNavigate } from "react-router-dom";
import userInfo from '../stores/user'

export default function Go (props: any) {
  const navigate = useNavigate();

  function clickHome() {
    userInfo.setLogin(!userInfo.login)
    navigate(props.url)
  }
  return (

    <Button type="primary" onClick={clickHome}>
    去{props.url}
  </Button>
  )
}
