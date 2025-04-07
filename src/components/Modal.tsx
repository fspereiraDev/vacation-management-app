import { ModalProps } from "../types"

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null
  
    return (
      <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
        <div className="bg-white border border-gray-300 rounded-2xl p-6 w-full max-w-md relative shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    )
  }
  
  export default Modal