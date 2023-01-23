import type { IconType } from "react-icons";

// TODO: refactor
export default function Tabs({ tabs, tab, setTab }: TabProps) {
 const handleClick = (index: number) => {
  setTab(index);
 };

 return (
  <div className="flex">
   {tabs.map(({ icon: Icon, text }, index) => {
    const active =
     tab === index
      ? " border-b-primary font-bold opacity-100 dark:border-b-secondary"
      : "";

    return (
     <button
      key={text}
      className={`flex justify-center px-4 grow hover:bg-smoky-black-translucent hover:dark:bg-lotion-translucent`}
      onClick={() => handleClick(index)}
     >
      <div
       className={`block h-full pt-3 pb-2 text-sm text-center border-b-4 border-transparent border-solid opacity-75 text-inherit ${active}`}
      >
       {Icon && <Icon />}
       {text}
      </div>
     </button>
    );
   })}
  </div>
 );
}

type TabProps = {
 tab: number;
 setTab: React.Dispatch<React.SetStateAction<number>>;
 tabs: { icon?: IconType; text: string }[];
};
