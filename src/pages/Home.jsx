import { useState } from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import TransactionTable from "../components/TransactionTable";
import AddTransactionModal from "../components/AddTransactionModal";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [editingTx, setEditingTx] = useState(null);

  // FILTER STATES
  const [categoryFilter, setCategoryFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ADD
  const handleAddTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  // UPDATE
  const handleUpdateTransaction = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx))
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
            close={() => setOpen(false)}
            onSave={editingTx ? handleUpdateTransaction : handleAddTransaction}
            editingTransaction={editingTx}
          />
        )}
      </div>
    </>
  );
};

export default Home;
