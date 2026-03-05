import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import TransactionTable from "../components/TransactionTable";
import AddTransactionModal from "../components/AddTransactionModal";
import { useState, useEffect } from "react";

// ✅ backend API base (only change for deployment later)
const API_URL = "http://localhost:5001/api/transactions";


const Home = () => {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState(DEFAULT_TRANSACTIONS);
  const [editingTx, setEditingTx] = useState(null);

  // FILTER STATES
  const [categoryFilter, setCategoryFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ✅ ADD TRANSACTION (stored in MongoDB)
  const handleAddTransaction = async (tx) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tx),
    });

    const savedTx = await res.json();
    setTransactions((prev) => [savedTx, ...prev]);
  };

  // ✅ LOAD TRANSACTION HISTORY FROM MONGODB (ON REFRESH)
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch transactions");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTransactions(data);
        }
      })
      .catch(() => {
        console.log("Backend unavailable, using default transactions");
      });
  }, []);

  // ✅ UPDATE TRANSACTION (12-HOUR RULE HANDLED IN BACKEND)
  const handleUpdateTransaction = async (updatedTx) => {
    const res = await fetch(`${API_URL}/${updatedTx._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTx),
    });

    if (!res.ok) {
      alert("Edit restricted after 12 hours");
      return;
    }

    const data = await res.json();

    setTransactions((prev) =>
      prev.map((tx) => (tx._id === data._id ? data : tx))
    );
  };

  const handleEditClick = (tx) => {
    setEditingTx(tx);
    setOpen(true);
  };

  // APPLY FILTERS
  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.createdAt);

    const matchCategory = categoryFilter
      ? tx.category === categoryFilter
      : true;

    const matchDivision = divisionFilter
      ? tx.division === divisionFilter
      : true;

    const matchFromDate = fromDate
      ? txDate >= new Date(fromDate)
      : true;

    const matchToDate = toDate
      ? txDate <= new Date(toDate + "T23:59:59")
      : true;

    return matchCategory && matchDivision && matchFromDate && matchToDate;
  });

  return (
    <>
      <Navbar />
      <div className="p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
          <button
            onClick={() => {
              setEditingTx(null);
              setOpen(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add
          </button>
        </div>

        {/* FILTERS */}
        <div className="bg-gray-100 p-4 rounded mb-6 grid grid-cols-4 gap-4">
          <select
            className="border p-2"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option>Food</option>
            <option>Fuel</option>
            <option>Movie</option>
            <option>Medical</option>
            <option>Loan</option>
          </select>

          <select
            className="border p-2"
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
          >
            <option value="">All Divisions</option>
            <option>Personal</option>
            <option>Office</option>
          </select>

          <input
            type="date"
            className="border p-2"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <input
            type="date"
            className="border p-2"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <Dashboard transactions={transactions} />

        <TransactionTable
          transactions={filteredTransactions}
          onEdit={handleEditClick}
        />

        {open && (
          <AddTransactionModal
            close={() => {
              setOpen(false);
              setEditingTx(null);
            }}
            onSave={editingTx ? handleUpdateTransaction : handleAddTransaction}
            editingTransaction={editingTx}
          />
        )}
      </div>
    </>
  );
};

export default Home;
