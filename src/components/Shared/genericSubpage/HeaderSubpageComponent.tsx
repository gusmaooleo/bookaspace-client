import StatusBadgeComponent from "@/components/UserInterface/statusBadge/StatusBadgeComponent";
import { Divider } from "@chakra-ui/react";

interface HeaderProps {
  value: string,
  _id?: number | string,
  status?: string,
}

export const Header = ({ value, _id, status }: HeaderProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center py-4 px-4">
        <h2>
          {value + " "}
          <span className="underline-hover-link">#{_id}</span>
        </h2>
        <StatusBadgeComponent status={status} />
      </div>
      <Divider border={"1px"} color={"#868686"} />
    </div>
  );
};