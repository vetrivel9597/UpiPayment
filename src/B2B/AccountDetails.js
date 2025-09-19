import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Table } from "react-bootstrap";

function AccountDetails() {
  const [accounts, setAccounts] = useState([]);
  const [selectedBalance, setSelectedBalance] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [showTransactionPopup, setShowTransactionPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/transactions/getAccountData");
        const json = await response.json();
        setAccounts(json.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleCreateAccount = () => {
    navigate("/createAccount");
  };

  const handleViewBalance = async (accountNumber) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/balance/${accountNumber}`
      );
      const json = await response.json();
      if (json.status) {
        setSelectedBalance(json.data);
        setShowPopup(true);
      } else {
        alert("Failed to fetch balance: " + json.message);
      }
    } catch (err) {
      console.error("Error fetching balance:", err);
      alert("Something went wrong!");
    }
  };
  const handleTransactionHistory = async (accountNumber) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/history/${accountNumber}`
      );
      const json = await response.json();
      if (json.status) {
        setTransactionHistory(json.data.transactions || []);
        setShowTransactionPopup(true);
      } else {
        alert("Failed to fetch transactions: " + json.message);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
      alert("Something went wrong!");
    }
  };
  const handleInternalPayment = () => {
    navigate("/internal-payment")
  }

  const columns = [
    { name: "Account Name", selector: row => row.accountName, sortable: true },
    { name: "Account Number", selector: row => row.accountNumber, sortable: true },
    { name: "Currency", selector: row => row.currencyCode },
    { name: "Pool ID", selector: row => row.poolId },
    { name: "Created At", selector: row => new Date(row.createdAt).toLocaleString() },
    {
      name: "View Balance",
      cell: (row) => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleViewBalance(row.accountNumber)}
        >
          View Balance
        </Button>
      )
    },
    {
      name: "Transactions",
      cell: (row) => (
        <Button
          variant="info"
          size="sm"
          onClick={() => handleTransactionHistory(row.accountNumber)}
        >
          View History
        </Button>
      )
    }
  ];

  return (
    <div className="p-4">
      <h2 className="mb-3">Account List</h2>

      <Button variant="success" className="mb-3" onClick={handleCreateAccount}>
        Create Account
      </Button>
      <Button variant="primary" className="mb-3 ms-2" onClick={handleInternalPayment}>
        Internal Payment
      </Button>

      <DataTable
        columns={columns}
        data={accounts}
        pagination
        highlightOnHover
        striped
      />

      {/* Balance Modal */}
      <div className={`modal fade ${showPopup ? "show d-block" : ""}`} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Account Balance</h5>
              <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
            </div>
            <div className="modal-body">
              {selectedBalance ? (
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Available Balance</th>
                      <td>
                        {selectedBalance.availableBalance.amount}{" "}
                        {selectedBalance.availableBalance.currencyCode}
                      </td>
                    </tr>
                    <tr>
                      <th>Current Balance</th>
                      <td>
                        {selectedBalance.currentBalance.amount}{" "}
                        {selectedBalance.currentBalance.currencyCode}
                      </td>
                    </tr>
                    <tr>
                      <th>Account State</th>
                      <td>{selectedBalance.accountState}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Transaction History Modal */}
      <div className={`modal fade ${showTransactionPopup ? "show d-block" : ""}`} tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Transaction History</h5>
              <button type="button" className="btn-close" onClick={() => setShowTransactionPopup(false)}></button>
            </div>
            <div className="modal-body">
              {transactionHistory.length > 0 ? (
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Payment ID</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Amount</th>
                      <th>Fee</th>
                      <th>Type</th>
                      <th>Sender</th>
                      <th>Recipient</th>
                      <th>State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((tx) => (
                      <tr key={tx.id}>
                        <td>{tx.id}</td>
                        <td>{tx.date}</td>
                        <td>{tx.time}</td>
                        <td>{tx.amount}</td>
                        <td>{tx.fee ?? "-"}</td>
                        <td>{tx.type}</td>
                        <td>{tx.senderName}</td>
                        <td>{tx.recipientName}</td>
                        <td>{tx.state}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No transactions found.</p>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowTransactionPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AccountDetails;



// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { Link, useNavigate } from "react-router-dom";

// function AccountDetails() {
//   const [accounts, setAccounts] = useState([]);

//   const [selectedBalance, setSelectedBalance] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

//   const navigate = useNavigate()
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await fetch("http://localhost:8081/api/transactions/getAccountData");
//         const json = await response.json();
//         setAccounts(json.data);
//         console.log('response', response)
//       } catch (error) {
//         console.error("Error fetching accounts:", error);
//       }
//     };

//     fetchAccounts();
//   }, []);

//   const handleCreateAccount = () => {
//     navigate("/createAccount")
//   }

//   const handleViewBalance = async (accountNumber) => {
//     try {
//       const response = await fetch(`http://localhost:8081/api/transactions/balance/${accountNumber}`);
//       const json = await response.json();
//       if (json.status) {
//         setSelectedBalance(json.data);
//         setShowPopup(true);
//       } else {
//         alert("Failed to fetch balance: " + json.message);
//       }
//     } catch (err) {
//       console.error("Error fetching balance:", err);
//       alert("Something went wrong!");
//     }
//   };

//   const columns = [
//     { name: "Account Name", selector: row => row.accountName, sortable: true },
//     { name: "Account Number", selector: row => row.accountNumber, sortable: true },
//     { name: "Currency", selector: row => row.currencyCode },
//     { name: "Pool ID", selector: row => row.poolId },
//     { name: "Created At", selector: row => new Date(row.createdAt).toLocaleString() },
//     {
//       name: "View Balance",
//       cell: (row) => (
//         <button
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//           onClick={() => handleViewBalance(row.accountNumber)}
//         >
//           View Balance
//         </button>
//       )
//     }
//   ];

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Account List</h2>

//       <button onClick={handleCreateAccount}>Create Account</button>


//       <DataTable
//         columns={columns}
//         data={accounts}
//         pagination
//         highlightOnHover
//         striped
//       />
//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h3 className="text-lg font-bold mb-4">Account Balance</h3>
//             <pre className="bg-gray-100 p-3 rounded text-sm">
//               {JSON.stringify(selectedBalance, null, 2)}
//             </pre>
//             <button
//               onClick={() => setShowPopup(false)}
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default AccountDetails;
