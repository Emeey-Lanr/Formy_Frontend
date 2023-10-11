import { useState, useRef } from "react";
import { PulseLoader } from "react-spinners";
import { SlArrowLeftCircle } from "react-icons/sl";
import { useSelector, useDispatch } from "react-redux";
import { createFormModalR } from "../Redux/Modal";
import { FaClock, FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";
import { error } from "console";
import { useNavigate } from "react-router-dom";

const CreateModal = () => {
  const date = new Date();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | any>();
  const dispatch = useDispatch();
  const modal = useSelector((state: any) => state.modal.value);
  const endPoint = useSelector((state: any) => state.endpoint.endPoints);
  const form = useSelector((state: any) => state.form.value);
  const profile = useSelector((state: any) => state.profiledetails.value);
  const [dateStatus, setDateStatus] = useState(false);
  const [timeStatus, setTimeStatus] = useState(false);

  const [session, setSession] = useState(["AM", "PM"]);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [dateV, setDateV] = useState("");
  const [timeV, settimeV] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const addHour = (data: number) => {
    // alert(20)
    console.log(data);
  };
  const switchDateTimeFunction = (date: boolean, time: boolean) => {
    setDateStatus(date);
    setTimeStatus(time);
  };
  const addDateBtn = () => {
    switch (dateStatus) {
      case false: {
        return switchDateTimeFunction(true, false);
      }
      case true: {
        return switchDateTimeFunction(false, false);
      }
    }
  };
  const addDateTimeBtn = () => {
    switch (timeStatus) {
      case false: {
        return switchDateTimeFunction(true, true);
      }
      case true: {
        return switchDateTimeFunction(false, false);
      }
    }
  };
  const [errorSucessStyle, setErrorSucessStyle] = useState("");

  const errorSucessIfAnyFunction = (message: string, styleColor: string) => {
    setErrorMessage(message);
    setErrorSucessStyle(styleColor);
  };
  const createLinkBtn = () => {
    console.log(form);
    const createFormDetails = {
      userId: `${profile.email}`,
      form_title: formTitle,
      form_description: formDescription,
      form_details: form,
      form_time: timeV,
      form_date: dateV,
    };

    console.log(createFormDetails);
    if (profile.email === "") {
      errorSucessIfAnyFunction(
        "Reload page, an error occured",
        "bg-checked-350"
      );
    } else if (formTitle === "" || formDescription === "") {
      errorSucessIfAnyFunction("Fill in input", "bg-checked-350");
    } else {
      if (
        dateV === "" &&
        timeV !== "" &&
        dateStatus === true &&
        timeStatus === true
      ) {
        errorSucessIfAnyFunction("Select Date", "bg-checked-350");
      } else {
        setLoading(true);
        axios
          .post(`${endPoint.form}/add`, createFormDetails)
          .then((result) => {
            console.log(result);
            navigate("/collection");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <>
      {modal.createModal && (
        <div
          className={`w-10p h-10p fixed top-0 flex justify-center items-center bg-lightdark`}
        >
          <div className="bg-white px-4 py-4 rounded-sm">
            <button onClick={() => dispatch(createFormModalR(false))}>
              <SlArrowLeftCircle className="text-appcolor-100" />
            </button>
            {errorMessage !== "" && (
              <div
                className={`w-9p mx-auto bg-checked-50  my-1 rounded-sm`}
                style={{ padding: "2px 2px" }}
              >
                <p
                  className="text-sm text-white text-center"
                  style={{ paddingBottom: "2px" }}
                >
                  {errorMessage}
                </p>
              </div>
            )}
            <h1 className="text-appcolor-100 text-xl">About</h1>
            <p className="text-inputline-100 text-xs">
              Fill in input to tell what your{" "}
              <span className="text-appcolor-100 font-bold">formy</span> is
              about, to create
            </p>
            <h3 className="text-appcolor-100 font-medium">Title</h3>
            <input
              type="text"
              className="w-10p h-5 text-sm rounded-sm border border-appcolor-200 mt-1 outline-0"
              onChange={(e) => setFormTitle(e.target.value)}
            />
            <h3 className="text-appcolor-100 font-medium mt-1">Description</h3>
            <input
              type="text"
              className="w-10p h-5 text-sm rounded-sm border border-appcolor-200  outline-0"
              onChange={(e) => setFormDescription(e.target.value)}
            />
            <div className="flex items-center my-3">
              <div className="h-1 w-5 bg-appcolor-100"></div>
              <p className="text-xs text-inputline-100 w-5p">
                You can add date duration or a date and timeduration to you
                form, click and unClick
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center my-1">
                  <button
                    onClick={() => addDateBtn()}
                    className="flex  justify-center rounded-lg items-center h-4 w-4 border border-appcolor-100"
                  >
                    <div className="h-3 w-3 border border-appcolor-100 rounded-lg"></div>
                  </button>
                  <div className="mx-1">
                    <p className="text-xs text-inputline-100">Date</p>
                  </div>
                </div>

                <div className="flex items-center my-1">
                  <button
                    onClick={() => addDateTimeBtn()}
                    className="flex justify-center border-appcolor-100 items-center rounded-lg h-4 w-4 border"
                  >
                    <div className="h-3 w-3 border border-appcolor-100 rounded-lg"></div>
                  </button>
                  <div className="mx-1">
                    <p className="text-xs text-inputline-100">Date & Time</p>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                {dateStatus && (
                  <div>
                    <div className="flex items-center">
                      <div className="w-4 h-1 bg-appcolor-100 rounded-r-sm"></div>
                      <p className="text-md font-semibold text-appcolor-100 mx-1 inputline-100">
                        Date
                      </p>
                    </div>
                    <input
                      type="date"
                      onChange={(e) => setDateV(e.target.value)}
                      className="border border-inputline-100 focus:outline-0"
                    />
                  </div>
                )}
                {timeStatus && (
                  <div className="my-1">
                    <div className="flex items-center">
                      <div className="w-4 h-1 bg-appcolor-100 rounded-r-sm "></div>
                      <p className="text-sm mx-1 font-semibold  text-appcolor-100">
                        Time
                      </p>
                    </div>

                    <div className="flex">
                      <input
                        type="time"
                        onChange={(e) => settimeV(e.target.value)}
                        className="border border-inputline-100 focus:outline-0"
                      />
                    </div>

                    <div></div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => createLinkBtn()}
              disabled={loading}
              className="w-10p bg-appcolor-100 mt-2 py-1 text-sm text-white rounded-sm"
            >
              {!loading && `Create`}
              <PulseLoader
                color={"white"}
                loading={loading}
                cssOverride={{
                  display: "block",
                  margin: "0 auto",
                  borderColor: "red",
                }}
                size={8}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateModal;
