import {useState,useEffect,useContext} from 'react';
import Footer from "../../components/footer";
import axios  from "../../helpers/axios";
import Header from "../../components/header";
import Header2 from "../../components/dashboard/Header";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Rating from "/components/rating";
import Moment from 'react-moment';
import {UserContext} from "/components/UserContext";
toast.configure();

const BizId = ({business}) => {


  const {setId,userData,isLoggedIn,loading,setLoading} = useContext(UserContext);

   return (<>
    <div className="page-wrapper">
   
    <Header2 />


    <section  className="business-header">

      <div className="container d-flex justify-content-end py-md-4 py-3 flex-column  h-100">

        <div className="d-flex justify-content-between text-white">
          <div>
          <h1 className="fw-900 lh-1">{business.name} </h1>
            <div>

           <Rating size={12} padding="px-1" rate={5} id={business.id} />
            </div>

            <div className="fw-600">
            {business.review.length} reviews
            </div>


         </div>
{/*
         <div className="align-self-end">
            <button className="btn border border-white bg-none fw-600 btn-lg text-white fs-14">See 24 Photos</button>
         </div>*/}



        </div>
      </div>
      
    </section>


    <section className="py-5">
          <div className="container">

            <div className="row gx-5 gy-4">
              <div className="col-md-8 order-2 order-md-1">
                

                <div>


           
                <Link href={isLoggedIn ? `/writeareview/biz/${business.id}` : '/login'}>
                      <a 
                      className="btn fw-600  primary-color-bg text-white text-decoration-none"
                      style={{ padding: "10px 15px" }}>Write a Review</a>
                </Link>


                </div>

                <hr />


                <div>
                  {business.description}
                </div>

                {/*  <h5 className="fw-900">Review Highlights</h5>
                  <div className="d-flex  py-3">
                    <div className="d-flex align-items-start">
                        <Image 
                        src="/images/db-img.jpg"
                        className="img-fluid p-0 rounded"
                        alt=""
                        height="80"
                        width="80"
                      
                       />
                      </div>
                    <div className="px-2">
                      <div>Looking for something to take on Bunsen? Havent been able to find anything close that can compete so...</div>
                    </div>
                  </div>


                  <div className="d-flex  py-3">
                    <div className="d-flex align-items-start">
                        <Image 
                        src="/images/db-img.jpg"
                        className="img-fluid p-0 rounded"
                        alt=""
                        height="80"
                        width="80"
                      
                       />
                      </div>
                    <div className="px-2">
                      <div>Looking for something to take on Bunsen? Havent been able to find anything close that can compete so...</div>
                    </div>
                  </div>

                  <div className="d-flex  py-3">
                    <div className="d-flex align-items-start">
                        <Image 
                        src="/images/db-img.jpg"
                        className="img-fluid p-0 rounded"
                        alt=""
                        height="80"
                        width="80"
                      
                       />
                      </div>
                    <div className="px-2">
                      <div>Looking for something to take on Bunsen? Havent been able to find anything close that can compete so...</div>
                    </div>
                  </div>
*/}



               <div className="row border my-4 shadow py-3 px-3">
                <div className="col-6 d-flex align-items-start">
                        <Image 
                        src={`${userData.avatar === null ? "/images/user_medium_square.png" :  userData.avatar }`}
                        className="img-fluid p-0 rounded-circle"
                        alt=""
                        height="80"
                        width="80"
                        loader={() => userData.avatar === null ? "/images/user_medium_square.png" :  userData.avatar + '?w=80'}
                       />
                      <div className="fs-14 ms-3">
                        <Link href=""><a  className="fw-600">{userData.first_name} {userData.last_name}.</a></Link>
                        <div className="fw-600">{userData.email}</div>
                      </div>
                  </div>

                  <div className="col-6 d-flex justify-content-center flex-column">
                   <Rating size={12} padding="px-1" rate={business.id} id={business.id} />
                      <Link href={isLoggedIn ? `/writeareview/biz/${business.id}` : '/login'}><a className="fw-600 fs-12">Start your review of {business.name}</a></Link>

                  </div>

            </div>



{business.review.map((item) =>
               <div className="row border-bottom border-top py-3" key={item.id}>
                    <div className="col-12 d-flex align-items-start">
                   
                        <Image 
                        src="/images/user_medium_square.png"
                        className="img-fluid p-0 rounded-circle"
                        alt=""
                        height="80"
                        width="80"
                      
                       />
                      <div className="fs-14 ms-3">
                        <a href="" className="fw-600">{item.reviewer.first_name} {item.reviewer.last_name}.</a>
                        <div className="fw-600"><Moment fromNow>{item.created_at}</Moment></div>
                        <Rating size={12} padding="px-1" rate={item.rating} id={item.id} />
                      <div className="fs-15">{item.comment}</div>
                      </div>
                      </div>
                  </div>
)}





              </div>

              <div className="col-md-4 order-1 order-md-2">
               
                 
                  <div className="border-bottom py-3">

                    <div className="d-flex justify-content-between">
                      <Link href="/"><a className="text-dark fw-600 fs-20">{business.address.street_address}</a></Link>
                     </div>

                     <hr />

                     <div className="d-flex justify-content-between">
                      <Link href={`tel:${business.phone_number.phone_number}`}><a className="text-dark fw-600 fs-20">{business.phone_number.phone_number}</a></Link>
                     </div>
                    
                  </div>


<iframe src={`https://maps.google.com/maps?q=${business.address.coordinates.lat},${business.address.coordinates.long}&z=15&output=embed`} width="360" height="270" frameBorder="0" style={{border:0}}></iframe>


 
              

              </div>

            


          {/*  <div className="d-flex justify-content-center mt-3">
              <a href="#" className="fs-14">
                <i className="fas fa-angle-down fs-16"></i> Show More
                Suggesstion
              </a>
            </div>*/}
          </div>
          </div>
        </section>

    </div>
    <Footer />
</>)
}



export const getServerSideProps = async (context) => {

  const {data} = await axios.get(`v1/users/business/business/${context.query.bizId}`);


  return {
    props: {
      business : data.data
    },
  };
};


export default BizId;