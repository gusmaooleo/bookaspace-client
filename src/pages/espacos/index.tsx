import React, { useState, useEffect } from 'react';
import { faAdd, faBuildingUser, faFlaskVial, faGraduationCap, faSchool } from '@fortawesome/free-solid-svg-icons';
import { PageChangeEvent } from '@/utils/interfaces/ReusableTable';
import { Space } from '@/utils/interfaces/Space';
import ReusableTable from '@/components/Shared/genericTable/ReusableTable';
import Database from '@/utils/Database';
import './styles.css'
import DynamicModal from '@/components/Shared/genericModal/DynamicModal';
import type { Field } from '@/components/Shared/genericModal/DynamicModal';
import SpaceCreateModalFormComponent from '@/components/Form/spaceCreateModalForm/SpaceCreateModalFormComponent';

const Espacos: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState<Space[]>(Database.spaces);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { header: 'Nome do espaço', key: 'name' },
    { header: 'Tipo', key: 'type' },
    { header: 'Capacidade', key: 'capacity' },
    { header: 'Disponibilidade', key: 'status', type: 'badge' as const },
    { header: 'Criado em', key: 'creation', type: 'date' as const },
  ];

  const filters = [
    { placeholder: 'Disponibilidade', options: [{ label: "Todos", }, { label: 'Disponível', color: '#68d68a' }, { label: 'Indisponível', color: '#f97e7a' }] },
    { placeholder: 'Tipo', options: [{ label: "Todos" }, { label: 'Sala de aula', icon: faGraduationCap }, { label: 'Auditório', icon: faBuildingUser }, { label: 'Laboratório', icon: faFlaskVial }] },
  ];

  const spaceFields: Field[] = [
    { name: 'name', label: 'Nome do espaço', type: 'text', placeholder: 'Digite o nome do espaço', icon: faSchool },
    {
      name: 'type',
      label: 'Tipo do espaço',
      type: 'select',
      placeholder: 'Selecione o tipo',
      options: [{ label: 'Sala de aula', icon: faGraduationCap }, { label: 'Auditório', icon: faBuildingUser }, { label: 'Laboratório', icon: faFlaskVial }],
    },
    { name: 'capacity', label: 'Capacidade do espaço', type: 'text', placeholder: 'Digite a capacidade', icon: faBuildingUser },
    { name: 'description', label: 'Descrição resumida dos recursos do espaço', type: 'textarea', placeholder: 'Descreva os recursos' },
  ];

  const textButtons = [
    { placeholder: 'Capacidade', icon: faBuildingUser },
    { placeholder: 'Nome do espaço', icon: faSchool },
  ];

  const handleRegister = () => {
    setIsModalOpen(true);
    console.log('lesgo')
  };

  const handleSubmitSpace = (formData: Record<string, string>) => {
    console.log('Novo espaço:', formData);
    setIsModalOpen(false);
  };

  function handlePageChange(event: PageChangeEvent) {
    setCurrentPage(event.page);
    setPageSize(event.rows);
  }

  return (
    <div className='page p-20'>
      <h2 className="mb-6">Espaços</h2>
      <ReusableTable
        columns={columns}
        data={data}
        filters={filters}
        textButtons={textButtons}
        onRegister={{ label: 'Registrar novo espaço', onClick: handleRegister, icon: faAdd }}
        totalRecords={totalRecords}
        initialPage={currentPage}
        onPageChange={handlePageChange}
        redirectRow={true}
      />
      <DynamicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitSpace}
        title="Registrar novo espaço"
        fields={spaceFields}
        component={<SpaceCreateModalFormComponent />}
      />
    </div>
  );
};

export default Espacos;