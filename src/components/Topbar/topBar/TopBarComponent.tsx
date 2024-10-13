import ProfilePicComponent from "@/components/Icons/profilePic/ProfilePicComponent";
import LogoComponent from "@/components/Icons/logo/LogoComponent";
import { Routes } from "@/utils/routes";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import "./index.css";
import { User } from "@/utils/interfaces/User";
import { FormatRole } from "@/utils/formatters/GeneralStateFormatter";

const TopBarComponent = () => {
  const [routes] = useState<[string, string][]>(
    () => Object.entries(Routes) as [string, string][]
  );
  const router = useRouter();
  const [user, setUser] = useState<User | any>();

  useEffect(() => {
    console.log(router.pathname);
    const userData = JSON.parse(
      localStorage.getItem("user_data") || "{ id: -1 }"
    );
    setUser(userData);
  }, []);

  return (
    <div className="flex flex-row w-screen items-center topbar-component h-16">
      <div className="flex flex-row px-6 gap-14">
        <LogoComponent />
        <div className="flex items-center gap-6">
          {routes.map(([key, value]) => (
            <div className="flex flex-col items-center" key={key}>
              <Link href={value} className="anchor-box text-box">
                <p>{key}</p>
              </Link>
              {router.pathname.includes(value) && (
                <span className="custom-route-indicator"></span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row gap-3 h-3/4 items-center mr-6">
        {/* gets subject from localstorage */}
        <div className="h-12 w-12 mt-1 cursor-pointer">
          <ProfilePicComponent
            subject={user?.username || "none"}
            border={true}
            not_shadow={true}
          />
        </div>
        <div className="flex flex-col gap-1 text-box">
          <p>{user?.username || ""}</p>
          <p>{FormatRole(user?.roles[0].id) || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TopBarComponent);
