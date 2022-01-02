import {useState,useEffect,useContext} from 'react';
import axios  from "../../helpers/axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import {UserContext} from "/components/UserContext";
import Cookie from "js-cookie";

const Sidebar = ({page}) => {


  const [show, setShow] = useState(false);
  const {setId,userData,isLoggedIn,loading,setLoading,setData,data,setIsLoggedIn} = useContext(UserContext);
  const router = useRouter();



    const logout = () => {
      setIsLoggedIn(false);
      Cookie.remove("userData");
      router.push("/");
    };



	return (<div className="col-md-3">
                <div>


        <Button variant="none" onClick={() => setShow(true)} className="fw-600 mb-2 d-block d-md-none bg-light pc">
             <i className="fas fa-align-left"></i>
        </Button>



       <div className="fw-600 mb-2 d-none d-md-block">{userData.first_name} Account Settings</div>


        <div className="list-group conversation-sidebar d-none d-md-block">

          <Link href="/profile" ><a  className={`list-group-item list-group-item-action ${page == 'profile' ? 'active' : ''} `} aria-current="true">Profile</a></Link>

          <Link href="/profile/password" ><a  className={`list-group-item list-group-item-action  ${page == 'password' ? 'active' : ''} `} aria-current="true">Password</a></Link>

          <a href="#"  onClick={() => logout()}   className={`list-group-item list-group-item-action`} aria-current="true">Logout</a>
           
        </div>



      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="pc">{userData.first_name} Account Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

        <div className="list-group conversation-sidebar">

           <Link href="/profile" ><a  className={`list-group-item list-group-item-action ${page == 'profile' ? 'active' : null} `} aria-current="true">Profile</a></Link>

          <Link href="/profile/password" ><a  className={`list-group-item list-group-item-action active ${page == 'password' ? 'active' : null} `} aria-current="true">Password</a></Link>

          <a href="#"  onClick={() => logout()}   className={`list-group-item list-group-item-action`} aria-current="true">Logout</a>
           
        </div>
          
        </Offcanvas.Body>
      </Offcanvas>


                </div>
              </div>)
}


export default Sidebar;