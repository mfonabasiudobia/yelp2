import {useState,useEffect,useContext} from 'react';
import Footer from "/components/footer";
import axios  from "/helpers/axios";
import Header from "/components/header";
import Sidebar from "/components/admin/SideBar";
import Header2 from "/components/dashboard/Header";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import Moment from 'react-moment';
toast.configure();
import {UserContext} from "/components/UserContext";
import {isAdminNotLoggedIn} from "/protected/requireAuthentication";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Dashboard = ({businesses}) => {

   const {setId,adminData,isAdminLoggedIn,loading,setLoading,setData,data,setIsAdminLoggedIn} = useContext(UserContext);
   const [currentPage,setCurrentPage] = useState(0);
   const [pages,setPages] = useState([]);
   const [business, setBusiness] = useState("");
   const [show, setShow] = useState(false);
   const [action, setAction] = useState({id:0,action:''});
   const router = useRouter();

useEffect(() => {
  
   
    setBusiness(businesses)
      
     var page = [];
     for (var i = 0; i <=  Math.ceil(businesses.length/10) - 1 ; i++) {
              page.push(i)
     }
      
      setPages(page);
   

},[]);


  const approveBusiness =  (action, id) => {
    

    setLoading(true)
   axios({
        method: "POST",
        url: "v1/admin/business/",
        headers: {
        'Authorization':`Bearer ${adminData.token}`
        },
        data: {action: action,business_id: id}
        }).then((res) => {
          

            toast.success("Business has been Approved",{theme: "colored"});

            setLoading(false);

            setShow(false);

            e.target.reset;


        })
        .catch((err) => {

          if(err.response){

            if(err.response.data.status === false)
                     toast.error(err.response.data.message,{theme: "colored"});

              setLoading(false)
              
            

         }

        });
  
  }

 


   return (<>
    <div className="page-wrapper">
   
   <Header />

  {/* <div className="position-absolute w-100 d-flex justify-content-center align-items-center" style={{height:'90vh',zIndex:'100',backgroundColor:"rgba(0,0,0,0.4)"}}>
      
      <div className="rounded-5 bg-white p-3">
            <div className="mb-2"><strong>Are you sure you want to Accept this Business?</strong></div>
            <div className="d-flex justify-content-end"><button className="btn btn-sm btn-success">Yes</button> &nbsp; <button className="btn btn-sm btn-danger">No</button> </div>
       </div>


   </div>*/}


    <section className="py-5">
          <div className="container">
            <div className="d-md-flex">
             <div className="pc  fs-21 fw-700 me-3 mb-2"> Approve Business </div>

              <form method="GET" action="/admin/dashboard">   
               <div className="input-group input-group-md d-flex position-relative">             
                 <select className="form-select rounded-0  text-secondary fs-15" name="type" defaultValue={router.query.type}
                 >
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="DECLINED">Declined</option>
                 </select>
                <button type="submit" className="input-group-text btn-primary-color-bg text-white rounded-0 border-0 fw-300">
                  &nbsp; <i className="fas fa-search"></i>
                </button>
                </div>
              </form>
            </div>

            <hr />

            <div className="row gx-5 gy-4">
              <Sidebar page='business' />

              <div className="col-md-9">


                <div className="table-responsive">
                  <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>ID</th> <th>Name</th> <th>Phone Number</th>  <th>Address</th> <th>Status</th>  <th>Action</th> 
                        </tr>
                      </thead>

                      <tbody>
                        {business.length == 0 ? null : business.slice(currentPage, currentPage + 10).map((item) => <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td> 
                          <td>{item.phone_number}</td>  
                          <td>{item.street_address}</td> 

                          <td>{router.query.type == "PENDING" || router.query.type == undefined ? <span className='fw-600 fw-13 badge badge-pill badge-warning'>PENDING</span> : router.query.type == "APPROVED" ? <span className='fw-600 fw-13 badge badge-pill badge-success'>{router.query.type}</span> : <span className='fw-600 fw-13 badge badge-pill badge-danger'>{router.query.type}</span> }</td> 

                         <td>  

                         {router.query.type == "PENDING" || router.query.type == undefined ? <> 
                         <button className="btn btn-sm btn-success mb-2" onClick={() => { setShow(!show); setAction({id: item.id,action:'APPROVE'})} }>Approve</button> &nbsp;

                         <button className="btn btn-sm btn-danger mb-2" onClick={() => { setShow(!show); setAction({id: item.id,action:'DENY'})} }>Reject</button>  </> : null} &nbsp;


                          <button className="btn btn-sm btn-info mb-2" onClick={() => { setShow(!show); setAction({id: item.id,action:'SHOW',data:item})} }>View</button>

                           {/*

                            <select onChange={(e) => approveBusiness(e,item.id)} className="form-select form-select-sm">
                                <option>Choose Action</option>
                                <option value="APPROVE">Approve</option>
                                <option value="DENY">Deny</option>
                            </select>

                          */}
                          </td> 
                        </tr> )}
                      </tbody>
                  </table>
              </div>



          {business.length == 0 ? null : 
            <nav className="my-3">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${business.slice(currentPage - 10, currentPage - 20).length === 0 ? 'disabled': null }`}>
                  <a className="page-link" href="#"  aria-disabled="true" onClick={() => setCurrentPage(currentPage - 10)}>Previous</a>
                </li>
                {pages.map((item) =>  <li key={item} className={`page-item  ${currentPage === item*10 ? 'active' : null}`}><a className="page-link" href="#" onClick={() => setCurrentPage(item == 0 ? item : currentPage + 10)}>{item + 1} </a></li> )}
                <li className={`page-item ${business.slice(currentPage + 10, currentPage + 20).length === 0 ? 'disabled': null }`}>
                  <a className="page-link" href="#" onClick={() => setCurrentPage(currentPage + 10)} >Next</a>
                </li>
              </ul>
            </nav>
          }

                

              </div>




          </div>
          </div>
        </section>

    </div>


    <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{`${action.action == "SHOW" ? action.data.name : 'Are you sure?'} ${loading ? "Loading..." : ''} `} </Modal.Title>
        </Modal.Header>
        <Modal.Body>{action.action != "SHOW" ?  `You are about to ${action.action} this business to the houston cultures registry` : 
        <>
          <p><strong>Name:</strong> {action.data.name} </p>
          <p><strong>Culture:</strong> {action.data.culture} </p>
          <p><strong>Category:</strong> {action.data.category} </p>
          <p><strong>Email:</strong> {action.data.email} </p>
          <p><strong>Website:</strong> {action.data.website} </p>
          <p><strong>Phone Number:</strong> {action.data.phone_number} </p>
          <p><strong>Street Adress 1:</strong> {action.data.street_address} </p>
          <p><strong>Street Adress 2:</strong> {action.data.street_address_two} </p>
          <p><strong>City:</strong> {action.data.city} </p>
          <p><strong>State:</strong> {action.data.state} </p>
          <p><strong>ZipCode:</strong> {action.data.zipcode} </p>
          <p><strong>Language:</strong> {action.data.languages_spoken} </p>
          <p><strong>Created On:</strong> <Moment fromNow>{action.data.created_at}</Moment> </p>
        </> }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
         {action.action == "SHOW" ? null : <Button variant="success" onClick={() => approveBusiness(action.action,action.id)} className={`${loading ? 'disabled' : null}`}> 
            Proceed
          </Button>}
        </Modal.Footer>
      </Modal>

    <Footer />
</>)
}


export const getServerSideProps = isAdminNotLoggedIn(async context => {


   const business = await axios.get(`v1/admin/business?type=${context.query.type == undefined ? "PENDING" : context.query.type}`,{
    headers: {
        'Authorization':`Bearer ${JSON.parse(context.req.cookies.adminData).data.token}`
        }
   });

  return {
    props: {
       businesses : business.data.data
    }
  };


},'/admin')

export default Dashboard;