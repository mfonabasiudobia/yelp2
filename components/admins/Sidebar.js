import {useState,useEffect,useContext} from 'react';
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import {UserContext} from "/components/UserContext";
import Cookie from "js-cookie";

const Sidebar = ({page}) => {


  const [show, setShow] = useState(false);
  const {setIsAdminLoggedIn} = useContext(UserContext);
  const router = useRouter();



    const logout = () => {
      setIsAdminLoggedIn(false);
      Cookie.remove("adminData");
      router.push("/admin");
    };



	return (<div className="col-md-3">
              </div>)
}


export default Sidebar;