import React, { useEffect, useState } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { PageChangeEvent } from "@/utils/interfaces/ReusableTable";
import { User } from "@/utils/interfaces/User";
import { FormatRole } from "@/utils/formatters/GeneralStateFormatter";
import { Audit } from "@/utils/interfaces/Audit";
import { useUsers } from "@/hooks/useUser";
import { GetServerSideProps } from "next";
import {
  eventosColumns,
  usuariosColumns,
} from "@/utils/formatters/ManagerTablesConfig";
import ReusableTable from "@/components/Shared/genericTable/ReusableTable";
import DynamicModal from "@/components/Shared/genericModal/DynamicModal";
import GestaoService from "@/services/gestao/GestaoService";
import CreateEditUserFormComponent from "@/components/Form/createUserForm/createUserFormComponent";
import DeleteUserModalComponent from "@/components/UserInterface/deleteUserModal/DeleteUserModalComponent";
import UserFilterComponent from "@/components/Filter/userFilter/UserFilterComponent";
import UserService from "@/services/user/UserService";
import "./styles.css";

type ModalType = "create" | "edit" | "delete" | null;

/**
 * @todo Melhorar estrutura e performance do componente "gestao". Esse componente deve apenas renderizar elementos, e não validar, formatar e filtrar.
 * @param context
 * @returns
 */

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { req } = context;
    const cookies: string = req.cookies["user_token"] || "";
    const userService = new UserService();

    const response = await userService.getMe(cookies);

    if (response.roles[0].id === 1) {
      return { props: {} };
    } else {
      return {
        redirect: {
          destination: "/error",
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
};

const Gestao = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [usuariosData, setUsuariosData] = useState<User[]>([]);
  const [auditsData, setAuditsData] = useState<Audit[]>([]);
  const [auditsDataConstant, setAuditsDataConstant] = useState<Audit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userFilter, setUserFilter] = useState<string>("");
  const [userEtFilter, setUserEtFilter] = useState<string>("");
  const { getUsers } = useUsers();

  const handleFilterUser = () => {
    if (userFilter !== "") {
      let dummy: User[] = getUsers
        .map((obj) => ({
          ...obj,
          roleName: FormatRole(obj.roles[0].id),
        }))
        .filter((item) =>
          item.usernameUser.toLowerCase().includes(userFilter.toLowerCase())
        );
      setUsuariosData(dummy);
    } else {
      loadUsers();
    }
  };

  const handleEtFilterUser = () => {
    if (userEtFilter !== "") {
      let dummy: Audit[] = auditsData.map((obj) => ({ ...obj }));
      console.log(dummy);
      setAuditsData(
        dummy.filter((item) =>
          item.username.toLowerCase().includes(userEtFilter.toLowerCase())
        )
      );
    } else {
      setAuditsData(auditsDataConstant);
    }
  };

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const audits = await GestaoService.getAudits();
        const reversedAudit = [...audits].reverse();
        setAuditsData([...reversedAudit]);
        setAuditsDataConstant([...reversedAudit]);
      } catch (error) {
        console.error("Error fetching users:", error);
        setAuditsData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAudits();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [getUsers]);

  const loadUsers = () => {
    let dummy: User[] = getUsers.map((obj) => ({ ...obj }));
    dummy.map((obj) => {
      obj.roleName = FormatRole(obj.roles[0].id);
    });
    setUsuariosData(dummy);
  };

  const handleRegister = () => {
    setModalType("create");
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    const user = usuariosData.find((u) => u.id === userId);
    setSelectedUser(user || null);
    setModalType("delete");
    setIsModalOpen(true);
  };

  const handleEditUser = (userId: number) => {
    const user = usuariosData.find((u) => u.id === userId);
    setSelectedUser(user || null);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedUser(null);
  };

  const renderModalComponent = () => {
    switch (modalType) {
      case "create":
        return (
          <CreateEditUserFormComponent
            onClose={() => setIsModalOpen(false)}
            submitButtonLabel="Criar usuário"
          />
        );
      case "edit":
        return (
          <CreateEditUserFormComponent
            onClose={() => setIsModalOpen(false)}
            user={selectedUser ?? undefined}
            submitButtonLabel="Editar usuário"
          />
        );
      case "delete":
        return (
          <DeleteUserModalComponent
            onClose={() => setIsModalOpen(false)}
            idUser={selectedUser?.id ?? undefined}
          />
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case "create":
        return "Criar usuário";
      case "edit":
        return "Editar usuário";
      case "delete":
        return "Excluir usuário";
      default:
        return "";
    }
  };

  const handlePageChange = (event: PageChangeEvent) => {
    setCurrentPage(event.page);
    setPageSize(event.rows);
  };

  return (
    <div className="page p-20">
      <Flex justifyContent="space-between" mb={8}>
        <Box flex={1} mr={4}>
          <h2 className="mb-6 page-title-margin">Rastreador de eventos</h2>
          <ReusableTable
            columns={eventosColumns}
            data={auditsData}
            totalRecords={auditsData.length}
            initialPage={currentPage}
            rowsPerPageOptions={[10]}
            onPageChange={handlePageChange}
            isLoading={isLoading}
            filtersComponent={
              <UserFilterComponent
                theme="light"
                nameValue={setUserEtFilter}
                triggerFilter={handleEtFilterUser}
              />
            }
          />
        </Box>

        <Box flex={1} ml={4}>
          <h2 className="mb-6 page-title-margin">Usuários</h2>
          <ReusableTable
            columns={usuariosColumns}
            data={usuariosData.map((user) => ({
              ...user,
              acoes: (
                <Flex>
                  <IconButton
                    aria-label="Excluir usuário"
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    colorScheme="red"
                    onClick={() => handleDeleteUser(user.id)}
                  />
                  <IconButton
                    aria-label="Editar usuário"
                    icon={<FontAwesomeIcon icon={faEdit} />}
                    colorScheme="green"
                    ml={2}
                    onClick={() => handleEditUser(user.id)}
                  />
                </Flex>
              ),
            }))}
            filtersComponent={
              <UserFilterComponent
                theme="dark"
                nameValue={setUserFilter}
                triggerFilter={handleFilterUser}
              />
            }
            colorHeader="white"
            totalRecords={usuariosData.length}
            initialPage={currentPage}
            onRegister={{
              label: "Criar usuário",
              onClick: handleRegister,
              colorBg: "white",
              icon: faPlus,
              colorText: "black",
              display: true,
            }}
            rowsPerPageOptions={[7]}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </Box>
      </Flex>
      <DynamicModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={getModalTitle()}
        component={renderModalComponent()}
      />
    </div>
  );
};

export default Gestao;
