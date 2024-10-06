import { Box } from '@chakra-ui/react';
import './styles.css'
import TabelaReutilizavel from '@/components/Solicitacao/TabelaReutilizavel';
import React from 'react';
import { faArrowDown, faArrowUp, faCheck, faPerson, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

const solicitacoes = () => {
  
  const columns = [
    { header: 'Solicitante', key: 'solicitante' },
    { header: 'Título da solicitação', key: 'titulo' },
    { header: 'Período', key: 'periodo' },
    { header: 'Status', key: 'status', type: 'badge' as const },
  { header: 'Criado em', key: 'criadoEm', type: 'date' as const },
  
  ];

  const data = [
    {
      solicitante: 'alice',
      titulo: 'Reserva UCSal',
      periodo: '10/10/2024 14:00 às 10/10/2024 14:00',
      status: { label: 'Aguardando aprovação', color: 'yellow' },
      criadoEm: 'criado em: 10/10/2024 14:00',
    },
  ];

  const filters = [
    { placeholder: 'Ordenar por', options: [{ label: 'Mais recente', icon: faArrowUp }, { label: 'Mais antigo', icon: faArrowDown },] },
    { placeholder: 'Status', options: [{ label: 'Aguardando aprovação', color: 'yellow' }, { label: 'Aprovada', color: 'green' }, { label: 'Reprovada', color: 'red' }, { label: 'Fora do prazo', color: 'gray' },] },
  ];

  const textButtons = [
    { placeholder: 'Título de solicitação', icon: faSearch },
    { placeholder: 'Solicitante', icon: faPerson },
  ];

  const handleRegister = () => {
    console.log('Registrar novo espaço');
  };

  return (
    <TabelaReutilizavel
      columns={columns}
      data={data}
      filters={filters}
      textButtons={textButtons}
    />
  );
};

export default solicitacoes;