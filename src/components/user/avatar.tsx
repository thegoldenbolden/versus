import type { IconType } from "react-icons";
import { IUserLine } from "../ui/icons";
import Image from "../ui/image";

const Avatar = (props: AvatarProps) => {
 let { image, icon: Icon } = props;
 Icon ??= IUserLine;

 if (!image || !image.url || image.url.length === 0) {
  return <Icon className="icon" />;
 }

 image.rounded ??= "rounded";

 return (
  <Image
   src={image.url}
   alt="avatar"
   height={image.height ?? 32}
   width={image.width ?? 32}
   className={`block aspect-square ${image.rounded}`}
  />
 );
};

export default Avatar;

type AvatarProps = {
 icon?: IconType;
 image?: {
  height?: number;
  width?: number;
  url?: string | null;
  rounded?: "rounded" | "rounded-none" | "rounded-full" | "rounded-sm" | "rounded-md";
 };
};
