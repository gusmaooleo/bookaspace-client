import ProfilePicComponent from "@/components/Icons/profilePic/ProfilePicComponent";
import { GenericSubpage } from "@/utils/interfaces/GenericSubpage";
import Link from "next/link";

export const ItemCell = ({
  title,
  description,
  type,
  link,
  username,
}: GenericSubpage) => {
  switch (type) {
    case "link":
      return (
        <div>
          <h3>{title}</h3>
          <Link href={link} className="subpage-text underline">
            {description}
          </Link>
        </div>
      );
    case "user":
      return (
        <div>
          <h3>{title}</h3>
          <div className="flex items-center flex-row gap-4">
            <div className="h-10 w-10">
              <ProfilePicComponent subject={username} not_shadow={true} />
            </div>
            <p className="subpage-text">{description}</p>
          </div>
        </div>
      );
    case "title":
      return (
        <div>
          <h3>{title}</h3>
          <p className="subpage-text text-xl font-semibold">{description}</p>
        </div>
      );
    case "common":
    default:
      return (
        <div>
          <h3>{title}</h3>
          <p className="subpage-text">{description}</p>
        </div>
      );
  }
};