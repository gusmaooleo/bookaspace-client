import './styles.css'

import { Box } from '@chakra-ui/react';
import './styles.css'
import TabelaReutilizavel from '@/components/Solicitacao/TabelaReutilizavel';
import React, { useState, useEffect } from 'react';
import { faBuildingUser, faFlaskVial, faGraduationCap, faSchool } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faGitlab } from '@fortawesome/free-brands-svg-icons';
import { PageChangeEvent } from '@/components/Solicitacao/TabelaReutilizavel.d';


const espacos = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const [data, setData] = useState([
    {
      nome: 'Sala b406 UCSal',
      tipo: 'Sala de aula',
      capacidade: 'Capacidade: 40 pessoas',
      disponibilidade: { label: 'Disponível', color: 'green' },
      criadoEm: 'criado em: 10/10/2024 14:00',
    },
  ]);

  const columns = [
    { header: 'Nome do espaço', key: 'nome' },
    { header: 'Tipo', key: 'tipo' },
    { header: 'Capacidade', key: 'capacidade' },
    { header: 'Disponibilidade', key: 'disponibilidade', type: 'badge' as const },
    { header: 'Criado em', key: 'criadoEm', type: 'date' as const },
  ];

  // const data = [
  //   {
  //     nome: 'Sala b406 UCSal',
  //     tipo: 'Sala de aula',
  //     capacidade: 'Capacidade: 40 pessoas',
  //     disponibilidade: { label: 'Disponível', color: 'green' },
  //     criadoEm: 'criado em: 10/10/2024 14:00',
  //   },
  // ];

  const filters = [
    { placeholder: 'Disponibilidade', options: [{ label: 'Disponível', color: 'green' }, { label: 'Indisponível', color: 'red' }] },
    { placeholder: 'Disponibilidade', options: [{ label: 'Sala de aula', icon: faGraduationCap }, { label: 'Auditório', icon: faBuildingUser }, { label: 'Laboratório', icon: faFlaskVial }] },
  ];

  const textButtons = [
    { placeholder: 'Capacidade', icon: faBuildingUser },
    { placeholder: 'Nome do espaço', icon: faSchool },
  ];

  const handleRegister = () => {
    console.log('Registrar novo espaço');
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/solicitacoes?page=${currentPage}&pageSize=${pageSize}`);
      const result = await response.json();
      setData(result.data);
      setTotalRecords(result.totalRecords);
    };

    fetchData();
  }, [currentPage, pageSize]);

  function handlePageChange(event: PageChangeEvent) {
    setCurrentPage(event.page);
    setPageSize(event.rows);
  }

  return (
    <div>
      <h2 className="mb-3">Registro de espaços</h2>
      <TabelaReutilizavel
        columns={columns}
        data={data}
        filters={filters}
        textButtons={textButtons}
        onRegister={{ label: 'Registrar novo espaço', onClick: handleRegister }}
        totalRecords={totalRecords}
        initialPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );

};

export default espacos;


