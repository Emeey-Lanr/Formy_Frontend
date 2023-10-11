import "../Styles/create.css"
import Navbar from "./Navbar"
import CreateModal from "./CreateModal"
import Sidebar from "./Sidebar"
import { useSelector, useDispatch } from "react-redux"
import { AiOutlineCamera, AiOutlineUser } from "react-icons/ai"
import { FaArrowDown, FaLock } from "react-icons/fa"
import { useContext, useEffect, useState } from "react"
import noImg from "../Images/noImage.png"
import { appContext } from "../App"
import {PuffLoader, RotateLoader} from "react-spinners"
import axios from "axios"
import { changeDashSectionIdentificationR } from "../Redux/Style";
import { useRef } from "react"
import { hideShowSideBarR } from "../Redux/Style";
const Setting = () => {
  const {userAuthorisation} =useContext(appContext)
  const dispatch = useDispatch()
  const emptyInput1 = useRef<HTMLInputElement>(null)
  const emptyInput2 = useRef<HTMLInputElement>(null)
  
  
  const [passwordChange, setPasswordChange] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const style = useSelector((state: any) => state.style.value);
  const profile = useSelector((state: any) => state.profiledetails.value);
    const endpoint = useSelector((state: any) => state.endpoint.endPoints)
  
  const [oldPassword, setOldPasword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  useEffect(() => {
    dispatch(hideShowSideBarR(""))
    dispatch(changeDashSectionIdentificationR("Setting"));
    userAuthorisation()
  },[])
   const ifSuccessOrErrorFunction = (status:boolean, message:string, offStatus:boolean) => {
      setErr(status);
      setErrorMessage(message);
    setTimeout(() => {
      if (emptyInput1.current) {
        emptyInput1.current.value = ""
        
      }
      if (emptyInput2.current) {
        emptyInput2.current.value = "";
      }
        
        setErr(offStatus)
        setErrorMessage("")
        setLoading(false)
      }, 3000);
  }
  const uploadImg = (e: any) => {
    console.log(e.target.files)
    const userUpload = new FileReader()
 userUpload.readAsDataURL(e.target.files[0])
    userUpload.onload = () => {
        setLoading(true)
       axios.put(`${endpoint.user}/uploadProfileImg`, { email: profile.email, img: `${userUpload.result}` }).then((result) => {
         userAuthorisation()
         ifSuccessOrErrorFunction(true, `${result.data.message}`, false)
       
     }).catch((err) => {
        ifSuccessOrErrorFunction(true, `${err.response.data.message}`, false);
     })
     
     }
    
  }
 
  const changePasswordBtn = () => {
    if (newPassword.length < 6) {
      alert("password must be aleast six characters")
    } else {
      setLoading(true)
      axios.put(`${endpoint.user}/changepassword`, {email:profile.email, oldPassword, newPassword}).then((result) => {
       ifSuccessOrErrorFunction(true, `${result.data.message}`, false)
        
      }).catch((error) => {
        ifSuccessOrErrorFunction(true, `${error.response.data.message}`, false);
      })
    }
    
  }
  useEffect(() => {
      userAuthorisation()
    },[])
    return (
      <>
        <div className={`createbg  h-9p w-10p bottom-0  fixed ${style.bgSize}`}>
          <div className="emptydiv"></div>
          <div className="overflow-y-scroll">
            <div className="bg-white mb-3   w-9p mx-auto">
              <div className="w-10p shadow-sm flex justify-between items-center mb-2 py-2 px-2  mx-auto bg-white">
                <div className="flex items-center ">
                  <AiOutlineUser className="text-inputline-100" />
                  <p className="text-sm text-inputline-100 ml-2">Profile</p>
                </div>
                <button onClick={() => setOpenProfile(!openProfile)}>
                  <FaArrowDown />
                </button>
              </div>
              {openProfile && (
                <div className="w-10p pb-5 mx-auto">
                  <div className=" w-9p mx-auto">
                    <img
                      src={profile.img_url === "" ? noImg : profile.img_url}
                      alt=""
                      className="rounded-xlg"
                      style={{
                        height: "100px",
                        width: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div
                    className="w-9p mx-auto"
                    style={{ marginTop: "-15px", marginLeft: "130px" }}
                  >
                    <label id="img">
                      <AiOutlineCamera className="text-lg text-appcolor-100" />
                      <input
                        type="file"
                        hidden
                        id="img"
                        onChange={(e) => uploadImg(e)}
                      />
                    </label>
                  </div>

                  <div className="w-9p mx-auto mt-4">
                    <div className="border-b border-inputline-200 flex items-center">
                      <p className=" w-11 text-md text-center text-inputline-100 py-1 rounded-l text-sm font-bold">
                        Username :
                      </p>
                      <p className="ml-2 text-inputline-100 text-sm">
                        {profile.username}{" "}
                      </p>
                    </div>
                    <div className="border-b border-inputline-200  mt-2 flex items-center ">
                      <p className="w-11 text-md text-center text-inputline-100 py-1 rounded-ltext-sm font-bold">
                        Email :
                      </p>
                      <p className="ml-2 text-inputline-100 text-sm">
                        {profile.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className=" bg-white w-9p mx-auto ">
              <div className="w-10p flex justify-between items-center py-2 px-2 shadow-sm rounded-sm mx-auto">
                <div className="flex items-center ">
                  <FaLock className="text-inputline-100" />
                  <p className="text-sm  text-inputline-100 ml-2">
                    Change Password
                  </p>
                </div>
                <div>
                  <button onClick={() => setPasswordChange(!passwordChange)}>
                    <FaArrowDown />
                  </button>
                </div>
              </div>
              {passwordChange && (
                <div className="w-9p mx-auto py-2">
                  <div>
                    <p className="text-appcolor-100 text-sm font-bold pb-1 ">
                      Enter Old Password
                    </p>
                    <input ref={emptyInput1}
                      type="password"
                      onChange={(e) => setOldPasword(e.target.value)}
                      className="h-5 text-sm border border-appcolor-200 w-8p rounded-sm focus:outline-appcolor-200"
                    />
                  </div>
                  <div>
                    <p className="text-appcolor-100 text-sm font-bold pb-1 ">
                      Enter New Password
                    </p>
                    <input ref={emptyInput2}
                      type="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-5 text-sm border border-appcolor-200 w-8p rounded-sm focus:outline-appcolor-200"
                    />
                    <p className="text-sm"></p>
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => changePasswordBtn()}
                      className="bg-appcolor-100 h-5 text-sm px-5 rounded-sm text-white"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {loading && (
          <div className="w-10p h-10p fixed top-0 flex justify-center items-center bg-lightdark">
            <div className="bg-white py-1">
              {!err ? (
                <RotateLoader
                  color={"blue"}
                  loading={true}
                  cssOverride={{
                    display: "block",
                    margin: "0 auto",
                    borderColor: "red",
                  }}
                  size={8}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <div className="py-1 px-4">
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}
            </div>
          </div>
        )}
        <Navbar />
        <CreateModal />
        <Sidebar />
      </>
    );
}

export default Setting