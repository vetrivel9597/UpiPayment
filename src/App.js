import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import config from "./Config/URL"

function App() {

  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [qrCode, setQrCode] = useState(localStorage.getItem("qrCode"));
  const [upiLink, setUpiLink] = useState("");
  const [payments, setPayments] = useState([]);
  const [count, setcount] = useState(localStorage.getItem("count"))

  let timer;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${config.ADMIN_URL}payments`, {
    amount,
    upiId,
    }
    );
    localStorage.setItem("qrCode", res.data.qrCode)
    setQrCode(localStorage.getItem("qrCode"));
    setUpiLink(res.data.upiLink);
    fetchPayments();
    setAmount("")
    localStorage.setItem("count", 30)
    setcount(localStorage.getItem("count"))
    DecreaseCount()
  };
  const fetchPayments = async () => {
    const res = await axios.get(`${config.ADMIN_URL}transaction`);
    setPayments(res.data);
  };

  useEffect(() => {

    fetchPayments();
    if (localStorage.getItem("count") >= 1) {
      clearInterval(timer)
      DecreaseCount()
    } else {
      console.log('Enter count remove')
      localStorage.removeItem("count")
    }
  }, []);

  const DecreaseCount = async () => {
    timer = setInterval(() => {

      setcount((prevCount) => {
        if (prevCount <= 1) {
          localStorage.removeItem("qrCode")
          setQrCode(localStorage.getItem("qrCode"))
          setAmount("")
          localStorage.removeItem("count")
          return 0
        } else {
          localStorage.setItem("count", prevCount - 1)
          return prevCount - 1

        }
      })

    }, 1000);

  }

  const handlePayNow = () => {
    window.location.href = upiLink;
  };

  return (
    <div className="container">
      <h2>UPI Payment</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          required
        />
        <input
          type="text"
          placeholder="Optional: Enter UPI ID"
          value={upiId}
          onChange={(e) =>
            setUpiId(e.target.value)
          }
        />
        <button type="submit">Generate QR</button>
      </form>
      {
        qrCode && (
          <div className="qr-section">
            <h3>Scan this QR</h3>
            <img src={qrCode} alt="UPI QR Code" />
            <p>Expired on :{count}</p>
            <p>
              Or click:{" "}
              <a
                href={upiLink}
                target="_blank"
                rel="noreferrer"
                onClick={handlePayNow}
              >
                Pay Now
              </a>
            </p>
          </div>
        )}

      <h3>Recent Payments</h3>
      <ul>
        {payments.map((p) => (
          <li key={p._id}>
            <span>₹{p.amount} to {p.upiId}</span>
            <span>{new Date(p.createdAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>

  );
}

export default App;
