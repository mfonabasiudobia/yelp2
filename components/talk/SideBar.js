import {useState,useEffect} from 'react';
import axios  from "../../helpers/axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';

const Sidebar = (props) => {

  const [userData,setUserData] = useState([]);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [talks,setTalks] = useState([]); 
  const [show, setShow] = useState(false);
  const router = useRouter();


   useEffect(() => {
    const data = window.localStorage.getItem("userData");

    if (data != null) {
      if (JSON.parse(data).status === true) {
        setUserData(JSON.parse(data).data);
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }

    }
  },[]);


 useEffect(() => {

    // if(isLoggedIn){
      
    axios({
    url: "v1/users/conversation/categories",
    method:"GET",
    headers: {
        'Authorization':`Bearer ${userData.token}`
    }}).then((res) => {

      setTalks(res.data.data)
     
    })

   // }


   },[isLoggedIn]);



   const submitTopic = (e) => {
     e.preventDefault();
     isLoggedIn ? router.push("/talk/create-new-topic") : router.push("/login");
   }



	return (<div className="col-md-3">
                <div>


         <Button variant="none" onClick={() => setShow(true)} className="fw-600 mb-2 d-block d-md-none bg-light pc">
             <i className="fas fa-align-left"></i> Categories
        </Button>


        <form className="my-4" onSubmit={(e) => submitTopic(e)}>

        <div className="input-group rounded-10">
                      <input
                        type="text"
                        className="form-control text-secondary fs-15  px-3"
                        placeholder="Search Chat"
                      />
                      <span className="input-group-text btn-primary-color-bg rounded-end text-white rounded-0 border-0 fw-100">
                        <i className="fas fa-search"></i>
                      </span>
        </div>

        <hr />

         <button className={`btn btn-primary-color-bg text-white fs-14 w-100 fw-600`} type="submit">New Conversation</button>
       </form>

       <div className="fw-600 mb-2 d-none d-md-block">Chat</div>

       


        <div className="list-group conversation-sidebar d-none d-md-block">

        <a href="#" className={`list-group-item list-group-item-action ${'all' === props.categoryId ? 'active' : null}`} aria-current="true"
         onClick={() =>  props.getCategoryId('all')}>
              All
            </a>

          {isLoggedIn ? 
         <a href="#" className={`list-group-item list-group-item-action ${'mine' === props.categoryId ? 'active' : null}`} aria-current="true"
         onClick={() =>  props.getCategoryId('mine')}>
              Mine
          </a> : null }

        {talks.map((item) =>  <a href="#"  key={item.id} className={`list-group-item list-group-item-action ${item.id === props.categoryId ? 'active' : null}`} aria-current="true"
         onClick={() =>  props.getCategoryId(item.id)}>
              {item.name} {/*{props.categoryId}*/}
            </a>)}
           
        </div>



      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="pc">Chat</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

            <div className="list-group conversation-sidebar">

        <a href="#" className={`list-group-item list-group-item-action ${'all' === props.categoryId ? 'active' : null}`} aria-current="true"
         onClick={() => { props.getCategoryId('all'); setShow(false) } }>
              All
            </a>

          {isLoggedIn ? 
         <a href="#" className={`list-group-item list-group-item-action ${'mine' === props.categoryId ? 'active' : null}`} aria-current="true"
         onClick={() => { props.getCategoryId('mine'); setShow(false) } }>
              Mine
          </a> : null }

        {talks.map((item) =>  <a href="#"  key={item.id} className={`list-group-item list-group-item-action ${item.id === props.categoryId ? 'active' : null}`} aria-current="true"
         onClick={() => { props.getCategoryId(item.id); setShow(false) } }>
              {item.name} {/*{props.categoryId}*/}
            </a>)}
           
        </div>
          
        </Offcanvas.Body>
      </Offcanvas>


                </div>
              </div>)
}


export default Sidebar;