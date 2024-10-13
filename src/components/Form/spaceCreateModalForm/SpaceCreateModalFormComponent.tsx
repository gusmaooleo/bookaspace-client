import React, { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import CustomSelect from '@/components/Shared/genericTable/CustomSelect';
import { faAdd, faBuildingUser, faFlaskVial, faGraduationCap, faSchool } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SpaceCreateModalFormComponent: React.FC = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState<string | null>(null);
    const [capacity, setCapacity] = useState<number | null>(null);
    const [description, setDescription] = useState("");

    const toast = useToast();

    const spaceTypes = [
        { name: 'Sala de aula', value: 'classroom' },
        { name: 'Auditório', value: 'auditorium' },
        { name: 'Laboratório', value: 'laboratory' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !type || capacity === null || !description) {
            toast({
                title: 'Erro',
                description: 'Por favor, preencha todos os campos.',
                status: 'error',
                position: 'top-right'
            });
            return;
        }

        console.log({ name, type, capacity, description });

        setName("");
        setType(null);
        setCapacity(null);
        setDescription("");

        toast({
            title: 'Sucesso',
            description: 'Espaço criado com sucesso.',
            status: 'success',
            position: 'top-right'
        });
    };

    const handleCapacityChange = (e: InputNumberValueChangeEvent) => {
        const value = e.value !== null && e.value !== undefined ? e.value : null;
        setCapacity(value);
    };

    const spaceFields = {
        placeholder: 'Selecione o tipo',
        options: [{ label: 'Sala de aula', icon: faGraduationCap }, { label: 'Auditório', icon: faBuildingUser }, { label: 'Laboratório', icon: faFlaskVial }],
        };

    return (
        <div className="space-create-user-container">
            <form className="space-create-user-form-container p-8" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center gap-[2vmin] text-[#f4f7f5]">
                    <FormControl mb={4}>
                        <FormLabel>Nome do espaço</FormLabel>
                        <InputGroup variant={'light'}>
                            <Input
                                placeholder="Nome do espaço"
                            />
                            <InputRightElement>
                                <FontAwesomeIcon
                                    icon={faSchool}
                                    color={'black'}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Tipo do espaço</FormLabel>
                        <CustomSelect
                            options={spaceFields.options}
                            placeholder={spaceFields.placeholder}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Capacidade do espaço</FormLabel>
                        <InputGroup variant={'light'}>
                            <InputNumber
                                value={capacity}
                                onValueChange={handleCapacityChange}
                                placeholder="Capacidade do espaço"
                                min={0}
                                className="w-full"
                                useGrouping={false}
                                style={{ color: 'black', height: '2.5rem' }}
                            />
                            <InputRightElement>
                                <FontAwesomeIcon
                                    icon={faBuildingUser}
                                    color={'black'}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Descrição resumida dos recursos do espaço</FormLabel>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrição resumida dos recursos do espaço"
                            resize="vertical"
                            color={"black"}
                            bgColor={"white"}
                        />
                    </FormControl>
                </div>
            </form>
        </div>
    );
};

export default SpaceCreateModalFormComponent;