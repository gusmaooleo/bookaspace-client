import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Option {
    label: string;
    color?: string;
    icon?: IconDefinition;
}

export interface CustomSelectProps {
    placeholder: string;
    options: Option[];
}