import React, { useEffect } from "react";

export default function Notify({ message, type, setShowNotify }) {
  useEffect(() => {
    setTimeout(() => {
      setShowNotify(false);
    }, 4000);
  }, [type]);
  return (
    <div>
      <div className={`alert alert-${type}`} role="alert">
        {message}
      </div>
    </div>
  );
}
