import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Qrcode from './QrcodeGentrate'
import DeshBoard from './DeshBoard'
import Login from './LoginPage'
import { ToastContainer } from 'react-toastify';
import Protected from './Protected'
import RazorPay from './RazorPay'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/DeshBoard' element={
            <Protected>
            <DeshBoard/>
            </Protected>
          } />
          <Route path='/Qrcode' element={
            <Protected>
              <Qrcode />
            </Protected>
          } />

           <Route path='/RazorPay' element={
            <Protected>
            <RazorPay/>
            </Protected>
          } /> 
        </Routes>
      </BrowserRouter>


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </div>

  )
}

export default App