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
    Select,
    Textarea,
} from '@chakra-ui/react';

export interface FieldOption {
    value: string;
    label: string;
}

export interface Field {
    name: string;
    label: string;
    type: 'text' | 'password' | 'select' | 'textarea';
    placeholder?: string;
    options?: FieldOption[];
}

interface DynamicModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: Record<string, string>) => void;
    title: string;
    fields: Field[];
}

const DynamicModal: React.FC<DynamicModalProps> = ({ isOpen, onClose, onSubmit, title, fields, }) => {
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

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    const renderField = (field: Field) => {
        switch (field.type) {
            case 'text':
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
                    <Select
                        name={field.name}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                    >
                        {field.options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                    
                );
            case 'textarea':
                return (
                    <Textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#1E1E1E" color="white">
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {fields.map((field) => (
                        <FormControl key={field.name} mt={4}>
                            <FormLabel>{field.label}</FormLabel>
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