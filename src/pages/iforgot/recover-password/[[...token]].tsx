import WarningTextComponent from "@/components/UserInterface/warningText/WarningTextComponent";
import UserService from "@/services/user/UserService";
import { Button, FormLabel, Input, useToast } from "@chakra-ui/react";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Iforgot from "../wrapper";


type Props = { token: string };

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const token = ctx.params!.token![0];

    if (typeof token !== "string") {
      return { notFound: true };
    }

    const userService = new UserService();
    const response = await userService.validateRecoverToken({ token });
    if (response) {
      return {
        props: { token }
      };
    }
  } catch (error) {
    console.error(error);
  } finally {
    return {
      props: {},
    };
  }
};

const RecoverPassword: NextPage<Props> = ({ token }) => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const userService = new UserService();
  const toast = useToast();
  console.log(token);

  const submitFunction = async () => {
    if (password !== passwordConfirmation) return;
    const body = { token, password };
    const response = await userService.changePassword(body);
    if (response.status === 200) {
      toast({
        status: 'success',
        title: "Senha redefinida com sucesso",
        onCloseComplete: () => {
          redirectToLogin();
        }
      })
    }
    toast({
      status: 'error',
      title: "Erro ao redefinir senha"
    })
  };

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <Iforgot>
      <div className="flex flex-col items-center gap-[1rem]">
        <h3>Recuperação de conta</h3>
        <form
          className="flex flex-col gap-[1.5rem] w-auto h-auto rounded-lg p-[2rem] account-recover-element"
          onSubmit={submitFunction}
        >
          <div>
            <FormLabel htmlFor="password-field" color={"#f0f0f0"}>
              Digite uma nova senha
            </FormLabel>
            <Input
              type="password"
              variant="light"
              value={password}
              onChange={(e) =>
                e.target.value === " "
                  ? setPassword("")
                  : setPassword(e.target.value)
              }
              required
              maxLength={40}
            />
          </div>

          <div className="mb-[2rem]">
            <FormLabel htmlFor="confirm-password-field" color={"#f0f0f0"}>
              Confirme a senha
            </FormLabel>
            <Input
              type="password"
              variant="light"
              value={passwordConfirmation}
              onChange={(e) =>
                e.target.value === " "
                  ? setPasswordConfirmation("")
                  : setPasswordConfirmation(e.target.value)
              }
              required
              maxLength={40}
            />
            <WarningTextComponent
              condition={password !== passwordConfirmation}
              text={"As senhas precisam ser iguais"}
              icon={faTriangleExclamation}
            />
          </div>

          <Button
            backgroundColor={
              password === passwordConfirmation ? "#68d68a" : "#999999"
            }
            _hover={{
              backgroundColor:
                password === passwordConfirmation ? "#9edbb2" : "#bbbbbb",
            }}
            type="submit"
          >
            Redefinir senha
          </Button>
        </form>
        <Button onClick={redirectToLogin}>Voltar para o login</Button>
      </div>
    </Iforgot>
  );
};

export default RecoverPassword;
