import {useState,useEffect,useContext} from 'react';
import Footer from "/components/footer";
import axios  from "/helpers/axios";
import Header from "/components/header";
import Header2 from "/components/dashboard/Header";
import Sidebar from "/components/talk/SideBar";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
import Image from 'next/image';
import Moment from 'react-moment';
import Link from 'next/link';
import {UserContext} from "/components/UserContext";
toast.configure();

const TopicId = () => {

  const router = useRouter();
  const topicId = router.query.topicId;
  const [pages,setPages] = useState([]);
  const [currentPage,setCurrentPage] = useState(0);
  const categoryId = router.query.category_id;
  const [message,setMessage] = useState("");
  const [talks,setTalks] = useState([]);

   const {setId,userData,isLoggedIn,loading,setLoading} = useContext(UserContext);



useEffect(() => {

 

    axios({
    url: `${categoryId === "all" ? 'v1/users/conversation?type=all' : 'v1/users/conversation?type=category&category_id=' + categoryId }`,
    method:"GET",
    headers: {
        'Authorization':`Bearer ${userData.token}`
    }}).then((res) => {

     setTalks(res.data.data.filter((item) => item.id == topicId))
      
     var page = [];
     for (var i = 0; i <=  Math.ceil(res.data.data.filter((item) => item.id == topicId)[0].response.length/10) - 1 ; i++) {
              page.push(i)
     }
        setPages(page);

    })

   

},[categoryId,loading]);


  const submitMessage = (e) => {
    e.preventDefault();

    if(!isLoggedIn) router.push("/login");

    var newMessage = message;
  if(newMessage.trim().length === 0){
     toast.error("You cannot submit an empty message",{theme: "colored"});
    
    }else{

   setLoading(true);
  axios({
  method: "post",
  url: "v1/users/conversation/submit",
  data: {conversation_id:topicId,message:message},
  headers: {
        'Authorization':`Bearer ${userData.token}`
  }
    
  }).then((res) => {

     if(res.data.status == true){

       toast.success("Message has been posted Successfully",{theme: "colored"});
       e.target.reset()

     }

     setLoading(false);

}).catch((err) => {

    if(err.response){

      if(err.response.data.status == false){
            toast.error(err.response.data.message,{theme: "colored"});               
      }
   }

   setLoading(false);

  });

}


}


   return (<>
    <div className="page-wrapper">
   
   <Header2 />




    <section className="py-5">
          <div className="container">
            <h1 className="pc  fs-21 fw-700">
              Houston Cultures
            </h1>

            <hr />

            <div className="row gx-5 gy-4">
             <Sidebar categoryId={categoryId} />

              <div className="col-md-9">
              {talks.length !== 0 ? <>
               <h1 className="pc fs-18 fw-700 my-2">{talks[0].topic}</h1>

              
                  <div className="d-flex border-bottom">
                    <div className="d-flex align-items-center">
                        <Image 
                        src={`${talks[0].user.avatar === null ? "/images/user_medium_square.png" :  talks[0].user.avatar}`}
                        className="img-fluid p-0 rounded"
                        loader={() => talks[0].user.avatar === null ? "/images/user_medium_square.png?w=80" :  talks[0].user.avatar + "?w=80"}
                        alt=""
                        height="80"
                        width="80"
                      
                       />
                      </div>
                    <div className="card card-body">
                      <div className="fw-600 mb-2">
                        <Link href={`/topic/${talks[0].id}?category_id=${categoryId}`}><a>{talks[0].topic}</a></Link> <span className="text-muted small fw-100">by {talks[0].user.first_name} {talks[0].user.first_name.charAt(0).toUpperCase()}.</span>
                      </div>
                      <div className="fs-15 lh-1 mb-2">{talks[0].message}</div>

                      <div className="text-muted fs-12"><Moment format="D/MM/YYYY">{talks[0].created_at}</Moment> by {talks[0].user.first_name} {talks[0].user.last_name.charAt(0).toUpperCase()}.</div>
                    </div>
                  </div> </> : null }


           
               <form className="row gy-2 my-3" onSubmit={(e) => submitMessage(e)}>
                  <div className="col-md-12">
                      <textarea placeholder="Comment" className="form-control fs-13" onChange={(e) => setMessage(e.target.value)}></textarea>
                  </div>
                  <div className="col-md-12 d-flex justify-content-end">
                      <button className={`btn btn-primary-color-bg text-white fs-14 ${loading ? 'disabled' : null }`} type="submit">Comment</button>
                  </div>
               </form>
               

              {talks.length !== 0 ?

               talks[0].response.length === 0 ? <div className="alert alert-info">No Responses found</div> : 

                  talks[0].response.slice(currentPage, currentPage + 10).map((item) => 

                  <div className="row border-bottom py-3" key={item.id}>
                    <div className="col-3 d-flex align-items-start">
                        <Image 
                         src={`${item.user.avatar === null ? "/images/user_medium_square.png" :  item.user.avatar}`}
                         loader={() => item.user.avatar === null ? "/images/user_medium_square.png?w=80" :  item.user.avatar + "?w=80"}
                        className="img-fluid p-0 rounded"
                        alt=""
                        height="80"
                        width="80"
                      
                       />
                      <div className="fs-14 ms-2">
                        <a href="" className="fw-600">{item.user.first_name} {item.user.first_name.charAt(0).toUpperCase()}.</a>
                        
                      </div>
                      </div>
                    <div className="col-9">
                      <div className="fs-15 lh-1 mb-2">{item.message}</div>
                      <div className="text-muted fs-12"><Moment format="D/MM/YYYY">{talks.created_at}</Moment></div>
                    </div>
                  </div>) : null }

                
 
          {talks.length !== 0 ?
              <nav className="my-3">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${talks[0].response.slice(currentPage - 10, currentPage - 20).length === 0 ? 'disabled': null }`}>
                  <a className="page-link" href="#"  aria-disabled="true" onClick={() => setCurrentPage(currentPage - 10)}>Previous</a>
                </li>
                {pages.map((item) =>  <li key={item} className={`page-item  ${currentPage === item*10 ? 'active' : null}`}><a className="page-link" href="#" onClick={() => setCurrentPage(item == 0 ? item : currentPage + 10)}>{item + 1} </a></li> )}
                <li className={`page-item ${talks[0].response.slice(currentPage + 10, currentPage + 20).length === 0 ? 'disabled': null }`}>
                  <a className="page-link" href="#" onClick={() => setCurrentPage(currentPage + 10)} >Next</a>
                </li>
              </ul>
            </nav>

           : null }


              </div>

            
          </div>
          </div>
        </section>

    </div>
    <Footer />
</>)
}

export default TopicId;