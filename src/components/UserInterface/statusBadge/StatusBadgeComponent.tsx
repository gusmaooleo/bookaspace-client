
import { Badge } from '@chakra-ui/react';
import './index.css'

interface StatusBadgeProps {
  status: string | undefined,
}

const StatusBadgeComponent = ({ status }: StatusBadgeProps) => {
  const decideBadgeText = (value: string | undefined) => {
    switch(value) {
      case 'APPROVED':
        return 'Aprovada';
      case 'REPROVED':
        return 'Reprovada';
      case 'PENDING':
        return 'Aguardando aprovação';
      case 'OUT_DEADLINE':
        return 'Fora do prazo';
      case 'AVAILABLE':
        return 'Disponível';
      case 'UNAVAILABLE':
        return 'Indisponível';
      default:
        return 'Sem atribuição';
    }
  }

  return (
    <Badge padding={'.3rem .6rem'} variant={status}>
      { decideBadgeText(status) }
    </Badge>
  );
}

export default StatusBadgeComponent;

