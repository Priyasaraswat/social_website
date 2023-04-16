import React from 'react'
import "./birthday.css"

function Birthday({birthdayUser,value}) {
 
  return (
    <>
    <div className='birthday-name'>
        {value&&<div>{birthdayUser.username} ka birthday hai wish kar de jaldi🎂</div>}
    </div>
    </>
  )
}

export default Birthday