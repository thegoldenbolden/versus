import { useState, useEffect } from "react";
import { debounce } from "../lib/helpers";

export default function useSticky() {
 const [prevScrollPos, setPrevScrollPos] = useState(0);
 const [visible, setVisible] = useState(true);

 const handleScroll = debounce(() => {
  const currentScrollPos = window.pageYOffset;
  setVisible(
   (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 100) ||
    currentScrollPos < 100
  );

  setPrevScrollPos(currentScrollPos);
 }, 500);

 useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, [prevScrollPos, visible, handleScroll]);

 return visible;
}
