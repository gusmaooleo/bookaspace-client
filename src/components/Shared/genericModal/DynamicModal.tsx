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
    fields: Field[];
}

const DynamicModal: React.FC<DynamicModalProps> = ({ isOpen, onClose, onSubmit, title, fields }) => {
    const [formData, setFormData] = React.useState<Record<string, string>>({});

    React.useEffect(() => {
        const initialData: Record<string, string> = {};
        fields.forEach(field => {
            initialData[field.name] = '';
        });
        setFormData(initialData);
    }, [fields]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    const renderField = (field: Field) => {
        const commonProps = {
            name: field.name,
            placeholder: field.placeholder,
            onChange: handleChange,
            width: "100%",  // Set width to 100%
        };
        switch (field.type) {
            case 'text':
                return (
                    <InputGroup variant={field?.variant || 'light'}>
                        <Input
                            placeholder={field.placeholder}
                        />
                        {field.icon && (
                            <InputRightElement>
                                <FontAwesomeIcon
                                    icon={field.icon}
                                    color={field?.variant === 'dark' ? '#f4f7f5' : "#868686"}
                                />
                            </InputRightElement>
                        )}
                    </InputGroup>
                );
            case 'password':
                return (
                    <Input
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                    />
                );
            case 'select':
                return (
                    <CustomSelect
                        options={field.options || []}
                        placeholder={field.placeholder || ''}
                    />
                );
            case 'textarea':
                return (
                    <Textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        color="black"
                        bgColor={'white'}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#1E1E1E">
                <ModalHeader color="white">{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {fields.map((field) => (
                        <FormControl key={field.name} mt={4}>
                            <FormLabel color="white" >{field.label}</FormLabel>
                            {renderField(field)}
                        </FormControl>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="gray" mr={3} onClick={onClose}>
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