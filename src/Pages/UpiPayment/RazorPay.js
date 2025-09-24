import React, { useState } from 'react';
import axios from 'axios';
import "../../App.css";

function RazorPay() {
    const [amount, setAmount] = useState("");
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                return resolve(true);
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!amount) {
            alert("Enter amount");
            return;
        }
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            alert("Failed to load Razorpay SDK. Please check your internet.");
            return;
        }
        try {
            const orderRes = await axios.post("http://localhost:5000/api/create-order", {
                amount: Number(amount)
            });
            const { order } = orderRes.data;
            console.log('orderRes', orderRes.data)

            const options = {
                key: "rzp_test_tBszStUe2ebXge",
                amount: order.amount,
                currency: order.currency,
                name: "Your App",
                description: "Test Payment",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        console.log('HandlerResponse', response)
                        const verifyRes = await axios.post("http://localhost:5000/api/verify-payment", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        console.log('verifyRes', verifyRes)
                        if (verifyRes.data.status === "success") {
                            alert("Payment successful and verified");
                        } else {
                            alert("Payment verification failed");
                        }
                    } catch (err) {
                        console.error("Verification error:", err);
                        //alert("Error during verification");
                    }
                },
                prefill: {
                    name: "Vetrivel",
                    email: "Vetri@gmail.com",
                    contact: "9597428145"
                },
                theme: {
                    color: "#3399cc"
                },
                config: {
                    display: {
                        preferences: {
                            show_default_blocks: true
                        }
                    }
                },

                // method: {
                //     upi: true,
                //     card: false,
                //     netbanking: false,
                //     wallet: false
                // },

            };


            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Error in payment:", error);
            alert("Payment failed. See console for details.");
        }
    };

    return (


        <div className="payment-container">
            <h2>UPI Payment</h2>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handlePayment}>Pay with UPI</button>
        </div>
    );


}

export default RazorPay;
