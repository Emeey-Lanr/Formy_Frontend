import { FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteFormModalR } from "../Redux/Modal";
import axios from "axios";
import { useContext, useState } from "react";
import { appContext } from "../App";
import { useParams } from "react-router-dom";

const DeleteformModal = () => {
  const parameter = useParams();
  const { getLinkF, getDetails, setInfoModalState } = useContext(appContext);
  const endpoint = useSelector((state: any) => state.endpoint.endPoints);
  const modal = useSelector((state: any) => state.modal.value);
  const [disable, setDisable] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const dispatch = useDispatch();
  const deleteF = (
    endpoint: string,
    route: string,
    params: string,
    FtoReload: (param: string) => void
  ) => {
        setDisable(true);
    axios
      .delete(`${endpoint}/${route}/${params}`)
      .then((result) => {
        FtoReload(`${parameter.id}`);

     
        setErrorMessage("Deleted Succesfully")
        setDisable(false);
        setInfoModalState(false);
        
        setTimeout(() => {
            setBackground("");
          setErrorMessage("")
             dispatch(deleteFormModalR({ payload: "", deleteNumberId: 0 }));
        },1000)
      
     
      })
      .catch((err) => {
            setDisable(false);
        setErrorMessage(`${err.response.data.message}`)

      });
  };
  const [background, setBackground] = useState("");
  const deleteLinkUserDetails = () => {
    setInterval(() => {
      if (background === "") {
        setBackground("bg-checked-100");
      } else if (background !== "") {
        setBackground("");
      }
    }, 200);
    console.log(modal.deleteNumberId, modal.deletePayload);
    switch (modal.deleteNumberId) {
      case 0: {
        return deleteF(
          `${endpoint.form}`,
          `delete`,
          `${modal.deletePayload}`,
          getLinkF
        );
      }
      case 1: {
        return deleteF(
          `${endpoint.register}`,
          `delete`,
          `${modal.deletePayload}`,
          getDetails
        );
      }
    }
  };

  const exitModal = () => {
    dispatch(deleteFormModalR(""))
    setErrorMessage("")
  }

  return (
    <>
      {modal.deleteFormModalS && (
        <div className="w-10p h-10p bg-lightdark fixed top-0 flex justify-center items-center">
          <div className="bg-white py-2 px-5 rounded-sm">
            <div>
              <button 
                onClick={() =>exitModal()}
                className="font-light text-inputline-300"
              >
                <FaArrowLeft />
              </button>
            </div>
            {errorMessage !== "" && <div
              className="w-10p mx-auto bg-checked-350 my-1 rounded-sm"
              style={{ padding: "0px 2px", paddingBottom: "4px" }}
            >
          
              <p
                className="text-xs text-white text-center"
                style={{ paddingBottom: "2px" }}
              >
                {errorMessage}
              </p>
            </div>}
            <h1 className="text-appcolor-100 text-lg text-center font-bold">
              Delete form
            </h1>
            <p className="text-sm text-inputline-300">
              Are you sure you want to delete?
            </p>
            <div className="flex justify-end mt-2">
              <button disabled={disable}
                onClick={() => deleteLinkUserDetails()}
                className="h-4 w-4 flex justify-center items-center border border-checked-100 mx-2 rounded-xlg"
              >
                <div
                  className={`h-3 w-3 border transition-0.9s ${background} border-checked-100  rounded-xlg hover:bg-checked-100`}
                ></div>
              </button>
              <button 
                onClick={() =>exitModal()}
                className="h-4 w-4 flex justify-center items-center border border-checked-200 rounded-xlg"
              >
                <div className="h-3 w-3 border rounded-xlg border-checked-200 hover:bg-checked-200"></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteformModal;
