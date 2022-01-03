import {useState,useEffect} from 'react';
import Footer from "/components/footer";
import axios  from "/helpers/axios";
import Header from "/components/header";
import Sidebar from "/components/talk/SideBar";
import Header2 from "/components/dashboard/Header";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import Moment from 'react-moment';
toast.configure();







const Talk = () => {


  const [talks,setTalks] = useState([]);
  const [pages,setPages] = useState([]);
  const [currentPage,setCurrentPage] = useState(0);
  const [categoryId,setCategoryId] = useState("all");
  const [userData,setUserData] = useState([]);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
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
  
    axios({
    url: `${categoryId === "all" ? 'v1/users/conversation?type=all' : 'v1/users/conversation?type=category&category_id=' + categoryId }`,
    method:"GET",
    headers: {
        'Authorization':`Bearer ${userData.token}`
    }}).then((res) => {

      setTalks(res.data.data)
      
     var page = [];
     for (var i = 0; i <=  Math.ceil(res.data.data.length/10) - 1 ; i++) {
              page.push(i)
     }
        setPages(page);

    })
    
   

},[isLoggedIn,categoryId]);


   return (<>
    <div className="page-wrapper">
   
   <Header2 />




    <section className="py-5">
          <div className="container">
            <h1 className="pc  fs-21 fw-700">
              Conversations
            </h1>

            <hr />

            <div className="row gx-5 gy-4">
              <Sidebar getCategoryId={(data) => setCategoryId(data)} categoryId={categoryId}/>

              <div className="col-md-9">


                  {talks.length === 0 ? <div className="alert alert-info">No Conversations found</div> : 

                  talks.slice(currentPage, currentPage + 10).map((item) => 
                   <div className="d-flex border-bottom" key={item.id}>
                    <div className="d-flex align-items-center">
                        <Image 
                        src={`${item.user.avatar === null ? "/images/user_medium_square.png" :  item.user.avatar}`}
                        className="img-fluid p-0 rounded"
                        loader={() => item.user.avatar}
                        alt=""
                        height="80"
                        width="80"
                      
                       />
                      </div>
                    <div className="card card-body">
                      <div className="fw-600 mb-2">
                        <Link href={`/topic/${item.id}?category_id=${categoryId}`}><a>{item.topic}</a></Link> <span className="text-muted small fw-100">by {item.user.first_name} {item.user.first_name.charAt(0).toUpperCase()}.</span>
                      </div>
                      <div className="fs-15 lh-1 mb-2">{item.message.length > 80 ? item.message.substr(0, 80) + "..." : item.message}</div>

                      <div className="text-muted fs-12"><Moment format="D/MM/YYYY">{item.created_at}</Moment> by {item.user.first_name} {item.user.first_name.charAt(0).toUpperCase()}.</div>
                    </div>
                  </div>
                  )
                 

                  }




            <nav className="my-3">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${talks.slice(currentPage - 10, currentPage - 20).length === 0 ? 'disabled': null }`}>
                  <a className="page-link" href="#"  aria-disabled="true" onClick={() => setCurrentPage(currentPage - 10)}>Previous</a>
                </li>
                {pages.map((item) =>  <li key={item} className={`page-item  ${currentPage === item*10 ? 'active' : null}`}><a className="page-link" href="#" onClick={() => setCurrentPage(item == 0 ? item : currentPage + 10)}>{item + 1} </a></li> )}
                <li className={`page-item ${talks.slice(currentPage + 10, currentPage + 20).length === 0 ? 'disabled': null }`}>
                  <a className="page-link" href="#" onClick={() => setCurrentPage(currentPage + 10)} >Next</a>
                </li>
              </ul>
            </nav>

              </div>

            



          </div>
          </div>
        </section>

    </div>
    <Footer />
</>)
}

export default Talk;