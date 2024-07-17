import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import User from './User'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import Navbar from './Navbar'
// import Navbar from './Navbar'
function App() {


  return (
    <>

      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<User/>} ></Route>
        <Route path='/create' element={<CreateUser/>} ></Route>
        <Route path='/update/:id' element={<UpdateUser/>} ></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
