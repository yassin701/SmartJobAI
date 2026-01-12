import { useState } from 'react'
import AdminAdd from './Pages/Admin/AdminAdd'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import './App.css'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="Add" element={<AdminAdd/>}/>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
