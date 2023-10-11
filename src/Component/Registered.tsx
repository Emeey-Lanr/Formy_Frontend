import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";

import { FaTrash,  FaArrowLeft } from "react-icons/fa";
import "../Styles/create.css";
import DeleteformModal from "./DeleteformModal";
import { deleteFormModalR } from "../Redux/Modal";
import { FiLink } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { appContext } from "../App";
import RegisteredInfo from "./RegisteredInfo";
import { getUserDetailsR, processOverallDetailsR } from "../Redux/Registered";
import Copied from "./Copied";
import CopyToClipboard from "react-copy-to-clipboard";
import OverallAnalysis from "./OverallAnalysis";
import { hideShowSideBarR } from "../Redux/Style";
import { useLocation, } from "react-router-dom";


const Registered = () => {
  const { getDetails, infoModalState, setInfoModalState , overallAnalysisState, setOverallAnalysisState, setIfEmpty, ifEmpty} =
    useContext(appContext);
  const style = useSelector((state: any) => state.style.value);
  const endpoint = useSelector((state: any) => state.endpoint.endPoints);
  const info = useSelector((state: any) => state.registrationinfo.value);

  const dispatch = useDispatch();
  const param = useParams();
 const location = useLocation()

  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {

    setIfEmpty("Please Wait...")
    getDetails(`${param.id}`);
    dispatch(hideShowSideBarR(""))
  }, []);

  const getDetailsBtn = (id: number, userEmail: string, userId:number) => {
    dispatch(getUserDetailsR({ id, userEmail, userId }));
    setInfoModalState(true);
  };
  const showFormDetailsBtn = () => {
  
     dispatch(processOverallDetailsR(info.form_registration_data));
     setOverallAnalysisState(true)
  };
  return (
    <div>
      <>
        <div className={`createbg  h-9p w-10p bottom-0  fixed ${style.bgSize}`}>
          <div className="emptydiv"></div>
          <div className="w-10p h-10p overflow-y-scroll">
            <div className="w-9p mx-auto ">
              <div className="sticky top-0">
                <Link to="/collection">
                  <FaArrowLeft />
                </Link>
              </div>
              <h1 className="text-appcolor-100 text-xl font-bold pt-2">
                {info.form_title}
              </h1>
              <div className="flex py-1">
                <h1 className="font-medium text-appcolor-200 leading-6">
                  /form/{info.form_link}
                </h1>
                <button className="mx-2 text-appcolor-100">
                  <CopyToClipboard
                    text={`https://formy-emeey-lanr.vercel.app/form/${info.form_link}`}
                    onCopy={() => setCopied(true)}
                  >
                    <FiLink />
                  </CopyToClipboard>
                </button>
              </div>
              <p className="text-sm text-inputline-300 leading-7">
                {info.form_description}
              </p>
            </div>
            <div className="w-9p mx-auto flex justify-between items-center py-1">
              <button
                className="w-14 text-white rounded-sm h-5 mb-2 bg-appcolor-100"
                onClick={() => showFormDetailsBtn()}
              >
                View Overall Analysis
              </button>
              <div className="w-6 h-6 rounded-xlg flex justify-center items-center border-4 border-appcolor-100 ">
                <span>{info.form_registration_data.length}</span>
              </div>
            </div>

            <div className="w-10p h-10p ">
              <div
                className={`w-9p mx-auto h-9p rounded-sm py-1 ${
                  info.form_registration_data.length === 0 &&
                  `flex justify-center items-center`
                }`}
              >
                {info.form_registration_data.length > 0 ? (
                  info.form_registration_data.map(
                    (data: { id: number; user_email: string }, id: number) => (
                      <div
                        key={id}
                        className="w-10p mx-auto h-8 bg-white shadow-md mb-3  flex justify-between items-center px-1"
                      >
                        <div>
                          <h3 className="text-appcolor-100 font-bold text-lg">
                            {id + 1}{" "}
                            <span className="text-appcolor-100 font-semibold text-sm ">
                              {data.user_email}
                            </span>
                          </h3>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              getDetailsBtn(id, data.user_email, data.id)
                            }
                            className="border  rounded-sm mx-1 bg-appcolor-200 text-white text-sm py-1  px-2"
                          >
                            Details
                          </button>

                          <div>
                            <button
                              onClick={() =>
                                dispatch(
                                  deleteFormModalR({
                                    payload: String(data.id),
                                    deleteNumberId: 1,
                                  })
                                )
                              }
                              className="mx-2"
                              style={{ color: "red" }}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="flex justify-center items-center">
                    <h1 className="text-8xl text-inputline-200 collection2:text-2xl">
                      {ifEmpty}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {copied && <Copied disableClipBoardNotification={setCopied} />}
        <Navbar />

        {infoModalState && <RegisteredInfo />}
        {overallAnalysisState && <OverallAnalysis />}
        <DeleteformModal />
        {/* <CreateModal/> */}
        <Sidebar />
      </>
    </div>
  );
};

export default Registered;
