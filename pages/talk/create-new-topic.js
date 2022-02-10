import {useState,useEffect} from 'react';
import Footer from "../../components/footer";
import axios  from "../../helpers/axios";
import Header from "../../components/header";
import Header2 from "../../components/dashboard/Header";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link'
toast.configure();

const Talk = () => {

  const [userData,setUserData] = useState([]);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [loading,setLoading] = useState(false);
  const [talks,setTalks] = useState([]); 
  const [category,setCategory] = useState("");
  const [topic,setTopic] = useState("");
  const [message,setMessage] = useState("");
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

    if(isLoggedIn){
      

      axios({
    url: "v1/users/conversation/categories",
    method:"GET",
    headers: {
        'Authorization':`Bearer ${userData.token}`
    }}).then((res) => {

      setTalks(res.data.data)

    })


   }

   },[isLoggedIn]);



  const submitTopic = (e) => {
    e.preventDefault();

      setLoading(true);
  axios({
  method: "post",
  url: "v1/users/conversation/",
  data: {topic,message,category_id:category},
  headers: {
        'Authorization':`Bearer ${userData.token}`
  }
    
  }).then((res) => {

     if(res.data.status == true){

       toast.success("Conversation has been created Successfully",{theme: "colored"});

       router.push("/talk");

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

   return (<>
    <div className="page-wrapper">
   
   <Header2 />




    <section className="py-5">
          <div className="container">
         
             <h1 className="pc  fs-21 fw-700">
              Create a new topic
            </h1>



 <div className="row">
   
       <div className="col-md-6">

 <form onSubmit={(e) => submitTopic(e)}>

    <div className="row gy-3 gx-1">
   
       <div className="col-12">
          <input type="text" placeholder="Topic Name" className="form-control form-control-sm fs-14" onChange={(e) => setTopic(e.target.value)} />
      </div>

      <div className="col-12">

{talks.map((item) => 
<div className="form-check form-check-inline" key={item.id}>
  <input className="form-check-input" type="radio" name="conversation_category" id={`category_id${item.id}`} value={item.id} onChange={(e) => setCategory(e.target.value)}/>
  <label className="form-check-label" htmlFor={`category_id${item.id}`}>{item.name}</label>
</div>
)}
      </div>

 <div className="col-md-12">
      <textarea placeholder="Message" className="form-control fs-13" rows="8" onChange={(e) => setMessage(e.target.value)}></textarea>
</div>


  </div>

  <div className="submit mt-3">
     <button className={`btn btn-primary-color-bg text-white fs-14  fw-600 ${loading ? 'disabled' : null}`} type="submit">POST</button>  <Link href="/talk"><a className={`btn fs-14 fw-600 mx-2`}>CANCEL</a></Link>
  </div>

        </form>
 </div>
  </div>



          </div>
        </section>

    </div>
    <Footer />
</>)
}

export default Talk;