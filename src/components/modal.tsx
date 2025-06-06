type ModalProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ message, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center space-y-4">
        <p className="text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}
