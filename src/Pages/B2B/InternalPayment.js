import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Table } from "react-bootstrap";
import axios from "axios"
import PopupModal from "../B2B/PopupModal"

function InternalPayment() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate()
  const [PopUp, setPopUp] = useState(false)
  
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/transactions/getInternalPayments");
        const json = await response.json();
        if (json.status) {
          setPayments(json.data);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  const handleConformPayment = async (paymentId) => {
    console.log('paymentId :', paymentId)

    const response = await axios.put(
      "http://localhost:5000/api/transactions/ConfirmStatus",
      { paymentId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log('response :', response.data.StatusCheck)

    if (response.data.StatusCheck === "SUCCESS") {
      setPopUp(true)
    } else {
      navigate(`/confirmInternal-payment?id=${paymentId}`);
    }


  };


  // Define table columns
  const columns = [
    { name: "Sender Account", selector: row => row.senderAccountNumber, sortable: true },
    { name: "Beneficiary Account", selector: row => row.beneficiaryAccountNumber, sortable: true },
    { name: "Amount", selector: row => `${row.amount} ${row.currencyCode}`, sortable: true },
    { name: "Narrative", selector: row => row.narrative },
    { name: "Status", selector: row => row.status },
    {
      name: "Payment ID",
      selector: row => row.satchelResponse?.paymentId || "N/A"
    },
    {
      name: "Created At",
      selector: row => new Date(row.createdAt).toLocaleString(),
      sortable: true
    },
    {
      name: "Conform Payment",
      cell: (row) => (
        <Button
          variant="info"
          size="sm"
          onClick={() => handleConformPayment(row.satchelResponse?.paymentId)}
        >
          Confirm Payment
        </Button>
      )
    }


  ];
  const handelCreatePayments = () => {
    navigate("/createInternal-payment")
  }
  const handleGetAccountData = () => {
    navigate("/AccountDetails")
  }

  return (
    <div className="p-4">
      <h2 className="mb-3 ">Internal Payments</h2>

      <Button onClick={handleGetAccountData}>View Account</Button>
      <Button variant="danger" onClick={handelCreatePayments} className="ms-2">Create InternalPayment</Button>
      <br />
      <br />
      <DataTable
        columns={columns}
        data={payments}
        pagination
        highlightOnHover
        striped
      />

      <PopupModal
        show={PopUp}
        onClose={() => setPopUp(false)}
        title="Payment Status"
        message="Payment Already Success"
      />

    </div>
  );
}

export default InternalPayment;
