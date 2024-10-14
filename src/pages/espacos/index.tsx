import React, { useState, useEffect } from "react";
import {
  faAdd,
  faBuildingUser,
  faFilter,
  faFlaskVial,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { PageChangeEvent } from "@/utils/interfaces/ReusableTable";
import { Space } from "@/utils/interfaces/Space";
import ReusableTable from "@/components/Shared/genericTable/ReusableTable";
import DynamicModal from "@/components/Shared/genericModal/DynamicModal";
import SpaceCreateModalFormComponent from "@/components/Form/spaceCreateModalForm/SpaceCreateModalFormComponent";
import {
  spaceColumns,
  textButtons,
  typeOption,
} from "@/utils/formatters/SpaceTableConfig";
import { useSpace } from "@/hooks/useSpace";
import { Button, Input } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "@/components/Shared/genericTable/CustomSelect";
import { InputNumber } from "primereact/inputnumber";
import { SpaceFilterModel } from "@/utils/interfaces/SpaceFilterModel";
import SpaceService from "@/services/space/SpaceService";
import "./styles.css";

interface SpaceFilterInterface {
  typeValue: React.Dispatch<React.SetStateAction<string>>;
  spaceNameValue: React.Dispatch<React.SetStateAction<string>>;
  spaceCapacityValue: React.Dispatch<React.SetStateAction<string>>;
  triggerFilter: () => void;
}

const SpaceFilter = ({
  typeValue,
  spaceCapacityValue,
  spaceNameValue,
  triggerFilter,
}: SpaceFilterInterface) => {
  return (
    <div className="flex flex-row gap-3">
      <CustomSelect options={typeOption} setValue={typeValue} />
      <Input
        variant={"ns_light"}
        placeholder="Nome do espaço"
        onChange={(e) => spaceNameValue(e.target.value)}
      />
      <InputNumber
        placeholder="Capacidade"
        onChange={(e) => spaceCapacityValue(String(e.value))}
      />

      <Button
        backgroundColor={"#f4f7f5"}
        onClick={triggerFilter}
      >
        <FontAwesomeIcon
          color={"#1E1E1E"}
          icon={faFilter}
        />
      </Button>
    </div>
  );
};

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
    console.log("lesgo");
  };

  function handlePageChange(event: PageChangeEvent) {
    setCurrentPage(event.page);
    setPageSize(event.rows);
  }

  return (
    <div className="page p-20">
      <h2 className="mb-6">Espaços</h2>
      <ReusableTable
        columns={spaceColumns}
        data={data}
        textButtons={textButtons}

        onRegister={{
          label: "Registrar novo espaço",
          onClick: openModal,
          icon: faAdd,
        }}

        totalRecords={totalRecords}
        initialPage={currentPage}
        onPageChange={handlePageChange}
        redirectRow={true}


        filtersComponent={
          <SpaceFilter
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
