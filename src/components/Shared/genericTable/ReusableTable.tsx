import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Text,
  HStack,
  InputGroup,
  Input,
  InputRightElement,
  Spacer,
  Spinner,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import {
  PageChangeEvent,
  ReusableTableProps,
} from "@/utils/interfaces/ReusableTable";
import StatusBadgeComponent from "../../UserInterface/statusBadge/StatusBadgeComponent";
import { useRouter } from "next/router";
import ProfilePicComponent from "@/components/Icons/profilePic/ProfilePicComponent";
import { FormatType } from "@/utils/formatters/GeneralStateFormatter";

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  textButtons,
  redirectRow,
  onRegister,
  totalRecords,
  colorHeader = "#1E1E1E",
  initialPage = 0,
  rowsPerPageOptions = [8],
  onPageChange,
  isLoading,
  filtersComponent
}) => {
  const [first, setFirst] = useState(initialPage * rowsPerPageOptions[0]);
  const [rows, setRows] = useState(rowsPerPageOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState<string>("");
  const router = useRouter();

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
      pageCount: Math.max(1, Math.ceil(totalRecords / event.rows)),
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

  const sendToSubpage = (id: any) => {
    if (redirectRow) {
      router.push(`${router.asPath}/${id}`);
    }
  };

  return (
    <Box bg="white" borderRadius="lg" boxShadow="md">
      <Box
        bg={colorHeader}
        w="100%"
        p={3}
        borderWidth="1px"
        borderTopRadius="lg"
        boxShadow="md"
      >

        <HStack spacing={4} my={1}>
          {filtersComponent}

          <Spacer />
          {onRegister && (
            <Button
              colorScheme={onRegister.colorBg || "green"}
              leftIcon={<FontAwesomeIcon icon={onRegister.icon || faSearch} />}
              onClick={onRegister.onClick}
              color={onRegister.colorText || "white"}
              variant={onRegister.colorBg}
            >
              {onRegister.label}
            </Button>
          )}
        </HStack>
      </Box>

      <Box height={'58vmin'} overflow={'auto'}>
        <Table variant="simple">
          <Thead>
            <Tr>
              {columns.map((column, index) => (
                <Th key={index}>{column.header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                <Td colSpan={columns.length} textAlign="center">
                  <Spinner />
                </Td>
              </Tr>
            ) : data.length > 0 ? (
              data.slice(first, first + rows).map((row, rowIndex) => (
                <Tr
                  _hover={{ backgroundColor: "#F3F3F3" }}
                  transition={"0.2s ease"}
                  onClick={() => sendToSubpage(row?.id)}
                  key={rowIndex}
                  cursor={"pointer"}
                >
                  {columns.map((column, colIndex) => (
                    <Td key={colIndex}>
                      {column.type === "badge" ? (
                        <StatusBadgeComponent status={row[column.key]} />
                      ) : column.type === "date" ? (
                        <Text fontSize="sm" color="gray.500">
                          {row[column.key]}
                        </Text>
                      ) : column.type === "avatar" ? (
                        <div className="flex flex-row gap-4 items-center">
                          <div className="h-10 w-10">
                            <ProfilePicComponent
                              subject={row[column.key]}
                              not_shadow={true}
                            />
                          </div>
                          { row[column.key] }
                        </div>
                      ) : column.type === "format" ? (
                        <div className="flex flex-row gap-4 items-center">
                          { FormatType(row[column.key])[0] }
                          <FontAwesomeIcon icon={FormatType(row[column.key])[1]} />
                        </div>
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
      </Box>

      {renderPaginator()}
    </Box>
  );
};

export default ReusableTable;
