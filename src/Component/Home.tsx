import "../Styles/login.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../Styles/create.css";

import { useSelector, useDispatch } from "react-redux";
import { FiLink } from "react-icons/fi";
import {
  FaLink,
 
} from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { changeDashSectionIdentificationR } from "../Redux/Style";

import { appContext } from "../App";
import { TopThree } from "../Interface/AllInfoInterface";
import Copied from "./Copied";
import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";

import { viewDetailsFromDashboardR } from "../Redux/Registered";
import Chart from "react-apexcharts"
import { hideShowSideBarR } from "../Redux/Style";
const Home = () => {
  const { userAuthorisation } = useContext(appContext);
  const dispatch = useDispatch();
  const location = useLocation();
 const navigate = useNavigate()
  
  const style = useSelector((state: any) => state.style.value);
  const profile = useSelector((state: any) => state.profiledetails.value);
  const dashDetails = useSelector((state: any) => state.dashdetails.value);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      userAuthorisation();
      dispatch(hideShowSideBarR(""))
      dispatch(changeDashSectionIdentificationR("Home"));
    }
  }, []);
  const viewDetails = (id: number, link: string) => {
    dispatch(
      viewDetailsFromDashboardR({
        info: dashDetails.lastestFormResponses[id],
      })
    );
    navigate(`/collection/${link}`);
    
  }
 
  return (
    <>
      <div className={`${style.bgSize} createbg h-9p w-10p bottom-0  fixed  `}>
        <div className="emptydiv"></div>
        <div className="w-10p mb-2 overflow-y-scroll">
          <div className="w-9p mx-auto">
            <div>
              <h1 className="text-appcolor-100">
                <span className="text-xl"> Welcome </span> <br></br>
                <span className="text-4xl">{profile.username}</span>
              </h1>
              <p className="text-xs text-inputline-200 mt-1">
                start creating you form and get the analysis of the response
              </p>
              <button
                onClick={() => navigate("/dashboard/create")}
                className="w-12 h-5  text-white rounded-sm mt-4 bg-appcolor-100 "
              >
                Create
              </button>
            </div>
            <div></div>
          </div>
          <div className="w-9p py-3 mt-1 bg-white  mx-auto">
            <div className="top_link">
              {dashDetails.topPerformingForm.length < 1 ? (
                <div>
                  <h1 className="text-inputline-200 text-2xl font-bold">
                    No Form Created
                  </h1>
                  <p className="text-sm text-inputline-200">Start creating</p>
                </div>
              ) : (
                dashDetails.topPerformingForm.map(
                  (details: TopThree, id: number) => (
                    <div className="py-1 shadow-sm">
                      <div className="flex justify-evenly items-center">
                        <div>
                          <h1 className="text-appcolor-100 leading-7 font-semibold">
                            {details.form_title}
                          </h1>
                          <p className="text-xs text-inputline-300 h-8 w-14 overflow-hidden  text-ellipsis  leading-5">
                            {details.form_description}
                          </p>
                        </div>
                        <div className="w-7 h-7 flex justify-center items-center rounded-xlg border-8 border-appcolor-100">
                          {details.totalSubmit}
                        </div>
                      </div>
                      <div className="mt-5 flex justify-evenly items-end">
                        <div className="flex  items-center">
                          <div className="w-4 h-4 bg-appcolor-100 text-white rounded-xlg flex justify-center items-center">
                            <CopyToClipboard
                              text={`https://formy-emeey-lanr.vercel.app/form/${details.form_link}`}
                              onCopy={() => setCopied(true)}
                            >
                              <FiLink />
                            </CopyToClipboard>
                          </div>

                          <p className="text-xs text-inputline-300 overflow-hidden w-14 text-ellipsis whitespace-nowrap">
                            {details.form_link}
                          </p>
                        </div>
                        <div>
                          <button
                            onClick={() =>
                              navigate(`/collection/${details.form_link}`)
                            }
                            className="w-7 h-5 bg-appcolor-100 text-xs text-white font-bold rounded-sm"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>
          {/* Graph */}
          <div className="w-9p mx-auto mt-3 bg-white">
            <Chart
              options={{
                chart: {
                  background: "#fafafa",
                  foreColor: "",
                },
                xaxis: {
                  // Name
                  categories: dashDetails.topThreeName,
                },
                plotOptions: {
                  bar: {
                    horizontal: true,
                  },
                },
                fill: {
                  colors: ["#2c3cec"],
                },
                dataLabels: {
                  enabled: false,
                },
                title: {
                  text: "Top Links",
                  align: "center",
                  margin: 20,
                },
              }}
              series={[
                {
                  name: "Top Performing Links",
                  //
                  data: dashDetails.topThreeReponses,
                },
              ]}
              type="bar"
              height="700"
              width="100%"
            />
          </div>
          <div className="res_new_links_created bg-white">
            <div className="div bg-white">
              {dashDetails.lastestFormResponses.length < 1 ? (
                <div></div>
              ) : (
                dashDetails.lastestFormResponses.map(
                  (
                    details: {
                      form_title: string;
                      form_link: string;
                      form_description: string;
                      user_email: string;
                    },
                    id: number
                  ) => (
                    <div className="w-9p  pb-3 my-3 mx-auto shadow-lg bg-white">
                      <div className="w-5 h-2 bg-appcolor-100 rounded-y-xl" />
                      <div className="w-9p mx-auto">
                        <h1 className="text-3xl text-appcolor-100">
                          {details.form_title}
                        </h1>
                        <p className="text-xs text-inputline-300">
                          {details.form_description}
                        </p>
                        <div className="flex my-2">
                          <div className="w-4 h-4 flex justify-center items-center rounded-xlg bg-appcolor-100">
                            <CopyToClipboard
                              text={`https://formy-emeey-lanr.vercel.app/form/${details.form_link}`}
                              onCopy={() => setCopied(true)}
                            >
                              <FaLink className="text-white" />
                            </CopyToClipboard>
                          </div>

                          <p className="text-sm text-inputline-300">
                            {details.form_link}
                          </p>
                        </div>
                      </div>
                      <div className="w-9p mx-auto rounded-sm bg-appcolor-100">
                        <p className="text-white font-semibold  ml-2">
                          {details.user_email}
                        </p>
                      </div>
                      <div className="flex mt-2 justify-between items-center">
                        <div>
                          <button
                            onClick={() => viewDetails(id, details.form_link)}
                            className="w-8 h-4 rounded-sm text-white bg-appcolor-100"
                          >
                            view
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {copied && <Copied disableClipBoardNotification={setCopied} />}
      <Navbar />
      {/* <CreateModal/> */}
      <Sidebar />
    </>
  );
};

export default Home;
