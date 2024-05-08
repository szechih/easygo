import { Button, Result } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
export default function NotFound() {
  const navigate = useNavigate()
  const backHome = () => {
    navigate('/', { replace: true })
  }
  return (
    <>
      <Result
        status="error"
        title="404"
        description="抱歉，你访问的页面不存在"
      />
      <Button color="primary" onClick={backHome}>
          回到首页
      </Button>
    </>
  )
}
