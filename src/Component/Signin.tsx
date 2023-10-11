import React,{ useState}  from 'react'
import "../Styles/login.css"
import Logo from './Logo'
import { FaTimes } from 'react-icons/fa'
import {PulseLoader} from "react-spinners"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
const Signin = () => {
    const navigate = useNavigate()
      const endpoint = useSelector((state:any)=>state.endpoint.endPoints)
    const [loading, setLoading] = useState<boolean>(false)
const [switchChange, setSwitchChange] = useState<boolean>(true)
    const [emailUsername, setEmailUsername] = useState("")
    const  [password, setPassword] = useState("")
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState("")
    const changeSwitchBtn = (name: string) => {
        switch (name) {
            case "email": {
                return setSwitchChange(true)
            };
            case "username": {
                return setSwitchChange(false)
             }
        }
    
    }
    const errorHandlerFunction = (state:boolean, message:string) => {
          setError(state)
                setErrorMessage(message)
  }
  
    const preventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    };
    const signupBtn = () => {
        if (emailUsername !== "" && password !== "") {
            let check = false
            if (switchChange) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailUsername)) {
                    check = true
                } else {
                    check = false
                }
            
            } else {
                check = true
            }
            if (check) {
                setLoading(true)
                errorHandlerFunction(false, "")
                axios.post(`${endpoint.user}/signin`, {  emailUsername, password, switchChange }).then((result) => {
                     localStorage.id = result.data.userToken
                    navigate("/dashboard")
                }).catch((error) => {
              
                    setLoading(false)
                    errorHandlerFunction(true, error.response.data.message)
                })
            } else {
              errorHandlerFunction(true, "Invalid Email address")
            }
            
        } else {
       errorHandlerFunction(true, "Fill in inputs")
        }
        // if switchchange is true that means they're using email, if false, they're using username
        // setLoading(true)
    }
  return (
    <div className="loginbg w-10p h-10p  flex fixed justify-center items-center top-0">
      <div className="w-input bg-white pt-4 px-2 ">
        <div className="w-10p">
          <div className="flex justify-center items-center">
            <Logo w="w-5" h="h-7" />{" "}
            <h1 className="mx-3 text-appcolor-100 text-xl font-bold">Formy</h1>
          </div>
          <h1 className="text-center  text-xl py-1 text-inputline-300">
            Log In
          </h1>
          <p className="text-center text-sm w-9p mx-auto text-inputline-100">
            login to your account to access your data
          </p>
        </div>
        <div className="flex items-center my-3 w-9p mx-auto">
          <button
            onClick={() => changeSwitchBtn("email")}
            className="h-4 w-4 border border-checked-100 flex justify-center items-center rounded-xlg"
          >
            <div
              className={`w-3 h-3 border ${
                switchChange && "bg-checked-100"
              } border-checked-100 rounded-xlg`}
            ></div>
          </button>
          <div className="mx-1">
            <p className="text-sm text-inputline-100">Email</p>
          </div>
          <button
            onClick={() => changeSwitchBtn("username")}
            className="h-4 w-4 border border-checked-200 flex justify-center items-center rounded-xlg"
          >
            <div
              className={`w-3 h-3 border ${
                !switchChange && "bg-checked-200"
              } border-checked-200 rounded-xlg`}
            ></div>
          </button>

          <div className="mx-1">
            <p className="text-sm text-inputline-100">Username</p>
          </div>
        </div>
        {error && (
          <div
            className="w-9p mx-auto bg-checked-350 my-1 rounded-sm"
            style={{ padding: "0px 2px", paddingBottom: "4px" }}
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
        <form onSubmit={preventSubmit} className='w-10p'>
          <div className="my-4 w-9p mx-auto">
            <p className="text-sm text-inputline-100 ">
              {switchChange ? "Email" : "Username"}
            </p>
            <input
              type="text"
              onChange={(e) => setEmailUsername(e.target.value)}
              className=" w-10p h-6 border border-inputline-200 focus:outline-appcolor-300 text-sm"
            />
          </div>
          <div className="my-4 w-9p mx-auto">
            <p className="text-sm text-inputline-100 ">Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-10p h-6 border border-inputline-200  focus:outline-appcolor-300 text-sm"
            />
          </div>
          <div className="w-9p mx-auto">
            <button
              disabled={loading}
              onClick={() => signupBtn()}
              className="w-10p rounded-sm bg-appcolor-100 text-white  text-sm py-2"
            >
              {!loading && `Signin`}
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
              Don't have an account ?
            </p>
            <Link
              to={"/signup"}
              className="text-sm font-bold px-1 text-appcolor-100"
            >
              Create
            </Link>
          </div>
          <div className="flex justify-center items-center mt-2">
            <Link
              to={"/forgot/password"}
              className="text-sm text-appcolor-100 font-semibold"
            >
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin