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

const WireReview = ({cultures}) => {


  const [talks,setTalks] = useState([]);
  const router = useRouter();
  const {setId,userData,isLoggedIn,loading,setLoading,setData,data} = useContext(UserContext);
  


useEffect(() => {

    axios({
    url: `v1/users/business/?size=10`,
    method:"GET",
    headers: {
        'Authorization':`Bearer ${userData.token}`
    }}).then((res) => {

      setTalks(res.data.data)
      
     // var page = [];
     // for (var i = 0; i <=  Math.ceil(res.data.data.length/10) - 1 ; i++) {
     //          page.push(i)
     // }
     //    setPages(page);

    })  

},[]);




   return (<>
    <div className="page-wrapper">
   
      <Header2 />

         


    <section className="py-5">
          <div className="container">
           
            <div className="row gy-4 d-flex justify-content-center">
              <div className="col-md-12 boder-bottom">
                   <h1 className="pc  fs-21 fw-700">
                    All Results ({cultures.length})
                  </h1>



              {cultures.length === 0 ? <div className="alert alert-info">No results found</div> : talks.slice(0,10).map((item,index) => 
                  <div className="row border-bottom pb-2 py-2" key={index}>
                    <div className="position-relative col-2 p-0 card card-body">
                        <Image 
                        src={`${item.logo_url === null ? "/images/user_medium_square.png" :  item.logo_url}`}
                        loader={() => item.logo_url === null ? "/images/user_medium_square.png" :  item.logo_url}
                        className="img-fluid p-0 rouned"
                        alt=""
                        layout="fill"
                      
                       />
                      </div>
                    <div className="col-10">
                      <div>
                        <Link href={`/biz/${item.id}`}><a className="fw-600 text-dark">{index + 1}. {item.name}</a></Link>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                      <Rating size={12} padding="px-1" rate={item.id} id={item.id} />
                        <div className="fs-11">157</div>
                      </div>
                        
                       <div className="fs-14 yellow-1 mb-2">
                        &#128293; Opened <Moment fromNow>{item.created_at}</Moment>
                      </div>
                      <div className=" mb-2">
                        <span>{item.description.slice(0,100)}...  <Link href={`/biz/${item.id}`}><a className="fw-600 fs-14">more</a></Link></span>
                      </div>

                      <div className="fw-600 fs-13">{item.culture.name}  | {item.category.name}</div>

                      </div>
                  </div>

              )}

              </div>

              {/*<div className="col-md-4 d-none d-md-block">
               <div className="w-100"><iframe width="100%" height="600" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1.-1+()&t=&z=14&ie=UTF8&iwloc=B&output=embed"><a href="http://www.gps.ie/`}></iframe></div>
              </div>*/}


            </div>


           {/* <div className="d-flex justify-content-center mt-3">
              Pagination
            </div>*/}
          </div>
        </section>

    </div>
    <Footer />
</>)
}



export const getServerSideProps = async (context) => {

  
  if(context.query.culture_id != undefined && context.query.category_id != undefined){

    const cultures = await axios.get(`v1/users/business?size=10&category_id=${context.query.category_id}&culture_id=${context.query.culture_id}`);

  }else if(context.query.culture_id != undefined && context.query.category_id == undefined){

     const cultures = await axios.get(`v1/users/business?size=10&culture_id=${context.query.culture_id}`);

  }else if(context.query.category_id != undefined && context.query.culture_id == undefined){

     const cultures = await axios.get(`v1/users/business?size=10&category_id=${context.query.category_id}`);

  }else{
     const cultures = await axios.get(`v1/users/business?size=10`);
  }
  

  return {
    props: {
      cultures : cultures.data.data
    },
  };
};



export default WireReview;