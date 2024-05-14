import React from 'react';
// import './MovieForm.css';


const MovieFormResult = ({ movieFormResult }) => {
    return (
        <div className='movieFormResultContainer'>
              <div>
                {movieFormResult.isSuccess? 
                <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66" fill="none">
                  <circle cx="33" cy="33" r="32.5" fill="#F65261" stroke="#F65261"/>
                  <path d="M14 35.8347L24.1175 46L49 21" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                </svg>:
                <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66" fill="none">
                  <circle cx="33" cy="33" r="32.5" fill="#F65261" stroke="#F65261" />
                  <path d="M20 20 L46 46 M20 46 L46 20" stroke="white" strokeWidth="5" strokeLinecap="round" />
                </svg>
                }
              </div>
              <h2>{movieFormResult.isSuccess?"Congratulations !": "Sorry !"}</h2>
              <div>
                {movieFormResult.msg}
              </div>
        </div>
    );
}


export default MovieFormResult;
