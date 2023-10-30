import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react';
import style from './Movies.module.css';
import { useNavigate } from 'react-router-dom';
export default function Movies() {

  let baseImgUrl = 'https://image.tmdb.org/t/p/original/';
  let [trendingMovies,setTrendingMovies]=useState([]);
  async function getTrendingMovies() {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=4be83514e5b9ccda4ef2b5c97f53ed3f`);
    setTrendingMovies(data.results)
  }

  useEffect(()=>{
    getTrendingMovies();
  },[])
  let Navigate = useNavigate();
  function goToDetails(id){
    Navigate({
      pathname:"/details",
      search:`?id=${id}` 
      // type : `${type}`,
    })
  }
  return (
    <div>
      <div className='row'>
          <div className="col-lg-4 col-md-6 col-12 d-flex  align-items-center justify-content-evenly">
            <div className='ms-3 w-100'>
              <div className={` w-25 bord mb-3`}></div>
              <h2>Trending</h2>
              <h2>Movies</h2>
              <h2>To Watch Now</h2>
              <p className='text-muted mb-3'>Most watched movies by days</p>
              <div className={`bord`}></div>
            </div>
          </div>
          {trendingMovies.map((movie,index)=>
          <div onClick={()=>goToDetails(movie.id,"movie")} className='col-md-3 col-lg-2 m-auto my-3' key={index}>
            <div>
            <div  key={index} className={`movee w-100`}>
              <img className='w-100' src={baseImgUrl+movie.poster_path} alt="Error" />
                <div className={`movieInfo`}>
                  <h5 className={`heightTitle`}>{movie.title}</h5>
                  <button className='btn btn-warning'>{movie.vote_average}</button>
                </div>
                <div className={`movieOverview`}>
                  <h4 className='text-black'>Overview</h4>
                  <p className='text-muted'>{movie.overview}</p>
                </div>
            </div>
            </div>
          </div>
          )}
      </div>
    </div>
  )
}

