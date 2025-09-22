import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"
function ConfirmInternalPayment() {
  const [paymentId, setPaymentId] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const LocationId = (window.location.href).split("=")[1]
    setPaymentId(LocationId)
    
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentId) {
      console.log('paymentId:', paymentId)
      try {
        const response = await axios.put(
          "http://localhost:5000/api/transactions/confirm-internalPayments",
          { paymentId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("✅ Confirm Success:", response.data);
        setResult(response.data);
        navigate("/internal-payment")
        alert("Payment confirmed successfully!");
      } catch (error) {
        console.log('error', error)
        console.error("❌ Confirm Error:", error.response?.data || error.message);
        alert("Payment confirmation failed!");
      }
    } else {
      console.log('paymentId:', paymentId)
      console.log('paymentId does not store')
    }
  };


  const handleBackButtonClick = () => {
    navigate("/AccountDetails")

  }

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={handleBackButtonClick}>Go To Account Details</Button>
      </div>
      <h2>Confirm Internal Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Payment ID</label>
          <input
            type="text"
            name="paymentId"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            className="form-control"
            placeholder="Enter Payment ID"
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Confirm Payment
        </button>
      </form>

      {result && (
        <div className="mt-3 alert alert-info">
          <strong>Response:</strong>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ConfirmInternalPayment;
