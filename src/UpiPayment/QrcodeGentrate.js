import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import config from "../Config/URL"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup"

function QrcodeGentrate() {

    const [amount, setAmount] = useState("");
    const [upiId, setUpiId] = useState("");
    const [qrCode, setQrCode] = useState(localStorage.getItem("qrCode"));
    const [upiLink, setUpiLink] = useState("");
    const [payments, setPayments] = useState([]);
    const [count, setcount] = useState(localStorage.getItem("count"));
    const Navigator = useNavigate()

    const formik = useFormik({
        initialValues: {
            amount: "",
            upiId: ""
        },
        validationSchema: yup.object().shape({
            amount: yup.string().required("Enter your amount")
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log('values :', values)

            const res = await axios.post(`${config.ADMIN_URL}payments`, {
                amount: values.amount,
                upiId,
            }
            );
            localStorage.setItem("qrCode", res.data.qrCode)
            setQrCode(localStorage.getItem("qrCode"));
            setUpiLink(res.data.upiLink);
            fetchPayments();
            setAmount("");
            localStorage.setItem("count", 60);
            setcount(localStorage.getItem("count"))
            DecreaseCount()
            resetForm()


        }
    })



    const handleClick = () => {
        Navigator("/DeshBoard")
    }

    let timer;


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
        <div style={{
            backgroundColor: "#667eea",
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}  >

            <div className="container"  >
                <h2>UPI Payment</h2>
                <Button onClick={handleClick}>
                    Go to Dashboard
                </Button>
                <br />
                <br />

                {
                    qrCode ? (
                        <div className="qr-section">
                            <h3>Scan this QR</h3>
                            <img src={qrCode} alt="UPI QR Code" />
                            <p>Expired on : {count}</p>
                            <p>
                                Or click:{" "}
                                <a
                                    href={upiLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={handlePayNow}
                                > Pay Now
                                </a>
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={formik.handleSubmit}>

                            <input
                                type="number"
                                name="amount"
                                placeholder="Enter amount"
                                value={formik.values.amount}
                                // onChange={(e) =>
                                //     setAmount(e.target.value)
                                // }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                            {
                                formik.errors.amount && formik.touched.amount && (
                                    <div>
                                        <p style={{ color: "red" }}>{formik.errors.amount}</p>
                                    </div>
                                )
                            }
                            <input
                                type="text"
                                placeholder="Optional:Enter UPI ID"
                                value={upiId}
                                onChange={(e) =>
                                    setUpiId(e.target.value)
                                }
                            />
                            <button type="submit" style={{ backgroundColor: "#4f46e5" }} >Generate QR</button>
                        </form>
                    )

                }

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
        </div>

    )
}


export default QrcodeGentrate


