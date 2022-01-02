import {useState,useEffect} from 'react';
import Footer from "../components/footer";
import Header from "../components/header";
import axios  from "../helpers/axios";
import {toast} from "react-toastify";
import Link from 'next/link'
import Image from 'next/image';
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
toast.configure();


const Login = () => {

  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(false);


   const handleForgotPassword = (e) => {
    
  e.preventDefault();

 
  setLoading(true);
  axios({
  method: "post",
  url: "v1/users/auth/request-reset",
  data: {email}
  }).then((res) => {
     if(res.data.status === true){
        toast.success("An email Verification code has been sent to your mail",{theme: "colored"});
     }

     setLoading(false);

  })
  .catch((err) => {

    if(err.response){

      if(err.response.data.status === false){
            toast.error(err.response.data.message,{theme: "colored"});
        
      }

   }

   setLoading(false);

  });

  }


   return (<>
    <div className="page-wrapper">
   
    <Header />

    <div className="container py-5">

      <div className="row d-flex justify-content-center mt-4">
      <div className="col-md-5 d-flex flex-column justify-content-center align-items-center">
        <div className="text-center border card card-body">
          <h2 className="fs-22 pc fw-600 mb-2">Forgot Password</h2>
          
          
          <div className="fs-14 mb-2">Please enter your email address and we will send you an email about how to reset your password.</div>
        
      
 <form onSubmit={(e) => handleForgotPassword(e)}>

    <div className="row gy-3 gx-1">
   
       <div className="col-12">
          <input type="email" placeholder="Email" className="form-control form-control-lg fs-15" onChange={(e) => setEmail(e.target.value)}/>
      </div>

  </div>

  <div className="submit mt-3">
     <button className={`btn btn-lg btn-primary-color-bg text-white fs-14 w-100 fw-600 ${loading ? 'disabled' : null}`} type="submit">Reset Password</button>
  </div>

  <div  className="fs-12 d-flex justify-content-end mt-2 opacity-75">
     <Link href="login"><a>Back to Login</a></Link>
  </div>

</form>

        </div>
                             
       </div>

      {/*<div  className="d-none d-md-block col-md-5 d-flex align-items-center justify-content-center">
                                <Image src="/images/signup_illustration.png" alt="" width="400" height="400" className="img-fluid" />
       </div>*/}

    </div>

    </div>
</div>
    <Footer />
</>)
}

export default Login;