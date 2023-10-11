import React,{useEffect, useState} from 'react'
import Logo from './Logo';
import { FaTimes } from 'react-icons/fa';
import PulseLoader from 'react-spinners/PulseLoader';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ResetForgotPassword = () => {
    const token = useParams()
    const navigate = useNavigate()
       const endpoint = useSelector((state: any) => state.endpoint.endPoints);
       const [verification, setVerification] = useState(false)
     const [password, setPassword] = useState("");
    const [error, setError] = useState<boolean>(false);
    const [errorSuccessStyle, setErrorSuccessStyle] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>("");
      const [passTextIfInvalid, setPassTextIfInvalid] = useState("");
    const [passStatus, setPassStatus] = useState(false);
     const [loading, setLoading] = useState<boolean>(false);
     const [email, setEmail] = useState("")
    const [checkPassStyle, setCheckPassStyle] = useState<string>("border-inputline-200  focus:outline-appcolor-100")
  
    useEffect(() => {
        console.log(token.id)
        axios.get(`${endpoint.user}/emailTokenVerification`, {
            headers: {
                   "Authorization": `bearer ${token.id}`,
            "Content-Type":"application/json",          
            "Accept":"application/json"
            }
        }).then((result) => {
        
          setEmail(`${result.data.data.verifyToken.email}`)
          setVerification(true);
        }).catch((error) => {
            setVerification(false)
         
            setErrorMessage(error.response.data.message)
        })
          
      },[])
     const ifValidAndInvalidPassFunction = (style:string, text:string, status:boolean) => {
         setCheckPassStyle(style)
    setPassTextIfInvalid(text) 
    setPassStatus(status)
  }
      const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 6) {
    ifValidAndInvalidPassFunction("border-checked-100  focus:outline-checked-350", "Password must be alteast 6 characters", false)
    } else {
      setPassword(e.target.value)
            ifValidAndInvalidPassFunction("border-inputline-200  focus:outline-checked-400", "", true)
    }
    
  }
  
  const preventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
    const errorSuccessF = (error:boolean, change:boolean,  message:string) => {
         setError(error)
         setErrorMessage(message);
      setLoading(false)
    
        setTimeout(() => {
                    if(change){
                      navigate("/signin")
                      
                    }

                },1_500)
        
    }
    const submitInfo = () => {
        if (passStatus) {
            setLoading(true)
            axios.put(`${endpoint.user}/changeForgotPassword`, { email, password }).then((result)=>{
               
              errorSuccessF(true, true, `${result.data.message}`)
                setErrorSuccessStyle("bg-checked-400");
            }).catch((err) => {
                  setErrorSuccessStyle("bg-checked-350");
             if(!err.response.data.status)
                errorSuccessF(true, false, `${err.response.data.message}`)
            });
        }
        
        
    }
  return (
    <>
      {!verification ? (
        <div className="w-10p h-10p fixed top-0 flex justify-center items-center">
          <div className="w-input">
            <div className="w-10px">
              <p className="text-appcolor-100">{errorMessage}</p>
            </div>
            <div>
              <PulseLoader
                color={"#2c3cec"}
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
            </div>
          </div>
        </div>
      ) : (
        <div className="loginbg w-10p h-10p fixed flex justify-center items-center top-0">
          <div className="w-input bg-white py-7 px-2">
            <div className="flex justify-center items-center">
              <Logo w="w-5" h="h-7" />
              <h1 className="mx-3 text-appcolor-100 text-xl font-bold">
                Formy
              </h1>
            </div>
            <h1 className="text-center  text-xl py-1 text-inputline-300">
              Password Reset
            </h1>
            <p className="text-center text-xs w-9p mx-auto text-inputline-100">
              Enter a new password
            </p>
            {error && (
              <div
                className={`w-9p mx-auto ${errorSuccessStyle}  my-1 rounded-sm`}
                style={{ padding: "2px 2px" }}
              >
                <div className="w-10p flex justify-end">
                  <button onClick={() => setError(false)}>
                    <FaTimes className="text-white" />
                  </button>
                </div>
                <p
                  className="text-sm text-white text-center"
                  style={{ paddingBottom: "2px" }}
                >
                  {errorMessage}
                </p>
              </div>
            )}
            <form className="w-10p" onSubmit={preventSubmit}>
              <div className="my-4 w-9p mx-auto">
                <div className="my-4 w-10p mx-auto">
                  <input
                    type="password"
                    onChange={(e) => checkPassword(e)}
                    className={`w-10p h-6 border  ${checkPassStyle} text-sm`}
                  />
                  <p style={{ color: "red", fontSize: "10px" }}>
                    {passTextIfInvalid}
                  </p>
                </div>
                <button
                  disabled={loading}
                  onClick={() => submitInfo()}
                  className="w-10p rounded-sm bg-appcolor-100 text-white  text-sm py-2"
                >
                  {!loading && `Reset`}
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
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ResetForgotPassword