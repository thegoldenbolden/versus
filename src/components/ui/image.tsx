"use client";
import type { ImageProps } from "next/image";
import NextImage from "next/image";
import { useState } from "react";
import { IUserLine } from "./icons";

const Image: React.FC<ImageProps> = (props) => {
 const [src, setSrc] = useState(props.src);
 if (props.src == "") return <IUserLine className="icon" />;
 return (
  <NextImage height={24} width={24} {...props} src={src} onError={() => setSrc("")} />
 );
};

export default Image;
