import LoginFormComponent from '@/components/Form/loginForm/LoginFormComponent';
import './index.css'
import TextLogoComponent from '@/components/Icons/textLogo/TextLogoComponent';

const Login = () => {

  return (
    <div className="page flex items-center justify-center">
      <TextLogoComponent />
      <LoginFormComponent />
    </div>
  )
}

export default Login;