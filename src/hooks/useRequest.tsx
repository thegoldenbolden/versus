import { useState } from "react";

const useRequest = (callback: Function, resetCallback?: Function) => {
 const [submitting, setSubmitting] = useState(false);
 const [error, setError] = useState(null);

 const trigger = async (...args: any) => {
  try {
   setSubmitting(true);
   await callback(...args);
   setError(null);
  } catch (error: any) {
   setError(error.message);
   console.log("error in trigger");
   resetCallback && resetCallback();
  } finally {
   setSubmitting(false);
  }
 };

 return { submitting, error, trigger };
};

export default useRequest;
