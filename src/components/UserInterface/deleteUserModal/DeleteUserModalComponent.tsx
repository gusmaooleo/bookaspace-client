import { Button, Icon, useToast, } from "@chakra-ui/react";
import { Box, Text, Flex } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { useUsers } from "@/hooks/useUser";
import UserService from "@/services/user/UserService";

interface DeleteUserFormComponentProps {
  onClose: () => void;
  idUser?: number;
}

const DeleteUserModalComponent: FC<DeleteUserFormComponentProps> = ({ onClose, idUser, }) =>{
  const userService = new UserService();
  const toast = useToast();
  const { setUsers } = useUsers()

  const handleSubmit = async () => {
    try {
      if (idUser != undefined) {
          await userService.deleteUser(idUser);
          toast({
            title: "Sucesso",
            description: "Usuário excluído com sucesso.",
            status: "success",
            position: "top-right",
          });
          setUsers();
          onClose();
        }
    } catch (error) {
      console.error("Error delete user:", error);
      toast({
        title: "Erro",
        description: "Falha ao deletar usuário. Por favor, tente novamente.",
        status: "error",
        position: "top-right",
      });
    }
  };

  return (
    <Box padding={'1.5rem'}>
      <Text fontSize="16px" fontWeight="bold" color="white" mb={2}>
        {"Tem certeza que deseja excluir o usuário?"}
      </Text>
      <Flex mt={2} align="center">
        <Text fontSize="14px" color="red.500" fontWeight={'600'}>
          {"Esta ação não pode ser desfeita."}
        </Text>
      </Flex>
      <div className="flex w-full justify-end mt-8">
        <Button variant={"outline"} mr={3} onClick={onClose}>
          Cancelar
        </Button>
        <Button variant={'submit'} type="submit" onClick={handleSubmit}>
          {"Deletar"}
        </Button>
      </div>
    </Box>
  );

};
export default DeleteUserModalComponent;
