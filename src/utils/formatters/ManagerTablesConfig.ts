import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import { Column } from "../interfaces/ReusableTable";

export const eventosColumns = [
  { header: 'Usuário', key: 'username' },
  { header: 'Evento', key: 'details' },
  { header: 'Data', key: 'timestamp' },
];

export const usuariosColumns: Column[] = [
  { header: '', key: 'usernameUser', type: 'avatar' },
  { header: 'Login', key: 'login' },
  { header: 'Nome do usuário', key: 'usernameUser' },
  { header: 'Cargo', key: 'roleName' },
  { header: 'Ações', key: 'acoes' },
];