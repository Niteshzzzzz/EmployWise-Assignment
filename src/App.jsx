import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Edit from './components/Edit'
import { useState } from 'react'

function App() {

  const [userData, setUserData] = useState()

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-[#F7F8F9]">
      <Routes>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/' element={<Home userData={userData} setUserData={setUserData} />} ></Route>
        <Route path='/edit/:id' element={<Edit userData={userData} setUserData={setUserData} />} ></Route>
      </Routes>
    </div>
  )
}

export default App
