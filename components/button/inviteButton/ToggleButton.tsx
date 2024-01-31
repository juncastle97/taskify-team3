import React, { useState } from "react";
import clsx from "clsx";
import styles from "./InviteButton.module.scss";

interface TogglebuttonProps {
  children: React.ReactNode;
  type?: "accept" | "deny";
  small?: boolean;
  large?: boolean;
  onAccept?: () => void;
  onDeny?: () => void;
}
const ToggleButton: React.FC<TogglebuttonProps> = ({
  children,
  type = "accept",
  small,
  large,
  onAccept,
  onDeny,
  ...props
}) => {
  const [status, setStatus] = useState<string>("default");

  const handleClick = () => {
    setStatus(status === "accept" ? "deny" : "accept");

    if (status === "accept" && onDeny) {
      onDeny();
    } else if (status === "deny" && onAccept) {
      onAccept();
    }
  };

  return (
    <button
      className={clsx(
        styles.button,
        small && styles.small,
        large && styles.large,
        status === "accept" && styles.accepted,
        status === "deny" && styles.denied,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

const InviteButton: React.FC<TogglebuttonProps> = ({
  children,
  type = "accept",
  small,
  large,
  onAccept,
  onDeny,
  ...props
}) => {
  const [status, setStatus] = useState<string>("default");

  const handleClick = () => {
    setStatus(status === "accept" ? "deny" : "accept");

    if (status === "accept" && onDeny) {
      onDeny();
    } else if (status === "deny" && onAccept) {
      onAccept();
    }
  };

  return (
    <button
      className={clsx(
        styles.button,
        small && styles.small,
        large && styles.large,
        status === "accept" && styles.accepted,
        status === "deny" && styles.denied,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
export default ToggleButton;
