import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Option {
    label: string;
    color?: string;
    value: string;
    icon?: IconDefinition;
    value: string;
}

export interface CustomSelectProps {
    options: Option[];
    setValue: React.Dispatch<React.SetStateAction<string>>;
    value?: string;
}