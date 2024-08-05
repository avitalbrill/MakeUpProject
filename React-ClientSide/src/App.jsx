import React from 'react'
import './App.css'
import HomePage from './components/homePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './components/admin'
import DataTable from "./components/table-admin/table2"
import ServiceList from './components/serviceList'
import AddService from './components/addService'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/admin' element={<><Admin /></>} />
 

          <Route path="/admin/services" element={<><Admin /><ServiceList /><AddService/></>} />
          <Route path="/admin/meetings" element={<><Admin />< DataTable /></>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
