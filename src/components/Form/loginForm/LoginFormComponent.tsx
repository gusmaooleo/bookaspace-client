import CustomInputBoxComponent from "@/components/Input/customInputBox/CustomInputBoxComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Checkbox, FormControl, FormErrorMessage, Input, useToast } from "@chakra-ui/react";
import ProfilePicComponent from "@/components/Icons/profilePic/ProfilePicComponent";
import { UserLogin } from "@/utils/interfaces/UserLogin";
import UserService from "@/services/user/UserService";
import { useRouter } from "next/router";
import { useUserSession } from '../../../contexts/userContext';
import Link from "next/link";
import "./index.css";


const LoginFormComponent = () => {
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rememberCheck = useRef<boolean>(false);
  const toast = useToast({ position: 'top-right' });
  const router = useRouter();
  const userService = new UserService();
  const { user, setUser } = useUserSession();

  const [errors, setErrors] = useState({ login: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasErrors = false;
    let errorMessages = { login: "", password: "" };

    const login = loginRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (!login) {
      hasErrors = true;
      errorMessages.login = "O login é obrigatório.";
    }

    if (!password) {
      hasErrors = true;
      errorMessages.password = "A senha é obrigatória.";
    }

    if (hasErrors) {
      setErrors(errorMessages);
    } else {
      const payloadObject: UserLogin = {
        login: login,
        password: password,
      };

      const promise = userService.logService(payloadObject, rememberCheck.current).then((value) => {
        setUser(value);
        setErrors({ login: "", password: "" });
      });
    
      toast.promise(promise, {
        success: { title: 'Sucesso', duration: 1000, description: 'Usuário logado, aguarde para ser redirecionado.', onCloseComplete: () => {
          router.push('/agenda')
        }},
        error: { title: 'Erro', description: 'Falha ao encontrar usuário' },
        loading: { title: 'Carregando' }
      })
    }
  };

  const redirect = () => {
    router.push('/agenda');
  }

  const exit = () => {
    setUser(null);
    userService.logOut();
  }

  return (
    <div className="flex items-center flex-col">
      <div className="dynamic-profile-pic">
        <ProfilePicComponent subject={user?.usernameUser || "none"} />
      </div>
      <form className="login-form">

        <div className="w-full text-center pb-8 pt-4">
          {user?.usernameUser && (
            <p className="font-semibold">Bem vindo, <span className="italic">{ user.usernameUser }</span>!</p>
          )}
        </div>

        {user?.id && !loginRef.current?.value ? (
          <div className="text-center">
            Você já está logado, deseja sair?
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            <FormControl isInvalid={!!errors.login}>
              <CustomInputBoxComponent
                iconProp={faUser}
                placeholder="login"
                inputRef={loginRef}
                type="text"
              />
              <FormErrorMessage>{errors.login}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <CustomInputBoxComponent
                iconProp={faKey}
                placeholder="senha"
                inputRef={passwordRef}
                type="password"
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <div className="flex flex-row justify-between px-6">
              <div className="flex flex-row gap-4">
                <Checkbox onChange={(e) => { rememberCheck.current = e.target.checked }} color={"#F4F7F5"} outline={"none"} border={"none"} />
                <p className="font-medium">Lembrar credenciais</p>
              </div>
              <div className="flex flex-row gap-4 underline items-center">
                <FontAwesomeIcon icon={faCircleInfo} />
                <Link className="italic font-medium" href={'/iforgot'}>
                  esqueci a senha
                </Link>
              </div>
            </div>
          </div>
        )}
      </form>

      {user?.id && !loginRef.current?.value ? (
        <div>
          <button className="custom-submit-login-button left-custom-button" onClick={redirect}>
            Entrar
          </button>
          <button className="custom-submit-login-button right-custom-button" onClick={exit}>
            Sair
          </button>
        </div>
      ) : (
        <button className="custom-submit-login-button" onClick={handleSubmit}>
          Entrar
        </button>
      )}
    </div>
  );
};

export default LoginFormComponent;
