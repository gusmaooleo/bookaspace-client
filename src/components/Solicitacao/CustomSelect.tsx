import { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, Box, Spacer } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { CustomSelectProps } from '@/components/Solicitacao/CustomSelect.d';

function CustomSelect({ options, placeholder }: CustomSelectProps) {
    const [selectedStatus, setSelectedStatus] = useState(placeholder);

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="#E8E8E8" color="black">
                {selectedStatus}
            </MenuButton>
            <MenuList>
                {options.map((option, index) => (
                    <MenuItem key={index} onClick={() => setSelectedStatus(option.label)}>
                        {option.label}
                        <Spacer />
                        {option.icon ? (
                            <FontAwesomeIcon icon={option.icon} /> 
                        ) : (
                            <Box w="8px" h="8px" bg={option.color} borderRadius="50%" ml={2} /> 
                        )}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}

export default CustomSelect;