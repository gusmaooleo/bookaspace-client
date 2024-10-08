import TabelaReutilizavel from "@/components/Solicitacao/TabelaReutilizavel";
import React, { useState, useEffect } from "react";
import {
  faArrowDown,
  faArrowUp,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { PageChangeEvent } from "@/components/Solicitacao/TabelaReutilizavel.d";
import { SpaceRequest } from "@/utils/interfaces/SpaceRequest";
import { formatDate } from "@/utils/formatters/DateTimeFormatter";
import Database from "@/utils/Database";
import "./styles.css";

const Solicitacoes = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [data, setData] = useState<SpaceRequest[]>(Database.spaceRequests);
  const [totalRecords, setTotalRecords] = useState(data.length);

  useEffect(() => {
    let dummy: SpaceRequest[] = [];
    for (let obj of data) {
      let spaceObject: SpaceRequest = {
        ...obj,
      };
      spaceObject.requester_name =
        obj.requester?.username || "Nome indisponível";
      spaceObject.periodText = `${formatDate(obj.startDate)} até ${formatDate(
        obj.endDate
      )}`;
      spaceObject.openRequestDate = formatDate(obj.openRequestDate);
      dummy.push(spaceObject);
    }
    setData(dummy);
  }, []);

  const columns = [
    { header: "Solicitante", key: "requester_name" },
    { header: "Título da solicitação", key: "title" },
    { header: "Período", key: "periodText" },
    { header: "Status", key: "status", type: "badge" as const },
    { header: "Criado em", key: "openRequestDate", type: "date" as const },
  ];

  const filters = [
    {
      placeholder: "Ordenar por",
      options: [
        { label: "Mais recente", icon: faArrowUp },
        { label: "Mais antigo", icon: faArrowDown },
      ],
    },
    {
      placeholder: "Status",
      options: [
        { label: "Aguardando aprovação", color: "#FFE55F" },
        { label: "Aprovada", color: "#68D68A" },
        { label: "Reprovada", color: "#F97E7A" },
        { label: "Fora do prazo", color: "#868686" },
      ],
    },
  ];

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
        filters={filters}
        textButtons={textButtons}
        totalRecords={totalRecords}
        initialPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Solicitacoes;
