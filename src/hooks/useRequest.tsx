import { useState } from "react";

const useRequest = (callback: Function) => {
 const [submitting, setSubmitting] = useState(false);
 const [error, setError] = useState(null);
 const [success, setSuccess] = useState(false);

 const trigger = async (...args: any) => {
  try {
   if (submitting) return;
   setSubmitting(true);
   await callback(...args);
   setError(null);
   setSuccess(true);
  } catch (error: any) {
   setError(error.message);
  } finally {
   setSubmitting(false);
  }
 };

 const reset = (cb: Function) => {
  cb();
 };

 return { submitting, error, trigger, reset, setError, success };
};

export default useRequest;
