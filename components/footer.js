import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
	return (<footer className="main-footer pt-5">
  <div className="container pt-2">

    <div className="row fs-14">
      <div   className="col-6">
        <p><strong>About</strong></p>
        <p>
          <Link href="https://brass-muskmelon-b8c.notion.site/Privacy-Policy-3561b06c58854050aba79e313dcbc4eb">
            <a target="_blank">Privacy Policy</a>
          </Link>
        </p>
        <Link href="https://www.notion.so/Terms-of-Service-5114255349fe45cab8cc35530ee1580a">
            <a target="_blank">Terms of Service</a>
          </Link>      
      </div>





      <div   className=" col-6">
        <p><strong>Socials</strong></p>

        <p> <Link href="https://www.facebook.com/houstoncultures"><a target="_blank"><i className="fab fa-facebook"></i></a></Link> &nbsp; <Link  href="https://twitter.com/HoustonCultures"><a target="_blank"><i className="fab fa-twitter"></i></a></Link> &nbsp;  <Link  href="https://www.instagram.com/houstoncultures"><a target="_blank"><i className="fab fa-instagram"></i></a></Link> </p>
        
      </div>

      
      </div>




     <br />
    <div className="fs-12 text-center" >Copyright © {new Date().getFullYear()} HoustonCultures Inc.</div>


  </div>
  
</footer>)
}


export default Footer;