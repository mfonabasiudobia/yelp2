import {useState,useEffect,useContext} from 'react';
import Footer from "/components/footer";
import axios  from "/helpers/axios";
import Header from "/components/header";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import {UserContext} from "/components/UserContext";
import Cookie from "js-cookie";
import {isUserLoggedIn} from "/protected/requireAuthentication";

toast.configure();


const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const router = useRouter();
  const {setId,userData,isLoggedIn,loading,setLoading,setUserData,setData,data,setIsLoggedIn} = useContext(UserContext);



  const submitLoginForm = (e) => {
    
  e.preventDefault();
 
  setLoading(true);
  axios({
  method: "post",
  url: "v1/users/auth/login",
  data: {email,password}
  }).then((res) => {
     if(res.data.status === true){

      Cookie.set('userData',JSON.stringify(res.data));

      setUserData(JSON.parse(JSON.stringify(res.data)).data);

      

      if(res.data.data.active === 0){
        router.push("/otp-verification");
      }else{
        router.push("/");
        setIsLoggedIn(true);
      }

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

      <div className="row d-flex justify-content-center">
      <div className="col-md-5">
        <div className="text-center  border card card-body">
          <h2 className="fs-22 pc fw-600 mb-3">Log in to Houston Cultures</h2>
          
          <div className="fs-13 fw-600 mb-3">New Houston Cultures? <Link href="signup"><a>Sign up</a></Link></div>
          
          <div className="fs-12 mb-3">By logging in, you agree to our <Link href="#"><a>Terms of Service</a></Link> and <br /> acknowledge our <Link href="#"><a>Privacy Policy</a></Link>.</div>


     <div className="position-relative my-4">
  <div className="progress h-1">
    <div className="progress-bar w-0" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
  <button type="button" className="position-absolute top-0 start-50 translate-middle btn btn-sm bg-white" >OR</button>
</div>


        <form onSubmit={(e) => submitLoginForm(e)}>

    <div className="row gy-3 gx-1">
   
       <div className="col-12">
          <input type="email" placeholder="Email" className="form-control form-control-lg fs-15" onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="col-12">
          <input type="password" placeholder="Password" className="form-control form-control-lg fs-15" onChange={(e) => setPassword(e.target.value)} />
      </div>


  </div>

   <div  className="fs-12 d-flex justify-content-end mt-2 opacity-75">
     <Link href="/forgot-password"><a>Forgot Password?</a></Link>
  </div>


  <div className="submit mt-3">
     <button className={`btn btn-lg btn-primary-color-bg text-white fs-14 w-100 fw-600 ${loading ? 'disabled' : null}`} type="submit">Log in</button>
  </div>

  <div  className="fs-12 d-flex justify-content-end mt-2 opacity-75">
    New here? &nbsp;  <Link href="/signup"><a>Sign up</a></Link>
  </div>

        </form>

        </div>
                             
       </div>
    </div>

    </div>
</div>
    <Footer />
</>)
}



export const getServerSideProps = isUserLoggedIn(async context => {

  return {
    props: {}
  };


},'/')


export default Login;