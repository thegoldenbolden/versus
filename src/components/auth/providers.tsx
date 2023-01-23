import { Login } from "./login";
import { IDiscordFill, IGoogleFill, ITwitterFill } from "../ui/icons";

export default function Providers() {
 return (
  <div className="flex flex-col gap-2">
   <span className="px-6 text-sm max-w-screen">Login with one of the following</span>
   <div className="flex flex-col items-center gap-2 text-lotion justify-evenly">
    <Login provider="google">
     <IGoogleFill className="w-7 h-7" aria-label="Google logo" />
    </Login>
    <Login provider="twitter">
     <ITwitterFill className="w-7 h-7" aria-label="Twitter logo" />
    </Login>
    <Login provider="discord">
     <IDiscordFill className="w-7 h-7" aria-label="Discord logo" />
    </Login>
   </div>
  </div>
 );
}
