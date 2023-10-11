import { FaTimes } from "react-icons/fa"
import "../Styles/sidebar.css"
import { useNavigate } from "react-router-dom";
const LandingPageSideBar = ({
  slide,
    slideFunction,
    overview,
    faq,
  taskFlow
}: {
  slide: string;
  slideFunction: React.Dispatch<React.SetStateAction<string>>;
  overview: () => void;
  faq: () => void;
  taskFlow: () => void;

    }) => {
    const navigate  = useNavigate()
  return (
    <div
      className={`l_sidebar w-10p h-10p fixed top-0  ${slide}  bg-white sidebar:hidden`}
    >
      <div className="p-5 flex justify-end items-center box-border">
        <button className="none" onClick={() => slideFunction("sidebar")}>
          <FaTimes />
        </button>
      </div>
      <div className="w-12 h-6 flex items-center justify-center bg-appcolor-500 ">
        <h2 className=" text-white text-xl font-semibold text-center">Formy</h2>
      </div>
      <div className="flex items-center py-3">
        <span className="block w-1 h-4 bg-appcolor-500"></span>{" "}
        <button onClick={overview} className="pl-2 text-sm text-inputline-300">Overview</button>
      </div>
      <div className="flex items-center py-3">
        <span className="block w-1 h-4 bg-appcolor-500"></span>{" "}
        <button onClick={faq} className="pl-2 text-sm text-inputline-300">FAQs</button>
      </div>
      <div className="flex items-center py-3">
        <span className="block w-1 h-4 bg-appcolor-500"></span>{" "}
        <button onClick={taskFlow} className="pl-2 text-sm text-inputline-300">Task Flow</button>
      </div>
      <div className="flex items-center py-3">
        <span className="block w-1 h-4 bg-appcolor-500"></span>{" "}
        <button onClick={()=>navigate("/signin")} className="pl-2 text-sm text-inputline-300">Login</button>
      </div>
    </div>
  );
};

export default LandingPageSideBar