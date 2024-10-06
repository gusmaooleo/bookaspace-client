import { CustomSelectProps, Option } from './CustomSelect.d'; 
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Column {
    header: string;
    key: string;
    type?: 'badge' | 'date';
}

export interface Filter {
    placeholder: string;
    options: Option[];
}

export interface TextButton {
    placeholder: string;
    icon: IconDefinition;
}

export interface RegisterButton {
    label: string;
    onClick: () => void;
}

export interface ParentComponentProps {
    options: CustomSelectProps[];
}

interface ReusableTableProps {
    columns: Column[];
    data: Record<string, any>[];
    filters: Filter[];
    textButtons: TextButton[];
    onRegister?: RegisterButton;
}