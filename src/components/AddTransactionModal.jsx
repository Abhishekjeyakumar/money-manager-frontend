import { useState, useEffect } from "react";

const AddTransactionModal = ({ close, onSave, editingTransaction }) => {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [division, setDivision] = useState("Personal");

  // ✅ SAFE PREFILL FOR EDIT (NO CASCADING RENDER)
  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type ?? "income");
      setAmount(editingTransaction.amount ?? "");
      setDescription(editingTransaction.description ?? "");
      setCategory(editingTransaction.category ?? "Food");
      setDivision(editingTransaction.division ?? "Personal");
    } else {
      // reset when switching from edit → add
      setType("income");
      setAmount("");
      setDescription("");
      setCategory("Food");
      setDivision("Personal");
    }
  }, [editingTransaction]);

  const handleSave = () => {
    if (!amount || !description) {
      alert("Amount and description are required");
      return;
    }

    const transaction = {
      type,
      amount: Number(amount),
      description,
      category,
      division,
    };

    // ✅ VERY IMPORTANT: MongoDB _id handling
    if (editingTransaction) {
  console.log("EDIT PAYLOAD:", {
    ...transaction,
    _id: editingTransaction._id,
  });

  onSave({ ...transaction, _id: editingTransaction._id });
} else {
  console.log("ADD PAYLOAD:", transaction);
  onSave(transaction);
}


    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 w-96 rounded">
        <h2 className="text-lg font-semibold mb-3">
          {editingTransaction ? "Edit Transaction" : "Add Transaction"}
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setType("income")}
            className={`flex-1 p-2 ${
              type === "income" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setType("expense")}
            className={`flex-1 p-2 ${
              type === "expense" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Expense
          </button>
        </div>

        <input
          type="number"
          className="w-full border p-2 mb-2"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full border p-2 mb-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Fuel</option>
          <option>Movie</option>
          <option>Medical</option>
          <option>Loan</option>
        </select>

        <select
          className="w-full border p-2 mb-4"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
        >
          <option>Personal</option>
          <option>Office</option>
        </select>

        <div className="flex justify-between">
          <button onClick={close} className="text-red-500">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {editingTransaction ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;



// import { useState, useEffect } from "react";

// const AddTransactionModal = ({ close, onSave, editingTransaction }) => {
//   const [type, setType] = useState("income");
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("Food");
//   const [division, setDivision] = useState("Personal");

//   // PREFILL WHEN EDITING
//  useEffect(() => {
//   if (editingTransaction) {
//     setType(editingTransaction.type);
//     setAmount(editingTransaction.amount);
//     setDescription(editingTransaction.description);
//     setCategory(editingTransaction.category);
//     setDivision(editingTransaction.division);
//   }
// }, [editingTransaction]);

//   const handleSave = () => {
//     if (!amount || !description) {
//       alert("Amount and description are required");
//       return;
//     }

//     const transaction = {
//       id: editingTransaction ? editingTransaction.id : Date.now(),
//       type,
//       amount: Number(amount),
//       description,
//       category,
//       division,
//       createdAt: editingTransaction
//         ? editingTransaction.createdAt
//         : new Date().toISOString(),
//     };

//     onSave(transaction);
//     close();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
//       <div className="bg-white p-6 w-96 rounded">
//         <h2 className="text-lg font-semibold mb-3">
//           {editingTransaction ? "Edit Transaction" : "Add Transaction"}
//         </h2>

//         {/* Tabs */}
//         <div className="flex gap-4 mb-4">
//           <button
//             onClick={() => setType("income")}
//             className={`flex-1 p-2 ${
//               type === "income" ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             Income
//           </button>
//           <button
//             onClick={() => setType("expense")}
//             className={`flex-1 p-2 ${
//               type === "expense" ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             Expense
//           </button>
//         </div>

//         <input
//           type="number"
//           className="w-full border p-2 mb-2"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />

//         <input
//           className="w-full border p-2 mb-2"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <select
//           className="w-full border p-2 mb-2"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option>Food</option>
//           <option>Fuel</option>
//           <option>Movie</option>
//           <option>Medical</option>
//           <option>Loan</option>
//         </select>

//         <select
//           className="w-full border p-2 mb-4"
//           value={division}
//           onChange={(e) => setDivision(e.target.value)}
//         >
//           <option>Personal</option>
//           <option>Office</option>
//         </select>

//         <div className="flex justify-between">
//           <button onClick={close} className="text-red-500">
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             {editingTransaction ? "Update" : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddTransactionModal;
