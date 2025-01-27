import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import Close from "../../assets/close.png";

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const Modal = ({ open, setOpen, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, setOpen]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] overflow-y-auto">
      <div
        ref={modalRef}
        className={`w-96 max-h-fit py-5 px-5 rounded-[4px] font-semibold flex flex-col justify-between items-center relative ${"bg-main-bg"}`}
      >
        <div
          className={`absolute cursor-pointer size-8 rounded-md top-4 right-4 center ${"hover:bg-dark-hover"}`}
          onClick={() => setOpen(false)}
        >
          <img className="size-5" src={Close} alt="close modal" />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
