import ReusableTable from "@/components/Shared/genericTable/ReusableTable";
import React, { useState, useEffect } from "react";
import { PageChangeEvent } from "@/utils/interfaces/ReusableTable";
import { SpaceRequest } from "@/utils/interfaces/SpaceRequest";
import { formatDate } from '../../utils/formatters/DateTimeFormatter';
import { useRequest } from "@/hooks/useRequest";
import { requestsColumns } from "@/utils/formatters/RequestTableConfig";
import { RequestFilterModel } from "@/utils/interfaces/RequestFilterModel";
import { useUsers } from "@/hooks/useUser";
import RequestService from "@/services/requests/RequestService";
import RequestFilter from "@/components/Filter/requestFilter/RequestFilter";
import "./styles.css";

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

    setData(dummy);
  }

  // TODO: memoização da lista de spaceRequest (data)
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
  
  function handlePageChange(event: PageChangeEvent) {
    setCurrentPage(event.page);
    setPageSize(event.rows);
  }

  return (
    <div className="page p-20">
      <h2 className="mb-6 page-title-margin">Histórico de solicitações</h2>
      <ReusableTable
        columns={requestsColumns}
        data={data}
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
