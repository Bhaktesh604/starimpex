
"use client"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { AlertState, EVariant, clearAlert } from "../store/reducers/alert.reducer";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Alert = () => {
  const alert = useSelector<RootState>((state) => state.alert) as AlertState;
  const dispatch = useDispatch();
  const { message, timeout, variant } = alert;

  useEffect(() => {
    if (message && variant && timeout) {
      if (variant === EVariant.SUCCESS) {
        toast.success(message, { autoClose: timeout });
      }
      if (variant === EVariant.ERROR) {
        toast.error(message, { autoClose: timeout });
      }
      dispatch(clearAlert());
    }
  }, [message, variant, timeout, dispatch]);

  return <ToastContainer
    position="top-right"
    transition={Slide} 
  />;
};

export default Alert;
