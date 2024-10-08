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
    colorBg?: string;
    colorText?: string;
    variant?: string;
}

export interface RegisterButton {
    label: string;
    onClick: () => void;
    colorBg?: string;
    colorText?: string;
    icon?: IconDefinition;
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
    colorHeader?: string;
    totalRecords: number;
    initialPage?: number;
    rowsPerPageOptions?: number[];
    onPageChange: (event: PageChangeEvent) => void;
}

export interface PageChangeEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}