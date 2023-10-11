
const Submitted = () => {
 
  return (
      <div className="fixed top-0 w-10p h-10p flex justify-center items-center">
          <div>
              <h1>
                  @ <span className="text-appcolor-100 font-bold text-2xl">{localStorage.userE}</span> <br />
                  <span className="text-inputline-100">you've  sucessfully submitted this form</span>
              </h1>
          </div>
    </div>
  )
}

export default Submitted