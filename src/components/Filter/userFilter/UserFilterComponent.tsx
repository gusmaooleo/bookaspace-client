import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faUser } from '@fortawesome/free-solid-svg-icons';

interface UserFilterInterface {
  nameValue: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
  triggerFilter: () => void;
}

const UserFilterComponent = ({
  nameValue,
  theme,
  triggerFilter,
}: UserFilterInterface) => {
  return (
    <div className="flex flex-row gap-3">
      <InputGroup>
        <Input
          variant={theme}
          placeholder="Nome do usuário"
          onChange={(e) => nameValue(e.target.value)}
        />
        <InputRightElement>
          <FontAwesomeIcon icon={faUser} color={theme === 'dark' ? '#f4f7f5' : ''} />
        </InputRightElement>
      </InputGroup>

      <Button
        backgroundColor={theme === 'dark' ? "#1E1E1E" : "#f4f7f5"}
        _hover={theme === 'dark' ? { backgroundColor: "#3B3939" } : {}}
        onClick={triggerFilter}
      >
        <FontAwesomeIcon
          color={theme === 'dark' ? "#f4f7f5" : ''}
          icon={faFilter}
        />
      </Button>
    </div>
  );
};

export default UserFilterComponent;

