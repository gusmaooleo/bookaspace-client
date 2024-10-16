import {
  CustomSelectProps,
  Option,
} from "../../components/Shared/genericTable/CustomSelect";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Column {
  header: string;
  key: string;
  type?: "badge" | "date" | "avatar" | "avatar-name" | "format";
}

export interface Filter {
  placeholder: string;
  options: Option[];
}

export interface RegisterButton {
  label?: string;
  onClick?: () => void;
  colorBg?: string;
  colorText?: string;
  icon?: IconDefinition;
  display?: boolean;
}

export interface ParentComponentProps {
  options: CustomSelectProps[];
}

export interface ReusableTableProps {
  columns: Column[];
  data: Record<string, any>[];
  redirectRow?: boolean;
  onRegister?: RegisterButton;
  colorHeader?: string;
  totalRecords: number;
  initialPage?: number;
  rowsPerPageOptions?: number[];
  onPageChange: (event: PageChangeEvent) => void;
  isLoading?: boolean;
  filtersComponent?: React.ReactNode;
}

export interface PageChangeEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
