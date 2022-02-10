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

       <Image src='/images/something-lost.png' height='200' width='300' priority alt="" />

        <div className="text-center card card-body mt-3">
          <h2 className="fs-22 pc fw-900 mb-2">Oops, looks like the page is lost.</h2>
          
          
          <div className="mb-2">This is not a fault, just an accident that was not intentional.</div>
        
  

        </div>
                             
       </div>


    </div>

    </div>
</div>
    <Footer />
</>)
}

export default Login;