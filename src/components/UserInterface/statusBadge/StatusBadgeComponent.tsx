
import { Badge } from '@chakra-ui/react';
import './index.css'

interface StatusBadgeProps {
  status: string | boolean | undefined,
}

const StatusBadgeComponent = ({ status }: StatusBadgeProps) => {
  const decideBadgeText = (value: string | boolean | undefined) => {
    switch(value) {
      case 'APPROVED':
        return 'Aprovada';
      case 'REJECTED':
        return 'Reprovada';
      case 'PENDING':
        return 'Aguardando aprovação';
      case 'OUT_DEADLINE':
        return 'Fora do prazo';
      case 'AVAILABLE':
        return 'Disponível';
      case 'UNAVAILABLE':
        return 'Indisponível';
      case true:
        return 'Disponível';
      case false:
        return 'Indisponível';
      default:
        return 'Sem atribuição';
    }
  }

  // tive q armengar, não teve jeito
  if (typeof status === 'boolean') {
    return (
      <Badge padding={".3rem .6rem"} variant={status ? 'AVAILABLE' : "UNAVAILABLE"}>
        { decideBadgeText(status) }
      </Badge>
    );
  } else {
    return (
      <Badge padding={'.3rem .6rem'} variant={status}>
        { decideBadgeText(status) }
      </Badge>
    );
  }
}

export default StatusBadgeComponent;

