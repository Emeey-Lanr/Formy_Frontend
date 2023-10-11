import { FaTimes } from "react-icons/fa"
import { useContext, useState } from "react"
import {appContext} from "../App"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { PulseLoader } from "react-spinners"
const SubmitModal = () => {
    const param = useParams()
    const navigate = useNavigate()
    const { submitForm, setSubmitForm, ownerId } = useContext(appContext)
    const formDetails = useSelector((state: any) => state.fillform.value)
    const endpoint = useSelector((state:any)=>state.endpoint.endPoints)
    const [userEmail, setUserEmail] = useState("")
    const [loading, setLoading] =useState(false)
    const [error, setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    const submitFormBtn = () => {
        console.log(formDetails,)
        if (userEmail !== "") {
            setLoading(true)
            axios.post(`${endpoint.register}/submit`, {form_title:formDetails.form_title, form_description:formDetails.form_description, form_link:param.id, user_email: userEmail, form_details: formDetails.formData, submit_details:[], owner_id:ownerId, }).then((result) => {
              localStorage.userE = userEmail
              setSubmitForm(false)
             navigate(`/form/${param.id}/submitted`)
            }).catch((err) => {
              setError(true)
              setLoading(false)
             setErrorMessage(err.response.data.message)
            })
        } else {
            setErrorMessage("Fill in input")
        }
    }
  return (
      <div className="w-10p h-10p fixed top-0 bg-lightdark flex justify-center items-center">
          <div className="bg-white rounded-sm" style={{width:"300px"}}>
              <div className="flex justify-end p-1">
                  <button onClick={()=>setSubmitForm(false)} className="text-appcolor-100">
                        <FaTimes/>
                </button>
              </div>
              <div className="w-9p mx-auto">
                  
                  <p className="text-xs text-inputline-100 py-1">Are you okay with what you've filled? If you're to submit, fill in the following input</p>
                  <h1 className=" text-appcolor-100 font-medium">Email</h1>
                   {error && <div className="w-9p mx-auto bg-checked-350 my-1 rounded-sm" style={{padding:"0px 2px"}}>
           <div className="w-10p flex justify-end">
              <button onClick={()=>setError(false)}>
                <FaTimes className="text-white"/>
              </button>
            </div>
            <p className="text-xs text-white text-center" style={{ paddingBottom: "2px" }}>{errorMessage}</p>
          </div>}
                  <input onChange={(e)=>setUserEmail(e.target.value)} type="text" className="w-10p my-1 h-5 border border-appcolor-100 focus:outline-0" />
              </div>
              <div className="w-9p mx-auto mb-2 ">
                  <button disabled={loading} onClick={()=>submitFormBtn()} className="w-10p rounded-sm h-5 text-xs bg-appcolor-100 text-white">
                      {!loading && `Submit`}
                       <PulseLoader
                       color={"white"}
                         loading={loading}
                       cssOverride={{display: "block", margin: "0 auto", borderColor: "red",}}
                        size={8}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        />
                  </button>
                  
              </div>
          </div>
          
    </div>
  )
}

export default SubmitModal