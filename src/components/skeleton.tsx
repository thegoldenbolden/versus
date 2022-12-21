import { FC } from "react";

const Skeleton: FC<JSX.IntrinsicElements["div"]> = (props) => {
 return <div className={`${props.className} skeleton`} />;
};

export default Skeleton;
