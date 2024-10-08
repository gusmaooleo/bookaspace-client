import TabelaReutilizavel from '@/components/Solicitacao/TabelaReutilizavel';
import React, { useState, useEffect } from 'react';
import { faAdd, faBuildingUser, faFlaskVial, faGraduationCap, faSchool } from '@fortawesome/free-solid-svg-icons';
import { PageChangeEvent } from '@/components/Solicitacao/TabelaReutilizavel.d';
import { Space } from '@/utils/interfaces/Space';
import Database from '@/utils/Database';
import './styles.css'


const espacos = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const [data, setData] = useState<Space[]>(Database.spaces);

  const columns = [
    { header: 'Nome do espaço', key: 'name' },
    { header: 'Tipo', key: 'type' },
    { header: 'Capacidade', key: 'capacity' },
    { header: 'Disponibilidade', key: 'status', type: 'badge' as const },
    { header: 'Criado em', key: 'creation', type: 'date' as const },
  ];

  const filters = [
    { placeholder: 'Disponibilidade', options: [{ label: 'Disponível', color: '#68d68a' }, { label: 'Indisponível', color: '#f97e7a' }] },
    { placeholder: 'Tipo', options: [{ label: 'Sala de aula', icon: faGraduationCap }, { label: 'Auditório', icon: faBuildingUser }, { label: 'Laboratório', icon: faFlaskVial }] },
  ];

  const textButtons = [
    { placeholder: 'Capacidade', icon: faBuildingUser },
    { placeholder: 'Nome do espaço', icon: faSchool },
  ];

  const handleRegister = () => {
    console.log('Registrar novo espaço');
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`/api/solicitacoes?page=${currentPage}&pageSize=${pageSize}`);
  //     const result = await response.json();
  //     setData(result.data);
  //     setTotalRecords(result.totalRecords);
  //   };

  //   fetchData();
  // }, [currentPage, pageSize]);

  function handlePageChange(event: PageChangeEvent) {
    setCurrentPage(event.page);
    setPageSize(event.rows);
  }

  return (
    <div className='page p-20'>
      <h2 className="mb-6">Espaços</h2>
      <TabelaReutilizavel
        columns={columns}
        data={data}
        filters={filters}
        textButtons={textButtons}
        onRegister={{ label: 'Registrar novo espaço', onClick: handleRegister, icon: faAdd }}
        totalRecords={totalRecords}
        initialPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );

};

export default espacos;


