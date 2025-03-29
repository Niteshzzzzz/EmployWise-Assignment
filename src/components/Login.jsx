import React, { useState } from 'react'
import InputField from './InputField'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'


function Login() {

  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
 
  // form validation rules
  const validateConfig = {
    email: [{ required: true, message: 'Please enter an email.' }, { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Invalid email, please enter correct email.' }],
    password: [{ required: true, message: 'Please enter password.' }, { minLength: 8, message: 'Password should be atleast 8 characters long.' }],
  }

  // validating form data
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

    setFormData({
      email: '',
      password: ''
    })

    try {
      const {data} = await axios.post('/api/login', formData)
      console.log(data)
      localStorage.setItem('token', JSON.stringify(data))
      navigate('/')
    } catch (error) {
      alert('email/password is wrong. Please try again!')
    }
  }

  const handleEvent = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <div className="w-[375px] h-[480px] border-2 rounded border-[rgb(218,221,224)] flex px-4 py-6 justify-center bg-[#F7F8F9]">
      <form action="/account" className='flex flex-col w-full h-full justify-between items-center' onSubmit={handleSubmit}>
        <h2 className='text-[28px] font-bold align-middle mb-10 underline text-[#6C25FF]'>LogIn</h2>
        <div className="w-full">
          <InputField id='email' label='email' name='email' value={formData.email} onChange={handleEvent} error={errors.email} type={'text'} />
          <InputField id='password' label='password' name='password' value={formData.password} onChange={handleEvent} error={errors.password} type={'password'} />
          <button className='w-full bg-[#CBCBCB] mt-1 text-black flex justify-center items-center p-2 text-base rounded hover:bg-[#6C25FF] hover:text-white'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login