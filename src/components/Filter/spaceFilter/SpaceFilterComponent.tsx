import CustomSelect from '@/components/Shared/genericTable/CustomSelect';
import { Button, Input } from '@chakra-ui/react';
import { InputNumber } from 'primereact/inputnumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { typeOption } from '@/utils/formatters/SpaceTableConfig';
import './index.css'

interface SpaceFilterInterface {
  typeValue: React.Dispatch<React.SetStateAction<string>>;
  spaceNameValue: React.Dispatch<React.SetStateAction<string>>;
  spaceCapacityValue: React.Dispatch<React.SetStateAction<string>>;
  triggerFilter: () => void;
}

const SpaceFilterComponent = ({
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

export default SpaceFilterComponent;

