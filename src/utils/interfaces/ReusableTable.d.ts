import { CustomSelectProps, Option } from '../../components/Shared/genericTable/CustomSelect';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Column {
    header: string;
    key: string;
    type?: 'badge' | 'date' | 'avatar';
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

export interface ReusableTableProps {
    columns: Column[];
    data: Record<string, any>[];
    filters: Filter[];
    redirectRow?: boolean;
    textButtons: TextButton[];
    onRegister?: RegisterButton;
    colorHeader?: string;
    totalRecords: number;
    initialPage?: number;
    rowsPerPageOptions?: number[];
    onPageChange: (event: PageChangeEvent) => void;
    isLoading?: boolean,
}

export interface PageChangeEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}