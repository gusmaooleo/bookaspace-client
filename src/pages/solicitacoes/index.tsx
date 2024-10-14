import TabelaReutilizavel from "@/components/Shared/genericTable/ReusableTable";
import React, { useState, useEffect } from "react";
import {
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { PageChangeEvent } from "@/utils/interfaces/ReusableTable";
import { SpaceRequest } from "@/utils/interfaces/SpaceRequest";
import RequestService from "@/services/requests/RequestService";
import "./styles.css";
import { formatDate } from '../../utils/formatters/DateTimeFormatter';

const Solicitacoes = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [data, setData] = useState<SpaceRequest[]>([]);
  const [totalRecords, setTotalRecords] = useState(data.length);
  const requestService = new RequestService();

  useEffect(() => {
    const fetchData = async () => {
      const payload = await requestService.getAllRequests();
      let dummy: SpaceRequest[] = [
        ...payload
      ]
      for (let obj of dummy) {
        obj["dateCreationRequest"] = formatDate(obj["dateCreationRequest"])
        obj["dateTimeStart"] = formatDate(obj["dateTimeStart"])
        obj["dateTimeEnd"] = formatDate(obj["dateTimeEnd"])
      }
      setData(dummy);
    }
    fetchData();
  }, []);

  const columns = [
    // { header: "Solicitante", key: "requester_name" },
    { header: "Título da solicitação", key: "title" },
    { header: "Início", key: "dateTimeStart" },
    { header: "Final", key: "dateTimeEnd" },
    { header: "Status", key: "status", type: "badge" as const },
    { header: "Criado em", key: "dateCreationRequest", type: "date" as const },
  ];

  // const filters = [
  //   {
  //     placeholder: "Ordenar por",
  //     options: [
  //       { label: "Todos",},
  //       { label: "Mais recente", icon: faArrowUp },
  //       { label: "Mais antigo", icon: faArrowDown },
  //     ],
  //   },
  //   {
  //     placeholder: "Status",
  //     options: [
  //       { label: "Todos", },
  //       { label: "Aguardando aprovação", color: "#FFE55F" },
  //       { label: "Aprovada", color: "#68D68A" },
  //       { label: "Reprovada", color: "#F97E7A" },
  //       { label: "Fora do prazo", color: "#868686" },
  //     ],
  //   },
  // ];

  const textButtons = [
    { placeholder: "Título de solicitação", icon: faSearch },
    { placeholder: "Solicitante", icon: faUser },
  ];

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
    <div className="page p-20">
      <h2 className="mb-6">Histórico de solicitações</h2>
      <TabelaReutilizavel
        columns={columns}
        data={data}
        textButtons={textButtons}
        totalRecords={totalRecords}
        initialPage={currentPage}
        onPageChange={handlePageChange}
        redirectRow={true} 
        filtersComponent={undefined}
      />
    </div>
  );
};

export default Solicitacoes;
