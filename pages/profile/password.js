import {useState,useEffect,useContext} from 'react';
import Footer from "/components/footer";
import axios  from "/helpers/axios";
import Header from "/components/header";
import Sidebar from "/components/dashboard/SideBar";
import Header2 from "/components/dashboard/Header";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link';
toast.configure();
import {UserContext} from "/components/UserContext";
import {isUserNotLoggedIn} from "/protected/requireAuthentication";


const Profile = () => {

   const {setId,userData,isLoggedIn,loading,setLoading,setData,data,setIsLoggedIn} = useContext(UserContext);
   const [password, setPassword] = useState("");
   const [token, setToken] = useState("");
  const router = useRouter();

  const requestReset =  (e) => {

       e.preventDefault();

    setLoading(true)
   axios({
        method: "POST",
        url: "v1/users/auth/request-reset",
        headers: {
        'Authorization':`Bearer ${userData.token}`
        },
        data: {email: userData.email}
        }).then((res) => {
           if(res.data.status === true)
              toast.success("Password Request Token Sent!",{theme: "colored"});

            setLoading(false)

        })
        .catch((err) => {

          if(err.response){

            if(err.response.data.status === false)
                     toast.error(err.response.data.message,{theme: "colored"});

              setLoading(false)
              
        
         }

        });


  }

  const updatePassword =  (e) => {

    e.preventDefault();

    setLoading(true)
   axios({
        method: "PATCH",
        url: "v1/users/auth/reset",
        headers: {
        'Authorization':`Bearer ${userData.token}`
        },
        data: {password: password,reset_token: token}
        }).then((res) => {
           if(res.data.status === true)
              toast.success("Password Updated",{theme: "colored"});

            setLoading(false)

        })
        .catch((err) => {

          if(err.response){

            if(err.response.data.status === false)
                     toast.error(err.response.data.message,{theme: "colored"});

              setLoading(false)
              
            

         }

        });
  
  }

 


   return (<>
    <div className="page-wrapper">
   
   <Header2 />




    <section className="py-5">
          <div className="container">
            <h1 className="pc  fs-21 fw-700">
              Password
            </h1>

            <hr />

            <div className="row gx-5 gy-4">
              <Sidebar page='password' />

              <div className="col-md-9">

              <form className="row gy-3" onSubmit={(e) => updatePassword(e)} >

              
              <div className="col-md-12">
                   <button type="button" className={`btn btn-primary-color-bg text-white fs-15  fw-600 ${loading ? 'disabled' : null}`} 
                   onClick={(e) => requestReset(e)} >Request for Password Reset Token</button>  
              </div>


                <div className="col-md-12">
                    <label className="fw-600 small">Token</label>
                    <input type="password" className="form-control" onChange={(e) => setToken(e.target.value)} />
                </div>


                <div className="col-md-12">
                    <label className="fw-600 small">New Password</label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                </div>




                 <div className="col-md-12 d-flex justify-content-end">
                   <button className={`btn btn-primary-color-bg text-white fs-15  fw-600 ${loading ? 'disabled' : null}`} type="submit">UPDATE PASSWORD</button>  
                </div>



              </form>

                

              </div>




          </div>
          </div>
        </section>

    </div>
    <Footer />
</>)
}


export const getServerSideProps = isUserNotLoggedIn(async context => {

  return {
    props: {}
  };


},'/login')

export default Profile;