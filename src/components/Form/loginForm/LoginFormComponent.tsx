import CustomInputBoxComponent from "@/components/Input/customInputBox/CustomInputBoxComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Checkbox, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import ProfilePicComponent from "@/components/Icons/profilePic/ProfilePicComponent";
import "./index.css";


const LoginFormComponent = () => {
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
      setErrors({ login: "", password: "" });
      const payloadObject = {
        login: login,
        password: password,
      };
      console.log(payloadObject);
    }
  };

  return (
    <div className="flex items-center flex-col">
      <div className="dynamic-profile-pic">
        <ProfilePicComponent subject={loginRef.current?.value || "none"} />
      </div>
      <form className="login-form">
        
        <div className="w-full text-center pb-8 pt-4">
          <p className="font-semibold">Bem vindo, <span className="italic">{ loginRef.current?.value }</span>!</p>
        </div>

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
              <Checkbox color={"#F4F7F5"} outline={"none"} border={"none"} />
              <p className="font-medium">Lembrar credenciais</p>
            </div>
            <div className="flex flex-row gap-4 underline items-center">
              <FontAwesomeIcon icon={faCircleInfo} />
              <a className="italic font-medium">esqueci a senha</a>
            </div>
          </div>
        </div>
      </form>

      <button className="custom-submit-login-button" onClick={handleSubmit}>
        Entrar
      </button>
    </div>
  );
};

export default LoginFormComponent;
