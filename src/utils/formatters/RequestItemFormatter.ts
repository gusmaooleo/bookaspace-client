import { GenericSubpage } from "../interfaces/GenericSubpage";
import { SpaceRequest } from "../interfaces/SpaceRequest";
import { formatDate } from "./DateTimeFormatter";

export const RequestItemFormatter = (values: SpaceRequest): GenericSubpage[] => {
  let formattedItem: GenericSubpage[] = [
    {
      "title": "Título da solicitação",
      "description": values.title,
      "type": 'title',
    },
    {
      "title": "Solicitante",
      "description": `${values.requester.login} - ${values.requester.username}`,
      "username": values.requester.username,
      "type": 'user'
    },
    {
      "title": "Descrição",
      "description": values.description,
    },
    {
      "title": "Data de abertura",
      "description": formatDate(values.openRequestDate),
    },
    { 
      "title": "Espaço",
      "description": values.space.name,
      "link": `/espacos/${values.space._id}`,
      "type": 'link'
    },
    {
      "title": "Horário da reserva",
      "description": `${formatDate(values.startDate)} até ${formatDate(values.endDate)}`,
    },
  ]

  if (values.status === 'APPROVED') {
    formattedItem.push({
      "title": "Hora da aprovação",
      "description": formatDate(values.action_time),
    })
    
    formattedItem.push({
      "title": "Aprovador",
      "description": `${values.manager?.login} - ${values.manager?.username}`,
      "username": values.manager?.username,
      "type": 'user'
    })
  }

  if (values.status === 'REPROVED' && values.reason?.length !== undefined) {
    formattedItem.push({
      "title": "Hora da reprovação",
      "description": formatDate(values.action_time)
    })
    
    formattedItem.push({
      "title": "Motivo da reprovação",
      "description": values.reason
    })

    formattedItem.push({
      "title": "Reprovador",
      "description": `${values.manager?.login} - ${values.manager?.username}`,
      "username": values.manager?.username,
      "type": 'user'
    })
  }

  return formattedItem;
} 