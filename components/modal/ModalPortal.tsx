import { ReactNode, useState, useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalPortalProps {
  children: ReactNode;
}

function ModalPortal({ children }: ModalPortalProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const el =
    typeof document !== "undefined" ? document.getElementById("modal") : null;

  // if (el) {
  //   return ReactDOM.createPortal(children, el);
  // } else {
  //   return null;
  // }
  return mounted ? ReactDOM.createPortal(children, el as HTMLElement) : <></>;
}

export default ModalPortal;
