import React, { useState, useEffect } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Box,
    Flex,
    Text,
    Badge,
    HStack,
    InputGroup,
    Input,
    InputRightElement,
    Spacer,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faChevronLeft,
    faChevronRight,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';

import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

import { PageChangeEvent, ReusableTableProps } from './TabelaReutilizavel.d';

import CustomSelect from './CustomSelect';

const TabelaReutilizavel: React.FC<ReusableTableProps> = ({
    columns,
    data,
    filters,
    textButtons,
    onRegister,
    totalRecords,
    colorHeader ="#1E1E1E",
    initialPage = 0,
    rowsPerPageOptions = [10],
    onPageChange
}) => {
    const [first, setFirst] = useState(initialPage * rowsPerPageOptions[0]);
    const [rows, setRows] = useState(rowsPerPageOptions[0]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(Math.floor(first / rows) + 1);
    }, [first, rows]);

    const onCustomPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
        const pageChangeEvent: PageChangeEvent = {
            first: event.first,
            rows: event.rows,
            page: event.page,
            pageCount: Math.max(1, Math.ceil(totalRecords / event.rows))
        };
        onPageChange(pageChangeEvent);
    };

    const renderPaginator = () => {
        const pageCount = Math.max(1, Math.ceil(totalRecords / rows));
        return (
            <Paginator
                first={first}
                rows={rows}
                totalRecords={Math.max(totalRecords, 1)}
                rowsPerPageOptions={rowsPerPageOptions}
                onPageChange={onCustomPageChange}
                template=" PrevPageLink PageLinks NextPageLink "
                currentPageReportTemplate={`Página ${currentPage} de ${pageCount}`}
            />
        );
    };
    
    return (
        <Box bg="white" borderRadius="lg" boxShadow="md">
            <Box bg={colorHeader} w='100%' p={3} borderWidth='1px' borderTopRadius="lg" boxShadow="md">
                <HStack spacing={4} mb={4}>
                    {filters.map((filter, index) => (
                        <div key={index}>
                            <CustomSelect options={filter.options} placeholder={filter.placeholder} />
                        </div>
                    ))}

                    {textButtons.map((textButton, index) => (
                        <InputGroup w="200px" key={index}>
                            <Input
                                placeholder={textButton.placeholder}
                                bg={textButton.colorBg || "#E8E8E8"} 
                                color={textButton.colorText || "black"}
                                w="200px"

                            />
                            <InputRightElement>
                                <FontAwesomeIcon icon={textButton.icon} color='#868686' />
                            </InputRightElement>
                        </InputGroup>
                    ))}

                    <Spacer />
                    {onRegister && (
                        <Button colorScheme={onRegister.colorBg || "green"} leftIcon={<FontAwesomeIcon icon={onRegister.icon || faSearch} />} onClick={onRegister.onClick} color={onRegister.colorText || "white"}>
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
                    {data.length > 0 ? (
                        data.slice(first, first + rows).map((row, rowIndex) => (
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
                        ))
                    ) : (
                        <Tr>
                            <Td colSpan={columns.length} textAlign="center">
                                Nenhum dado disponível
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>

            {renderPaginator()}
        </Box>
    );
};

export default TabelaReutilizavel;