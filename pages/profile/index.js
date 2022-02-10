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
import Cookie from "js-cookie";

const Profile = () => {

   const {setId,userData,isLoggedIn,loading,setLoading,setData,data,setIsLoggedIn} = useContext(UserContext);
   const [profilePicture, setProfilePicture] = useState("");
  const router = useRouter();

  const uploadImage = async (e) => {

    const file = e.target.files[0];
    setProfilePicture(file);
    const base64 = await convertBase64(file);
    setLoading(true)
   axios({
        method: "PATCH",
        url: "v1/users/auth/settings/upload",
        headers: {
        'Authorization':`Bearer ${userData.token}`
        },
        data: {avatar: base64.split(",")[1]}
        }).then((res) => {
           if(res.data.status === true)
              toast.success("Profile Picture Updated",{theme: "colored"});

            // const old_obj =  JSON.parse(Cookie.get('userData'));

            // const new_userData = { ...userData, avatar: res.data.data.avatar };

            // const new_obj = {...old_obj, data : new_userData};

            // Cookie.set("userData",JSON.stringify(new_obj));

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

  const convertBase64 = (file) => {
    
    return new Promise((resolve, reject) => {

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      }


      fileReader.onerror = (error) => {
        reject()
      }


      })

  }


   return (<>
    <div className="page-wrapper">
   
   <Header2 />




    <section className="py-5">
          <div className="container">
            <h1 className="pc  fs-21 fw-700">
              Profile
            </h1>

            <hr />

            <div className="row gx-5 gy-4">
              <Sidebar page='profile' />

              <div className="col-md-9">

              <form className="row gy-3">

              <div className="col-md-12">
                    <div>
                        <label className="border d-inline-block position-relative" htmlFor="profile_picture"  style={{background: `${profilePicture ? 'url(' + URL.createObjectURL(profilePicture) + ')' : "url(" +  userData.avatar  + ")"}`,width:"200px",height:"200px",backgroundRepeat:'no-repeat',cursor:'pointer',backgroundSize:'cover'}}>
                        <i className="fas fa-camera position-absolute top-50 start-50 "></i>
                        <div className={`spinner-border position-absolute top-50 start-50 text-secondary ${loading ? 'd-inline-block' : 'd-none'}`} style={{width: '20px',height:"20px"}} role="status"></div>
                      </label>
                      <input type="file" className="form-control" id="profile_picture" onChange={(e) => uploadImage(e)} hidden/>
                    </div>
                </div>

                <div className="col-md-12">
                    <label className="fw-600 small">First Name</label>
                    <input type="text" className="form-control" defaultValue={userData.first_name} />
                </div>

                 <div className="col-md-12">
                    <label className="fw-600 small">Last Name</label>
                    <input type="text" className="form-control" defaultValue={userData.last_name} />
                </div>

                 <div className="col-md-12">
                    <label className="fw-600 small">Email</label>
                    <input type="text" className="form-control" defaultValue={userData.email} />
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