import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

interface WarningTextProps {
  condition?: boolean;
  text: string;
  icon: IconProp;
}

const WarningTextComponent = ({ condition, text, icon }: WarningTextProps) => {
  if (condition) {
    return (
      <div className="flex mt-1">
        <label style={{ color: "#ffe55f", fontSize: "14px" }}>
          <FontAwesomeIcon icon={icon} className="pr-1" />
          { text }
        </label>
      </div>
    );
  }
};

export default WarningTextComponent;
