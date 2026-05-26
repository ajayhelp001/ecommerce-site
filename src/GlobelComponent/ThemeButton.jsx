import React from 'react'
import { Link } from 'react-router'

const ThemeButton = ({btnLink, btnType, btnTitle = "Shop Now", btnFill, btnClass, clickEvent}) => {
  return (
    <>
    {
      btnType ? 
      <button type={btnType} onClick={clickEvent} className={`${btnClass ? btnClass : ''} ${btnFill ? 'fill' : ''} btn themebtn`}>{btnTitle}<span><img src="/assets/images/icon/right_arrow.svg" alt="arrow" /></span></button>
      :
      <Link onClick={clickEvent} to={btnLink} className={`${btnClass ? btnClass : ''} ${btnFill ? 'fill' : ''} btn themebtn`} >{btnTitle} <span><img src="/assets/images/icon/right_arrow.svg" alt="arrow" /></span></Link>
    }
    </>
  )
}

export default ThemeButton