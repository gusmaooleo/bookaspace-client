import { format } from "date-fns"

export const formatDate = (unformattedDate: string | undefined) => {
  if (unformattedDate) {
    return format(new Date(unformattedDate), 'dd/MM/yyy HH:mm')
  }
  return '';
} 