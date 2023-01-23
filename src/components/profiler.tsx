import { log } from "@lib/helpers";
import { FC, Profiler as ReactProfiler, PropsWithChildren } from "react";

const Profiler: FC<PropsWithChildren & { id: string }> = (props) => {
 return (
  <ReactProfiler
   id={props.id}
   onRender={(args) => {
    log("Profile", args);
   }}
  >
   {props.children}
  </ReactProfiler>
 );
};

export default Profiler;
