import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Home({ userData, setUserData }) {
    const navigate = useNavigate()
    const [currPage, setCurrPage] = useState(1);
    const location = useLocation()
    const newData = location.state

    // accessing users data from api
    const getData = async () => {
        try {
            const { data } = await axios.get(`/api/users?page=${currPage}`);
            setUserData(data.data)
        } catch (error) {
            console.log(error)
            alert('Something went wrong! Please try again.')
        }
    }

    // handle delete operation on user
    const handleDelete = async (id) => {
        try {
            const data = await axios.delete(`/api/users/${id}`)
            const newUsersData = userData.filter(user => user.id != id)
            setUserData(newUsersData)
        } catch (error) {
            alert('Something went wrong! Please try again.')
        }
    }

    useEffect(() => {
        
        const isData = JSON.parse(localStorage.getItem('isData'))
        if (newData != null && userData && isData == 'yes') {
            
            setUserData(newData)
            localStorage.setItem('isData', JSON.stringify(''))
            return
        }
        getData()
    }, [currPage])

    // redirecting on login page if user not login 
    const nav = () => {
        useEffect(() => {
            navigate('/login')
        }, [])
    }

    const tokens = JSON.parse(localStorage.getItem('token'))

    return (
        (tokens && tokens.token == 'QpwL5tke4Pnpja7X4') ? <div className='flex justify-center items-center flex-col max-w-[900px] p-2 h-full'>
            <div className="flex justify-center items-center py-4 flex-wrap gap-8 overflow-y-scroll md:overflow-y-auto">
                {
                    userData && userData.map(user => (
                        < div className="border-2 border-[#6C25FF] p-2 rounded-2xl flex justify-between items-center h-[170px] md:h-[180px] hover:bg-gray-200 sm:min-w-[390px]" key={user.id} >
                            <img src={user.avatar} alt="" className='rounded-full' />
                            <div className="ml-4">
                                <h2>First name: <span>{user.first_name}</span></h2>
                                <h2>Last name: <span>{user.last_name}</span></h2>
                                <h2>Email: <span>{user.email}</span></h2>
                                <div className="mt-6">
                                    <Link to={`/edit/${user.id}`} className='px-6 py-1.5 border border-gray-400 rounded hover:bg-[#6C25FF] hover:text-white'>Edit</Link>
                                    <Link className='px-5 py-1.5 ml-2 border border-gray-400 rounded hover:bg-red-400 hover:text-white' onClick={() => handleDelete(user.id)}>Delete</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            <div className="mt-6">
                <button className={`py-1.5 px-4 border text-xl hover:bg-[#b088ff] hover:text-white cursor-pointer ${(currPage == 1) ? 'bg-[#6C25FF] text-white' : 'bg-white text-black'}`} onClick={() => setCurrPage(1)}>1</button>
                <button className={`py-1.5 px-4 border text-xl hover:bg-[#b088ff] hover:text-white ml-3 cursor-pointer ${(currPage == 2) ? 'bg-[#6C25FF] text-white' : 'bg-white text-black'}`} onClick={() => setCurrPage(2)}>2</button>
            </div>
            </div>

        </div > : nav()
    )
}
