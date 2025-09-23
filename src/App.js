import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Qrcode from './UpiPayment/QrcodeGentrate'
import DeshBoard from './Pages/DeshBoard'
import Login from './Pages/LoginPage'
import { ToastContainer } from 'react-toastify';
import Protected from "./Auth/Protected"
import RazorPay from './UpiPayment/RazorPay'
import AccountDetails from './B2B/AccountDetails'
import CreateAccount from './B2B/CreateAccount'
import 'bootstrap/dist/css/bootstrap.min.css';
import InternalPayment from './B2B/InternalPayment'
import CreateInternalPayments from './B2B/CreateInternalPayments'
import ConfirmInternalPayment from './B2B/ConfirmInternalPayment'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/DeshBoard' element={
            <Protected>
              <DeshBoard />
            </Protected>
          } />
          <Route path='/Qrcode' element={
            <Protected>
              <Qrcode />
            </Protected>
          } />

          <Route path='/RazorPay' element={
            <Protected>
              <RazorPay />
            </Protected>
          } />
          <Route path='/AccountDetails' element={
            <Protected>
              <AccountDetails />
            </Protected>
          } />
          <Route path='/createAccount' element={
            <Protected>
              <CreateAccount />
            </Protected>
          } />
          <Route path='/internal-payment' element={
            <Protected>
              <InternalPayment />
            </Protected>
          } />
          <Route path='/createInternal-payment' element={
            <Protected>
              <CreateInternalPayments />
            </Protected>
          } />
           <Route path='/confirmInternal-payment' element={
            <Protected>
              <ConfirmInternalPayment />
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