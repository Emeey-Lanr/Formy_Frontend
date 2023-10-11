import { AiOutlineCheck } from "react-icons/ai";
import { FaTimes } from "react-icons/fa"
interface CopiedInterface {
  disableClipBoardNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const Copied = ({ disableClipBoardNotification }: CopiedInterface) => {
  return (
    <div
      className="fixed bottom-2 right-2 items-center flex bg-checked-250 justify-evenly rounded-sm "
      style={{ width: "180px", height: "40px" }}
    >
      <p className="text-white text-sm flex items-center ">
        <AiOutlineCheck /> Copied to clipboard
      </p>
      <button onClick={() => disableClipBoardNotification(false)}>
        <FaTimes className="text-sm text-white" />
      </button>
    </div>
  );
};

export default Copied