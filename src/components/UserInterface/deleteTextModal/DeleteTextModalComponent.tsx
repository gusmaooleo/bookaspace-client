import { Icon } from "@chakra-ui/react";
import { Box, Text, Flex } from "@chakra-ui/react";

const DeleteTextModalComponent = () => {
    return (
        <Box>
            <Text fontSize="16px" fontWeight="bold" color="gray.800" mb={2}>
                {"Tem certeza que deseja excluir o usuário?"}
            </Text>
            <Flex mt={2} align="center">
                <Text fontSize="14px" color="red.500">
                    {"Esta ação não pode ser desfeita."}
                </Text>
            </Flex>
        </Box>
    );
};

export default DeleteTextModalComponent;

