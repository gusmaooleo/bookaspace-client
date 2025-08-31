import { FormEvent, useRef } from "react";
import CustomInputBoxComponent from "@/components/Input/customInputBox/CustomInputBoxComponent";
import { Button, FormLabel, useToast } from "@chakra-ui/react";
import Image from "next/image";
import forgotPassword from "@/../public/images/forgot-password.svg";
import { useRouter } from "next/router";
import UserService from "@/services/user/UserService";
import "./styles.css";
import Iforgot from "./wrapper";

export default function IforgotForm() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const userEmailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const toast = useToast();
  const userService = new UserService();

  const redirectToLogin = () => {
    router.push("/login");
  };

  const submitFunction = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const email = userEmailRef.current?.value;
      if (!email) {
        toast({
          status: "error",
          title: "Insira o email antes de prosseguir",
        });
        return;
      }
      const payload = { email };
      const response = await userService.requestRecoverPassword(payload);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Iforgot>
      <div className="flex flex-col items-center gap-[1rem]">
        <Image src={forgotPassword} alt="forgot-password" width={300} />
        <h3>Recuperação de conta</h3>
        <form
          className="flex flex-col gap-[1.5rem] w-auto h-auto rounded-lg p-[2rem] account-recover-element"
          onSubmit={submitFunction}
        >
          <div>
            <FormLabel htmlFor="username-field" color={"#f0f0f0"}>
              Digite o nome do usuário
            </FormLabel>
            <CustomInputBoxComponent
              placeholder=""
              inputRef={usernameRef}
              type="text"
              id="username-field"
            />
          </div>

          <div className="mb-[2rem]">
            <FormLabel htmlFor="email-field" color={"#f0f0f0"}>
              Digite o e-mail
            </FormLabel>
            <CustomInputBoxComponent
              placeholder="usuario@exemplo.com"
              inputRef={userEmailRef}
              type="email"
              id="email-field"
            />
          </div>

          <Button
            backgroundColor={"#68d68a"}
            _hover={{ backgroundColor: "#9edbb2" }}
            type="submit"
          >
            Enviar código de recuperação
          </Button>
        </form>
        <Button onClick={redirectToLogin}>Voltar para o login</Button>
      </div>
    </Iforgot>
  );
}
