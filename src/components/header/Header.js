import React, { useEffect, useRef } from 'react'
import "./Header.css"

function Headers(props) {
  const resultref = useRef();
  const expref = useRef();

  useEffect( () => {
    resultref.current.scrollIntoView({behavior: "smooth"});
  } , [props.history]);

  useEffect(() => {
    expref.current.scrollLeft = expref.current.scrollWidth;
  },[props.exp]);

  return (
    <div className='header custom-scroll'>
      <div className='header_history'>
        { props.history &&
          props.history?.map((item ,  index) => (
               <p key={item + ""+ Math.random() *44}>{item}</p>
          ))

          }
        
      </div>
      <br/>
      <div ref= {expref}className='header_expression custom-scroll'>
        <p>{props.exp}</p>
      </div>
      <p ref={resultref}className='header_result'>{props.result}</p>
    </div>
  )
}

export default Headers
