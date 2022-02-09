import {useState,useEffect,useContext,memo} from 'react';
import axios  from "../../helpers/axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link'; 
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import {UserContext} from "/components/UserContext";
import Cookie from "js-cookie";

const Header = (props) => {

  const [show, setShow] = useState(false);
  const [cultures, setCultures] = useState("");
  const [categories, setCategories] = useState("");
  const [category, setCategory] = useState(0);
  const [culture, setCulture] = useState(0);
  const router = useRouter();
  const {setId,userData,isLoggedIn,loading,setLoading,setData,data,setIsLoggedIn} = useContext(UserContext);


   useEffect(() => {

  axios.get(`v1/users/business/cultures`).then((res) => setCultures(res.data));
  axios.get(`v1/users/business/categories`).then((res) => setCategories(res.data));

   
  },[]);


    const logout = () => {
      setIsLoggedIn(false);
      Cookie.remove("userData");
      router.push("/");
  };


   const submitTopic = (e) => {
     e.preventDefault();
     isLoggedIn ? router.push("/talk/create-new-topic") : router.push("/login");
   }


    const handleFind = () => {
   
   
    if(category !== 0 && culture !== 0 &&  category.length != 0 && culture.length != 0){

       const cultureId =  culture !== 0 && cultures.data.filter((item) => item.name == culture)[0].id;

       const categoryId = category !== 0 && categories.data.filter((item) => item.name == category)[0].id;

       router.replace(`/search?category_id=${categoryId}&culture_id=${cultureId}`);

    }else if(category !== 0  && category.length != 0){

      const categoryId = category !== 0 && categories.data.filter((item) => item.name == category)[0].id;

      router.replace(`/search?category_id=${categoryId}`);

    }else if(culture !== 0 &&  culture.length != 0 ){

       const cultureId =  culture !== 0 && cultures.data.filter((item) => item.name == culture)[0].id;

       router.replace(`/search?culture_id=${cultureId}`);

    }else{

       router.replace(`search`);

    }

  }




	return ( <header>

       <nav className="navbar navbar-expand-lg bg-none py-3 m-0 top-header">
            <div className="container-fluid px-md-5">
            <Link className="navbar-brand pc fw-600" href="/"><a>
                    <Image src="/images/logo-white-dark.png" alt="Logo"  height="45" width="100%" /></a> 
            </Link> 


             <div className="navbar-nav ms-auto d-none d-md-flex align-items-center right-header">
                    <div className="input-group  position-relative border search-category-wrapper">
                      <input className="search-category form-select border-0 text-secondary fs-15  px-3 pe-5" value={category == 0 ? '' : category}  placeholder="Bakery, Ballroom, Bar, Cemetary..." onChange={(e) => setCategory(e.target.value.length == 0 ? 0 : e.target.value)} />


                     {category.length > 0 ?
                      <div className="position-absolute  bg-white w-100 " style={{top:"35px",maxHeight:"40vh",zIndex:"2000",overflowY:"auto"}}>
                        {categories.data.map((item,index) => item.name.toLowerCase().indexOf(category) >= 0 &&
                              <button key={item.id} className="btn border-bottom d-block w-100 text-start" onClick={() => setCategory(item.name)}><strong>{index + 1}.</strong> {item.name}</button> 
                          )}
                      </div> : 

                      <div className="position-absolute  d-none bg-white w-100 " style={{top:"35px",maxHeight:"40vh",zIndex:"2000",overflowY:"auto"}}>

                        { typeof categories == 'object' ?  categories.data.map((item,index) => 
                              <button key={item.id} className="btn border-bottom d-block w-100 text-start" onClick={() => setCategory(item.name)}><strong>{index + 1}.</strong> {item.name} </button> 
                          ) : null}
                      </div>}
                    </div>

                    <div className="input-group position-relative border search-category-wrapper">
                    <input className="search-category form-select border-0 text-secondary fs-15   px-3 pe-5" value={culture == 0 ? '' : culture}  placeholder="African, Asian, South American..."  onChange={(e) => setCulture(e.target.value.length == 0 ? 0 : e.target.value)} />
                    {culture.length > 0 ?
                    <div className="position-absolute   bg-white w-100 " style={{top:"35px",maxHeight:"40vh",zIndex:"2000",overflowY:"auto"}}>
                      {cultures.data.map((item,index) => item.name.toLowerCase().indexOf(culture) >= 0 &&
                            <button key={item.id} className="btn border-bottom d-block w-100 text-start" onClick={() => setCulture(item.name)}><strong>{index + 1}.</strong> {item.name}</button> 
                        )}
                    </div> : <div className="position-absolute  d-none bg-white w-100 " style={{top:"35px",maxHeight:"40vh",zIndex:"2000",overflowY:"auto"}}>
                      {typeof cultures == 'object' ? cultures.data.map((item,index) => 
                            <button key={item.id} className="btn border-bottom d-block w-100 text-start" onClick={() => setCulture(item.name)}><strong>{index + 1}.</strong> {item.name}</button> 
                        ) : null}
                    </div> }
                    </div>

                    <button onClick={() => handleFind()} className="input-group-text btn-primary-color-bg rounded-end text-white rounded-0 border-0 fw-100">
                       &nbsp;&nbsp; <i className="fas fa-search"></i>&nbsp;&nbsp; 
                    </button>
                </div>

                <div className="d-flex align-items-center ms-auto">
                  
                  <div className="nav-item d-none d-lg-block px-2">
                    <Link href={`${isLoggedIn ? '/biz/submit' : '/login'}`}>
                    <a
                      className="nav-link fs-14 fw-600"
                      style={{ padding: "10px 15px" }}
                    >
                      Submit Business 
                    </a>
                    </Link>
                  </div>

                  <div className="nav-item d-none d-lg-block px-2">
                    <Link href={`${isLoggedIn ? '/writeareview' : '/login'}`}>
                      <a 
                      className="nav-link fs-14 fw-600"
                      style={{ padding: "10px 15px" }}>Write a Review</a>
                    </Link>
                  </div> 


                {!isLoggedIn  ?

                  <>
                   <div className="nav-item  px-2">
                    <Link href="/login">
                      <a 
                      className="nav-link fw-600  border"
                      style={{ padding: "10px 15px" }}>Log In</a>
                    </Link>
                  </div>
                  <div className="nav-item  px-2">
                    <Link href="/signup">
                      <a 
                      className="nav-link fw-600  btn-primary-color-bg text-white"
                      style={{ padding: "10px 15px" }}>Sign Up</a>
                    </Link>
                  </div>

                   </> :  <>

              {/*   <div className="nav-item px-2">
                    <Link href="/writeareview">
                      <a 
                      className="nav-link fs-14 rounded-circle text-secondary"
                      style={{ padding: "10px 10px" }}>

                       <svg width="24" height="24" className="icon_svg text-white"><path d="M7.39 11.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm4.61 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm4.61 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM7 22.53a.94.94 0 01-.43-.1 1 1 0 01-.57-.9v-3a8.19 8.19 0 01-5-7.4v-.9A8.26 8.26 0 019.26 2h5.48A8.26 8.26 0 0123 10.26v.48A8.26 8.26 0 0114.74 19h-3l-4.12 3.31a1 1 0 01-.62.22zM9.26 4A6.27 6.27 0 003 10.26v.9A6.29 6.29 0 007.34 17a1 1 0 01.66.94v1.56l2.79-2.23a1 1 0 01.62-.22h3.33A6.27 6.27 0 0021 10.74v-.48A6.27 6.27 0 0014.74 4H9.26z"></path></svg></a>


                    </Link>
                  </div>


                  <div className="nav-item px-2">
                    <Link href="/writeareview">
                      <a 
                      className="nav-link fs-14 rounded-circle text-secondary"
                      style={{ padding: "10px 10px" }}>

                      <svg width="24" height="24" className="icon_svg text-white"><path d="M22.64 17.23A7.31 7.31 0 0120 11.59V9A8 8 0 004 9v2.59a7.31 7.31 0 01-2.64 5.64A1 1 0 002 19h6a4 4 0 008 0h6a1 1 0 00.64-1.77zM6 9a6 6 0 0112 0v2.59c.001.472.038.943.11 1.41H5.89A9.36 9.36 0 006 11.59V9zm6 12a2 2 0 01-2-2h4a2 2 0 01-2 2zm-7.72-4a9.42 9.42 0 001.08-2h13.28a9.42 9.42 0 001.08 2H4.28z"></path></svg>


                      </a>
                    </Link>
                  </div>
*/}
            <div className="nav-item px-2 d-none d-md-block">
              <Dropdown>
              <Dropdown.Toggle  variant="none" className="nav-link fs-14 bg-none text-white fw-600 right-header-item dropdown-toggle left-header-item"
              style={{ padding: "0px 5px 0px 0px" }} id="dropdown-basic">
                 <Image  src="/images/user_icon.png" alt="user icon" height="40" width="40" className="fs-14 rounded-circle"  />
              </Dropdown.Toggle>

              <Dropdown.Menu className="px-2">

                <Dropdown.Item href="/profile" style={{textDecoration:'none'}}  className='text-dark'><i className='fas fa-cog'></i> Account Settings</Dropdown.Item>

                <Dropdown.Item href="#" style={{textDecoration:'none'}} onClick={() => logout()} className='text-dark'><i className='fas fa-sign-out-alt'></i>  Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>



          </div>

          <div className="nav-item px-2 d-block d-md-none">
            <Button variant="none" onClick={() => setShow(true)} className="nav-link fs-14 bg-none fw-600 ">
              <Image  src="/images/user_icon.png" alt="user icon" className="fs-14 rounded-circle" height="40" width="40" />
            </Button>
          </div>


           </> }


                </div>
            </div>
          </nav>


      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="pc">Houston Cultures</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="navbar-nav top-header">


 <ul className="navbar-nav py-0 py-0">
        <li className="nav-item px-2">
               <Link href={`${isLoggedIn ? '/biz/submit' : '/login'}`}>
                    <a
                      className="nav-link fs-14 fw-600"
                      style={{ padding: "10px 15px" }}
                    >
                      Submit Business
                    </a>
              </Link>
                  </li>

                  <li className="nav-item px-2">
                    <Link href={`${isLoggedIn ? '/writeareview' : '/login'}`}>
                      <a 
                      className="nav-link fs-14 fw-600"
                      style={{ padding: "10px 15px" }}>Write a Review</a>
                    </Link>
                  </li>


          {isLoggedIn ?  <li className="nav-item px-2">
                    <Link href='/profile'>
                      <a 
                      className="nav-link fs-14 fw-600"
                      style={{ padding: "10px 15px" }}>Profile</a>
                    </Link>
                  </li> : null }




    <li className="nav-item px-2">
                    <Link href="#">
                      <a 
                      className="nav-link fs-14 fw-600"
                      style={{ padding: "10px 15px" }}
                      onClick={() => logout()}
                      >Logout</a>

                    </Link>
   </li>





</ul>


          
        </Offcanvas.Body>
      </Offcanvas>


{/*<nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom sub-header py-0 d-none d-md-block">
  <div className="container py-0">
      <ul className="navbar-nav py-0 py-0">
        <li className="nav-item fs-14 fw-500 dropdown">
          <Link  href="#"><a className="nav-link dropdown-toggle px-3 py-3" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             Restaurant
          </a></Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link  href="#"><a className="dropdown-item">Action</a></Link></li>
            <li><Link  href="#"><a className="dropdown-item">Another action</a></Link></li>
          </ul>
        </li>

        <li className="nav-item fs-14 fw-500 dropdown">
          <Link  href="#"><a className="nav-link dropdown-toggle px-3 py-3" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Home Services
          </a></Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link  href="#"><a className="dropdown-item">Action</a></Link></li>
            <li><Link  href="#"><a className="dropdown-item">Another action</a></Link></li>
          </ul>
        </li>


        <li className="nav-item fs-14 fw-500 dropdown">
          <Link  href="#"><a className="nav-link dropdown-toggle px-3 py-3" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Auto Services
          </a></Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link  href="#"><a className="dropdown-item">Action</a></Link></li>
            <li><Link  href="#"><a className="dropdown-item">Another action</a></Link></li>
          </ul>
        </li>

        <li className="nav-item fs-14 fw-500 dropdown">
          <Link  href="#"><a className="nav-link dropdown-toggle px-3 py-3" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            More
          </a></Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link  href="#"><a className="dropdown-item">Action</a></Link></li>
            <li><Link  href="#"><a className="dropdown-item">Another action</a></Link></li>
          </ul>
        </li>


      </ul>
  </div>
</nav>*/}
    </header>)
}



export default memo(Header);