import { IAccount } from "@components/icons";
import Image from "@components/image";

const Avatar = (props: { image?: string | null; size?: string }) => {
 let { image, size } = props;
 size ??= "icon";

 if (!image || image.length === 0) {
  return <IAccount className={size} />;
 }

 return (
  <Image
   src={image}
   alt="avatar"
   height={24}
   width={24}
   className={`block rounded aspect-square ${size}`}
  />
 );
};

export default Avatar;
