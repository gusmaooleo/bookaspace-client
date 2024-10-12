import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    useToast,
} from "@chakra-ui/react";
import { Dropdown } from "primereact/dropdown";
import WarningTextComponent from "@/components/UserInterface/warningText/WarningTextComponent";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import CustomSelect from '@/components/Shared/genericTable/CustomSelect';
import { faAdd, faBuildingUser, faFlaskVial, faGraduationCap, faSchool } from '@fortawesome/free-solid-svg-icons';

const SpaceCreateUserFormComponent: React.FC = () => {
    const [login, setLogin] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const toast = useToast();

    const spaceFields=
        {
            placeholder: 'Cargo do usuário',
            options: [{ label: 'Administrador', icon: faGraduationCap, color: 'black' }, { label: 'Gestor', icon: faBuildingUser }, { label: 'Professor', icon: faFlaskVial },],
        };
       


    const roleOptions = [
        { name: 'Admin', value: 'admin' },
        { name: 'Gestor', value: 'gestor' },
        { name: 'Professor', value: 'professor' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({
                title: 'Erro',
                description: 'As senhas não coincidem.',
                status: 'error',
                position: 'top-right'
            });
            return;
        }

        console.log({ login, name, role, password });

        setLogin("");
        setName("");
        setRole(null);
        setPassword("");
        setConfirmPassword("");

        toast({
            title: 'Sucesso',
            description: 'Usuário criado com sucesso.',
            status: 'success',
            position: 'top-right'
        });
    };

    const canSubmit = login && name && role && password && confirmPassword && password === confirmPassword;

    return (
        <div className="space-create-user-container">
            <form className="space-create-user-form-container p-8" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center gap-[2vmin] text-[#f4f7f5]">
                    <FormControl isInvalid={login === ""}>
                        <FormLabel>Login do usuário</FormLabel>
                        <Input
                            placeholder='Login do usuário'
                            variant="light"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </FormControl>

                    <FormControl isInvalid={name === ""}>
                        <FormLabel>Nome do usuário</FormLabel>
                        <Input
                            placeholder='Nome do usuário'
                            variant="light"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </FormControl>

                    <FormControl isInvalid={role === null}>
                        <FormLabel>Cargo do usuário</FormLabel>
                        <CustomSelect
                            options={spaceFields.options}
                            placeholder={spaceFields.placeholder}
                        />
                    </FormControl>

                    <FormControl isInvalid={password === ""}>
                        <FormLabel>Senha</FormLabel>
                        <Input
                            placeholder='Senha'
                            variant="light"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormControl>

                    <FormControl isInvalid={confirmPassword === "" || password !== confirmPassword}>
                        <FormLabel>Confirme a senha</FormLabel>
                        <Input
                            placeholder='Confirme a senha'
                            variant="light"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <WarningTextComponent
                            condition={password !== confirmPassword}
                            text={'As senhas não coincidem'}
                            icon={faTriangleExclamation}
                        />
                    </FormControl>
                </div>

            </form>
        </div>
    );
};

export default SpaceCreateUserFormComponent;