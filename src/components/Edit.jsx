import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import InputField from './InputField'

function Edit({ userData, setUserData }) {

  const { id } = useParams()
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState()
  const navigate = useNavigate()

  // accessing user data from api
  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/users/${id}`)
      setFormData(data.data)
    } catch (error) {
      console.log(error)
      alert('Somthing went wrong! try again.')
    }
  }

// form validation rules
  const validateConfig = {
    email: [{ required: true, message: 'Please enter an email.' }, { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Invalid email, please enter correct email.' }],
    first_name: [{ required: true, message: 'Please enter first name.' }, { minLength: 3, message: 'First name should be atleast 2 characters long.' }],
    last_name: [{ required: true, message: 'Please enter last name.' }, { minLength: 3, message: 'Last name should be atleast 3 characters long.' }],
    id: [{ required: true, message: 'Please enter last name.' }],
    avatar: [{ required: true, message: 'Please enter last name.' }],
  }

  // validating form
  const validate = (formData) => {
    const errorData = {}

    Object.entries(formData).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorData[key] = rule.message
          return true
        }

        if (rule.minLength && value.length < rule.minLength) {
          errorData[key] = rule.message
          return true
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errorData[key] = rule.message
          return true
        }
      })
    })

    setErrors(errorData)
    return errorData
  }


  // handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    const validateResult = validate(formData)
    if (Object.keys(validateResult).length) return

    try {
      const { data } = await axios.put(`/api/users/${id}`, { email: formData.email, first_name: formData.first_name, last_name: formData.last_name })
      console.log(data)
      const newUsersData = userData.map(user =>
        (user.id == id) ? {
          ...user,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email
        } : user
      )
      localStorage.setItem('isData', JSON.stringify('yes'))
      navigate('/', { state: newUsersData })

    } catch (error) {
      alert('Something went wrong. Please try again!')
    }
  }

  const handleEvent = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  useEffect(() => {
    getData()
  }, [])

  return formData && (
    <div className='min-w-[370px]'>
      <form action="/account" className='flex flex-col w-full h-full justify-between items-center' onSubmit={handleSubmit}>
        <img src={formData.avatar} alt="" className='mb-8' />
        <div className="w-full">
          <InputField id='email' label='email' name='email' value={formData.email} onChange={handleEvent} error={errors.email} type={'text'} />
          <InputField id='fistName' label='First Name' name='first_name' value={formData.first_name} onChange={handleEvent} error={errors.first_name} type={'text'} />
          <InputField id='lastName' label='Last Name' name='last_name' value={formData.last_name} onChange={handleEvent} error={errors.last_name} type={'text'} />
          <button className='w-full bg-[#CBCBCB] mt-1 text-black flex justify-center items-center p-2 text-base rounded hover:bg-[#6C25FF] hover:text-white'>Update</button>
        </div>
      </form>
    </div>
  )
}

export default Edit