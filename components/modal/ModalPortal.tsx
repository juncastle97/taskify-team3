import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalPortalProps {
  children: ReactNode;
}

function ModalPortal({ children }: ModalPortalProps) {
  const el =
    typeof document !== "undefined" ? document.getElementById("modal") : null;

  if (el) {
    return ReactDOM.createPortal(children, el);
  } else {
    return null;
  }
}

export default ModalPortal;
