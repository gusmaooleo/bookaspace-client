import React, { useState } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import TabelaReutilizavel from '@/components/Solicitacao/TabelaReutilizavel';
import './styles.css';
import { PageChangeEvent } from '@/components/Solicitacao/TabelaReutilizavel.d';

const gestao = () => {

  const eventosData = [
    { usuario: 'johndoe', tipo: 'solicitou uma reserva', data: '10/10/2024 às 14:00' },
    { usuario: 'alice', tipo: 'saiu', data: '10/10/2024 às 14:00' },
    { usuario: 'alice', tipo: 'logou-se', data: '10/10/2024 às 14:00' },
    { usuario: 'bob', tipo: 'editou uma reserva', data: '10/10/2024 às 14:00' },
    { usuario: 'bob', tipo: 'solicitou uma reserva', data: '10/10/2024 às 14:00' },
    { usuario: 'johndoe', tipo: 'aprovou uma reserva', data: '10/10/2024 às 14:00' },
    { usuario: 'johndoe', tipo: 'solicitou uma reserva', data: '10/10/2024 às 14:00' },
    { usuario: 'johndoe', tipo: 'solicitou uma reserva', data: '10/10/2024 às 14:00' },
    { usuario: 'johndoe', tipo: 'solicitou uma reserva', data: '10/10/2024 às 14:00' },
    { usuario: 'johndoe', tipo: 'solicitou uma reserva', data: '10/10/2024 às 14:00' },
  ];

  const usuariosData = [
    { avatar: '👤', loginssons: 'Username', username: 'Admin', role: 'Admin' },
    { avatar: '👤', loginssons: 'John Doe', username: 'johndoe', role: 'Gestor' },
    { avatar: '👤', loginssons: 'Alice', username: 'alice', role: 'Professor' },
    { avatar: '👤', loginssons: 'Robert', username: 'bob', role: 'Professor' },
    { avatar: '👤', loginssons: 'Robert', username: 'bob', role: 'Professor' },
    { avatar: '👤', loginssons: 'Robert', username: 'bob', role: 'Professor' },
    { avatar: '👤', loginssons: 'Robert', username: 'bob', role: 'Professor' },
    { avatar: '👤', loginssons: 'Robert', username: 'bob', role: 'Professor' },
    { avatar: '👤', loginssons: 'Robert', username: 'bob', role: 'Professor' },
  ];

  const eventosColumns = [
    { header: 'Usuário', key: 'usuario' },
    { header: 'Tipo de evento', key: 'tipo' },
    { header: 'Data', key: 'data' },
  ];

  const usuariosColumns = [
    { header: '', key: 'avatar' },
    { header: 'Login', key: 'loginssons' },
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

  const handleRegister = () => {
    console.log('Registrar novo Usuário');
  };

  const handlePageChange = (event: PageChangeEvent) => {
    setCurrentPage(event.page);
    setPageSize(event.rows);
  };

  return (
    <div className='page p-20'>
      <Flex justifyContent="space-between" mb={8}>
        <Box flex={1} mr={4}>
          <h2>Rastreador de eventos</h2>
          <TabelaReutilizavel
            columns={eventosColumns}
            data={eventosData}
            filters={[]}
            textButtons={textButtonsEvents}
            totalRecords={eventosData.length}
            initialPage={currentPage}
            rowsPerPageOptions={[10, 20, 30]}
            onPageChange={handlePageChange}
          />
        </Box>
        <Box flex={1} ml={4}>
          <h2>Rastreador de eventos</h2>
          <TabelaReutilizavel
            columns={usuariosColumns}
            data={usuariosData.map(user => ({
              ...user,
              acoes: (
                <Flex>
                  <IconButton
                    aria-label="Excluir usuário"
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    size="sm"
                    colorScheme="red"
                  />
                  <IconButton
                    aria-label="Editar usuário"
                    icon={<FontAwesomeIcon icon={faEdit} />}
                    size="sm"
                    colorScheme="green"
                    ml={2}
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
            rowsPerPageOptions={[10, 20, 30]}
            onPageChange={handlePageChange}
          />
        </Box>
      </Flex>
    </div>
  );
}



export default gestao;

