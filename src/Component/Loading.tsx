import { FaTimes } from "react-icons/fa"
import Logo from "./Logo"
import {PulseLoader} from "react-spinners"
import { useContext } from "react"
import { appContext } from "../App"
const Loading = () => {
    const {loadLinkError, setLoadLinkError, loadLinkMessage} = useContext(appContext)
    return (
        <>
            <div className="w-10p h-10p fixed top-0 bg-white flex justify-center items-center">
          <div className="h-10p">
              <div className="h-9p flex justify-center items-center">
                  
                 <Logo w="w-5" h='h-7' />    <h1 className="mx-3 text-center font-light text-appcolor-100"  style={{letterSpacing:"20px",fontSize:"1.3rem"}}>Formy</h1>
              
               
              </div>
           
             
              <div className="text-appcolor-100 my-6 h-1p bottom-0 flex justify-center">
                  
            <PulseLoader
               color={'blue'}
               loading={true}
               cssOverride={{display: "block", margin: "0 auto", borderColor: "red",}}
               size={8}
               aria-label="Loading Spinner"
               data-testid="loader"
            />
              </div>
          </div>
            </div>
            {loadLinkError &&  <div className="w-2p  fixed bottom-2 left-10 bg-appcolor-100 rounded-sm">
                <div className="w-10p text-white flex justify-end">
                    <button onClick={()=>setLoadLinkError(false)}>
                            <FaTimes />
                    </button>
                 
                </div>
                <div className="w-9p flex justify-center pb-1 items-center">
                    <p className="text-xs text-white">{loadLinkMessage }</p>
                </div>
            </div>}
      </>
      
  )
}

export default Loading