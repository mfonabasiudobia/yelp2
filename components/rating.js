import {useState,useEffect,useContext} from 'react';
import {UserContext} from "/components/UserContext";


const Rating = ({size,padding,rate,id}) => {

	const {setRating} = useContext(UserContext);


	return (  <div className="rate my-1">
		{rate === 5 ? <input type="radio" id={`star${id}5`} name={`rate${id}`} checked={true} onChange={(e) => setRating(e.target.value)} value="5" /> : <input type="radio" id={`star${id}5`} name={`rate${id}`} onChange={(e) => setRating(e.target.value)} value="5" /> }
						 <label
                     	  className={`${size} ${padding}`}
                          htmlFor={`star${id}5`}
                          title="text"
                        ></label>
                        {rate === 4 ? <input type="radio" id={`star${id}4`} name={`rate${id}`}  checked={true} onChange={(e) => setRating(e.target.value)} value="4" /> : <input type="radio" id={`star${id}4`} name={`rate${id}`} onChange={(e) => setRating(e.target.value)} value="4" /> }

                        <label
                          className={`${size} ${padding}`}
                          htmlFor={`star${id}4`}
                          title="text"
                        ></label>
                         {rate === 3 ? <input type="radio" id={`star${id}3`} name={`rate${id}`}  checked={true} onChange={(e) => setRating(e.target.value)} value="3" /> : <input type="radio" id={`star${id}3`} name={`rate${id}`} onChange={(e) => setRating(e.target.value)} value="3" /> }
                        <label
                          className={`${size} ${padding}`}
                          htmlFor={`star${id}3`}
                          title="text"
                        ></label>
                        {rate === 2 ? <input type="radio" id={`star${id}2`} name={`rate${id}`}  checked={true} onChange={(e) => setRating(e.target.value)} value="2" /> : <input type="radio" id={`star${id}2`} name={`rate${id}`} onChange={(e) => setRating(e.target.value)} value="2" /> }
                        <label
                          className={`${size} ${padding}`}
                          htmlFor={`star${id}2`}
                          title="text"
                        ></label>
                       {rate === 1 ? <input type="radio" id={`star${id}1`} name={`rate${id}`}  checked={true} onChange={(e) => setRating(e.target.value)} value="1" /> : <input type="radio" id={`star${id}1`} name={`rate${id}`} onChange={(e) => setRating(e.target.value)} value="1" /> }
                        <label
                          className={`${size} ${padding}`}
                          htmlFor={`star${id}1`}
                          title="text"

                        ></label>
                      </div>)
}


export default Rating;