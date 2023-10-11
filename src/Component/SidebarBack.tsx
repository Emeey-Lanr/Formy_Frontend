import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideShowSideBarR } from "../Redux/Style";
import "../Styles/dashboard.css";
import { FaTimes } from "react-icons/fa";

const SidebarBack = () => {
  const style = useSelector((state: any) => state.style.value);
  const dispatch = useDispatch();
  return (
    <>
      {style.hideShowSideBar === "showSideBar" && (
        <div
          className={`w-10p h-10p  fixed top-0 flex justify-center bg-lightdark rsideBack`}
        >
          <div className="w-10p flex justify-end p-3">
            <button
              onClick={() => dispatch(hideShowSideBarR(""))}
              className="hideSideBarBtn right-0"
            >
              <FaTimes className="text-white"/>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarBack;
