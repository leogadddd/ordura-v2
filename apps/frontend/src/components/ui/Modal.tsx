import { PropsWithChildren } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal Content */}
      <div className="overflow-hidden relative bg-white rounded-xl shadow-xl w-full h-full m-4 md:m-8 flex flex-col max-w-7xl max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-2 px-4 bg-primary border-gray-200">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white hover:bg-primary-dark"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden p-4 pt-0">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
