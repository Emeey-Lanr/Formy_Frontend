import { useState, useEffect, useContext, useRef } from "react";
import "../Styles/create.css";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { addQuestionR, pickAnswerR, removeQuestion } from "../Redux/FormCreation";

import { useSelector } from "react-redux";
import { FormCreation } from "../Interface/AllInfoInterface";
import { hideShowSideBarR } from "../Redux/Style";
import Navbar from "./Navbar";
import CreateModal from "./CreateModal";
import { changeDashSectionIdentificationR } from "../Redux/Style";
import { createFormModalR } from "../Redux/Modal";
import { appContext } from "../App";
import { FaArrowUp, FaTimes } from "react-icons/fa";

const Create = () => {
  // const {  userAuthorisation } = useContext(appContext)
  const questionInput = useRef<HTMLTextAreaElement>(null);
  const lastDiv = useRef<HTMLDivElement>(null);
  const topDiv = useRef<HTMLDivElement>(null);
  const form = useSelector((state: any) => state.form.value);
  const style = useSelector((state: any) => state.style.value);
  const dispatch = useDispatch();
  // const form = useSelector((state:any)=>state.form)
  const [question, setQuestion] = useState<string>("");
  // to check if user is making use of the option button
  const [optionSet, setOptionSet] = useState<boolean>(false);
  interface Option {
    answer: string;
    status: boolean;
  }

  const [option, setOptions] = useState<Option[]>([]);
  useEffect(() => {
    dispatch(hideShowSideBarR(""))
    dispatch(changeDashSectionIdentificationR("Create"));
    //   userAuthorisation()
  }, []);
  const addOptionBtn = () => {
    let optionPreview = {
      answer: "",
      status: false,
    };
    if (question !== "") {
      if (option.length < 2) {
        setOptions([...option, optionPreview, optionPreview]);
      } else {
        setOptions([...option, optionPreview]);
      }
    } else {
    }
  };
  const addOptionForm = (
    newValue: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    //   setOptions(updatedOptions);
    const updatedOptions = [...option];
    updatedOptions[id] = { answer: newValue.target.value, status: false };
    setOptions(updatedOptions);

    //  setOptions(option)
  };
  const preventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const addQuestionBtn = () => {
    const details = {
      question: question,
      anwser: "",
      option: option,
    };
    if (question === "") {
      alert("question not added");
    } else {
       if (questionInput.current) {
         questionInput.current.value = "";
         console.log("yes");
       }
      setOptions([]);
      if (lastDiv.current) {
        lastDiv.current.scrollIntoView()
      }
     
      dispatch(addQuestionR(details));
     
      
      console.log(form);
    }
  };
  const removeOptionBtn = (index: number) => {
    if (option.length === 2) {
      setOptions([]);
    } else {
      setOptions(option.filter((detail, id) => id !== index));
    }
  };
  const pickAnswerBtn = (parentid: number, childId: number) => {
    dispatch(pickAnswerR({ parent: parentid, child: childId }));
  };
  const scrollUpBtn = () => {
    if (topDiv.current) {
      topDiv.current.scrollIntoView()
    }
    
  }
  return (
    <>
      <div className={`createbg  h-9p w-10p bottom-0  fixed ${style.bgSize}`}>
        <div className="emptydiv"></div>
        <div className="createFlexNone:overflow-y-scroll createFlexNone:h-10p">
          <div className="h-2p">
            <h2 className="pl-2 font-medium   text-appcolor-200">
              Create our own
            </h2>
            <p className="text-inputline-100 pl-2 text-xs">
              Design your form to your taste
            </p>
          </div>
          <div ref={topDiv} />
          <div className="w-10p flex justify-evenly items-center h-8p createFlexNone:block ">
            <form onSubmit={preventSubmit} className="w-4p border border-inputline-200 py-3 rounded-sm createFlexNone:mx-auto createFlexNone:w-9p">
              <div className="w-8p mx-auto">
                <p className="text-appcolor-100 text-xl">Question</p>
                <div className="w-9p ml-auto">
                  <textarea
                    ref={questionInput}
                    onChange={(e) => setQuestion(e.target.value)}
                    style={{ background: "none" }}
                  
                    className="preview_textarea border-b-2 border-appcolor-200  w-10p bottom-3 outline-0 h-6 text-sm "
                  />
                </div>
              </div>
              <div className="w-8p mx-auto flex  items-center py-2">
                <button
                  onClick={() => addOptionBtn()}
                  className="rounded-sm w-5 h-5 flex justify-center items-center bg-appcolor-100 "
                >
                  <span className="text-white font-bold text-xl">+</span>
                </button>
                <p className="px-1 text-inputline-300">options</p>
              </div>
              <div className="w-8p mx-auto">
                {option.map((details, id) => (
                  <div className="flex w-9p my-2">
                    <div className="w-5 h-5 flex justify-center items-center border border-appcolor-200">
                      <div className="w-4 h-4 border flex justify-center items-center text-appcolor-100 border-appcolor-200">
                        {id + 1}
                      </div>
                    </div>
                    <input
                      onChange={(e) => addOptionForm(e, id)}
                      style={{ background: "none" }}
                      type="text"
                      className="w-8p resize-none mx-1 border-b border-appcolor-200 outline-0 "
                    />
                    {id === option.length - 1 && (
                      <button
                        onClick={() => removeOptionBtn(id)}
                        className="font-bold text-appcolor-100"
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <button></button>
              </div>
              <div className="w-8p mx-auto flex justify-end">
                <button
                  onClick={() => addQuestionBtn()}
                  className="w-6 h-5 rounded-sm bg-appcolor-100 text-white"
                >{`>>`}</button>
              </div>
            </form>
            <div
              className="w-4p bg-white rounded-sm createFlexNone:w-9p createFlexNone:mx-auto"
              style={{ height: "79vh"}}
            >
              <div className="sticky top-0 h-1p">
                <p className="m-3 text-xl text-appcolor-100">Preview</p>
                <div className="w-7 h-4 mt-minus  bg-appcolor-100"></div>
              </div>

              <div className="mt-3 h-7p pb-2 preview_overflow">
                {form.map((details: FormCreation, id: number) => (
                  <>
                    <div className="w-10p flex justify-end">
                      <button onClick={()=>dispatch(removeQuestion(id))}>
                        <FaTimes className="text-xs text-appcolor-100"/>
                      </button>
                    </div>
                    <div className="flex w-9p  mx-auto">
                      
                      <div className="w-4 h-4 flex justify-center items-center mx-1  bg-appcolor-100 text-white">
                        {id + 1}
                      </div>
                      <div className="">
                        <p className="w-9p break-words text-sm text-inputline-300">
                          {details.question}
                        </p>
                      </div>
                    </div>

                    <div className="w-8p mx-auto">
                      {details.option.length > 0 ? (
                        details.option.map((info, index) => (
                          <div className="flex items-center my-1">
                            <div
                              onClick={() => pickAnswerBtn(id, index)}
                              className="w-4 h-4 border flex justify-center items-center border-appcolor-100 rounded-xlg "
                            >
                              <div
                                className={`h-3 w-3 ${
                                  info.status && `bg-appcolor-100`
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
                          <input
                            type="text"
                            className="w-10p border-b-2 outline-0 border-appcolor-200"
                          />
                        </div>
                      )}
                    </div>
                    <div ref={lastDiv} />
                  </>
                ))}
              </div>
              {form.length > 0 && (
                <div className="h-1p  w-10p flex justify-center items-center">
                  <button
                    onClick={() => dispatch(createFormModalR(true))}
                    className="w-8p h-9p   text-white  bg-appcolor-100 text-sm"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="fixed bottom-0 right-0 h-5 w-5 rounded- bg-appcolor-100 flex justify-center items-center">
            <button onClick={() => scrollUpBtn()}>
              <FaArrowUp className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <Navbar />
      <CreateModal />
      <Sidebar />
    </>
  );
};

export default Create;
