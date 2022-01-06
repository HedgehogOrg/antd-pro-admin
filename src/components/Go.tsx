import { Button } from "antd"
import { useNavigate } from "react-router-dom";
import user from '../stores/user'

export default function Go (props: any) {
  const navigate = useNavigate();

  function clickHome() {
    if (user.loginStatus > 0) {
      user.logout()
    } else {
      user.login();
    }
    navigate(props.url)
  }
  return (

    <Button type="primary" onClick={clickHome}>
    去{props.url}
  </Button>
  )
}
