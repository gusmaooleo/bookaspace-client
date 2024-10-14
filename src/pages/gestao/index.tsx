import React, { useEffect, useState } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import { Column, PageChangeEvent } from '@/utils/interfaces/ReusableTable';
import TabelaReutilizavel from '@/components/Shared/genericTable/ReusableTable';
import './styles.css';
import Database from '@/utils/Database';
import DynamicModal from '@/components/Shared/genericModal/DynamicModal';
import { faAdd, faBuildingUser, faFlaskVial, faGraduationCap, faSchool } from '@fortawesome/free-solid-svg-icons';
import CreateUserFormComponent from '@/components/Form/createUserForm/createUserFormComponent';
import { User } from '@/utils/interfaces/User';
import GestaoService from '@/services/gestao/GestaoService';
import DeleteTextModalComponent from '@/components/UserInterface/deleteTextModal/DeleteTextModalComponent';
import { Audit } from '@/utils/interfaces/Audit';

type ModalType = 'create' | 'edit' | 'delete' | null;

const gestao = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [usuariosData, setUsuariosData] = useState<User[]>([]);
  const [auditsData, setAuditsData] = useState<Audit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await GestaoService.getUsers();
        setUsuariosData(Array.isArray(users) ? users : []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsuariosData([]);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAudits = async () => {
      try {
        const audits = await GestaoService.getAudits();
        setAuditsData(Array.isArray(audits) ? audits : []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setAuditsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudits();
    fetchUsers();
  }, []);

  const eventosColumns = [
    { header: 'Usuário', key: 'username' },
    { header: 'Tipo de evento', key: 'action' },
    { header: 'Data', key: 'timestamp' },
  ];

  const usuariosColumns: Column[] = [
    { header: '', key: 'username', type: 'avatar' },
    { header: 'Login', key: 'login' },
    { header: 'Nome do usuário', key: 'username' },
    { header: 'Cargo', key: 'role' },
    { header: 'Ações', key: 'acoes' },
  ];

  const textButtonsEvents = [
    { placeholder: 'Usuário', icon: faUser },
    { placeholder: 'Tipo de evento', icon: faCalendar },
  ];

  const textButtonsUser = [
    { placeholder: 'Usuário', icon: faUser, variant: 'dark' },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleSubmitSpace = (formData: Record<string, string>) => {
    console.log('Novo espaço:', formData);
    setIsModalOpen(false);
  };

  const handleRegister = () => {
    setModalType('create');
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    const user = usuariosData.find(u => u.id === userId);
    setSelectedUser(user || null);
    setModalType('delete');
    setIsModalOpen(true);
  };

  const handleEditUser = (userId: number) => {
    const user = usuariosData.find(u => u.id === userId);
    setSelectedUser(user || null);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedUser(null);
  };

  const handleSubmitModal = (formData: Record<string, string>) => {
    console.log('Enviado', formData);
    switch (modalType) {
      case 'create':
        break;
      case 'edit':
        break;
      case 'delete':
        break;
    }
    handleCloseModal();
  };

  const renderModalComponent = () => {
    switch (modalType) {
      case 'create':
        return <CreateUserFormComponent onClose={() => setIsModalOpen(false)}  submitButtonLabel='Criar usuário'/>;
      case 'edit':
        return <CreateUserFormComponent onClose={() => setIsModalOpen(false)} user={selectedUser ?? undefined} submitButtonLabel='Editar usuário' />;
      case 'delete':
        return <DeleteTextModalComponent onClose={() => setIsModalOpen(false)} idUser={selectedUser?.id ?? undefined}/>;
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'create':
        return 'Criar usuário';
      case 'edit':
        return 'Editar usuário';
      case 'delete':
        return 'Excluir usuário';
      default:
        return '';
    }
  };

  const handlePageChange = (event: PageChangeEvent) => {
    setCurrentPage(event.page);
    setPageSize(event.rows);
  };

  return (
    <div className='page p-20'>
      <Flex justifyContent="space-between" mb={8}>
        <Box flex={1} mr={4}>
          <h2 className='mb-6'>Rastreador de eventos</h2>
          <TabelaReutilizavel
            columns={eventosColumns}
            data={auditsData}
            filters={[]}
            textButtons={textButtonsEvents}
            totalRecords={auditsData.length}
            initialPage={currentPage}
            rowsPerPageOptions={[10]}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </Box>
        <Box flex={1} ml={4}>
          <h2 className='mb-6'>Usuários</h2>
          <TabelaReutilizavel
            columns={usuariosColumns}
            data={usuariosData.map(user => ({
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
            filters={[]}
            colorHeader='white'
            textButtons={textButtonsUser}
            totalRecords={usuariosData.length}
            initialPage={currentPage}
            onRegister={{ label: 'Criar usuário', onClick: handleRegister, colorBg: 'white', icon: faPlus, colorText: 'black' }}
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
}



export default gestao;
