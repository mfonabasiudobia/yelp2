import {useState,useEffect,useRef,useContext} from 'react';
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
import {UserContext} from "/components/UserContext";
toast.configure();


const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const apiKey = "AIzaSyCD248lz6Yo5yiC5x4wM5UH5Yooh-17KN8";


const loadAsyncScript = (src) => {
    return new Promise(resolve => {
        const script = document.createElement("script");
        Object.assign(script, {
            type:"text/javascript",
            async:true,
            src
        })

        script.addEventListener("load",() => resolve(script));
        document.head.appendChild(script);

    })
}

const extractAddress = (place) => {

    const address = {
        city: "",
        state: "",
        zip: "",
        country: "",

    }

    if(!Array.isArray(place.address_components)){
        return address;
    }

    place.address_components.forEach(component => {
        const types = component.types;
        const value = component.long_name;

        if(types.includes('locality')){
            address.city = value;
        }


        if(types.includes('administrative_area_level_1')){
            address.state = value;
        }

        if(types.includes('postal_code')){
            address.zip = value;
        }


        if(types.includes('country')){
            address.country = value;
        }
    })


    return address;



}









const Talk = ({cultures,categories}) => {

      const {setId,userData,isLoggedIn,loading,setLoading,setData,data,setIsLoggedIn} = useContext(UserContext);
      const searchInput = useRef(null);
      const [talks,setTalks] = useState([]);
      const [showSuccess,setShowSuccess] = useState(false);
      const [map,setMap] = useState([]);
      const [name, setName] = useState("");
      const [description, setDescription] = useState("");
      const [streetAddress, setStreetAddress] = useState({});

      const [categoryId, setCategoryId] = useState("");
      const [cultureId, setCultureId] = useState("");


      const [long, setLong] = useState("");
      const [lat, setLat] = useState("");


      const [streetAddres2, setStreetAddress2] = useState({});
      const [city, setCity] = useState("");
      const [state, setState] = useState("");
      const [zipCode, setZipcode] = useState("");
      const [phoneNumber, setPhoneNumber] = useState("");
      const [website, setWebsite] = useState("");
      const [language, setLanguage] = useState("");
      const [email, setEmail] = useState("");
      const [facebook, setFacebook] = useState("");
      const [twitter, setTwitter] = useState("");
      const [instagram, setInstagram] = useState("");
      const [logo, setLogo] = useState("");


    const initMapScript = () => {
        if(window.google){
            return Promise.resolve();
        }

        const src = `${mapApiJs}?key=${apiKey}&libraries=places`;
        return loadAsyncScript(src);
    }


    const onChangeAddress = (autocomplete) => {
        const place = autocomplete.getPlace();

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                setLong(position.coords.longitude)
                setLat(position.coords.latitude)
                setCity(extractAddress(place).city)
                setState(extractAddress(place).state)
                setZipcode(extractAddress(place).zip)
            })
        }


    }


    const initAutocomplete = () => {
        if(!searchInput.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);

        autocomplete.setFields(['address_component','geometry']);

        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete))

    }

    useEffect(() => {
        initMapScript().then(() => initAutocomplete())
    },[])



  
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


  const submitBusiness = async (e) => {

 e.preventDefault();

const base64Logo = logo && await convertBase64(logo);


setLoading(true);
  axios({
  method: "post",
  url: "v1/users/business",
  data: {
    name:name,
    description:description,
    culture_id:cultureId,
    category_id:categoryId,
    street_address:streetAddress,
    city:city,
    state:state,
    zipcode:zipCode,
    lat:lat.toString(),
    long:long.toString(),
    area_code:"1",
    phone_number:phoneNumber,
    website:website,
    languages_spoken:language,
    facebook_link:facebook,
    instagram_link:instagram,
    twitter_link:twitter,
    email:email,
    street_address_two:streetAddres2,
    logo: logo && base64Logo.split(",")[1],
  },
  headers: {
        'Authorization':`Bearer ${userData.token}`
  }
    
  }).then((res) => {

     if(res.data.status == true){

       setShowSuccess(true)
      
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

    <Head>
      <title>Submit Business | Houston Cultures</title>
    </Head>
 
    <div className="page-wrapper">
   
   <Header2 />


    <section className="py-5">
          <div className="container">
         
            
 <div className="row d-flex justify-content-center">
    
      

       <div className="col-md-8">


      <div className={`${showSuccess ? 'd-flex' : 'd-none'} pt-4 flex-column justify-content-center align-items-center`}>
      <i className='fas fa-check-circle fa-3x pc'></i>

      <h1 className="pc text-center my-3 fs-21 fw-700">
              Business Created
      </h1>

      <p className="lead text-center fs-15">
          Congratulations, your business has been added to our registry
      </p>

   <div className="submit"> 
     <Link href="/"><a className={`btn fs-15 btn-primary-color-bg text-white  fw-600 mx-2`} role='button'>CONTINUE</a></Link>
      {/*<button className={`btn bg-light fs-15  fw-600`} onClick={() => setShowSuccess(false)} >CANCEL</button> */}
  </div>

      </div>


  <div className={`${showSuccess ? 'd-none' : 'd-block'}`}>
       <h1 className="pc text-center  fs-21 fw-700">
              Submit a new Business
      </h1>

      <p className="lead text-center fs-15">
          Did we miss your favorite hidden or cultural gem? Send Us the business details so that we can add them on our registry!
      </p>



 <form onSubmit={(e) => submitBusiness(e)}>

    <div className="row g-3">
        <div className="col-sm-6">
          <input type="text" placeholder="Name*" className="form-control form-control-lg  fs-15"  onChange={(e) => setName(e.target.value)} required
          />
      </div>


      <div className="col-sm-6">
          <input type="text" placeholder="Street Address*" className="form-control form-control-lg  fs-15"  ref={searchInput} onChange={(e) => setStreetAddress(e.target.value)} required/>
      </div>

      <div className="col-sm-6">
          <input type="text" placeholder="Street Address 2" className="form-control form-control-lg  fs-15"  onChange={(e) => setStreetAddress2(e.target.value)}  />
      </div>


       <div className="col-sm-6">
          <input type="text" placeholder="City*" value={city} className="form-control form-control-lg  fs-15"   onChange={(e) => setCity(e.target.value)} required />
      </div>


       <div className="col-sm-6">
          <input type="text" placeholder="State*" value={state} className="form-control form-control-lg  fs-15"   onChange={(e) => setState(e.target.value)} required/>
      </div>

      <div className="col-sm-6">
          <input type="text" placeholder="Zip Code*" value={zipCode} className="form-control form-control-lg  fs-15"  onChange={(e) => setZipcode(e.target.value)} required/>
      </div>



      <div className="col-sm-6">
          <input type="text" placeholder="Phone Number" className="form-control form-control-lg  fs-15"  onChange={(e) => setPhoneNumber(e.target.value)} required />
      </div>


      <div className="col-sm-6">
          <input type="text" placeholder="Website" className="form-control form-control-lg  fs-15"   onChange={(e) => setWebsite(e.target.value)}/>
      </div>


      <div className="col-sm-6">
          <input type="text" placeholder="Language" className="form-control form-control-lg  fs-15"   onChange={(e) => setLanguage(e.target.value)}/>
      </div>


       <div className="col-sm-6">
                        <select className="form-select form-select-lg fs-15"  onChange={(e) => setCultureId(e.target.value)} required>
                          <option >Select Culture</option>
                          {cultures.data.map((item) => <option value={item.id} key={item.id}>{item.name}</option> )}
                        </select>
    </div>


    <div className="col-sm-6">
                        <select className="form-select form-select-lg fs-15"  onChange={(e) => setCategoryId(e.target.value)} required>
                          <option >Select Category</option>
                          {categories.data.map((item) => <option value={item.id} key={item.id}>{item.name}</option> )}
                        </select>
    </div>






      <div className="col-sm-6">
          <input type="text" placeholder="Twitter Link" className="form-control form-control-lg  fs-15"  onChange={(e) => setTwitter(e.target.value)} />
      </div>


      <div className="col-12">
          <input type="text" placeholder="Email" className="form-control form-control-lg  fs-15"  onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="col-12">
          <label className="small fw-600">Business Logo</label>
          <input type="file" placeholder="Business Logo" className="form-control form-control-lg  fs-15"  onChange={(e) => setLogo(e.target.files[0])} />
      </div>


    <div className="col-md-12">
          <textarea required placeholder="Description" className="form-control form-control-lg fs-13" rows="8" onChange={(e) => setDescription(e.target.value)}></textarea>
    </div>


  </div>

  <div className="submit mt-3">
     <button className={`btn btn-primary-color-bg text-white fs-15  fw-600 ${loading ? 'disabled' : null}`} type="submit">SUBMIT</button>  <Link href="/"><a className={`btn fs-15 fw-600 mx-2`}>CANCEL</a></Link>
  </div>

        </form>
         </div>
        </div>
    </div>



          </div>
        </section>

    </div>
    <Footer />
</>)
}



export const getStaticProps = async () => {

  const cultures = await axios.get(`v1/users/business/cultures`);

  const categories = await axios.get(`v1/users/business/categories`);


  return {
    props: {
      cultures : cultures.data,
      categories : categories.data
    },
  };
};




export default Talk;

