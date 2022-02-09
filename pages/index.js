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
        

          <div className="nav-item pe-2">
              <Dropdown>
              <Dropdown.Toggle  variant="none" className="nav-link fs-14 bg-none text-white fw-600 right-header-item dropdown-toggle left-header-item"
              style={{ padding: "0px 5px 0px 0px" }} id="dropdown-basic">
                 <img  src="/images/user_icon.png" alt="user icon" height="40" width="40" />
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
            <img  src="/images/logo_white_h.png" alt="logo white dark" width="150" height="150" />

            <div className="d-flex w-100 mt-5 mb-3">
              <div className="input-group input-group-md  d-flex position-relative search-category-wrapper">
               <span className="d-none d-md-block input-group-text bg-white text-secondary fw-600 border-0 rounded-0 px-2">
                  Category
                </span>

                <span className="d-block d-md-none bg-white text-secondary fw-600 border-0 rounded-0 px-2 position-absolute" style={{top:'-20px'}}>
                  Category
                </span>

              <input className="search-category form-select rounded-0 border-0 text-secondary fs-15"  placeholder="Restaurants, Grocery stores, Museums, Community Centers, Places Of Worship..." onChange={(e) => setCategory(e.target.value)} value={category == 0 ? '' : category} />

              {category.length > 0 ?
              <div className="position-absolute  bg-white w-100 " style={{top:"35px",maxHeight:"40vh",zIndex:"2000",overflowY:"auto"}}>
                {categories.data.map((item,index) => item.name.toLowerCase().indexOf(category) >= 0 &&
                      <button key={item.id} className="btn border-bottom d-block w-100 text-start" onClick={() => setCategory(item.name)}><strong>{index + 1}.</strong> {item.name}</button> 
                  )}
              </div> : <div className="position-absolute d-none bg-white w-100 " style={{top:"35px",maxHeight:"40vh",zIndex:"2000",overflowY:"auto"}}>
                {categories.data.map((item,index) => 
                      <button key={item.id} className="btn border-bottom d-block w-100 text-start" onClick={() => setCategory(item.name)}><strong>{index + 1}.</strong> {item.name}</button> 
                  )}
              </div>}
              </div>
              <div className="input-group input-group-md d-flex position-relative search-category-wrapper">
               <span className="d-none d-md-block input-group-text bg-white text-secondary fw-600 border-0 rounded-0">
                  Cultures
                </span>

                <span className="d-block d-md-none bg-white text-secondary fw-600 border-0 rounded-0 px-2 position-absolute" style={{top:'-20px'}}>
                  Cultures
                </span>

              <input className="search-category form-select rounded-0 border-0 text-secondary fs-15" list="cultureOptions"  placeholder="African, Asian, South American, Indian, Latin..." onChange={(e) => setCulture(e.target.value)} value={culture == 0 ? '' : culture} />
              {culture.length > 0 ?
              <div className="position-absolute  bg-white w-100 " style={{top:"35px",maxHeight:"40vh",zIndex:"2000",overflowY:"auto"}}>
                {cultures.data.map((item,index) => item.name.toLowerCase().indexOf(culture) >= 0 &&
                      <button key={item.id} className="btn border-bottom d-block w-100 text-start" onClick={() => setCulture(item.name)}><strong>{index + 1}.</strong> {item.name}</button> 
                  )}
              </div> :  <div className="position-absolute  d-none bg-white w-100 " style={{top:"35px",maxHeight:"40vh",zIndex:"2000",overflowY:"auto"}}>
                {cultures.data.map((item,index) => 
                      <button key={item.id} className="btn border-bottom d-block w-100 text-start" onClick={() => setCulture(item.name)}><strong>{index + 1}.</strong> {item.name}</button> 
                  )}
              </div>}
                <button onClick={() => handleFind()} className="input-group-text btn-primary-color-bg text-white rounded-0 border-0 fw-300">
                  &nbsp; <i className="fas fa-search"></i>&nbsp;{" "}
                </button>
              </div>
            </div>

            <div className=" px-4 d-flex justify-content-between  w-lg-75" style={{overflow:'auto'}}>

            <>
              <div className="mx-3 text-center" >
                {categories.data.map((item,index) => 
                  <span key={item.id}>
                  {item.id == 19 || item.id == 10 || item.id == 20 || item.id == 7  || item.id == 21 ? <><span className="fw-600 mx-1 fs-14 text-white link" >
                    <Link href={`search?category_id=${item.id}`}><a className="fw-600 fs-14 text-white link">{item.name}</a></Link>
                  </span> {item.name.replace(/\s/g,'') != 'Placeofworship' && <span className='text-secondary'> | </span>} </> : null}
                  </span>
                  )}
              </div>

              </>


           
            </div>

         
          </div>
        </header>





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
                    <div className="card">

                       <img 
                          src={`${item.logo_url === null ? "/images/db-img.jpg" :  item.logo_url}`}
                          alt=""
                          />

                          <img 
                          src={item.logo_url}
                          alt=""
                          />

                           <img 
                          src="https://www.houstoncultures.com/wp-content/uploads/2019/06/HC_biz_Hot-Breads.jpg"
                          alt=""
                          />


                           <img 
                          src="http://www.houstoncultures.com/wp-content/uploads/2019/06/HC_biz_Hot-Breads.jpg"
                          alt=""
                          />

                    </div>
                    <div className="card card-body">
                      <div className="fw-600">
                        <Link href={`/biz/${item.id}`}><a>{item.name} {item.logo_url}</a></Link>
                      </div>
                     {/* <Rating size={12} padding="px-1" rate={item.meta.average_rating === null ? 0 : item.meta.average_rating} id={item.id} />*/}
                      <div className="fs-14">
                        {item.description.substr(0, 80)}
                      </div>
                      <div className="fs-14 yellow-1">
                        &#128293; Listed <Moment fromNow>{item.created_at}</Moment>
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

     

        <section className="py-5  grey-1-bg">
          <div className="container">
            <h2 className="pc fs-24 fw-700 text-center">
              Browse Businesses by Culture
            </h2>


            <div className="row my-3 gy-4">


            {cultures.data.slice(0,7).map((item) => 

              <div className="col-6 col-md-3" key={item.id}>
                <div className="border card card-body hover-effect bg-white d-flex flex-column justify-content-center align-items-center">
                  <img 
                  src={item.image} 
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
                  <img  src="/images/More_Categories.png" alt="More Categories"  width="72" height="72"  />
                  <div className="fw-700 fs-14 mt-2">{!cultureCollapse ? 'More' : 'Fewer'} Cultures</div>

                  <a className="stretched-link" role='button' onClick={() => setCultureCollapse(!cultureCollapse)}></a>
                </div>
              </div>


            <div className={`row my-3 border-top ${cultureCollapse ? 'd-flex' : 'd-none'}`}>

              {cultures.data.slice(7,20).map((item) => 
                  <div className="col-6 col-md-3" key={item.id}>
                    <div className="card card-body">
                        <div>

                  <img 
                  src={item.image} 
                  alt="Restaurants"  
                  width="25" 
                  height="25"  />&nbsp;
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
                  <img  src="/images/houston_cultures_app.png" alt="Houson Cultures app"  className="img-fluid" />
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
