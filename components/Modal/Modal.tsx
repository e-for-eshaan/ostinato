import React, { useCallback, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  children: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({
  children,
  showModal,
  setShowModal,
}) => {
  if (process.browser) {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  const closeRef = useRef<HTMLDivElement>(null);
  useClickOutside(closeRef, () => setShowModal(false));

  const escFunction = useCallback(
    (event: any) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    },
    [setShowModal]
  );
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[9999] outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div
                className="max-w-[500px] w-screen px-5 relative"
                ref={closeRef}
              >
                {children}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
