import React, { useState, useEffect } from 'react';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { PageChangeEvent } from '@/utils/interfaces/ReusableTable';
import { Space } from '@/utils/interfaces/Space';
import ReusableTable from '@/components/Shared/genericTable/ReusableTable';
import DynamicModal from '@/components/Shared/genericModal/DynamicModal';
import SpaceCreateModalFormComponent from '@/components/Form/spaceCreateModalForm/SpaceCreateModalFormComponent';
import { filters, spaceColumns, textButtons } from '@/utils/formatters/SpaceTableConfig';
import SpaceService from '@/services/space/SpaceService';
import './styles.css'
import spaceStore from '@/hooks/useSpaceData';

const Espacos: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState<Space[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const spaces = spaceStore((state) => state.spaces)
  const spaceService = new SpaceService();

  useEffect(() => {
    setData(spaces)
  }, [])

  const openModal = () => {
    setIsModalOpen(true);
    console.log('lesgo')
  };

  function handlePageChange(event: PageChangeEvent) {
    setCurrentPage(event.page);
    setPageSize(event.rows);
  }

  return (
    <div className='page p-20'>
      <h2 className="mb-6">Espaços</h2>
      <ReusableTable
        columns={spaceColumns}
        data={data}
        filters={filters}
        textButtons={textButtons}
        onRegister={{ label: 'Registrar novo espaço', onClick: openModal, icon: faAdd }}
        totalRecords={totalRecords}
        initialPage={currentPage}
        onPageChange={handlePageChange}
        redirectRow={true}
      />
      <DynamicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar novo espaço"
        component={<SpaceCreateModalFormComponent onClose={() => setIsModalOpen(false)} />}
      />
    </div>
  );
};

export default Espacos;