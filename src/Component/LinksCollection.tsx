import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import "../Styles/create.css";
import { FiLink } from "react-icons/fi";
import { FaArrowRight, FaSearch, FaTrash } from "react-icons/fa";
import { SlPeople } from "react-icons/sl";
import { useEffect } from "react";
import { changeDashSectionIdentificationR } from "../Redux/Style";

import { useNavigate } from "react-router-dom";
import { LinkInterFace } from "../Interface/AllInfoInterface";
import DeleteformModal from "./DeleteformModal";
import { deleteFormModalR } from "../Redux/Modal";
import { useContext } from "react";
import { appContext } from "../App";
import CopyToClipboard from "react-copy-to-clipboard";
import { searchLinkR } from "../Redux/FormLinks";
import { useState } from "react";
import Copied from "./Copied";
import { hideShowSideBarR } from "../Redux/Style";
const LinksCollection = () => {
  const { getLinkF, links, ifEmpty } = useContext(appContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const style = useSelector((state: any) => state.style.value);
  const endpoint = useSelector((state: any) => state.endpoint.endPoints);
  const linkDetails = useSelector((state: any) => state.link.value);

  const [copied, setCopied] = useState<boolean>(false);
  useEffect(() => {
    dispatch(changeDashSectionIdentificationR("Links"));
    getLinkF();
    dispatch(hideShowSideBarR(""))
  }, []);
  const filterSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let m = e.target.value.toUpperCase();
    dispatch(searchLinkR({ links, text: m }))

    // linkDetails.map((details: LinkInterFace) => {
    //   if (details.form_title.toUpperCase().indexOf(`${m}`) > -1) {
      
    //   }
    // });
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCopied(false)

  //   }, 3000)
  // }, [copied])

  const navigateToDetailsBtn = (form_link: string) => {
    navigate(`/collection/${form_link}`);
  };
  return (
    <div>
      <>
        <div
          className={`${style.bgSize} createbg  h-9p w-10p bottom-0  fixed `}
        >
          <div className="emptydiv"></div>
          <div className="w-10p h-10p overflow-y-scroll">
            <div></div>

            <div className="w-9p mx-auto">
              <div className="w-9p sticky top-0 mx-auto ">
                <div className="w-10p   my-2 mx-auto h-6 flex items-center">
                  <input
                    onChange={(e) => filterSearch(e)}
                    type="text"
                    className="bg-0 w-10p h-6 border-l border-appcolor-100 rounded-l-sm focus:outline-0"
                  />
                  <button className="w-9 flex justify-center items-center bg-appcolor-200 h-6 text-white rounded-r-sm">
                    <FaSearch />
                  </button>
                </div>
              </div>
              {linkDetails.length < 1 ? (
                <div>
                  <div>
                    <h2 className="text-3xl font-bold text-inputline-200 text-center    createmodal:text-medium createmodal:text-lg">
                      {ifEmpty}
                    </h2>
                  </div>
                </div>
              ) : (
                linkDetails.map((details: LinkInterFace, id: number) => (
                  <div className="w-9p py-1 px-1 mb-1 shadow-md flex justify-between items-center mx-auto bg-white rounded-sm collection1:w-10p collection2:block">
                    <div className="flex items-center">
                      {/* <div className="w-5 h-5 rounded-sm flex justify-center items-center text-checked-250 bg-checked-300">
                      <SlPeople />
                    </div> */}
                      <div className="mx-2  bg-appcolor-200 rounded-r-sm">
                        <h1
                          className="bg-white text-appcolor-100 font-semibold  rounded-sm "
                          style={{
                            width: "130px",
                            overflowX: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {details.form_title}
                        </h1>
                        <p
                          style={{
                            width: "200px",
                            overflowX: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                          className="text-sm h-5 flex items-center  rounded-sm  text-white"
                        >{`/form/${details.form_link}`}</p>
                      </div>
                    </div>

                    <div className="flex collection2:justify-end collection2:py-1">
                      <div className="border  w-5 h-5 flex justify-center rounded-xlg items-center text-checked-250">
                        <CopyToClipboard
                          text={`https://formy-emeey-lanr.vercel.app/form/${details.form_link}`}
                          onCopy={() => setCopied(true)}
                        >
                          <FiLink />
                        </CopyToClipboard>
                      </div>
                      <button
                        onClick={() =>
                          dispatch(
                            deleteFormModalR({
                              payload: details.form_link,
                              deleteNumberId: 0,
                            })
                          )
                        }
                        className="border rounded-xlg mx-1  w-5 h-5 flex justify-center items-center"
                        style={{ color: "red" }}
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => navigateToDetailsBtn(details.form_link)}
                        className="border rounded-xlg bg-appcolor-100 mx-1  w-5 h-5 flex justify-center items-center text-white"
                      >
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {copied && <Copied disableClipBoardNotification={setCopied} />}
        <Navbar />
        <DeleteformModal />
        <Sidebar />
      </>
      {/* */}
    </div>
  );
};

export default LinksCollection;
