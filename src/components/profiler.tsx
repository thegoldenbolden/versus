import type { FC, PropsWithChildren } from "react";
import { Profiler as ReactProfiler } from "react";
import { log } from "@lib/helpers";

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
