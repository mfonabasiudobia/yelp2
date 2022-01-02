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
  const {setId,userData,isAdminLoggedIn,loading,setLoading,setData,data,setIsAdminLoggedIn} = useContext(UserContext);
  const router = useRouter();



    const logout = () => {
      setIsAdminLoggedIn(false);
      Cookie.remove("adminData");
      router.push("/admin");
    };



	return (<div className="col-md-3">
                <div>


        <Button variant="none" onClick={() => setShow(true)} className="fw-600 mb-2 d-block d-md-none bg-light pc">
             <i className="fas fa-align-left"></i>
        </Button>



       <div className="fw-600 mb-2 d-none d-md-block">Settings</div>


        <div className="list-group conversation-sidebar d-none d-md-block">

          <Link href="/admin" ><a  className={`list-group-item list-group-item-action ${page == 'business' ? 'active' : null} `} aria-current="true">Approve Business</a></Link>


          <a href="#"  onClick={() => logout()}   className={`list-group-item list-group-item-action`} aria-current="true">Logout</a>
           
        </div>



      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="pc">Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

        <div className="list-group conversation-sidebar">

           <Link href="/admin" ><a  className={`list-group-item list-group-item-action ${page == 'business' ? 'active' : null} `} aria-current="true">Approve Business</a></Link>

          <a href="#"  onClick={() => logout()}   className={`list-group-item list-group-item-action`} aria-current="true">Logout</a>
           
        </div>
          
        </Offcanvas.Body>
      </Offcanvas>


                </div>
              </div>)
}


export default Sidebar;