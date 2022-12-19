"use client";
import NextImage, { ImageProps } from "next/image";
import { useState } from "react";

const Image: React.FC<ImageProps> = (props) => {
 const [src, setSrc] = useState(props.src);

 return (
  <NextImage
   height={24}
   width={24}
   {...props}
   src={src}
   onError={() => setSrc("./defaultAvatar")}
  />
 );
};

export default Image;
