import React from 'react'
import "./meme.css";
function Meme({meme}) {
  return (
    <div className="meme-div">
    <div className='meme-container'>
      <img src={meme.image} alt="main-img" className="meme-img"/>
      <h4>{meme.bottomText}</h4>
      </div>
      </div>

  )
}

export default Meme