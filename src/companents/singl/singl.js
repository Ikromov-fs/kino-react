import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import back from '../../assets/imag/back.svg';
const Singl = () => {
    const navgs = useNavigate()
    const env = process.env.REACT_APP_API;
    const [image, setImage] = useState([]);
    const [vidio1, setVidieo] = useState([]);
    const { id } = useParams()
    const getItemLocolStorge = JSON.parse(window.localStorage.getItem('data')).filter(item => item.id === id - 0);

    useEffect(() => {
        axios.get(env + `/movie/${id}/credits`, {
            params: {
                api_key: '0431834c535ecb8b718ac720e46307f3',
            }
        })
            .then(res => {
                setImage(res.data.cast);
            })
            .catch(err => {
                console.log(err);
            });


        axios.get(env + `/movie/${id}/videos`, {
            params: {
                api_key: '0431834c535ecb8b718ac720e46307f3',
            }
        })
            .then(res => {
                setVidieo(res.data.results.splice(0, 5));
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    const backGo = () => {
        navgs(-1)
    }
    return (
        <div className='d-flex'>
            <img className='position-fixed mx-2' onClick={backGo} src={back} alt="back" width={'50'} height={'50'} />
            <div className='w-25 mx-auto'>
                {
                    image.splice(3, 3).map(item => {
                        return <div className='p-2 text-center'><img key={item.id} src={"https://image.tmdb.org/t/p/w500" + item.profile_path} alt="img" width={'90%'} height='30%' /></div>
                    })
                }
            </div>
            <div key={getItemLocolStorge.id} className='w-50 mx-auto text-center'>
                <img src={"https://image.tmdb.org/t/p/w500" + getItemLocolStorge[0].poster_path} alt="img" width={'100%'} height='80%' />
            </div>
            <div className='w-25 mx-auto'>
                {
                    vidio1.length > 0 && vidio1.map(item => (
                        <div key={item.id} className='text-center d-flex align-items-center mb-3 px-4'>
                            <iframe src={`https://www.youtube.com/embed/${item.key}`}
                                title="YouTube video player" height="350" width={'100%'}
                                allow='acceleroment; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default Singl;
