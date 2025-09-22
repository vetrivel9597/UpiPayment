import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateAccount() {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    accountName: "",
    currencyCode: "",
    poolId: 3
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/transactions/createAccount", form) ;
      setResponse(res.data);
      navigate("/AccountDetails")
    } catch (err) {
      setResponse(err.response?.data || { message: "Request failed" });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="accountName"
          placeholder="Account Name"
          value={form.accountName}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="text"
          name="currencyCode"
          placeholder="Currency Code (e.g. EUR)"
          value={form.currencyCode}
          onChange={handleChange}
          className="border p-2"
        />

        {/* <input
          type="text"
          name="poolId"
          placeholder="Pool ID"
          value={form.poolId}
          onChange={handleChange}
          className="border p-2"
        /> */}

        <button type="submit" className="bg-blue-500 text-red px-4 py-2">
        Create Account
        </button>
      </form>


    </div>
  );
}

export default CreateAccount;
