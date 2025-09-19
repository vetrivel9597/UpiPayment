import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Table } from "react-bootstrap";

function InternalPayment() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate()
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

  const handleConformPayment = (paymentId) => {
    navigate(`/confirmInternal-payment?id=${paymentId}`);
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
      <h2 className="mb-3">Internal Payments</h2>
      <Button onClick={handleGetAccountData}>View Account</Button>
      <Button onClick={handelCreatePayments} className="ms-2">Create internalPayment</Button>
      <DataTable
        columns={columns}
        data={payments}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
}

export default InternalPayment;
