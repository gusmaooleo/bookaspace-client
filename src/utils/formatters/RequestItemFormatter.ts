import { GenericSubpage } from "../interfaces/GenericSubpage";
import { Space } from "../interfaces/Space";
import { SpaceRequest } from "../interfaces/SpaceRequest";
import { formatDate } from "./DateTimeFormatter";

export const RequestItemFormatter = (values: SpaceRequest, space: Space): GenericSubpage[] => {
  let formattedItem: GenericSubpage[] = [
    {
      "title": "Título da solicitação",
      "description": values.title,
      "type": 'title',
    },
    {
      "title": "Descrição",
      "description": values.needs,
    },
    {
      "title": "Data de abertura",
      "description": formatDate(values.dateCreationRequest),
    },
    { 
      "title": "Espaço",
      "description": space.name,
      "link": `/espacos/${values.physicalSpaceId}`,
      "type": 'link'
    },
    {
      "title": "Horário da reserva",
      "description": `${formatDate(values.dateTimeStart)} até ${formatDate(values.dateTimeEnd)}`,
    },
    {
      "title": "Solicitante",
      "description": `${values.user?.login} - ${values.user?.usernameUser}`,
      "username": values.user?.usernameUser,
      "type": 'user'
    },

  ]

  if (values.approvalHistory) {
    formattedItem.push({
      "title": `${ values.approvalHistory['decision'] ? 'Aprovador' : 'Reprovador' }`,
      "description": `${values.userAction?.login} - ${values.userAction?.usernameUser}`,
      "username": values.userAction?.usernameUser,
      "type": 'user'
    })  
  }
  
  return formattedItem;
} 