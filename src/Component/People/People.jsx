import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react';
import style from './People.module.css';
export default function Movies() {

  let baseImgUrl = 'https://image.tmdb.org/t/p/original/';
  let [trendingPeople,setTrendingPeople]=useState([]);
  async function getTrendingPeople() {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=4be83514e5b9ccda4ef2b5c97f53ed3f`);
    setTrendingPeople(data.results)
  }
  
  useEffect(()=>{
    getTrendingPeople();
  },[])

  return (
    <div>
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
          {trendingPeople.map((person,index)=>
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
