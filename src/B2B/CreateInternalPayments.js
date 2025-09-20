import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateInternalPayments() {
  const [formData, setFormData] = useState({
    amount: '',
    beneficiaryAccountNumber: "",
    currencyCode: "",
    narrative: "",
    senderAccountNumber: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/transactions/internal-payments",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/internal-payment")

      console.log("✅ Payment Success:", response.data);

    } catch (error) {
      console.error("❌ Payment Error:", error.response?.data || error.message);
      alert("Payment failed!");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Internal Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Beneficiary Account Number</label>
          <input
            type="text"
            name="beneficiaryAccountNumber"
            value={formData.beneficiaryAccountNumber}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Currency Code</label>
          <input
            type="text"
            name="currencyCode"
            value={formData.currencyCode}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Narrative</label>
          <input
            type="text"
            name="narrative"
            value={formData.narrative}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Sender Account Number</label>
          <input
            type="text"
            name="senderAccountNumber"
            value={formData.senderAccountNumber}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Payment
        </button>
      </form>
    </div>
  );
}

export default CreateInternalPayments;
