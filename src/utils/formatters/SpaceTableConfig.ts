import {
  faBuildingUser,
  faFlaskVial,
  faGraduationCap,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { Column, Filter, TextButton } from "../interfaces/ReusableTable";
import { Option } from "../interfaces/CustomSelect";

export const spaceColumns: Column[] = [
  { header: "Nome do espaço", key: "name" },
  { header: "Tipo", key: "type" },
  { header: "Capacidade", key: "capacity" },
  { header: "Disponibilidade", key: "availability", type: "badge" as const },
];

// export const availabilityOption: Option[] = [
//   { label: "Todos" },
//   { label: "Disponível", color: "#68d68a" },
//   { label: "Indisponível", color: "#f97e7a" },
// ]

export const typeOption: Option[] = [
  { label: "Todos", value: '' },
  { label: "Sala de aula", icon: faGraduationCap, value: 'CLASSROOM' },
  { label: "Auditório", icon: faBuildingUser, value: "AUDITORIUM" },
  { label: "Laboratório", icon: faFlaskVial, value: "LABORATORY" },
]

export const textButtons: TextButton[] = [
  { placeholder: "Capacidade", icon: faBuildingUser },
  { placeholder: "Nome do espaço", icon: faSchool },
];
