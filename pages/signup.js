import {useState,useEffect} from "react";
import Footer from "/components/footer";
import Header from "/components/header";
import axios from "/helpers/axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector,useDispatch} from "react-redux";
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import Cookie from "js-cookie";
import {isUserLoggedIn} from "/protected/requireAuthentication";
toast.configure();


const Home = () => {


   const [formData, setFormData] = useState({
   first_name: "",
   last_name: "",
   email: "",
   password: "",
   phoneNumber : "",
   countryId : "",
   stateId : "",
   cityId : "",
   confirmPassword : "",
   errors : [],
   registrationStatus: false,
   terms: false,
  });
  const {first_name,last_name,email,password,setUserData,phoneNumber,countryId,stateId,cityId,confirmPassword,states,cities,countries,errors} = formData;
  const [loading,setLoading] = useState(false);
  const router = useRouter();



   const submitRegistrationForm = (e) => {
    
  e.preventDefault();


  setLoading(true);
  axios({
  method: "post",
  url: "v1/users/auth/register",
  data: {first_name,last_name,email,password}
  }).then((res) => {

     if(res.data.status == true){

       Cookie.set('userData',JSON.stringify(res.data));

       router.replace("/otp-verification");

       setUserData(JSON.parse(JSON.stringify(res.data)).data);

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

   return (<>
    <div className="page-wrapper">
   
    <Header />

    <div className="container py-5">

      <div className="row d-flex justify-content-center">
      <div className="col-md-5">
        <div className="text-center border card card-body">
          <h2 className="fs-22 pc fw-600 mb-3">Create a Houston Cultures account</h2>
          
          <div className="fs-13 fw-600 mb-3">Connect with great local businesses</div>
          
          <div className="fs-12 mb-3">By continuing, you agree to our <Link href=""><a >Terms of Service</a></Link> and <br /> acknowledge our  <Link href=""><a>Privacy Policy</a></Link></div>
    

        <div className="fs-12 mb-3">Dont worry, we never post without your permission.</div>

     <div className="position-relative my-4">
  <div className="progress h-1">
    <div className="progress-bar w-0" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
  <button type="button" className="position-absolute top-0 start-50 translate-middle btn btn-sm bg-white" >OR</button>
</div>


        <form onSubmit={(e) => submitRegistrationForm(e)}>

    <div className="row gy-3 gx-1">
      <div className="col-6">
        <input type="text" placeholder="First Name" className="form-control form-control-lg fs-15"  onChange={(e) => setFormData({...formData, first_name: e.target.value})} />
      </div>

      <div className="col-6 ">
      <input type="text" placeholder="Last Name" className="form-control form-control-lg fs-15" onChange={(e) => setFormData({...formData, last_name: e.target.value})}/>     
       </div>

       <div className="col-6">
          <input type="email" placeholder="Email" className="form-control form-control-lg fs-15" onChange={(e) => setFormData({...formData, email: e.target.value})}/>
      </div>

      <div className="col-6">
          <input type="password" placeholder="Password" className="form-control form-control-lg fs-15" onChange={(e) => setFormData({...formData, password: e.target.value})}/>
      </div>

   
  </div>

  <div className="submit mt-3">
     <button className={`btn btn-lg btn-primary-color-bg text-white fs-14 w-100 fw-600 ${loading ? 'disabled' : null}`} type="submit">Sign Up</button>
  </div>

  <div  className="fs-12 d-flex justify-content-end mt-2 opacity-75">
    Already on Houston Cultures? &nbsp; <Link href="/login">
          <a>Log in</a>
        </Link>
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

export default Home;