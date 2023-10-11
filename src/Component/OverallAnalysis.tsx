import React, {useRef, useContext} from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import { overall_analysis_data } from '../Interface/AllInfoInterface'; 
import {useReactToPrint} from "react-to-print"
import { appContext } from '../App';


const OverallAnalysis = () => {
  const {setOverallAnalysisState} = useContext(appContext)
  const componentRef = useRef<HTMLDivElement>(null)
  const formOverallAnalysisData = useSelector((state:any)=>state.registrationinfo.value)
  const style = useSelector((state: any) => state.style.value);
  const printBtn = useReactToPrint({
    content:()=>componentRef.current
  })
  return (
    <div className="">
      <>
        <div className={`${style.bgSize} createbg  h-9p w-10p fixed bottom-0 `}>
          <div className="emptydiv"></div>
          <div className="w-10p h-10p overflow-y-scroll">
            <div className="w-9p mx-auto flex justify-between items-center sticky top-0">
              <button onClick={()=>setOverallAnalysisState(false)}>
                <FaArrowLeft className="text-appcolor-100" />
              </button>
              <button
                onClick={printBtn}
                className="text-white bg-appcolor-100 w-12 h-5 rounded-sm"
              >
                print
              </button>
            </div>

            <div ref={componentRef} className="mt-2 w-9p  bg-white py-2 mx-auto ">
              <div>
                <h1 className="text-center text-appcolor-100 text-3xl">
                  {formOverallAnalysisData.form_title}
                </h1>
                <p className="text-sm  leading-5 text-center text-inputline-300">
                  {formOverallAnalysisData.form_description}
                </p>
              </div>
              {formOverallAnalysisData.form_overall_analysis.length < 1 ? (
                <div></div>
              ) : (
                formOverallAnalysisData.form_overall_analysis.map(
                  (data: overall_analysis_data, id: number) => (
                    <div className="w-9p border-b py-3 border-appcolor-400 mt-3 mx-auto">
                      <h1 className="flex items-center">
                        <span className="text-2xl text-appcolor-100">
                          Question{" "}
                        </span>
                        <span className="h-3 w-3 text-sm mx-1 flex justify-center items-center text-white rounded-xlg bg-appcolor-100">
                          {id + 1}
                        </span>
                      </h1>

                      <p className="leading-8 text-inputline-300">
                        {data.question}
                      </p>
                      {data.ans.map((info, id) => (
                        <div className='border mb-2 px-1 border-appcolor-400' >
                          <div className=''>
                            <div className="flex justify-between items-center">
                              <h1 className="text-appcolor-100 text-lg flex items-center">
                                <span className="font-semibold">Answers</span>
                                <span className="h-3 w-3 text-sm  mx-1  flex justify-center items-center text-white rounded-xlg bg-appcolor-100">
                                  {id + 1}
                                </span>
                              </h1>
                            </div>
                            <p className="">{info.picked}</p>
                          </div>
                          <div>
                            <div className="flex justify-between items-center">
                              <p className="text-appcolor-100 font-semibold">
                                Picked By
                              </p>
                              <div className="w-5 h-5 flex justify-center items-center rounded-xlg border-4 border-appcolor-100">
                                {info.users.length}
                              </div>
                            </div>

                            {info.users.map((info_dat) => (
                              <div className="w-10p">
                                <p className="text-sm leading-6 text-inputline-300">
                                  {info_dat}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default OverallAnalysis