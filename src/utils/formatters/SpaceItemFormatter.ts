import { GenericSubpage } from "../interfaces/GenericSubpage";
import { Space } from "../interfaces/Space";

export const SpaceItemFormatter = (values: Space): GenericSubpage[] => {
  const decideTypeRef = (value: string) => {
    switch (value) {
      case "AUDITORIUM":
        return "Auditório"
      case "CLASSROOM":
        return "Sala de aula"
      case "LABORATORY":
        return "Laboratório"
      default:
        return "";
    }
  }

  let formattedItem: GenericSubpage[] = [
    {
      "title": "Nome do espaço",
      "description": values.name,
      "type": 'title',
    },
    {
      "title": "Recursos",
      "description": values.resources,
    },
    {
      "title": "Localização",
      "description": values.location,
    },
    {
      "title": "Tipo do espaço",
      "description": decideTypeRef(values.type),
    },
    {
      "title": "Capacidade do espaço",
      "description": values.capacity,
    },
  ]

  return formattedItem;
} 