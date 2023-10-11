import React, {useState} from 'react'
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import PulseLoader from 'react-spinners/PulseLoader';
import { useSelector } from "react-redux";
import axios from 'axios';
const PasswordReset = () => {
      const endpoint = useSelector((state:any)=>state.endpoint.endPoints)
      const [email, seteMail] = useState("");
    const [mailTextIfInvalid, setMailTextIfInvalid] = useState("");
    const [mailStatus, setMailStatus] = useState(false);
      const [error, setError] = useState<boolean>(false);
      const [errorMessage, setErrorMessage] = useState<string>("");
        const [loading, setLoading] = useState<boolean>(false);
        const [errorSuccessStyle, setErrorSuccessStyle] = useState('')
     const [checkMailStyle, setCheckMailStyle] = useState<string>("border-inputline-200 focus:outline-appcolor-100")
       const ifValidAndInvalidMailFunction = (style:string, text:string, status:boolean) => {
         setCheckMailStyle(style)
      setMailTextIfInvalid(text)
       setMailStatus(status)
  }
    const verifyMail = (e: React.ChangeEvent<HTMLInputElement>) => {
           if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
        seteMail(e.target.value)
       ifValidAndInvalidMailFunction("border-inputline-200 focus:outline-checked-400", "", true)
      } else {
        ifValidAndInvalidMailFunction("border-checked-100  focus:outline-checked-350", "Enter a valid email address", false)
      }
    };
   const preventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
   };
    const submitInfo = () => {
        if (mailStatus) {
            setLoading(true)
            axios.post(`${endpoint.user}/emailVerification`, { email }).then((result) => {
              setError(true)
              setErrorMessage(result.data.message)
              setErrorSuccessStyle("bg-checked-400")
                setLoading(false)
            }).catch((err) => {
              setError(true)
              setErrorMessage(err.response.data.message)
              setErrorSuccessStyle("bg-checked-350")
                setLoading(false);
            })
        }
    }
  return (
    <div className="loginbg w-10p h-10p fixed top-0 flex justify-center items-center">
      <div className="w-input bg-white py-7 px-2 collection2:w-9p">
        <div className="flex justify-center items-center">
          <Logo w="w-5" h="h-7" />
          <h1 className="mx-3 text-appcolor-100 text-xl font-bold">Formy</h1>
        </div>
        <h1 className="text-center  text-xl py-1 text-inputline-300">
          Password Reset
        </h1>
        <p className="text-center text-xs w-9p mx-auto text-inputline-100">
          Enter your email for your password reset verification
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
        <form className='w-9p mx-auto' onSubmit={preventSubmit}>
          <div className="my-4 w-10p mx-auto">
            <div className="my-4 w-10p mx-auto">
              <p className="text-sm text-inputline-100">Email</p>
              <input
                type="email"
                onChange={(e) => verifyMail(e)}
                className={` w-10p h-6 border  ${checkMailStyle}  text-sm`}
              />
              <p style={{ color: "red", fontSize: "10px" }}>
                {mailTextIfInvalid}
              </p>
            </div>
            <button
              disabled={loading}
              onClick={() => submitInfo()}
              className="w-10p rounded-sm bg-appcolor-100 text-white  text-sm py-2"
            >
              {!loading && `Verify`}
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
  );
}

export default PasswordReset