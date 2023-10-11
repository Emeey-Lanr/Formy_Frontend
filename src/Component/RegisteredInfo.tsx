import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { useDispatch, useSelector} from "react-redux"
import "../Styles/create.css"
import { FiLink } from "react-icons/fi"
import { FaArrowLeft, FaTrash } from "react-icons/fa"
import { SlPeople } from "react-icons/sl"
import { FormCreation } from "../Interface/AllInfoInterface"
 import {useContext, useRef} from "react"
import { appContext } from "../App"
import { useReactToPrint } from "react-to-print"
import { deleteFormModalR } from "../Redux/Modal";
const RegisteredInfo = () => {
  const {setInfoModalState} =useContext(appContext)
  const style = useSelector((state: any) => state.style.value)
  const modal = useSelector((state: any) => state.modal.value)
  const info = useSelector((state:any)=>state.registrationinfo.value)
  const componentRef = useRef(null);
  const dispatch = useDispatch()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const checkInfo = () => {
    console.log(info);
    dispatch(
    deleteFormModalR({
      payload: String(info.currentId),
        deleteNumberId: 1,
    })
    )
  }
  return (
    <div>
      <>
        <div className={`createbg  h-9p w-10p bottom-0  fixed ${style.bgSize}`}>
          <div className="emptydiv"></div>
          <div className="w-10p h-10p overflow-y-scroll">
            <div className="">
              <div className="w-9p mb-3 mx-auto sticky top-0">
                <div className="flex justify-between items-center">
                  <button onClick={() => setInfoModalState(false)}>
                    <FaArrowLeft />
                  </button>
                  <div className="flex items-center">
                    <button
                      onClick={handlePrint}
                      className="bg-appcolor-100 px-4 py-1 rounded-sm text-white text-sm"
                    >
                      Print
                    </button>
                    <button
                      onClick={() =>
                        checkInfo()
                      }
                      style={{ color: "red" }}
                      className="mx-2 border h-5 w-5 flex justify-center items-center rounded-xlg"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div ref={componentRef} className="bg-white w-9p mx-auto py-4">
              <div className="w-9p mx-auto">
                <h1 className="text-appcolor-100 text-center text-xl font-bold">
                  {info.form_title}
                </h1>

                <p className="text-sm py-1 leading-6 text-center text-inputline-300">
                  {info.form_description}
                </p>
                <div className="flex justify-center py-1">
                  <h1 className="font-medium text-appcolor-200">
                    /form/{info.form_link}
                  </h1>
                  <button className="mx-2 text-appcolor-100">
                    <FiLink />
                  </button>
                </div>
              </div>
              <div className="py-1 flex justify-between items-center h-1p w-9p mx-auto">
                <h1 className="font-bold text-appcolor-100">
                  {info.currentEmail}
                </h1>
              </div>
              <div className="w-9p flex   h-9p  mx-auto">
                <div
                  style={{ height: "77%" }}
                  className="w-10p preview_overflow"
                >
                  {info.currentData.map((data: FormCreation, id: number) => (
                    <div className="border border-appcolor-400 mb-2">
                      <div className="flex w-10p  my-3 py-2   mx-auto">
                        <div className="w-4 h-4 flex justify-center items-center mx-1 rounded-xlg bg-appcolor-100 text-white">
                          {id + 1}
                        </div>
                        <div>
                          <p className="text-md text-inputline-300">
                            {data.question}
                          </p>
                        </div>
                      </div>

                      <div className="w-9p mx-auto">
                        {data.option.length > 0 ? (
                          data.option.map((info, childId: number) => (
                            <div className="flex items-center my-1">
                              <div className="w-4 h-4 border flex justify-center items-center border-appcolor-100 rounded-xlg">
                                <div
                                  className={`h-3 w-3 ${
                                    info.status && "bg-appcolor-100"
                                  } border border-appcolor-100 rounded-xlg`}
                                ></div>
                              </div>
                              <div>
                                <p className="text-sm mx-1 text-inputline-300">
                                  {info.answer}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="w-10p mx-auto">
                            <input
                              disabled={true}
                              type="text"
                              value={data.anwser}
                              className="w-10p border-b-2 outline-0 border-appcolor-200"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </>
    </div>
  );
}

export default RegisteredInfo