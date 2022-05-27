import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Head from "next/head";
import {UserContext} from "/components/UserContext";
import {useState,useEffect} from "react";
import Cookie from "js-cookie";

function MyApp({ Component, pageProps }) {

  const [id,setId] = useState(null);
  const [userData,setUserData] = useState([]);
  const [adminData,setAdminData] = useState([]);
  const [data,setData] = useState([]);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn,setIsAdminLoggedIn] = useState(false);
  const [loading,setLoading] = useState(false);
  const [rating,setRating] = useState(0);

  useEffect(() => { 
    const user = Cookie.get("userData");



    if (user != null) {
      if (JSON.parse(user).status === true && JSON.parse(user).data.active == 1) {
        setUserData(JSON.parse(user).data);
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    }





    const admin = Cookie.get("adminData");
    if (admin != null) {
      if (JSON.parse(admin).status === true) {
        setAdminData(JSON.parse(admin).data);
        setIsAdminLoggedIn(true);
      }else{
        setIsAdminLoggedIn(false);
      }
    }else{
        setIsAdminLoggedIn(false);
    }

  },[]);




  return (<>
    <Head>
      <meta charSet="utf-8" />
      <title>Home page | Houston Cultures</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" />
      <link rel="shortcut icon" href="/images/favicon.png?id"  type="image/x-icon"/>
    </Head>

    <UserContext.Provider value={{id,setId,userData,adminData,isLoggedIn,isAdminLoggedIn,setUserData,setAdminData,setIsAdminLoggedIn,loading,setLoading,data,setData,rating,setRating,setIsLoggedIn}}>
    <Component {...pageProps} />
    </UserContext.Provider>
    </>)
}

export default MyApp
