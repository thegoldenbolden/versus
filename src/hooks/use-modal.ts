import { useState } from "react";

const useModal = () => {
 const [isOpen, setIsOpen] = useState(false);
 const closeModal = () => {
  setIsOpen(true);
 };
 return { isOpen, setIsOpen, closeModal };
};

export default useModal;
