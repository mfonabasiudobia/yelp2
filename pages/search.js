import {useState,useEffect,useContext} from 'react';
import Footer from "/components/footer";
import axios  from "/helpers/axios";
import Header from "/components/header";
import Rating from "/components/rating";
import Header2 from "/components/dashboard/Header";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import Moment from 'react-moment';
import {UserContext} from "/components/UserContext";
toast.configure();

const WireReview = ({business}) => {


  const [talks,setTalks] = useState([]);
  const router = useRouter();
  const [pages,setPages] = useState([]);
  const [currentPage,setCurrentPage] = useState(0);
  const {setId,userData,isLoggedIn,loading,setLoading,setData,data} = useContext(UserContext);

   return (<>
    <div className="page-wrapper">
   
      <Header2 />

   <section className="py-5">
          <div className="container">
           
            <div className="row gy-4 d-flex justify-content-center">
              <div className="col-md-12 boder-bottom">
                   <h1 className="pc  fs-21 fw-700">
                    All Results ({business.length})
                  </h1>



              {business.length === 0 ? <div className="alert alert-info">No results found</div> : business.slice(currentPage, currentPage + 10).map((item,index) => 
                  <div className="row border-bottom pb-2 py-2" key={index}>
                    <div className="position-relative col-2 p-0 card card-body">
                        <Image 
                        src={`${item.logo_url === null ? "/images/db-img.jpg" :  item.logo_url.replace("http://","https://")}`}
                        loader={() => item.logo_url === null ? "/images/db-img.jpg" :  item.logo_url.replace("http://","https://")}
                        className="img-fluid p-0 rouned"
                        objectFit="cover"
                        alt=""
                        layout="fill"
                      
                       />
                      </div>
                    <div className="col-10">
                      <div>
                        <Link href={`/biz/${item.id}`}><a className="fw-600 text-dark">{item.name}</a></Link>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                      <Rating size={12} padding="px-1" rate={item.id} id={item.id} />
                        <div className="fs-11">157</div>
                      </div>
                        
                       <div className="fs-14 yellow-1 mb-2">
                        &#128293; Listed <Moment fromNow>{item.created_at}</Moment>
                      </div>
                      <div className=" mb-2">
                        <span>{item.description.slice(0,100)}...  <Link href={`/biz/${item.id}`}><a className="fw-600 fs-14">more</a></Link></span>
                      </div>

                      <div className="fw-600 fs-13">{item.culture.name}  | {item.category.name}</div>

                      </div>
                  </div>

              )}

              </div>


            </div>



            <nav className={`my-3 ${business.length == 0 && 'd-none'}`}>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${business.slice(currentPage - 10, currentPage - 20).length === 0 ? 'disabled': null }`}>
                  <a className="page-link" href="#"  aria-disabled="true" onClick={() => setCurrentPage(currentPage - 10)}>Previous</a>
                </li>

                {[...Array(Math.ceil(business.length/10)).keys()].map((item) =>  <li key={item} className={`page-item  ${currentPage === item*10 ? 'active' : null}`}><a className="page-link" href="#" onClick={() => setCurrentPage(item == 0 ? item : currentPage + 10)}>{item + 1} </a></li> )}

                <li className={`page-item ${business.slice(currentPage + 10, currentPage + 20).length === 0 ? 'disabled': null }`}>
                  <a className="page-link" href="#" onClick={() => setCurrentPage(currentPage + 10)} >Next</a>
                </li>
              </ul>
            </nav>


          </div>
        </section>

    </div>
    <Footer />
</>)
}



export const getServerSideProps = async (context) => {

  const { culture_id, category_id } = context.query;

  const business = await axios.get(`v1/users/business/search`, {
    params : {
      culture_id : culture_id,
      category_id : category_id
    }
  }).catch(console.log);
  
  return {
    props: {
      business : business ? business.data.data : [],
    },
  };
};



export default WireReview;