import { useState } from "react";
import "../Styles/dashboard.css";
import { increaseReduceSizeR } from "../Redux/Style";
import { useDispatch, useSelector } from "react-redux";
import SidebarBack from "./SidebarBack";
import {
  AiOutlineHome,
  AiOutlineDoubleRight,
  AiOutlineDoubleLeft,
} from "react-icons/ai";
import { RiLinksFill } from "react-icons/ri";
import { SlLogout, SlSettings } from "react-icons/sl";
import { CiSettings, CiPen } from "react-icons/ci";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate()
  const style = useSelector((state: any) => state.style.value);
  const dispatch = useDispatch();
  const [hideSibar, setHideSidebar] = useState<string>("fullsidebar");
  const [showOnlyIcon, setShowOnlyIcon] = useState("showText");
  const breakSideBarBtn = () => {
    dispatch(increaseReduceSizeR("check"));
    if (hideSibar === "fullsidebar" && showOnlyIcon === "showText") {
      setHideSidebar("breaksidebar");
      setShowOnlyIcon("hideText");
    } else {
      setHideSidebar("fullsidebar");
      setShowOnlyIcon("showText");
    }
  };
  const logOut = () => {
    navigate("/signin")
  };

  return (
    <>
      <SidebarBack />

      <div
        className={`h-10p fixed left-0  bg-white  ${hideSibar} ${style.hideShowSideBar}`}
      >
        <div className="h-1p">
          <div className="w-10p pt-2 flex justify-center items-center">
            <Logo w={"w-5"} h={"h-6"} />{" "}
            <h1 className="mx-4 text-center font-bold text-appcolor-100 text-xl mt-2">
              Formy
            </h1>
          </div>

          <button className="w-4 h-4  flex justify-center  items-center shadow-lg text-white rounded-xlg bg-appcolor-100"  onClick={() => breakSideBarBtn()}>
            {" "}
            {hideSibar === "fullsidebar" ? (
              <AiOutlineDoubleLeft />
            ) : (
              <AiOutlineDoubleRight />
            )}{" "}
          </button>
        </div>
        <div className="h-6p ">
          <Link
            to="/dashboard"
            className="w-8p flex items-center my-4 py-2 px-1 rounded-l-xlg ml-auto text-inputline-100 text-sm hover:bg-appcolor-100 hover:text-white"
          >
            <AiOutlineHome /> <p className={`text-sm px-1 ${showOnlyIcon}`}>Home</p>
          </Link>
          <Link
            to="/dashboard/create"
            className="w-8p flex items-center my-4 py-2 px-1 rounded-l-xlg ml-auto text-inputline-100 text-sm hover:bg-appcolor-100 hover:text-white"
          >
            <CiPen /> <p className={`text-sm px-1 ${showOnlyIcon}`}>Create</p>
          </Link>
          <Link
            to="/collection"
            className="w-8p flex items-center my-4 py-2 px-1 rounded-l-xlg ml-auto text-inputline-100 text-sm hover:bg-appcolor-100 hover:text-white"
          >
            <RiLinksFill /> <p className={`text-sm px-1 ${showOnlyIcon}`}>Links</p>
          </Link>
          <Link
            to="/setting"
            className="w-8p flex items-center   my-4 py-2 px-1 rounded-l-xlg ml-auto text-inputline-100 text-sm hover:bg-appcolor-100 hover:text-white"
          >
            <SlSettings /> <p className={`text-sm px-1 ${showOnlyIcon}`}>Setting</p>
          </Link>
        </div>
        <div className="h-3p  w-10p">
          <button
            onClick={() => logOut()}
            className="w-8p flex items-center py-2 px-1 rounded-l-xlg ml-auto text-inputline-100 text-sm hover:bg-appcolor-100 hover:text-white"
          >
            <SlLogout /> <p className={`text-sm px-1 ${showOnlyIcon}`}>Logout</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
