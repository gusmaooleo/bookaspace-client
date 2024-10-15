import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBuildingUser,
  faFlaskVial,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

export const FormatRole = (value: number) => {
  switch (value) {
    case 1:
      return "Administrador";
    case 2:
      return "Professor";
    case 3:
      return "Gestor";
    default:
      return "";
  }
};

export const FormatType = (value: string): [string, IconProp] => {
  switch (value) {
    case "CLASSROOM":
      return ["Sala de aula", faGraduationCap];
    case "AUDITORIUM":
      return ["Auditório", faBuildingUser];
    case "LABORATORY":
      return ["Laboratório", faFlaskVial];
    default:
      return ['Tipo não encontrado', faGraduationCap];
  }
};
