import React, { useRef, useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './header.css';
import logo from '../../assets/imag/kino.png'
import axios from 'axios';
import { Context } from '../../context/context';
const Header = () => {
    const inputValue = useRef()
    const navigtes = useNavigate()
    const env = process.env.REACT_APP_API;
    const [searchData, setSearchData] = useState([])
    const [inputData, setInputData] = useState(false)
    const { data, setData } = useContext(Context)
    const valueInp = (e) => {
        if (e.target.value == '') {
            setInputData('')
        }
        else {
            setInputData(true)
            axios.get(env + `/search/movie?query=` + e.target.value, {
                params: {
                    api_key: '0431834c535ecb8b718ac720e46307f3',
                }
            })
                .then(res => {
                    setSearchData(res.data.results);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    const liChange = (e) => {
        setData(searchData)
        inputValue.current.value = e.target.textContent
        navigtes(`/singl/${e.target.id}`)
        setInputData(false)
        inputValue.current.value = ''
    }
    const hiddenSearch = () => {
        setTimeout(() => {
            setInputData(false)
        }, 150);
        inputValue.current.value = ''
    }
    window.localStorage.setItem('data', JSON.stringify(data));
    return (
        <header className='header'>
            <div className='container'>
                <div className='d-flex'>
                    <div>
                        <img src={logo} alt="img" width={70} height={70} />
                    </div>
                    <div className='input-group mt-3'>
                        <div className='col-11 mx-auto'>
                            <input onBlur={hiddenSearch} ref={inputValue} onChange={valueInp} type="text" className='form-control' placeholder='search...' />
                            {
                                inputData && (<div>
                                    <ul className='w-100 ul-soarch'>
                                        {searchData.length > 0 && searchData.map(item => (
                                            <li id={item.id} onClick={liChange} className='my-2 search-li' key={item.id}>{item.title}</li>
                                        ))}
                                    </ul>
                                </div>)
                            }
                        </div>
                    </div>
                    <div>
                        <nav className='d-flex gap-5 pt-3'>
                            <NavLink className="text-decoration-none fs-5" to={'/'}>Home</NavLink>
                            <NavLink className="text-decoration-none fs-5" to={'/poplya'}>Poplar</NavLink>
                            <NavLink className="text-decoration-none fs-5" to={'/topRated'}>TopRated</NavLink>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
