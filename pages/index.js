import Footer from "/components/footer";
import { useState, useEffect,useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
toast.configure();
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import axios  from "/helpers/axios";
import Moment from 'react-moment';
import Rating from "/components/rating";
import {UserContext} from "/components/UserContext";
import Cookie from "js-cookie";



const Dashboard = ({gems,cultures,categories}) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState(0);
  const [culture, setCulture] = useState(0);
  const [cultureCollapse,setCultureCollapse] = useState(false);
  const {setId,userData,isLoggedIn,loading,setLoading,setData,data,setIsLoggedIn} = useContext(UserContext);
  const router = useRouter();


  const logout = () => {
    setIsLoggedIn(false);
    Cookie.remove("userData");
    // toast.success("You have logged out successfully", { theme: "colored" });
  };


  const handleFind = () => {
   

     const categoryId = category !== 0 && categories.data.filter((item) => item.name == category)[0].id;
   

    const cultureId =  culture !== 0 && cultures.data.filter((item) => item.name == culture)[0].id;
   
   
   
    if(category !== 0 && culture !== 0){
      router.push(`/search?category_id=${categoryId}&culture_id=${cultureId}`);
    }else if(category !== 0){
      router.push(`/search?category_id=${categoryId}`);
    }else if(culture !== 0){
      router.push(`/search?culture_id=${cultureId}`);
    }else{
      router.push(`search`);
    }

  }

  const logged = () => {
    if (isLoggedIn == false) {
      var data = (
        <>
          <div className="nav-item px-2 nav-login">
            <Link href="/login">
              <a
                className="nav-link fs-14 text-white fw-600"
                style={{ padding: "5px 10px" }}
              >
                Login
              </a>
            </Link>
          </div>

          <div className="nav-item px-2 nav-signup">
            <Link href="/signup">
              <a
                className="nav-link fs-14 text-white fw-600"
                style={{ padding: "5px 10px" }}
              >
                Signup
              </a>
            </Link>
          </div>
        </>
      );
    } else {
      var data = (
        <>
          {" "}
          {/*<div className="nav-item px-2">
            <a
              className="nav-link fs-14 text-white fw-600 right-header-item"
              style={{ padding: "5px 10px" }}
              href="#"
            >
              <svg width="24" height="24" className="icon_svg text-white"><path d="M7.39 11.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm4.61 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm4.61 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM7 22.53a.94.94 0 01-.43-.1 1 1 0 01-.57-.9v-3a8.19 8.19 0 01-5-7.4v-.9A8.26 8.26 0 019.26 2h5.48A8.26 8.26 0 0123 10.26v.48A8.26 8.26 0 0114.74 19h-3l-4.12 3.31a1 1 0 01-.62.22zM9.26 4A6.27 6.27 0 003 10.26v.9A6.29 6.29 0 007.34 17a1 1 0 01.66.94v1.56l2.79-2.23a1 1 0 01.62-.22h3.33A6.27 6.27 0 0021 10.74v-.48A6.27 6.27 0 0014.74 4H9.26z" fill="white"></path></svg>
            </a>
          </div>
          <div className="nav-item px-2">
            <a
              className="nav-link fs-14 text-white fw-600 right-header-item"
              style={{ padding: "5px 10px" }}
              href="#"
            >
              <svg width="24" height="24" className="icon_svg text-white"><path d="M22.64 17.23A7.31 7.31 0 0120 11.59V9A8 8 0 004 9v2.59a7.31 7.31 0 01-2.64 5.64A1 1 0 002 19h6a4 4 0 008 0h6a1 1 0 00.64-1.77zM6 9a6 6 0 0112 0v2.59c.001.472.038.943.11 1.41H5.89A9.36 9.36 0 006 11.59V9zm6 12a2 2 0 01-2-2h4a2 2 0 01-2 2zm-7.72-4a9.42 9.42 0 001.08-2h13.28a9.42 9.42 0 001.08 2H4.28z" fill="white"></path></svg>
            </a>
          </div>*/}

        

          <div className="nav-item pe-2">
              <Dropdown>
              <Dropdown.Toggle  variant="none" className="nav-link fs-14 bg-none text-white fw-600 right-header-item dropdown-toggle left-header-item"
              style={{ padding: "0px 5px 0px 0px" }} id="dropdown-basic">
                 <Image  src="/images/user_icon.png" alt="user icon" height="40" width="40" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="px-2">

                <Dropdown.Item href="/profile" style={{textDecoration:'none'}}  className='text-dark'><i className='fas fa-cog'></i> Account Settings</Dropdown.Item>

                <Dropdown.Item href="#" style={{textDecoration:'none'}} onClick={() => logout()} className='text-dark'><i className='fas fa-sign-out-alt'></i>  Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>{" "}
        </>
      );
    }

    return data;
  };

  return (
    <>

     <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="pc">Houston Culture</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          <ul className="navbar-nav">
                  
                  <li className="nav-item px-2">
                    <Link href={`${isLoggedIn ? '/writeareview' : '/login'}`}>
                      <a 
                      className="nav-link fs-14 text-dark fw-600"
                      style={{ padding: "10px 15px" }}>Write a Review</a>
                    </Link>
                  </li>

                  <li className="nav-item px-2">
                   <Link  href={`${isLoggedIn ? '/biz/submit' : '/login'}`}>
                      <a 
                      className="nav-link fs-14 text-dark fw-600"
                      style={{ padding: "10px 15px" }}> Submit Business</a>
                    </Link>
                  </li>

                  <li className="nav-item px-2">
                   <Link href="talk">
                      <a 
                      className="nav-link fs-14 text-dark fw-600"
                      style={{ padding: "10px 15px" }}>Chat</a>
                    </Link>
                  </li>
                </ul>
          
        </Offcanvas.Body>
      </Offcanvas>


      <div className="page-wrapper">

      {JSON.stringify(userData)}


        <header className="main-header position-relative" >
          <nav className="navbar navbar-expand-lg bg-none  m-0 position-absolute top-0 w-100 z-index-10">
            <div className="container">

        <Button variant="none" onClick={() => setShow(true)} className="fw-600 mb-2 d-block d-md-none bg-light">
             <i className="fas fa-align-left"></i> Menu
        </Button>

              <div
                className="collapse navbar-collapse w-100 d-none d-md-block"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav d-flex align-items-center left-header">
                  

                  <li className="nav-item px-2">
                    <Link href={`${isLoggedIn ? '/writeareview' : '/login'}`}>
                      <a 
                      className="nav-link fs-14 text-white fw-600"
                      style={{ padding: "10px 15px" }}>Write a Review</a>
                    </Link>
                  </li>

                  <li className="nav-item px-2">
                   <Link  href={`${isLoggedIn ? '/biz/submit' : '/login'}`}>
                      <a 
                      className="nav-link fs-14 text-white fw-600"
                      style={{ padding: "10px 15px" }}> Submit Business</a>
                    </Link>
                  </li>

                  <li className="nav-item px-2">
                   <Link href="talk">
                      <a 
                      className="nav-link fs-14 text-white fw-600"
                      style={{ padding: "10px 15px" }}>Chat</a>
                    </Link>
                  </li>
                </ul>

              </div>

                <div className="ms-auto d-flex align-items-center right-header">
                  {logged()}
                </div>
            </div>
          </nav>

          <div className="container d-flex flex-column justify-content-center align-items-center h-100 position-relative">
            <Image  src="/images/logo_white_h.png" alt="logo white dark" width="150" height="150" />

            <div className="d-flex w-100 mt-5 mb-3">
              <div className="input-group input-group-md  d-flex position-relative">
               <span className="d-none d-md-block input-group-text bg-white text-secondary fw-600 border-0 rounded-0 px-2">
                  Category
                </span>

                <span className="d-block d-md-none bg-white text-secondary fw-600 border-0 rounded-0 px-2 position-absolute" style={{top:'-20px'}}>
                  Category
                </span>

              <input className="form-control rounded-0 border-0 text-secondary fs-15" list="categoryOptions"  placeholder="Restaurants, Grocery stores, Museums, Community Centers, Places Of Worship..." onChange={(e) => setCategory(e.target.value)} />
              <datalist id="categoryOptions">
                {categories.data.slice(0,5).map((item) =>
                      <option key={item.id}  value={item.name}  />
                  )}
              </datalist>
              </div>
              <div className="input-group input-group-md d-flex position-relative">
               <span className="d-none d-md-block input-group-text bg-white text-secondary fw-600 border-0 rounded-0">
                  Cultures
                </span>

                <span className="d-block d-md-none bg-white text-secondary fw-600 border-0 rounded-0 px-2 position-absolute" style={{top:'-20px'}}>
                  Cultures
                </span>

              <input className="form-control rounded-0 border-0 text-secondary fs-15" list="cultureOptions"  placeholder="African, Asian, South American, Indian, Latin..." onChange={(e) => setCulture(e.target.value)} />
              <datalist id="cultureOptions">
                {cultures.data.slice(0,5).map((item) =>
                      <option key={item.id}  value={item.name}   />
                  )}
              </datalist>
                <button onClick={() => handleFind()} className="input-group-text btn-primary-color-bg text-white rounded-0 border-0 fw-300">
                  &nbsp; <i className="fas fa-search"></i>&nbsp;{" "}
                </button>
              </div>
            </div>

            <div className=" px-4 d-flex justify-content-between  w-lg-75" style={{overflow:'auto'}}>

            <>
              <div className="mx-3 text-center" >
                <a className="fw-600 fs-14 text-white link">Restaurants</a>  &nbsp; <span className='text-secondary'> | </span> <a className="fw-600 fs-14 text-white link">Grocery stores</a>  &nbsp; <span className='text-secondary'> | </span> <a className="fw-600 fs-14 text-white link">Museums</a>  &nbsp; <span className='text-secondary'> | </span> <a className="fw-600 fs-14 text-white link">Community Centers</a> &nbsp;  <span className='text-secondary'> | </span> <a className="fw-600 fs-14 text-white link">Place of Worship</a> 
              </div>

              </>


            {/*{categories.data.slice(0,4).map((item,index) => 
              <>
              <span className="mx-3" key={item.id}>
                <Link href={`search?category_id=${item.id}`}><a className="fw-600 fs-14 text-white link">{item.name}</a></Link>
              </span>
              {index < 3 && <span className='text-secondary'> | </span>}
              </>
              )}*/}
             {/* <span>
                <span
                  aria-hidden="true"
                  style={{ width: "24px", height: "24px" }}
                  className="icon icon--24-food-v2 icon--size-24 icon--inverse icon--fallback-inverted"
                >
                  <svg role="img" className="icon_svg">
                    <use xlinkHref="#24x24_food_v2">
                      <svg id="24x24_food_v2" height="24" width="24">
                        <path d="M17 1a4 4 0 014 4v4a6 6 0 01-2 4.46V20a3 3 0 11-6 0V5a4 4 0 014-4zm0 19v-5.35a6 6 0 01-2 .35v5a1 1 0 102 0zm2-11V5a2 2 0 00-4 0v8a4 4 0 004-4zm-9-8a1 1 0 011 1v5a4 4 0 01-1 2.62V20a3 3 0 11-6 0V9.62A4 4 0 013 7V2a1 1 0 012 0v3h1V2a1 1 0 012 0v3h1V2a1 1 0 011-1zM9 7H5a2 2 0 104 0zM7 21a1 1 0 001-1v-9.14A4.09 4.09 0 017 11a4.09 4.09 0 01-1-.14V20a1 1 0 001 1z"></path>
                      </svg>
                    </use>
                  </svg>
                </span>
                <a className="fw-600 fs-14 text-white link">Restaurants</a>
                &nbsp;
              </span>
			  <span>
			  <span
            aria-hidden="true"
            style={{ width: "24px", height: "24px" }}
            className="icon icon--24-at-home-services-v2 icon--size-24 icon--inverse icon--fallback-inverted"
          >
            <svg role="img" className="icon_svg">
              <use xlinkHref="#24x24_at_home_services_v2">
                <svg id="24x24_at_home_services_v2" height="24" width="24">
                  <path
                    d="M8.672 14.524a1.458 1.458 0 100-2.916 1.458 1.458 0 000 2.916z"
                  ></path>
                  <path
                    d="M22 21h-3.29v-3.046a5.929 5.929 0 004.236-5.97c0-4.882-4.268-10.361-4.45-10.591a1 1 0 00-1.572-.001c-.16.202-3.454 4.43-4.27 8.757L9.06 7.721a1 1 0 00-1.12 0l-6.588 4.45a1 1 0 00-.27 1.39.99.99 0 00.918.42V21a1 1 0 100 2h20a1 1 0 000-2zM17.71 3.73c1.17 1.74 3.236 5.239 3.236 8.253 0 2.253-1.452 4.085-3.236 4.085A3.165 3.165 0 0115 14.2v-.211c.03.003.058.013.088.013a1 1 0 00.56-1.83l-1.13-.763c.232-2.874 2.094-6.046 3.192-7.678zM9 21H8v-3h1v3zm4 0h-2v-4a1 1 0 00-1-1H7a.998.998 0 00-1 1v4H4v-8.203l4.5-3.04 4.5 3.04V21zm2-3.825a4.885 4.885 0 001.71.768V21H15v-3.825z"
                  ></path>
                </svg>
              </use>
            </svg>
          </span>
              	<a className="fw-600 fs-14 text-white link">Home Services</a>
              &nbsp;
			  </span>
			  <span>
			  <span
            aria-hidden="true"
            style={{ width: "24px", height: "24px" }}
            className="icon icon--24-delivery-v2 icon--size-24 icon--inverse icon--fallback-inverted"
          >
            <svg role="img" className="icon_svg">
              <use xlinkHref="#24x24_delivery_v2">
                <svg id="24x24_delivery_v2" height="24" width="24">
                  <path
                    d="M23.596 17a4.97 4.97 0 00-1.836-3.839L17.753 4.77a1.114 1.114 0 00-.464-.53.983.983 0 00-.432-.124c-.013 0-.023-.008-.036-.008h-4.843a1 1 0 000 2h1.656a3.534 3.534 0 00-.09 3.006l1.817 4.107A5.018 5.018 0 0013.703 16H9.748a2.537 2.537 0 01-1.488-2.107c0-1.486 1.971-1.895 2.05-1.91a1 1 0 00.815-.983V9a.998.998 0 00-1-1h-2.03V5a3.003 3.003 0 00-3-3H1.38a1 1 0 00-1 1v8a1 1 0 001 1h.28a6.56 6.56 0 00-1.115 5.203.99.99 0 00.807.77c0 .01-.005.017-.005.027a4.056 4.056 0 108.11 0h5.06a4.055 4.055 0 108.109 0l-.001-.006a.996.996 0 00.97-.994zM9.125 10v.249a3.987 3.987 0 00-2.865 3.644A3.909 3.909 0 006.86 16H2.405a4.571 4.571 0 011.621-3.646 1 1 0 00-.079-1.587L2.832 10h6.293zM2.38 4h2.715a1 1 0 011 1v3H2.832c-.153.007-.305.03-.452.072V4zM5.4 20.056A2.058 2.058 0 013.347 18h4.11a2.058 2.058 0 01-2.056 2.056zM21.425 16h-5.658a3.001 3.001 0 015.658 0zm-5.93-9.182c.175-.273.431-.484.732-.603l2.783 5.827c-.14-.012-.272-.042-.414-.042-.502.007-1 .09-1.477.248l-1.744-3.943a1.54 1.54 0 01.12-1.487zm3.076 13.238A2.058 2.058 0 0116.517 18h4.109a2.058 2.058 0 01-2.055 2.056z"
                  ></path>
                </svg>
              </use>
            </svg>
          </span>
				<a className="fw-600 fs-14 text-white link">Delivery</a>
				&nbsp;
			  </span>
			  <span>
			  <span
            aria-hidden="true"
            style={{ width: "24px", height: "24px" }}
            className="icon icon--24-black-owned-v2 icon--size-24 icon--inverse icon--fallback-inverted"
          >
            <svg role="img" className="icon_svg">
              <use xlinkHref="#24x24_black_owned_v2">
                <svg id="24x24_black_owned_v2" height="24" width="24"><path d="M18.055 12.874a1.987 1.987 0 01-1.165.26 3.71 3.71 0 01-1.213-.544l.705 1.41H3.618l1-2h10.174a15.653 15.653 0 01-2.229-2H5V8h6.057a8.353 8.353 0 01-.89-2H4a1 1 0 00-1 1v3.764l-1.895 3.789A1 1 0 002 16h1v6a1 1 0 001 1h12a.998.998 0 001-1v-6h1a1.001 1.001 0 00.895-1.447l-.84-1.679zM11 21H9v-2h2v2zm4 0h-2v-3a1 1 0 00-1-1H8a.998.998 0 00-1 1v3H5v-5h10v5z"></path><path d="M19.9 1.03a3.625 3.625 0 00-2.582 1.37 3.625 3.625 0 00-2.58-1.37 3.091 3.091 0 00-3.092 3.293c0 3.892 5.183 6.83 5.404 6.953a.5.5 0 00.244.064c.423 0 5.696-3.196 5.696-7.017A3.092 3.092 0 0019.9 1.03z"></path></svg>
              </use>
            </svg>
          </span>
				<a className="fw-600 fs-14 text-white link">Black Owned</a>
				&nbsp;
			  </span>*/}
            </div>

          {/*  <div className="position-absolute bottom-0 text-white text-center mb-3 fs-14">
              <div className="fw-600">Rowster Coffee</div>
              <div>
                Photo by <span className="fw-600">MyThy H.</span>
              </div>
            </div>*/}
          </div>
        </header>






        {/*<section className="py-4">
          <div className="container">
            <h1 className="pc text-center fs-21 fw-700 mb-4">
              Your Next Review Awaits
            </h1>

            <div className="row gx-5 gy-4">
              <div className="col-md-6">
                <div>
                  <div className="row border">
                    <div className="position-relative col-3 p-0">
                        <Image 
                        src="/images/db-img.jpg"
                        className="img-fluid p-0"
                        alt=""
                        layout="fill"
                        objectFit="cover"
                       />
                      </div>
                    <div className="card card-body col-9">
                      <div className="fw-600">
                        <Link href="/biz/Sample-Business"><a>San Tung</a></Link>
                      </div>
                      <div className="fs-15">Help the community decide</div>
                      <div className="rate mt-3">
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label htmlFor="star5" title="text"></label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label htmlFor="star4" title="text"></label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label htmlFor="star3" title="text"></label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label htmlFor="star2" title="text"></label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label htmlFor="star1" title="text"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div>
                  <div className="row border">
                    <div className="position-relative col-3 p-0">
                        <Image 
                        src="/images/db-img.jpg"
                        className="img-fluid p-0"
                        alt=""
                        layout="fill"
                        objectFit="cover"
                      
                       />
                      </div>
                    <div className="card card-body col-9">
                      <div className="fw-600">
                        <Link href="/biz/Sample-Business"><a>San Tung</a></Link>
                      </div>
                      <div className="fs-15">Help the community decide</div>
                      <div className="rate mt-3">
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label htmlFor="star5" title="text"></label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label htmlFor="star4" title="text"></label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label htmlFor="star3" title="text"></label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label htmlFor="star2" title="text"></label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label htmlFor="star1" title="text"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div>
                  <div className="row border">
                    <div className="position-relative col-3 p-0">
                        <Image 
                        src="/images/db-img.jpg"
                        className="img-fluid p-0"
                        alt=""
                        layout="fill"
                        objectFit="cover"
                      
                       />
                      </div>
                    <div className="card card-body col-9">
                      <div className="fw-600">
                        <Link href="/biz/Sample-Business"><a>San Tung</a></Link>
                      </div>
                      <div className="fs-15">Help the community decide</div>
                      <div className="rate mt-3">
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label htmlFor="star5" title="text"></label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label htmlFor="star4" title="text"></label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label htmlFor="star3" title="text"></label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label htmlFor="star2" title="text"></label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label htmlFor="star1" title="text"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div>
                  <div className="row border">
                    <div className="position-relative col-3 p-0">
                        <Image 
                        src="/images/db-img.jpg"
                        className="img-fluid p-0"
                        alt=""
                        layout="fill"
                        objectFit="cover"
                      
                       />
                      </div>
                    <div className="card card-body col-9">
                      <div className="fw-600">
                        <Link href="/biz/Sample-Business"><a>San Tung</a></Link>
                      </div>
                      <div className="fs-15">Help the community decide</div>
                      <div className="rate mt-3">
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label htmlFor="star5" title="text"></label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label htmlFor="star4" title="text"></label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label htmlFor="star3" title="text"></label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label htmlFor="star2" title="text"></label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label htmlFor="star1" title="text"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-3">
              <a href="#" className="fs-14">
                <i className="fas fa-angle-down fs-16"></i> Show More
                Suggesstion
              </a>
            </div>
          </div>
        </section>*/}

        <section className="py-4">
          <div className="container">
            <h1 className="pc text-center fs-21 fw-700 mb-4">
              Hidden Gems
            </h1>


            

            <div className="row gx-5 gy-4">


            {gems.data.map((item) =>
              <div className="col-md-4" key={item.id}>
                <div>
                  <div className="border rounded">
                    <div className="w-100 position-relative">

                       <Image 
                          src={`${item.logo_url === null ? "/images/db-img.jpg" :  item.logo_url}`}
                          loader={() => item.logo_url === null ? "/images/db-img.jpg?w=500" :  item.logo_url + "?w=500"}
                          alt=""
                          height={300}
                          width={500}
                          layout='responsive'
                          objectFit="cover"
                          />
                    </div>
                    <div className="card card-body">
                      <div className="fw-600">
                        <Link href={`/biz/${item.id}`}><a>{item.name}</a></Link>
                      </div>
                     {/* <Rating size={12} padding="px-1" rate={item.meta.average_rating === null ? 0 : item.meta.average_rating} id={item.id} />*/}
                      <div className="fs-14">
                        {item.description.substr(0, 80)}
                      </div>
                      <div className="fs-14 yellow-1">
                        &#128293; Opened <Moment fromNow>{item.created_at}</Moment>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              )}


            </div>

             

            <div className="d-flex justify-content-center mt-3">
               <Link href={`search`}><a  className="fs-14">
                See more Hidden Gems
              </a></Link>
            </div>
          </div>
        </section>

      {/*  <section className="py-4">
          <div className="container">
            <h1 className="pc text-center fs-18 fw-700 mb-4">
              Recent Collections
            </h1>

            <div className="row  border p-3 gx-5 px-1 ">
              <div className="col-md-6">
                <div className="">
                  <div className="row border-bottom pb-2">

                   <div className="position-relative col-2 p-0">
                        <Image 
                        src="/images/db-img.jpg"
                        className="img-fluid p-0 rounded"
                        alt=""
                        layout="fill"
                        objectFit='cover'
                      
                       />
                      </div>
                    <div className="col-10">
                      <div className="fw-600">
                        <Link href="/biz/Sample-Business"><a>San Tung</a></Link>
                      </div>
                      <div className="fs-15 fw-500">
                        Collection of coffee sports in SF; courtesy @thrillist
                        Note: Some of the places have multiple locations.
                      </div>

                      <div className="fs-15">
                        <span className="text-secondary">17 Places . By</span>{" "}
                        <a href="#">Tim K.</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="">
                  <div className="row border-bottom pb-2">
                    <div className="position-relative col-2 p-0">
                        <Image 
                        src="/images/db-img.jpg"
                        className="img-fluid p-0 rounded"
                        alt=""
                        layout="fill"
                        objectFit='cover'
                      
                       />
                      </div>
                    <div className="col-10">
                      <div className="fw-600">
                        <Link href="/biz/Sample-Business"><a>San Tung</a></Link>
                      </div>
                      <div className="fs-15 fw-500">
                        Collection of coffee sports in SF; courtesy @thrillist
                        Note: Some of the places have multiple locations.
                      </div>

                      <div className="fs-15">
                        <span className="text-secondary">17 Places . By</span>{" "}
                        <a href="#">Tim K.</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mt-3">
                <div className="">
                  <div className="row border-bottom pb-2">
                    <div className="position-relative col-2 p-0">
                        <Image 
                        src="/images/db-img.jpg"
                        className="img-fluid p-0 rounded"
                        alt=""
                        layout="fill"
                        objectFit='cover'
                      
                       />
                      </div>
                    <div className="col-10">
                      <div className="fw-600">
                        <Link href="/biz/Sample-Business"><a>San Tung</a></Link>
                      </div>
                      <div className="fs-15 fw-500">
                        Collection of coffee sports in SF; courtesy @thrillist
                        Note: Some of the places have multiple locations.
                      </div>

                      <div className="fs-15">
                        <span className="text-secondary">17 Places . By</span>{" "}
                        <a href="#">Tim K.</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mt-3">
                <div className="">
                  <div className="row border-bottom pb-2">
                    <div className="position-relative col-2 p-0">
                        <Image 
                        src="/images/db-img.jpg"
                        className="img-fluid p-0 rounded"
                        alt=""
                        layout="fill"
                        objectFit='cover'
                      
                       />
                      </div>
                    <div className="col-10">
                      <div className="fw-600">
                        <Link href="/biz/Sample-Business"><a>San Tung</a></Link>
                      </div>
                      <div className="fs-15 fw-500">
                        Collection of coffee sports in SF; courtesy @thrillist
                        Note: Some of the places have multiple locations.
                      </div>

                      <div className="fs-15">
                        <span className="text-secondary">17 Places . By</span>{" "}
                        <a href="#">Tim K.</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mt-3">
                <div className="">
                  <div className="row  pb-2">
                    <div className="position-relative col-2 p-0">
                        <Image 
                        src="/images/db-img.jpg"
                        className="img-fluid p-0 rounded"
                        alt=""
                        layout="fill"
                        objectFit='cover'
                      
                       />
                      </div>
                    <div className="col-10">
                      <div className="fw-600">
                        <Link href="/biz/Sample-Business"><a>San Tung</a></Link>
                      </div>
                      <div className="fs-15 fw-500">
                        Collection of coffee sports in SF; courtesy @thrillist
                        Note: Some of the places have multiple locations.
                      </div>

                      <div className="fs-15">
                        <span className="text-secondary">17 Places . By</span>{" "}
                        <a href="#">Tim K.</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mt-3">
                <div className="">
                  <div className="row  pb-2">
                    <div className="position-relative col-2 p-0">
                        <Image 
                        src="/images/db-img.jpg"
                        className="img-fluid p-0 rounded"
                        alt=""
                        layout="fill"
                        objectFit='cover'
                      
                       />
                      </div>
                    <div className="col-10">
                      <div className="fw-600">
                        <Link href="/biz/Sample-Business"><a>San Tung</a></Link>
                      </div>
                      <div className="fs-15 fw-500">
                        Collection of coffee sports in SF; courtesy @thrillist
                        Note: Some of the places have multiple locations.
                      </div>

                      <div className="fs-15">
                        <span className="text-secondary">17 Places . By</span>{" "}
                        <a href="#">Tim K.</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-3">
              <a href="#" className="fs-14">
                Browse more collections
              </a>
            </div>
          </div>
        </section>*/}

        <section className="py-5  grey-1-bg">
          <div className="container">
            <h2 className="pc fs-24 fw-700 text-center">
              Browse Businesses by Culture
            </h2>


            <div className="row my-3 gy-4">


            {cultures.data.slice(0,7).map((item) => 

              <div className="col-6 col-md-3" key={item.id}>
                <div className="border card card-body hover-effect bg-white d-flex flex-column justify-content-center align-items-center">
                  <Image 
                  src={item.image} 
                  loader={() => item.image + "?w=25"}
                  alt="Restaurants"  
                  width="72" 
                  height="72"  />
                  <div className="fw-700 fs-14 mt-2">{item.name}</div>

                  <Link href={`search?culture_id=${item.id}`} ><a className="stretched-link"></a></Link>
                </div>
              </div>

              )}

            

              <div className="col-6 col-md-3">
                <div className="border card card-body hover-effect bg-white d-flex flex-column justify-content-center align-items-center">
                  <Image  src="/images/More_Categories.png" alt="More Categories"  width="72" height="72"  />
                  <div className="fw-700 fs-14 mt-2">{!cultureCollapse ? 'More' : 'Fewer'} Cultures</div>

                  <a className="stretched-link" role='button' onClick={() => setCultureCollapse(!cultureCollapse)}></a>
                </div>
              </div>


            <div className={`row my-3 border-top ${cultureCollapse ? 'd-flex' : 'd-none'}`}>

              {cultures.data.slice(7,20).map((item) => 
                  <div className="col-6 col-md-3" key={item.id}>
                    <div className="card card-body">
                        <div>

                  <Image 
                  src={item.image} 
                  loader={() => item.image + "?w=25"}
                  alt="Restaurants"  
                  width="25" 
                  height="25"
                  objectFit='cover'  />&nbsp;
                  <Link href={`/search?culture_id=${item.id}`}><a className="fw-600">{item.name}</a></Link></div>
                    </div>
                  </div>
               )}

              </div>
            </div>


          </div>
        </section>

     <section className="py-5">
          <div className="container">
            <h2 className="pc fs-24 fw-700 text-center">Download the Houston Cultures App</h2>
            <p className="text-center pc fs-18">Available on IOS and Android</p>

            <div className="row">
              <div className="col-md-6">
                <div className="border-0 card card-body hover-effect bg-white d-flex flex-column justify-content-center align-items-center">
                  <Image  src="/images/houston_cultures_app.png" alt="Houson Cultures app"  width="1000" height="1000" />
                  <a href="" className="stretched-link"></a>
                </div>
              </div>

              <div className="col-md-6">
                <div className="bg-white app-details my-md-5">
                  <p className="app-details-item">
                    <div className="top pc"><strong>Step 1</strong></div>
                    <div>Scroll through our directory of Houston Cultures.</div>
                  </p>

                  <p className="app-details-item">
                    <div className="top pc"><strong>Step 2</strong></div>
                    <div>Select a country and view a list of businesses to support. You can view the hours of operation, find contact info, and even get directions directly in the app! Tap the star to add to favorites.</div>
                  </p>


                  <p className="app-details-item">
                    <div className="top pc"><strong>Step 3</strong></div>
                    <div>Share with your friends!</div>
                  </p>


                </div>
              </div>

          
            </div>

           
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};



export const getServerSideProps = async () => {

    const gems = await axios.get(`v1/users/business/hidden-gems`);

  const cultures = await axios.get(`v1/users/business/cultures`);

  const categories = await axios.get(`v1/users/business/categories`);


  return {
    props: {
      gems : gems.data,
      cultures : cultures.data,
      categories : categories.data
    },
  };


}





export default Dashboard;
