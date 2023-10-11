import axios from "axios";
import { error } from "console";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showFormDetails, pickOptionR, fillInputR } from "../Redux/FillForm";
import Loading from "./Loading";
import { appContext } from "../App";
import { FormCreation } from "../Interface/AllInfoInterface";
import SubmitModal from "./SubmitModal";
import "../Styles/register.css";
import { FaTimes } from "react-icons/fa";
const Formy = () => {
  const {
    setLoadLinkError,
    setLoadLinkMessage,
    submitForm,
    setSubmitForm,
    setOwnerId,
  } = useContext(appContext);
  const endpoint = useSelector((state: any) => state.endpoint.endPoints);
  const param = useParams();
  const dispatch = useDispatch();
  const formDetails = useSelector((state: any) => state.fillform.value);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    axios
      .get(`${endpoint.register}/fill`, {
        headers: {
          Authorization: `bearer ${param.id}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((result) => {
        console.log(result);
        setLoadingState(false);
        dispatch(
          showFormDetails({
            data: result.data.data.form_details,
            title: result.data.data.form_title,
            description: result.data.data.form_description,
          })
        );

        setOwnerId(`${result.data.data.userid}`);
      })
      .catch((error) => {

        if (!error.response.data.sucesss) {
          setLoadLinkError(true);
          setLoadingState(true);
          setLoadLinkMessage(`${error.response.data.message}`);
        }
      });
  }, []);
  const pickOptions = (parentId: number, childId: number) => {
    dispatch(pickOptionR({ parentId, childId }));
  };
  const fillInput = (e: React.ChangeEvent<HTMLTextAreaElement>, id: number) => {
    dispatch(fillInputR({ id, answer: e.target.value }));
  };
  const [notAllFilled, setNotAllFilled] = useState("attempted");
  const openSubmitModalBtn = () => {
    const check1 = formDetails.formData.filter(
      (data: FormCreation) => data.anwser === "" && data.option.length === 0
    );
    const check2 = formDetails.formData.filter(
      (data: FormCreation) => data.option.length > 0
    );
    const check3 = formDetails.formData.filter(
      (data: FormCreation) =>
        data.option.filter((info) => info.status === true).length > 0
    );
    let ifItDoes = false;

    if (check2.length > 0) {
      if (check2.length === check3.length) {
        ifItDoes = true;
  
      } else {
      
        ifItDoes = false;
      }
    }
    if (check1.length > 0 || ifItDoes === false) {
      setNotAllFilled("unattempted");
    } else {
      setNotAllFilled("attempted");
      setSubmitForm(true);
    }

  };

  return (
    <>
      <div className="createbg w-10p h-10p fixed top-0 overflow-y-scroll">
        <div className="w-6p mx-auto collection2:w-9p">
          <div>
            <h1
              className="text-appcolor-100  my-3 font-bold"
              style={{ fontSize: "1.4rem" }}
            >
              {formDetails.form_title}
            </h1>
            <p className="text-inputline-200 text-xs">
              {formDetails.form_description}
            </p>
          </div>
          <div className="w-10p  my-2">
            {/* FORM */}
            <div className="bg-white w-10p py-3 shadow-sm rounded-sm">
              {formDetails.formData.map((data: FormCreation, id: number) => (
                <>
                  <div className="flex w-9p my-3 py-2   mx-auto">
                    <div className="w-4 h-4 flex justify-center items-center mx-1 rounded-xlg bg-appcolor-100 text-white">
                      {id + 1}
                    </div>
                    <div>
                      <p className="text-md text-inputline-300">
                        {data.question}
                      </p>
                    </div>
                  </div>

                  <div className="w-8p mx-auto">
                    {data.option.length > 0 ? (
                      data.option.map((info, childId: number) => (
                        <div className="flex items-center my-1">
                          <div
                            onClick={() => pickOptions(id, childId)}
                            className="w-4 h-4 border flex justify-center items-center border-appcolor-100 rounded-xlg"
                          >
                            <div
                              className={`h-3 w-3 ${
                                info.status && "bg-appcolor-100"
                              } border border-appcolor-100 rounded-xlg`}
                            ></div>
                          </div>
                          <div>
                            <p className="text-sm mx-1 text-inputline-300">
                              {info.answer}{" "}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="w-10p mx-auto">
                        <textarea 
                          onChange={(e) => fillInput(e, id)}
                       
                          className="resize-none w-10p border-b-2 outline-0 border-appcolor-200"
                        />
                      </div>
                    )}
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="w-10p">
            <button
              onClick={() => openSubmitModalBtn()}
              className="px-5 py-2 bg-appcolor-100 text-xs text-white rounded-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className={`${notAllFilled} shadow-md`}>
        <div className="mx-auto flex justify-end items-center">
          <button onClick={() => setNotAllFilled("attempted")}>
            <FaTimes />
          </button>
        </div>
        <div className="div2 bg-warning rounded-sm">
          <p className="text-xs w-9p mx-auto text-white">
            You still have some left unattempted, attempt all
          </p>
        </div>
      </div>
      {submitForm && <SubmitModal />}
      {loadingState && <Loading />}
    </>
  );
};

export default Formy;
