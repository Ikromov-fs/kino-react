import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../../companents/card/card';
import { Context } from '../../context/context';
const Popular = () => {
  const { data, setData } = useContext(Context)
  const env = process.env.REACT_APP_API
  const [moviData, setMoviData] = useState({
    isFetchet: false,
    data: []
  })
  useEffect(() => {
    axios.get(env + "/movie/popular", {
      params: {
        api_key: '0431834c535ecb8b718ac720e46307f3',
        page: 1,
      }
    })
      .then((res) => {
        setMoviData({
          data: res.data.results,
          isFetchet: true,
        })
        setData(res.data.results)
      })
      .catch(err => {
        console.log(err)
        setMoviData({
          isFetchet: false,
          data: []
        })
      })
  }, [])
  window.localStorage.setItem('data', JSON.stringify(data))
  return (
    <div className='container d-flex flex-wrap justify-content-between'>
      {moviData.isFetchet && moviData.data.map((item, index) => (
        <Card key={index} obj={item} />
      ))}
    </div>
  )
}

export default Popular
