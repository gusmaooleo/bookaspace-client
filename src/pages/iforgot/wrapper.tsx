import { ReactNode } from "react";
import TextLogoComponent from "@/components/Icons/textLogo/TextLogoComponent";
import "./styles.css";

const Iforgot = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <TextLogoComponent />
      {children}
    </div>
  );
};

export default Iforgot;
