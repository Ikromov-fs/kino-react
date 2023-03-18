import React from 'react'
import { Link } from 'react-router-dom'
import './card.css'
const Card = ({ obj }) => {
  const { title, poster_path, popularity, release_date, id } = obj
  return (
    <Link onClick={id} to={`/singl/${id}`} className='card d-flex justify-content-between rounded-3 mb-3 mx-2'>
      <div className='card-header'>
        <img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt="kino img" width='100%' height='100%' />
      </div>
      <div className='card-body text-center'>
        <strong>{title}</strong>
      </div>
      <div className='card-footer text-center'>
        <p className='fs-5'>Popularity: {popularity}</p>
        <p className='fs-5'> Date: {release_date}</p>
      </div>
    </Link>
  )
}

export default Card;
