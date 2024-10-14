import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Option } from "../interfaces/CustomSelect";
import { Column } from "../interfaces/ReusableTable";

export const orderByOption: Option[] = [
  { label: "Todos", value: '' },
  { label: "Mais recente", value: 'desc', icon: faArrowUp },
  { label: "Mais antigo", value: 'asc', icon: faArrowDown },
];

export const statusOption: Option[] = [
  { label: "Todos", value: '' },
  { label: "Aguardando aprovação", value: 'PENDING', color: "#FFE55F" },
  { label: "Aprovada", value: 'APPROVED', color: "#68D68A" },
  { label: "Reprovada", value: 'REJECTED', color: "#F97E7A" },
  { label: "Fora do prazo", value: 'OUT_DEADLINE', color: "#868686" },
];

export const requestsColumns: Column[] = [
  { header: "Solicitante", key: "username", type: 'avatar' },
  { header: "Título da solicitação", key: "title" },
  { header: "Início", key: "dateTimeStart" },
  { header: "Final", key: "dateTimeEnd" },
  { header: "Status", key: "status", type: "badge" as const },
  { header: "Criado em", key: "dateCreationRequest", type: "date" as const },
];