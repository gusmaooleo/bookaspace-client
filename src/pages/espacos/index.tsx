import React, { useState, useEffect } from "react";
import {
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import { SpaceFilterModel } from "@/utils/interfaces/SpaceFilterModel";
import { PageChangeEvent } from "@/utils/interfaces/ReusableTable";
import { spaceColumns } from "@/utils/formatters/SpaceTableConfig";
import { useSpace } from "@/hooks/useSpace";
import { Space } from "@/utils/interfaces/Space";
import SpaceCreateModalFormComponent from "@/components/Form/spaceCreateModalForm/SpaceCreateModalFormComponent";
import SpaceFilterComponent from "@/components/Filter/spaceFilter/SpaceFilterComponent";
import ReusableTable from "@/components/Shared/genericTable/ReusableTable";
import DynamicModal from "@/components/Shared/genericModal/DynamicModal";
import SpaceService from "@/services/space/SpaceService";
import "./styles.css";
import { useUserSession } from "@/contexts/userContext";

const Espacos: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [data, setData] = useState<Space[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalRecords, setTotalRecords] = useState<number>(data.length);
  const { getSpaces } = useSpace();

  const [tipo, setTipo] = useState<string>("");
  const [spaceName, setSpaceName] = useState<string>("");
  const [spaceCapacity, setSpaceCapacity] = useState<string>("");
  const { user } = useUserSession();

  const spaceService = new SpaceService();


  const handleFilter = async () => {
    const filter: SpaceFilterModel = {
      type: tipo,
      spaceName: spaceName,
      spaceCapacity: spaceCapacity,
    };

    if (filter.type === '' && filter.spaceName === '' && filter.spaceCapacity === '') {
      setData(getSpaces);
    } else {
      const data = await spaceService.spaceFilter(filter);
      setData(data);
    }
  };

  useEffect(() => {
    setData(getSpaces);
    setTotalRecords(getSpaces.length)
  }, [getSpaces]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  function handlePageChange(event: PageChangeEvent) {
    setCurrentPage(event.page);
    setPageSize(event.rows);
  }

  return (
    <div className="page p-20">
      <h2 className="mb-6 page-title-margin">Espaços</h2>
      <ReusableTable
        columns={spaceColumns}
        data={data}
        onRegister={
          user?.roles[0].id === 1 ? 
          {
            label: "Registrar novo espaço",
            onClick: openModal,
            icon: faAdd,
            display: true
          } : { display: false }
        }
        totalRecords={totalRecords}
        initialPage={currentPage}
        onPageChange={handlePageChange}
        redirectRow={true}


        filtersComponent={
          <SpaceFilterComponent
            typeValue={setTipo}
            spaceCapacityValue={setSpaceCapacity}
            spaceNameValue={setSpaceName}
            triggerFilter={handleFilter}
          />
        }
      />
      <DynamicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar novo espaço"
        component={
          <SpaceCreateModalFormComponent
            onClose={() => setIsModalOpen(false)}
          />
        }
      />
    </div>
  );
};

export default Espacos;
