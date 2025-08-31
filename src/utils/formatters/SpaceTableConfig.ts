import {
  faBuildingUser,
  faFlaskVial,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { Column } from "../interfaces/ReusableTable";
import { Option } from "../interfaces/CustomSelect";

export const spaceColumns: Column[] = [
  { header: "Nome do espaço", key: "name" },
  { header: "Tipo", key: "type", type: 'format' },
  { header: "Capacidade", key: "capacity" },
  { header: "Disponibilidade", key: "availability", type: "badge" as const },
];

export const typeOption: Option[] = [
  { label: "Todos", value: '' },
  { label: "Sala de aula", icon: faGraduationCap, value: 'CLASSROOM' },
  { label: "Auditório", icon: faBuildingUser, value: "AUDITORIUM" },
  { label: "Laboratório", icon: faFlaskVial, value: "LABORATORY" },
]

export const availabilityOption: Option[] = [
  { label: "Todos", value: "" },
  { label: "Disponível", value: "true" },
  { label: "Indisponível", value: "false" },
]