import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Select,
    Input,
    Box,
    Flex,
    Text,
    Badge,
    chakra,
    Heading,
    IconButton,
    HStack,
    VStack,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Menu, MenuButton, MenuList, MenuItem, Spacer,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faChevronLeft,
    faChevronRight,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ReusableTableProps } from './TabelaReutilizavel.d';
import CustomSelect from './CustomSelect';
import { text } from 'stream/consumers';

const TabelaReutilizavel: React.FC<ReusableTableProps> = ({ columns, data, filters, textButtons, onRegister }) => {

    return (
        <Box p = { 6 } bg = "white" borderRadius = "lg" boxShadow = "md">
            <Box bg='#1E1E1E' w='100%' p={3} borderWidth='1px' borderTopRadius="lg">
                <HStack spacing={4} mb={4}>
                {filters.map((filter, index) => (
                    <div key={index}>
                        <CustomSelect options={filter.options} placeholder={filter.placeholder} />
                    </div>
                ))}


                {textButtons.map((textButton, index) => (
                    <InputGroup w="200px">
                    <Input placeholder={textButton.placeholder}
                            bg="#E8E8E8"
                            color="black" w="200px" />
                    <InputRightElement>
                            <FontAwesomeIcon icon={textButton.icon} color='#868686'/>
                    </InputRightElement>
                    </InputGroup>
                ))}

                <Spacer />
                    {onRegister && (
                        <Button colorScheme="green" leftIcon={<FontAwesomeIcon icon={faSearch} />} onClick={onRegister.onClick}>
                            {onRegister.label}
                        </Button>
                    )}
                </HStack>
                
            </Box>
            
            <Table variant="simple">
                <Thead>
                    <Tr>
                        {columns.map((column, index) => (
                            <Th key={index}>{column.header}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((row, rowIndex) => (
                        <Tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <Td key={colIndex}>
                                    {column.type === 'badge' ? (
                                        <Badge colorScheme={row[column.key].color}>
                                            {row[column.key].label}
                                        </Badge>
                                    ) : column.type === 'date' ? (
                                        <Text fontSize="sm" color="gray.500">
                                            {row[column.key]}
                                        </Text>
                                    ) : (
                                        row[column.key]
                                    )}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <HStack justify="center" mt={4} spacing={2}>
                <IconButton
                    aria-label="Previous page"
                    icon={<ChevronLeftIcon />}
                    variant="ghost"
                />
                <Badge px={3} py={1} bg="gray.200" borderRadius="full">1</Badge>
                <Badge px={3} py={1} bg="gray.200" borderRadius="full">2</Badge>
                <Badge px={3} py={1} bg="gray.200" borderRadius="full">3</Badge>
                <Badge px={3} py={1} bg="gray.200" borderRadius="full">...</Badge>
                <IconButton
                    aria-label="Next page"
                    icon={<ChevronRightIcon />}
                    variant="ghost"
                />
            </HStack>
        </Box>
    );
};

export default TabelaReutilizavel;
