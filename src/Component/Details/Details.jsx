import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import style from './Details.module.css';
import { useNavigate } from 'react-router-dom';

export default function Details({ route }) {
  let baseImgUrl = 'https://image.tmdb.org/t/p/original/';
  let [searchParam, setSearchParam] = useSearchParams();
  let [details, setDetails] = useState({});
  let currentId = searchParam.get('id');
  let Navigate = useNavigate();

  async function getDetails() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${currentId}?api_key=4be83514e5b9ccda4ef2b5c97f53ed3f&language=en-US`
      );
      setDetails(data);
    } catch (error) {
      console.error(error);
      // Handle error as needed (e.g., show an error message)
    }
  }

  useEffect(() => {
    getDetails();
  }, [currentId]); // Include currentId in the dependency array to refetch when it changes

  return (
    <div className="container-fluid mt-3 p-5">
      <div className="row justify-content-evenly">
        <div className={`col-lg-4 col-md-10 m-0 p-0 ${style.styleBorder} position-relative`}>
          <img className={` ${style.positionImg} ${style.icreaseWidth}`} src={baseImgUrl + details.poster_path} alt="" />
        </div>
        <div className={`col-lg-7 d-flex flex-column col-md-10 mt-md-5 mt-4 ${style.styleDevText}`}>
          <h1 className="my-4 text-danger fw-bolder">{details.original_title}</h1>
          <h2 className="text-secondary">{details.tagline}</h2>
          <h3 className="my-4">Status : <span className="text-muted ms-2 fs-5">{details.status}</span></h3>
          {details.genres ? (
            <div className="typeFilm d-flex justify-content-evenly w-50">
              {details.genres.map((genre, index) => (
                <button key={index} className="btn btn-outline-light fs-5 my-4">
                  {genre.name}
                </button>
              ))}
            </div>
          ) : (
            <div>No genres available</div>
          )}
          <div className="vote fs-4 my-4">
            <p>
              Vote Average : <span className="text-muted ms-2 fs-5">{details.vote_average}</span>
            </p>
            <p>
              Vote Count : <span className="text-muted ms-2 fs-5">{details.vote_count}</span>
            </p>
            <p>
              Popularity : <span className="text-muted ms-2 fs-5">{details.popularity}</span>
            </p>
            <p>
              Release Date : <span className="text-muted ms-2 fs-5">{details.release_date}</span>
            </p>
          </div>
          <div className="overview fs-4 my-2">
            <p>
              Overview About Film : <span className="text-muted ms-2 fs-5">{details.overview}</span>
            </p>
          </div>
          <button className="btn col-md-6">
            <a className="w-100 fs-5 py-3 btn btn-outline-light" href={details.homepage}>
              Advertisement Film Page
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
