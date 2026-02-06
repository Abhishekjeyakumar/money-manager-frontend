import { canEditTransaction } from "../utils/canEdit";

const TransactionTable = ({ transactions, onEdit }) => {
  return (
    <div className="bg-white shadow rounded p-4 mt-6">
      <h2 className="text-lg font-semibold mb-3">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet</p>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr className="border-b">
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Division</th>
              <th>Amount</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => {
              const canEdit = canEditTransaction(tx.createdAt);

              return (
                <tr key={tx.id} className="border-b">
                  <td>{new Date(tx.createdAt).toLocaleString()}</td>
                  <td>{tx.type}</td>
                  <td>{tx.category}</td>
                  <td>{tx.division}</td>
                  <td>₹{tx.amount}</td>
                  <td>
                    <button
                      disabled={!canEdit}
                      onClick={() => onEdit(tx)}
                      className={`px-3 py-1 rounded text-white ${
                        canEdit
                          ? "bg-blue-600"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Edit
                    </button>

                    {!canEdit && (
                      <p className="text-xs text-red-500">
                        Edit disabled after 12 hrs
                      </p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionTable;
