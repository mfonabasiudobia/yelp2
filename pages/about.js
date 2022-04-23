import React from 'react';
import Footer from "/components/footer";
import Header2 from "/components/dashboard/Header";
import Link from 'next/link';


const About = () => {

   return (<>
    <div className="page-wrapper">
   
      <Header2 />


        <section className="py-5">
          <div className="container">
            <h4 className="pc">The App that helps you find Houston Cultural Gems!</h4>

            <p className="fw-light">Whether you just recently moved into the city, dropping by for a quick trip, or you're a native looking for new sites to see, Houston is definitely a Texan jewel.  As the fourth—soon to be third-- largest and the most diverse city in America, you will find that the options to explore and uncover new places are practically endless. People live here their entire lives without really experiencing all the wonders of the city they call home. And that's why we had to make it easier to go beyond talking about being diverse and shine a light on what this city truly has to offer. Houston Cultures was created to help you discover Houston more efficiently and more memorably. Our app will allow you to uncover the most popular destinations, as well as some hidden gems for you to experience. Start your journey and experience all that H-Town has to offer, with Houston Cultures!</p>

            <h5 className="pc">Features:</h5>

            <ul className="fw-light">
              <li>Browse by culture</li>
              <li>Narrow down by business type</li>
              <li>See distance from current location</li>
              <li>Submit a new business</li>
            </ul>

            <div className="d-flex">
                <Link href="/biz/submit">
                  <a className='text-secondary fw-bold'>Submit a business</a>
                </Link>&nbsp; &nbsp;
                <Link href="https://www.notion.so/Terms-of-Service-5114255349fe45cab8cc35530ee1580a">
                  <a className='text-secondary fw-bold'>Terms of Service</a>
                </Link>
            </div>
           
          </div>
        </section>

    </div>
    <Footer />
</>)
}


export default About;