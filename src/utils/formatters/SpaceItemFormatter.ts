import { GenericSubpage } from "../interfaces/GenericSubpage";
import { Space } from "../interfaces/Space";
import { formatDate } from "./DateTimeFormatter";

export const SpaceItemFormatter = (values: Space): GenericSubpage[] => {
  let formattedItem: GenericSubpage[] = [
    {
      "title": "Nome do espaço",
      "description": values.name,
      "type": 'title',
    },
    {
      "title": "Criador do espaço",
      "description": `${values.creator?.login} - ${values.creator?.username}`,
      "username": values.creator?.username,
      "type": 'user'
    },
    {
      "title": "Recursos",
      "description": values.resources,
    },
    {
      "title": "Data de criação",
      "description": formatDate(values.creation),
    },
    {
      "title": "Tipo do espaço",
      "description": values.type,
    },
    {
      "title": "Capacidade do espaço",
      "description": values.capacity,
    },
  ]

  return formattedItem;
} 