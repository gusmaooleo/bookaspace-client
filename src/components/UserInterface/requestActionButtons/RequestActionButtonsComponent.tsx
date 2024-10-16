import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@chakra-ui/react';
import './index.css'


interface RequestActionProps {
  action: () => void;
}

export const EditRequestButton = ({ action }: RequestActionProps) => {
  return (
    <Button variant={"edit"} onClick={action}>
      <FontAwesomeIcon icon={faPen} color="#68d68a" />
    </Button>
  );
};

export const ApproveRequestButton = ({ action }: RequestActionProps) => {
  return (
    <Button variant={"submit"} onClick={action}>
      Aprovar
    </Button>
  );
};

export const ReproveRequestButton = ({ action }: RequestActionProps) => {
  return (
    <Button variant={"reprove"} onClick={action}>
      Reprovar
    </Button>
  );
};

