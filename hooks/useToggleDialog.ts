import Timer from "helpers/timer";
import { useCallback, useEffect, useRef, useState } from "react";

const useToggleDialog = () => {
  const timerClose = useRef(new Timer());
  const [open, setOpen] = useState<boolean>(false);
  const [close, setClose] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      setClose(true);
    } else {
      timerClose.current.debounce(() => {
        setClose(false);
      }, 500);
    }
  }, [open]);

  const toggle = useCallback((arg) => {
    if (typeof arg === "boolean") {
      setOpen(arg);
    }
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const shouldRender = open || close;

  return [open, toggle, shouldRender, close] as any;
};

export default useToggleDialog;
