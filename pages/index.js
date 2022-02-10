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
import {isAdminLoggedIn} from "/protected/requireAuthentication";

toast.configure();


const Login = () => {

  const [email,setEmail] = useState("");
  const router = useRouter();
  const {setId,userData,isLoggedIn,loading,setLoading,setData,data,setIsLoggedIn} = useContext(UserContext);



  const submitLoginForm = (e) => {
    
  e.preventDefault();
 
  setLoading(true);
  axios({
  method: "post",
  url: "v1/admin/auth",
  data: {email}
  }).then((res) => {
     if(res.data.status === true) router.push("/otp-verification?email=" + email);

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
          <h2 className="fs-22 pc fw-600 mb-3">Admin</h2>
          
          
          <div className="fs-12 mb-3">Log in to Houston Cultures</div>


        <form onSubmit={(e) => submitLoginForm(e)}>

    <div className="row gy-3 gx-1">
   
       <div className="col-12">
          <input type="email" placeholder="Email" className="form-control form-control-lg fs-15" onChange={(e) => setEmail(e.target.value)} />
      </div>



  </div>

  <div className="submit mt-3">
     <button className={`btn btn-lg btn-primary-color-bg text-white fs-14 w-100 fw-600 ${loading ? 'disabled' : null}`} type="submit">Log in</button>
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



export const getServerSideProps = isAdminLoggedIn(async context => {

  return {
    props: {}
  };


},'/dashboard')


export default Login;