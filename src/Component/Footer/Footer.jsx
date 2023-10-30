import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className="bg-light text-center">
      {/* Grid container */}
      <div className="p-4 pb-0">
         {/* Section: Social media */}
        <section className="mb-2">
           {/* Facebook */}
          <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button"
            ><i className="fab fa-facebook-f"></i
          ></a>

           {/* Twitter */}
          <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button"
            ><i className="fab fa-twitter"></i
          ></a>

           {/* Google */}
          <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button"
            ><i className="fab fa-google"></i
          ></a>

           {/* Instagram */}
          <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button"
            ><i className="fab fa-instagram"></i
          ></a>

           {/* Linkedin */}
          <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button"
            ><i className="fab fa-linkedin-in"></i
          ></a>

           {/* Github */}
          <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button"
            ><i className="fab fa-github"></i
          ></a>
        </section>
         {/* Section: Social media */}
      </div>
       {/* Grid container */}

       {/* Copyright */}
      <div className="text-center text-black p-3">
        © 2023 Copyright:
        <a className="text-black ms-1 text-decoration-none" href="#">ahmed</a>
      </div>
       {/* Copyright */}
      </footer>
    </>
  )
}
