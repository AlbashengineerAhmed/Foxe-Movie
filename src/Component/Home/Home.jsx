import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react';
import style from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import img from '../../images/ahmed.png'; 
export default function Home() {

  let baseImgUrl = 'https://image.tmdb.org/t/p/original/';
  let [trendingMovies,setTrendingMovies]=useState([]);
  let [trendingTvShows,setTrendingTvShows]=useState([]);
  let [trendingPerson,setTrendingPerson]=useState([]);
  async function getTrendingItems(mediaType,callback) {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=4be83514e5b9ccda4ef2b5c97f53ed3f`);
    callback(data.results);
    // console.log(data);
  }

  useEffect(()=>{
    getTrendingItems("movie",setTrendingMovies);
    getTrendingItems("tv",setTrendingTvShows);
    getTrendingItems("person",setTrendingPerson);
  },[])

  let Navigate = useNavigate();
  function goToDetails(id,mediaType){
    // alert(id)
    Navigate({
      pathname:"/details",
      search: `?id=${id}&type=${mediaType}` 
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
      <div className='row'>
        <div className="col-lg-4 col-md-6 col-12 d-flex  align-items-center">
          <div>
            <div className={` w-25 bord mb-3`}></div>
            <h2>Trending</h2>
            <h2>TV</h2>
            <h2>To Watch Now</h2>
            <p className='text-muted mb-3'>Most watched TV by days</p>
            <div className={`bord`}></div>
          </div>
          </div>
          {trendingTvShows.map((tv,index)=>
            <div onClick={()=>goToDetails(tv.id,"tv")} className='col-md-3 col-lg-2 m-auto my-3' key={index}>
              <div>
              <div className={`movee w-100`}>
                <img className='w-100' src={baseImgUrl+tv.poster_path} alt="Error" />
                  <div className={`movieInfo`}>
                    <h5 className={`heightTitle`}>{tv.name}</h5>
                    <button className='btn btn-warning'>{tv.vote_average}</button>
                  </div>
                  <div className={`movieOverview`}>
                    <h4 className='text-black'>Overview</h4>
                    <p className='text-muted'>{tv.overview}</p>
                  </div>
              </div>
              </div>
            </div>
          )}
          
      </div>
      <div className='row'>
        <div className="col-lg-4 col-md-6 col-12 d-flex  align-items-center">
          <div className='ms-3 w-100'>
            <div className={` w-25 bord mb-3`}></div>
            <h2>Trending</h2>
            <h2>Person</h2>
            <h2>To Watch Now</h2>
            <p className='text-muted mb-3'>Most watched Person by days</p>
            <div className={`bord`}></div>
          </div>
          </div>
          {trendingPerson.map((person,index)=>
            <div className='col-md-2 m-auto my-3' key={index}>
              <div className={`movee w-100`}>
                <img className='w-100' src={baseImgUrl+person.profile_path} alt="Error" />
                <div className={`movieInfo`}>
                  <h5 className={`heightTitle`}>{person.name}</h5>
                  <button className='btn btn-warning'>{person.popularity}</button>
                </div>
                <div className={`movieOverview`}>
                <h4 className='text-black'>Original Name</h4>
                <p className='text-muted'>{person.original_name}</p>
              </div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
