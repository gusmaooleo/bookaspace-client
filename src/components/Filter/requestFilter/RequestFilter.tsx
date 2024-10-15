import CustomSelect from "@/components/Shared/genericTable/CustomSelect";
import { orderByOption, statusOption } from "@/utils/formatters/RequestTableConfig";
import { Button } from "@chakra-ui/react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface RequestFilterInterface {
  orderByValue: React.Dispatch<React.SetStateAction<string>>;
  statusValue: React.Dispatch<React.SetStateAction<string>>;
  triggerFilter: () => void;
}

const RequestFilter = ({
  orderByValue,
  statusValue,
  triggerFilter,
}: RequestFilterInterface) => {
  return (
    <div className="flex flex-row gap-3" style={{ width: 'auto'}}>
      <div style={{width: 'auto'}}>
        <CustomSelect options={orderByOption} setValue={orderByValue} />
      </div>
      <CustomSelect options={statusOption} setValue={statusValue} />

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

export default RequestFilter;