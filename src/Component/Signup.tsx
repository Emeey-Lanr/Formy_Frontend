import { FaTimes } from "react-icons/fa"
import "../Styles/login.css"
import Logo from "./Logo"
import { useState } from "react"
import { PulseLoader } from "react-spinners"
import axios from "axios"
import { useSelector } from "react-redux"
import { error } from "console"
import { Link, useNavigate } from "react-router-dom"
const Signup = () => {
  const navigate = useNavigate()
  const endpoint = useSelector((state:any)=>state.endpoint.endPoints)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, seteMail] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [mailTextIfInvalid, setMailTextIfInvalid] = useState("")
  const [passTextIfInvalid, setPassTextIfInvalid] = useState("")
  const [mailStatus, setMailStatus] = useState(false)
  const [passStatus, setPassStatus] = useState(false)
  const [checkMailStyle, setCheckMailStyle] = useState<string>("border-inputline-200 focus:outline-appcolor-100")
    const [checkPassStyle, setCheckPassStyle] = useState<string>("border-inputline-200  focus:outline-appcolor-100")
  
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
  }
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
  const submitInfo = () => {
   
    if (mailStatus && passStatus && username !== "") {
      // console.log(email, password, username)
      setLoading(true)
      axios.post(`${endpoint.user}/signup`, { username, email, password }).then((result) => {
        console.log(result)
        localStorage.id = result.data.userToken
        navigate("/dashboard")
      }).catch((error) => {
        console.log(error)
        setError(true)
        setErrorMessage(error.response.data.message)
        setLoading(false)
        // console.log(error.response.dat)
      })
    } else {
      if (mailStatus && passStatus && username === "") {
      
        alert("Enter Username")
      }
    }

  }
  return (
    <div className="loginbg w-10p h-10p  flex fixed justify-center items-center top-0">
      <div className="w-input bg-white py-7 px-2">
        <div className="w-10p">
          <div className="flex justify-center items-center">
            <Logo w="w-5" h="h-7" />{" "}
            <h1 className="mx-3 text-appcolor-100 text-xl font-bold">Formy</h1>
          </div>
          <h1 className="text-center  text-xl py-1 text-inputline-300">
            Create Account
          </h1>
          <p className="text-center text-xs w-9p mx-auto text-inputline-100">
            Access all the features embbed in formy by creatiing an account
          </p>
          {error && (
            <div
              className="w-9p mx-auto bg-checked-350 my-1 rounded-sm"
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
        </div>
        <form onSubmit={preventSubmit} className="w-10p">
          <div className="my-2 w-9p mx-auto">
            <p className="text-sm text-inputline-100  ">Username</p>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className=" w-10p  h-6 border border-inputline-200 focus:outline-appcolor-300 text-sm"
            />
          </div>
          <div className="my-4 w-9p mx-auto">
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
          <div className="my-4 w-9p mx-auto">
            <p className="text-sm text-inputline-100 ">Password</p>
            <input
              type="password"
              onChange={(e) => checkPassword(e)}
              className={`w-10p h-6 border  ${checkPassStyle} text-sm`}
            />
            <p style={{ color: "red", fontSize: "10px" }}>
              {passTextIfInvalid}
            </p>
          </div>
          <div className="w-9p mx-auto">
            <button
              disabled={loading}
              onClick={() => submitInfo()}
              className="w-10p rounded-sm bg-appcolor-100 text-white  text-sm py-2"
            >
              {!loading && `Signup`}
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

        <div className="w-9p mt-2 pb-3">
          <div className="flex justify-center items-center">
            <p className="text-xs  text-inputline-200">
              Got an account already ?
            </p>
            <Link
              to={"/signin"}
              className="text-sm font-bold px-1 text-appcolor-100"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup