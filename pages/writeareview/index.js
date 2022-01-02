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
import {UserContext} from "/components/UserContext";
toast.configure();

const WireReview = ({gems,cultures,categories}) => {


  const [talks,setTalks] = useState([]);
  const [category, setCategory] = useState(0);
  const [culture, setCulture] = useState(0);
  const router = useRouter();
  const {setId,userData,isLoggedIn,loading,setLoading,setData,data} = useContext(UserContext);



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
   
    <main>
      <Header2 />

          <section style={{height:"40vh",backgroundColor:"#F5F5F5"}}>
                  <div className="container h-100">

                 
                   <div className="row h-100 gx-3">

                       <div className="col-md-8 d-flex flex-column justify-content-center align-items-start h-100 px-4 px-md-0">
                         <h2 className="fs-30 fw-700">Your First Review Awaits</h2>
                         <p>Review your favorite businesses and share your experiences with our community. Need a little help getting started? Check out these tips.</p>
                  

          <div className="d-flex w-100">
              <div className="input-group me-2">
                <span className="input-group-text bg-white text-secondary fw-600  rounded-0">
                  Category
                </span>
                <input
                  type="text"
                  list="categoryOptions"
                  className="form-control rounded-0 border-start-0 text-secondary fs-15 border-right"
                  placeholder="Restaurants, Grocery stores, Museums, Community Centers, Places Of Worship..."
                  onChange={(e) => setCategory(e.target.value)} />
                  <datalist id="categoryOptions">
                    {categories.data.map((item) =>
                          <option key={item.id}  value={item.name}  />
                      )}
                  </datalist>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-white text-secondary fw-600 rounded-0">
                  Cultures
                </span>
                <input
                  type="text"
                  list="cultureOptions"
                  className="form-control rounded-0   border-start-0 text-secondary fs-15 me-2"
                  placeholder="African, Asian, South American, Indian, Latin..."
                 />
                <datalist id="cultureOptions">
                  {cultures.data.map((item) =>
                        <option key={item.id}  value={item.name}   />
                    )}
                </datalist>
                <button onClick={() => handleFind()}  className="input-group-text primary-color-bg text-white rounded-0 border-0 fw-300">
                  &nbsp; <i className="fas fa-search"></i>&nbsp;{" "}
                </button>
              </div>
            </div>


                      </div>

                      <div className="col-md-4 d-none d-md-flex justify-content-start align-items-center h-100 ">
                         <Image src="/images/house.png" width="250" height="150" className='img-fuild' alt="" />
                      </div>

                      </div>
              </div>
          </section>
    </main>




    <section className="py-5">
          <div className="container">
           
            <div className="row gy-4 d-flex justify-content-center">
              <div className="col-md-12 boder-bottom">
                   <h1 className="pc  fs-21 fw-700">
                    See the business you’d like to review?
                  </h1>



              {talks.length === 0 ? null : talks.slice(0,10).map((item,index) => 
                  <div className="row border-bottom pb-2 py-2" key={index}>
                    <div className="position-relative col-2 p-0 card card-body">
                        <Image 
                        src={`${item.logo_url === null ? "/images/user_medium_square.png" :  item.logo_url}`}
                        className="img-fluid p-0 rouned"
                        loader={() => item.logo_url === null ? "/images/user_medium_square.png" :  item.logo_url}
                        alt=""
                        layout="fill"
                      
                       />
                      </div>
                    <div className="col-8">
                      <div>
                        <span>{index + 1}. {item.name}</span>
                      </div>
                      <div className="d-flex align-items-center">
                      <Rating size={12} padding="px-1" rate={item.id} id={item.id} />
                        <div className="fs-11">157 reviews</div>
                      </div>
          <div className="submit mt-3">
             {<Link href={`${isLoggedIn ? '/writeareview/biz/' + item.id : '/login'}`}><a className={`btn fs-14 border fw-600 btn-primary-color-bg text-white`}><i className="fas fa-star"></i> Write A Review </a></Link>}
          </div>


                    </div>
                    <div className="position-relative col-2 p-0 card card-body">
                        <div className="fw-600">{item.culture.name}</div>
                        <div>{item.address.street_address}</div>
                        <div>{item.phone_number.phone_number}</div>
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
};


export default WireReview;