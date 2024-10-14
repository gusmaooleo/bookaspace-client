import ReusableTable from "@/components/Shared/genericTable/ReusableTable";
import React, { useState, useEffect } from "react";
import {
  faUser,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { PageChangeEvent } from "@/utils/interfaces/ReusableTable";
import { SpaceRequest } from "@/utils/interfaces/SpaceRequest";
import { formatDate } from '../../utils/formatters/DateTimeFormatter';
import { useRequest } from "@/hooks/useRequest";
import CustomSelect from "@/components/Shared/genericTable/CustomSelect";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { orderByOption, requestsColumns, statusOption } from "@/utils/formatters/RequestTableConfig";
import "./styles.css";
import { RequestFilterModel } from "@/utils/interfaces/RequestFilterModel";
import RequestService from "@/services/requests/RequestService";
import { useUsers } from "@/hooks/useUser";


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

const Solicitacoes = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [data, setData] = useState<SpaceRequest[]>([]);
  const [totalRecords, setTotalRecords] = useState(data.length);
  const { getRequests } = useRequest(); 

  const [orderBy, setOrderBy] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const { getUsers } = useUsers();

  const requestsService = new RequestService();

  const formatBeforeDisplay = (data: SpaceRequest[]) => {
    let dummy: SpaceRequest[] = data.map(request => ({ ...request }))
    
    dummy.map((obj) => {
      let userRequest = getUsers.find((user) => user.id === obj.userId);

      obj["dateCreationRequest"] = formatDate(obj["dateCreationRequest"])
      obj["dateTimeStart"] = formatDate(obj["dateTimeStart"])
      obj["dateTimeEnd"] = formatDate(obj["dateTimeEnd"])
      obj['username'] = userRequest?.usernameUser;
    });

    console.log(dummy);

    setData(dummy);
  }


  useEffect(() => {
    formatBeforeDisplay(getRequests);
  }, [getRequests, getUsers]);


  const handleFilter = async () => {
    const filter: RequestFilterModel = {
      orderBy: orderBy,
      status: status
    }
    if (filter.orderBy === "" && filter.status === "") {
      formatBeforeDisplay(getRequests);
    } else {
      const data = await requestsService.requestFilter(filter);
      formatBeforeDisplay(data);
    }
  }


  const textButtons = [
    { placeholder: "Título de solicitação", icon: faSearch },
    { placeholder: "Solicitante", icon: faUser },
  ];
  
  function handlePageChange(event: PageChangeEvent) {
    setCurrentPage(event.page);
    setPageSize(event.rows);
  }

  return (
    <div className="page p-20">
      <h2 className="mb-6">Histórico de solicitações</h2>
      <ReusableTable
        columns={requestsColumns}
        data={data}
        textButtons={textButtons}
        totalRecords={totalRecords}
        initialPage={currentPage}
        onPageChange={handlePageChange}
        redirectRow={true} 
        filtersComponent={
          <RequestFilter 
            orderByValue={setOrderBy}
            statusValue={setStatus}
            triggerFilter={handleFilter}
          />
        }
      />
    </div>
  );
};

export default Solicitacoes;
