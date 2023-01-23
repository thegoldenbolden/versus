import { log } from "@lib/helpers";
import { Component, PropsWithChildren } from "react";
class ErrorBoundary extends Component {
 state: { hasError: boolean };
 props: PropsWithChildren;

 constructor(props: PropsWithChildren) {
  super(props);
  this.props = props;
  this.state = { hasError: false };
 }

 static getDerivedStateFromError(error: any) {
  return { hasError: true };
 }

 componentDidCatch(error: any, errorInfo: any) {
  log(error.name, error.name);
 }

 render() {
  if (this.state.hasError) {
   return (
    <div className="relative flex flex-col items-center w-full h-full gap-2 px-4 py-2">
     <h2 className="text-2xl font-display">Oops, there is an error!</h2>
     <button
      type="button"
      aria-label="Try again"
      className="p-3 py-1 font-bold bg-red-600 rounded-sm hover:brightness-105 focus:brightness-105 drop-shadow-md"
      onClick={() => this.setState({ hasError: false })}
     >
      Try again?
     </button>
    </div>
   );
  }

  return this.props.children;
 }
}

export default ErrorBoundary;
