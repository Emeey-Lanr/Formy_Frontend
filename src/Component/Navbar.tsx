import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideShowSideBarR, showSideBar } from "../Redux/Style";
import "../Styles/navbar.css";
import noImg from "../Images/noImage.png";
const Navbar = () => {
  const dispatch = useDispatch();
  const style = useSelector((state: any) => state.style.value);
  const profile = useSelector((state: any) => state.profiledetails.value);
  return (
    <div className={`createbg w-10p h-1p fixed top-0 ${style.bgSize}`}>
      <div></div>
      <div className="flex justify-between items-center px-2 py-1 ">
        <div>
          <h1 className="text-xl font-bold text-appcolor-100 border-b">
            {style.dashboardSectionIdentification}
          </h1>
        </div>
        <div className="flex items-center px-1 box-border">
          <div className="h-5 rounded-xlg mr-3 flex justify-center items-center  w-5 border">
            <img
              className="h-4 w-4 rounded-xlg cover"
              src={profile.img_url === "" ? noImg : profile.img_url}
              alt=""
            />
          </div>
          {style.hideShowSideBar === "hideSideBar" && (
            <button
              className="navbarSwitchBtn"
              onClick={() => dispatch(showSideBar(""))}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
