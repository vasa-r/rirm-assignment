import { Dispatch, SetStateAction } from "react";
import Loader from "../Loaders/Loader";
import Modal from "../UtilsUI/Modal";

interface DeleteFieldProp {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  isLoading: boolean;
  onPress: () => void;
}

const ConfirmDelete = ({
  setOpen,
  open,
  isLoading,
  onPress,
}: DeleteFieldProp) => {
  return (
    <Modal setOpen={setOpen} open={open}>
      <div className="flex flex-col items-center gap-6 mt-3">
        <h1 className="text-2xl font-medium">Are you sure want to delete?</h1>
        {isLoading && <Loader width="24px" height="24px" />}
        <div className="flex items-center w-full gap-4">
          <button
            className="flex-1 px-4 py-3 border rounded-md"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="flex-1 px-4 py-3 bg-red-500 border rounded-md"
            onClick={onPress}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
