import {useState,useRef,useEffect,useContext} from 'react';
import axios  from "/helpers/axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import {UserContext} from "/components/UserContext";
import Cookie from "js-cookie";
import {isAdminLoggedIn} from "/protected/requireAuthentication";
toast.configure();


const VerifyAccount = (props) => {


  const [firstCode,setFirstCode] = useState("");
  const [secondCode,setSecondCode] = useState("");
  const [thirdCode,setThirdCode] = useState("");
  const [fourthCode,setFourthCode] = useState("");
  const [fifthCode,setFifthCode] = useState("");
  const router = useRouter();

  const {setId,userData,isAdminLoggedIn,loading,setLoading,setData,setAdminData,data,setIsAdminLoggedIn} = useContext(UserContext);




  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);

  const tapChange = (val,e) => {

    
    if(e.target.value.length != 0){
      if(val == 1){
        inputRef2.current.focus();
      }else if(val == 2){
        inputRef3.current.focus();
      }else if(val == 3){
        inputRef4.current.focus();
      }else if(val == 4){
        inputRef5.current.focus();
      }     

    }

  }



const submitVerificationCode = (e) => {
  e.preventDefault();
  setLoading(true);

  const code = firstCode + secondCode + thirdCode + fourthCode + fifthCode;
    

    axios({
    method: "post",
    url: "v1/admin/auth/verify",
    data: {otp:code,email: router.query.email}
    }).then((res) => {
       if(res.data.status == true){

          Cookie.set("adminData",JSON.stringify(res.data));
          setAdminData(JSON.parse(JSON.stringify(res.data)).data);
          setIsAdminLoggedIn(true)
          router.push("/admin/dashboard");

           
       }
       setLoading(false);
    })
    .catch((err) => {

      if(err.response){

        if(err.response.data.status == false){
            toast.error(err.response.data.message,{theme: "colored"});
        }
      }

       setLoading(false);

    }); 

}


  return (
    <>
          <div className="row d-flex justify-content-center align-items-center position-relative" style={{backgroundColor:"#F6FAFF",height:"100vh",zIndex:"1"}}>
            <div className="col-md-6 bg-white border position-relative" style={{zIndex:"5"}} >
            

            <div style={{height:"80px"}} className="position-absolute w-100 start-0 arc-shape">
                <div className="position-absolute top-100 start-50 translate-middle" >
                  <Image src="/images/envelop.png" width="70" alt="envelope" layout='fill'/>
                </div>
            </div>

             <div style={{background: "#fff",height:"70px"}} className="position-absolute w-100 end-0 bottom-0 border-bottom">
            </div>


               
                   <form className="register-wrapper card card-body py-5 mt-4"  onSubmit={(e) => submitVerificationCode(e)}>

                    <div className="d-flex justify-content-center mt-4"><Image src="/images/logo.png" alt="" height="100" width="100%" /></div>

                   <h1 className="header text-center mt-3">OTP Verification</h1>


                   <p className="g2 fs-13 text-center w-75 mx-auto my-4">We just sent a verification code to your email. Please enter OTP below</p>


                    <div className="mb-3 d-flex justify-content-center">
                        <input type="text"  className="otp form-control" ref={inputRef1} onChange={(e) => setFirstCode(e.target.value)} onInput={(e) => tapChange(1,e)}/>
                        <input type="text"  className="otp form-control" ref={inputRef2} onChange={(e) => setSecondCode(e.target.value)} onInput={(e) => tapChange(2,e)} />
                        <input type="text"  className="otp form-control" ref={inputRef3} onChange={(e) => setThirdCode(e.target.value)} onInput={(e) => tapChange(3,e)} />
                        <input type="text"  className="otp form-control" ref={inputRef4} onChange={(e) => setFourthCode(e.target.value)} onInput={(e) => tapChange(4,e)} />
                        <input type="text"  className="otp form-control" ref={inputRef5} onChange={(e) => setFifthCode(e.target.value)} />
                    </div>

               

                    <div className="form-group d-flex align-items-center justify-content-center">
                        <button className={`rounded-pill btn btn-primary text-white fs-14 w-50 ${loading ? "disabled" : null}`} type="submit">Verify Account</button>
                    </div>

                   {/* <div className="d-flex align-items-center justify-content-center fs-13">
                        <span >Not gotten code?</span> <a href="javascript:void(0)" className="fw-600 mx-1 pc" onClick={() => resendOtp()}>Resend OTP</a>
                    </div>*/}

                   </form>

                   <div className="top-right position-absolute" style={{top:"-35px",right:"-35px",zIndex:"-2"}}>
                      <div style={{width: "70px",height:"70px",border:"3px solid #315A89",}} className="rounded-circle position-relative" ></div>

                      <div style={{width: "20px",height:"20px",border:"1px solid #315A89",top:"10px",right:"-30px"}} className="rounded-circle position-absolute" ></div>

                      <div style={{width: "20px",height:"20px",background:"#fff",top:"-35px",right:"0"}} className="rounded-circle position-absolute" ></div>


                   </div>


                    <div className="top-left position-absolute" style={{top:"-35px",left:"-35px",zIndex:"-2"}}>
                      <div style={{width: "70px",height:"70px",background:"#fff"}} className="rounded-circle position-relative" ></div>

                      <div style={{width: "20px",height:"20px",background:"#315A89",top:"-5px",right:"0"}} className="rounded-circle position-absolute" ></div>

                      <div style={{width: "20px",height:"20px",border:"1px solid #fff",top:"-25px",left:"0"}} className="rounded-circle position-absolute" ></div>

                   </div>


                    <div className="bottom-left position-absolute" style={{bottom:"-35px",left:"-35px",zIndex:"-2"}}>
                      <div style={{width: "70px",height:"70px",border:"3px solid #315A89"}} className="rounded-circle position-relative" ></div>

                      <div style={{width: "20px",height:"20px",background:"#315A89",bottom:"-5px",left:"-30px"}} className="rounded-circle position-absolute" ></div>
                   </div>


                    <div className=" position-absolute" style={{bottom:"-35px",right:"-35px",zIndex:"-2"}}>

                     <div style={{width: "70px",height:"70px",backgroundColor:"#fff"}} className="rounded-circle position-relative" ></div>

                      <div style={{width: "20px",height:"20px",background:"#315A89",bottom:"-5px",right:"-10px"}} className="rounded-circle position-absolute" ></div>

                       <div style={{width: "20px",height:"20px",border:"1px solid #fff",bottom:"-25px",left:"30px"}} className="rounded-circle position-absolute" ></div>

                   </div>





             
            </div>



               
          </div>          
    
    </>
  )
}

export const getServerSideProps = isAdminLoggedIn(async context => {

  return {
    props: {}
  };


},'/dashboard')


export default VerifyAccount;