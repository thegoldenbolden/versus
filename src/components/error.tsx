import { Component, PropsWithChildren } from "react";

import log from "@lib/log";

class ErrorBoundary extends Component {
 state: { hasError: boolean };

 constructor(props: PropsWithChildren) {
  super(props);
  this.state = { hasError: false };
 }

 static getDerivedStateFromError(error: any) {
  return { hasError: true };
 }

 // Not implemented
 componentDidCatch(error: any, errorInfo: any) {}

 render() {
  if (this.state.hasError) {
   return (
    <div className="px-4 py-2 flex flex-col gap-2 items-center w-full">
     <h2>Oops, there is an error!</h2>
     <button
      type="button"
      className="px-4"
      onClick={() => this.setState({ hasError: false })}
     >
      Try again?
     </button>
    </div>
   );
  }

  return (this.props as PropsWithChildren).children;
 }
}

export default ErrorBoundary;
