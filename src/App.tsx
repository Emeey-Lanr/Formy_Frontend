import Create from "./Component/Create";
import Home from "./Component/Home";
import Registered from "./Component/Registered";
import Signup from "./Component/Signup";
import RegisteredInfo from "./Component/RegisteredInfo";
import LinksCollection from "./Component/LinksCollection";
import LandingPage from "./Component/LandingPage";
import Signin from "./Component/Signin";
import { Route, Routes, useNavigate } from "react-router-dom";
import { createContext } from "react";
import { appContextDetails } from "./ContextApi/appContext";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getUserDataR } from "./Redux/UserProfile";
import Formy from "./Component/Formy";
import { useState } from "react";
import Submitted from "./Component/Submitted";
import { getLinkR } from "./Redux/FormLinks";
import { getRegistrationInfoR } from "./Redux/Registered";
import { useParams } from "react-router-dom";
import { getDashDetailsR } from "./Redux/DashDetails";
import Setting from "./Component/Setting";
import ErrorPage from "./Component/404";
import PasswordReset from "./Component/EmailPasswordReset";
import ResetForgotPassword from "./Component/ResetForgotPassword";

export const appContext = createContext(appContextDetails);
const App: React.FC = () => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const endpoint = useSelector((state: any) => state.endpoint.endPoints);
  const [loadLinkError, setLoadLinkError] = useState<boolean>(false);
  const [loadLinkMessage, setLoadLinkMessage] = useState<string>("");

  const [submitForm, setSubmitForm] = useState<boolean>(false);
  const [ownerId, setOwnerId] = useState<string>("");

  const [infoModalState, setInfoModalState] = useState<boolean>(false);
  const [overallAnalysisState, setOverallAnalysisState] = useState<boolean>(false)
  const [links, setLinks] = useState([])
  const [ifEmpty, setIfEmpty] = useState<string> ("Please Wait...")

  const userAuthorisation = () => {
    let id = "";
    if (localStorage.id) {
      id = localStorage.id;
    } else {
      id = "?";
    }
    axios
      .get(`${endpoint.user}/authorizeuser`, {
        headers: {
          Authorization: `bearer ${id}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((result) => {
      
        dispatch(getUserDataR(result.data.data.userDetails));
        dispatch(
          getDashDetailsR({
            response: result.data.data.dashboardDetails.lastestResponses,
            form: result.data.data.dashboardDetails.lastestForms,
            topThree: result.data.data.dashboardDetails.topPerformingForms,
          })
        );
      })
      .catch((err) => {
        navigate("/signin");
     
      });
  };
  const getLinkF = () => {
    axios
      .get(`${endpoint.form}/getlink`, {
        headers: {
          Authorization: `bearer ${localStorage.id}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((result) => {
        if (result.data.data.length < 1) {
          setIfEmpty("No Details Found")
        }
        dispatch(getLinkR(result.data.data));
        setLinks(result.data.data)
      })
      .catch((error) => {
        if (!error.response.data.sucesss) {
          navigate("/signin");
        }
      });
  };
  const getDetails = (id: string) => {
    axios
      .get(`${endpoint.form}/formRegistrationDetails`, {
        headers: {
          Authorization: `bearer ${id}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((result) => {
          if (result.data.data. data.length < 1) {
            setIfEmpty("No Response Yet");
          }
        dispatch(
          getRegistrationInfoR({
            description: result.data.data.details.form_description,
            link: result.data.data.details.form_link,
            title: result.data.data.details.form_title,
            data: result.data.data.data,
          })
        );
      })
      .catch((err) => {
                 navigate("/signin")
      });
  };
  return (
    <>
      <appContext.Provider
        value={{
          userAuthorisation,
          loadLinkError,
          setLoadLinkError,
          loadLinkMessage,
          setLoadLinkMessage,
          submitForm,
          setSubmitForm,
          ownerId,
          setOwnerId,
          getLinkF,
          getDetails,
          infoModalState,
          setInfoModalState,
          overallAnalysisState,
          setOverallAnalysisState,
          links,
          ifEmpty,
          setIfEmpty
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/create" element={<Create />} />
          <Route path="/collection" element={<LinksCollection />} />
          <Route path="/collection/:id" element={<Registered />} />
          <Route path="/details" element={<RegisteredInfo />} />
          <Route path="form/:id" element={<Formy />} />
          <Route path="/form/:id/submitted" element={<Submitted />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/forgot/password" element={<PasswordReset/>} />
          <Route path="/reset/:id" element={<ResetForgotPassword/>}/>
          <Route path="*" element={<ErrorPage />} />
        
        </Routes>
      </appContext.Provider>
    </>
  );
};

export default App;
