import LoginFormComponent from '@/components/Form/loginForm/LoginFormComponent';
import TextLogoComponent from '@/components/Icons/textLogo/TextLogoComponent';
import './index.css'

const Login = () => {

  return (
    <div className="page login-page flex items-center justify-center">
      <TextLogoComponent />
      <LoginFormComponent />
    </div>
  )
}

export default Login;