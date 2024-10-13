import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import CustomSelect from '../genericTable/CustomSelect';
import { Option } from '@/utils/interfaces/CustomSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Field {
    name: string;
    label: string;
    type: 'text' | 'password' | 'select' | 'textarea';
    placeholder?: string;
    icon?: IconDefinition;
    variant?: string;
    options?: Option[];
}

interface DynamicModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: Record<string, string>) => void;
    title: string;
    component: React.ReactNode;
    fields: Field[];
}

const DynamicModal: React.FC<DynamicModalProps> = ({ isOpen, onClose, onSubmit, title, fields,component }) => {
    const [formData, setFormData] = React.useState<Record<string, string>>({});

    React.useEffect(() => {
        const initialData: Record<string, string> = {};
        fields.forEach(field => {
            initialData[field.name] = '';
        });
        setFormData(initialData);
    }, [fields]);

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#1E1E1E">
                <ModalHeader color="white">{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {component}
                </ModalBody>
                <ModalFooter>
                    <Button variant={'outline'} mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme="green" onClick={handleSubmit}>
                        {title}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DynamicModal;