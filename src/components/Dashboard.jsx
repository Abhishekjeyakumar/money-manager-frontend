const Dashboard = ({ transactions }) => {
  const now = new Date();

  const isSameWeek = (date) => {
    const txDate = new Date(date);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);
    return txDate >= startOfWeek;
  };

  const isSameMonth = (date) => {
    const txDate = new Date(date);
    return (
      txDate.getMonth() === now.getMonth() &&
      txDate.getFullYear() === now.getFullYear()
    );
  };

  const isSameYear = (date) => {
    const txDate = new Date(date);
    return txDate.getFullYear() === now.getFullYear();
  };

  const calculateTotals = (filterFn) => {
    let income = 0;
    let expense = 0;

    transactions.forEach((tx) => {
      if (filterFn(tx.createdAt)) {
        if (tx.type === "income") income += tx.amount;
        else expense += tx.amount;
      }
    });

    return { income, expense };
  };

  const weekly = calculateTotals(isSameWeek);
  const monthly = calculateTotals(isSameMonth);
  const yearly = calculateTotals(isSameYear);

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {/* WEEKLY */}
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-semibold text-gray-600">Weekly</h3>
        <p className="text-green-600">Income: ₹{weekly.income}</p>
        <p className="text-red-600">Expense: ₹{weekly.expense}</p>
      </div>

      {/* MONTHLY */}
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-semibold text-gray-600">Monthly</h3>
        <p className="text-green-600">Income: ₹{monthly.income}</p>
        <p className="text-red-600">Expense: ₹{monthly.expense}</p>
      </div>

      {/* YEARLY */}
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-semibold text-gray-600">Yearly</h3>
        <p className="text-green-600">Income: ₹{yearly.income}</p>
        <p className="text-red-600">Expense: ₹{yearly.expense}</p>
      </div>
    </div>
  );
};

export default Dashboard;
