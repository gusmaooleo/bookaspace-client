import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomSelectProps } from "@/utils/interfaces/CustomSelect";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

function CustomSelect({ options, placeholder }: CustomSelectProps) {
  const [selectedStatus, setSelectedStatus] = useState(placeholder);
  const [boxColor, setBoxColor] = useState<string>();
  const [icon, setIcon] = useState<IconProp>();

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        bg="#E8E8E8"
        color="black"
      >
        <div className="flex flex-row gap-2 items-center">
          {selectedStatus}
          {icon ? (
            <FontAwesomeIcon icon={icon} />
          ) : (
            <Box w="8px" h="8px" bg={boxColor} borderRadius="50%" ml={2} />
          )}
        </div>
      </MenuButton>
      <MenuList>
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => {
            setSelectedStatus(option.label)
            setBoxColor(option.color)  
            setIcon(option.icon)
          }}>
            {option.label}
            <Spacer />
            {option.icon ? (
              <FontAwesomeIcon icon={option.icon} />
            ) : (
              <Box
                w="8px"
                h="8px"
                bg={option.color}
                borderRadius="50%"
                ml={2}
              />
            )}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default CustomSelect;
