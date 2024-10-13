import { faBuildingUser, faFlaskVial, faGraduationCap, faSchool } from "@fortawesome/free-solid-svg-icons";
import { Column, Filter, TextButton } from "../interfaces/ReusableTable";

export const spaceColumns: Column[] = [
  { header: 'Nome do espaço', key: 'name' },
  { header: 'Tipo', key: 'type' },
  { header: 'Capacidade', key: 'capacity' },
  { header: 'Disponibilidade', key: 'status', type: 'badge' as const },
]

export const filters: Filter[] = [
  { placeholder: 'Disponibilidade', options: [{ label: "Todos", }, { label: 'Disponível', color: '#68d68a' }, { label: 'Indisponível', color: '#f97e7a' }] },
  { placeholder: 'Tipo', options: [{ label: "Todos" }, { label: 'Sala de aula', icon: faGraduationCap }, { label: 'Auditório', icon: faBuildingUser }, { label: 'Laboratório', icon: faFlaskVial }] },
];

export const textButtons: TextButton[] = [
  { placeholder: 'Capacidade', icon: faBuildingUser },
  { placeholder: 'Nome do espaço', icon: faSchool },
];