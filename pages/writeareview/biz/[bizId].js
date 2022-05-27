import {useState,useEffect,useContext} from 'react';
import Footer from "/components/footer";
import axios  from "/helpers/axios";
import Header from "/components/header";
import Header2 from "/components/dashboard/Header";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import Rating from "/components/rating";
import Moment from 'react-moment';
import {UserContext} from "/components/UserContext";
toast.configure();

const WireReview = () => {


  const router = useRouter();
  const [reviews,setReviews] = useState([]);
  const [image,setImage] = useState("");
  const bizId = router.query.bizId;
  const [message,setMessage] = useState("");
  const [talks,setTalks] = useState([]);

  const {setId,userData,isLoggedIn,loading,setLoading,setData,data,rating} = useContext(UserContext);




// useEffect(()=> {

//      if(bizId !== undefined){

//     axios({
//     url: `v1/users/review?business_id=${bizId}&size=10`,
//     method:"GET",
//     headers: {
//         'Authorization':`Bearer ${userData.token}`
//     }}).then((res) => {

//       setTalks(res.data.data)

//     })

// }


// },[bizId])


useEffect(()=> {

    if(bizId !== undefined){
    axios({
    url: `v1/users/business/business/${bizId}`,
    method:"GET",
    headers: {
        'Authorization':`Bearer ${userData.token}`
    }}).then((res) => {

      setData(res.data.data)

    })

}


},[bizId,loading])


const convertBase64 = (file) => {
    
    return new Promise((resolve, reject) => {

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      }


      fileReader.onerror = (error) => {
        reject()
      }


      })

  }

const submitReview = async (e) => {
    e.preventDefault();

    if(rating == 0) return toast.error("Please choose a rating",{theme: "colored"});

    const base64Logo = image && await convertBase64(image);

  setLoading(true);
  axios({
  method: "POST",
  url: "v1/users/review/",
  data: {business_id:bizId,comment:message,rating:rating,image: image && base64Logo.split(",")[1]},
  headers: {
        'Authorization':`Bearer ${userData.token}`
  }
    
  }).then((res) => {

     if(res.data.status == true){

       toast.success("Review has been created Successfully",{theme: "colored"});

       e.target.reset();

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
           
            <div className="row gy-3 d-flex justify-content-center">
              <div className="col-md-12 boder-bottom">
                   <h1 className="pc  fs-21 fw-700">
                    {data.length == 0 ? null : data.name} 
                  </h1>
              </div>

              <div className="col-md-8">
               

<form onSubmit={(e) => submitReview(e)}>

    <div className="row gy-3 gx-1">

<div className="col-md-12 d-flex align-items-center">
    <Rating size={12} padding="px-1" rate={null} id={data.length == 0 ? null : data.id} /> <strong>{rating} Star(s)</strong>
</div>

 <div className="col-md-12">
      <textarea placeholder="Post your Review here" className="form-control fs-13" rows="15" onChange={(e) => setMessage(e.target.value)}></textarea>
</div>


 <div className="col-12">
          <label className="small fw-600">Attach Photo</label>
          <input type="file" placeholder="Attach Photo" className="form-control  fs-14"  onChange={(e) => setImage(e.target.files[0])} />
</div>


  </div>

  <div className="submit mt-3">
     <button className={`btn btn-lg btn-primary-color-bg text-white fs-14  fw-600 ${loading ? 'disabled' : null}`} type="submit">POST Review</button>  <Link href="/writeareview"><a className={`btn btn-lg fs-14 fw-600 mx-2`}>CANCEL</a></Link>
  </div>

        </form>



             </div>


           <div className="col-md-4">
               
            <h1 className="pc  fs-21 fw-700">
                Recent Reviews
            </h1>


              {data.length === 0 ? '' : data.review.length === 0 ? <div className="alert alert-info">No Reviews found</div> : 

                  data.review.map((item) => 
                   <div className="d-flex border-bottom" key={item.id}>
                    {<div className="d-flex align-items-center">

                    
                        <Image 
                        src={`${item.image_url === null ? "/images/user_medium_square.png" :  item.image_url}`}
                        loader={() => item.image_url === null ? "/images/user_medium_square.png" :  item.image_url}
                        className="img-fluid p-0 rounded"
                        alt=""
                        height="80"
                        width="80"
                      
                       />
                      </div>}
                    <div className="card card-body">
                      <div>
                        <span>{item.reviewer.first_name} </span>
                      </div>

                      <Rating size={12} padding="px-1" rate={item.rating} id={item.id} /> 
                      <div className="fs-15 lh-1 mb-2">{item.comment}</div>

                      <div className="text-muted fs-12"><Moment format="D/MM/YYYY">{item.created_at}</Moment> {/*by {item.user.first_name} {item.user.first_name.charAt(0).toUpperCase()}.*/}</div>
                    </div>
                  </div>
                  )
                 

               }



             </div>
          </div>
        </div>
    </section>

    </div>
    <Footer />
</>)
}



export default WireReview;