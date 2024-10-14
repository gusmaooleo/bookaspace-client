import React, { FC, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import WarningTextComponent from "@/components/UserInterface/warningText/WarningTextComponent";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "@/components/Shared/genericTable/CustomSelect";
import {
  faBuildingUser,
  faFlaskVial,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "@/utils/interfaces/User";
import { Roles } from "@/utils/interfaces/Roles";
import UserService from "@/services/user/UserService";

interface CreateUserFormComponentProps {
  onClose: () => void;
  user?: User;
  submitButtonLabel: string;
}

const CreateUserFormComponent: FC<CreateUserFormComponentProps> = ({ onClose, user,
  submitButtonLabel, }) => {
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toast = useToast();
  const userService = new UserService();

  useEffect(() => {
    if (user) {
      setLogin(user.login);
      setName(user.username);
      const userRole = user?.role?.find(r => roleOptions.some(option => option.value === r.authority));
      if (userRole) {
        setRole(userRole.authority);
      }
    }
  }, [user]);

  const roleOptions = [
    { label: "Administrador", value: "ROLE_ADMIN", icon: faGraduationCap, color: "black" },
    { label: "Gestor", value: "ROLE_MANAGER", icon: faBuildingUser },
    { label: "Professor", value: "ROLE_TEACHER", icon: faFlaskVial },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        status: "error",
        position: "top-right",
      });
      return;
    }

    const selectedRole = roleOptions.find(option => option.value === role);
    const roleId = selectedRole?.value === "ROLE_ADMIN" ? 1 : selectedRole?.value === "ROLE_MANAGER" ? 2 : 3;
    console.log(roleId);

    try {
      if (user) {
        const updateData = {
          id: user.id,
          username: name,
          login: login,
          roles: [{ id: roleId, authority: selectedRole?.value as string }],
        };
        await userService.updateUser(user.id, updateData);
        toast({
          title: "Sucesso",
          description: "Usuário atualizado com sucesso.",
          status: "success",
          position: "top-right",
        });
        onClose();
      }
      else{
        const userData = {
          username: name,
          login: login,
          password: password,
          roles: [{ id: roleId }],
        };

        await userService.createUser(userData);

        setLogin("");
        setName("");
        setRole("");
        setPassword("");
        setConfirmPassword("");

        toast({
          title: "Sucesso",
          description: "Usuário criado com sucesso.",
          status: "success",
          position: "top-right",
        });
        onClose();
      }
      
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        title: "Erro",
        description: "Falha ao criar usuário. Por favor, tente novamente.",
        status: "error",
        position: "top-right",
      });
    }
  };

  const canSubmit = user
    ? login && name && role
    : login && name && role && password && confirmPassword && password === confirmPassword;

  return (
    <div className="space-create-user-container">
      <form
        className="space-create-user-form-container p-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-[2vmin] text-[#f4f7f5]">
          <FormControl isInvalid={login === ""}>
            <FormLabel>Login do usuário</FormLabel>
            <Input
              placeholder="Login do usuário"
              variant="light"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </FormControl>

          <FormControl isInvalid={name === ""}>
            <FormLabel>Nome do usuário</FormLabel>
            <Input
              placeholder="Nome do usuário"
              variant="light"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>

          <FormControl isInvalid={role === null}>
            <FormLabel>Cargo do usuário</FormLabel>
            <CustomSelect
              options={roleOptions}
              placeholder="Cargo do usuário"
              setValue={setRole}
              value={role}
            />
          </FormControl>

          {!user && (
            <>
              <FormControl isInvalid={password === ""}>
                <FormLabel>Senha</FormLabel>
                <Input
                  placeholder="Senha"
                  variant="light"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>

              <FormControl
                isInvalid={confirmPassword === "" || password !== confirmPassword}
              >
                <FormLabel>Confirme a senha</FormLabel>
                <Input
                  placeholder="Confirme a senha"
                  variant="light"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <WarningTextComponent
                  condition={password !== confirmPassword}
                  text={"As senhas não coincidem"}
                  icon={faTriangleExclamation}
                />
              </FormControl>
            </>
          )}
        </div>
        <div className="flex w-full justify-end mt-12">
          <Button variant={"outline"} mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button variant={'submit'} type="submit" isDisabled={!canSubmit}>
            {submitButtonLabel}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserFormComponent;
