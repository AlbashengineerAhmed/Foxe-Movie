import React from 'react'
import { Link } from 'react-router-dom'
import style from './Navbar.module.css';
export default function Navbar({ loginData , logOut, name }) {
  return (
      <nav className={`${style.indexNav} navbar navbar-expand-lg navbar-dark text-center w-100 ${style.colorVB}`}>
        <div className="container-fluid">
          <div className={`${style.logoWidth}`}>
            <Link className={`${style.logoSite} fs-2 ms-5`} to="home">Foxe</Link>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse  fw-bolder fs-5 navbar-collapse" id="navbarSupportedContent">
          {loginData?<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className={`${style.widthFixed} nav-item mx-lg-2`}>
                <Link className={`${style.navStyle}`} aria-current="page" to="home">Home</Link>
              </li>
              <li className={`${style.widthFixed} nav-item mx-lg-2`}>
                <Link className={`${style.navStyle}`} aria-current="page" to="movies">Movies</Link>
              </li>
              <li className={`${style.widthFixed} nav-item mx-lg-2`}>
                <Link className={`${style.navStyle}`} aria-current="page" to="tvshow">Tvshow</Link>
              </li>
              <li className={`${style.widthFixed} nav-item mx-lg-2`}>
                <Link className={`${style.navStyle}`} aria-current="page" to="people">People</Link>
              </li>
            </ul>:""}  
            <div className='ms-auto d-flex flex-wrap'>
              <form className={`d-flex my-2`}>
                  <input className="form-control w-75 fw-bold rounded-pill me-2 bg-transparent" type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-warning rounded-pill  fw-bold" type="submit">Search</button>
              </form>
              <ul className={`${style.navLogout} mb-0 p-0`}>
                {name?<h4 className='mb-0 mx-lg-2 text-warning'>Hello <span className='text-light'>{name}</span></h4>:''}
                {!loginData?<>
                <li className='nav-item mx-2'>
                  <Link className={`${style.navStyle1} ${style.navStyle2}`} aria-current="page" to="register">Register</Link>
                </li>
                <li className='nav-item mx-2'>
                  <Link className={`${style.navStyle1} ${style.navStyle2}`} aria-current="page" to="login">Login</Link>
                </li>
                </>:<li className='nav-item mx-2'>
                  <a className={`${style.navStyle1} ${style.navStyle2}`}  aria-current="page" onClick={logOut}>Log Out</a>
                </li>}              
              </ul>
              
            </div>
          </div>
        </div>
      </nav>
  )
}



