import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Spinner from "./Spinner";

interface LoanApplicationType {
  loan_application_id: number;
  customer_id?: number | null;
  group_id?: number | null;
  product_id: number;
  branch_id: number;
  amount_applied: number;
  tenure_months: number;
  application_date: string;
  status: string;
  guarantor_id?: number | null;
}

export default function LoanApplication() {
  const { id } = useParams(); // /loans/apply/:id => product id
  const productId = Number(id);

  const [loanApplications, setLoanApplications] = useState<LoanApplicationType[]>([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [groupId, setGroupId] = useState<number | null>(null);
  const [branchId, setBranchId] = useState<number>(0);
  const [amountApplied, setAmountApplied] = useState<number>(0);
  const [tenureMonths, setTenureMonths] = useState<number>(0);
  const [guarantorId, setGuarantorId] = useState<number | null>(null);

  // fetch all loan applications
  useEffect(() => {
    async function fetchLoanApplications() {
      try {
        const response = await fetch("http://localhost:3000/api/loan-applications");
        const data = await response.json();
        if (data.success) {
          setLoanApplications(data.data);
        }
      } catch (err) {
        console.error("Error fetching loan applications", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLoanApplications();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validation: either customer or group must be provided
    if (!customerId && !groupId) {
      alert("Please enter either a Customer ID or a Group ID.");
      return;
    }

    const payload = {
      customer_id: customerId,
      group_id: groupId,
      product_id: productId,
      branch_id: branchId,
      amount_applied: amountApplied,
      tenure_months: tenureMonths,
      guarantor_id: guarantorId,
      status: "Pending",
    };

    try {
      const response = await fetch("http://localhost:3000/api/loan-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        alert("Loan application submitted!");
        // refresh list
        setLoanApplications((prev) => [data.newApplication, ...prev]);
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting loan application");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col">
        {/* Header */}
        <div className="bg-blue-950 text-white py-5 pl-5 space-y-5">
          <h1 className="text-5xl font-roboto">Loan Application</h1>
          <p className="font-inter">
            Create a new loan application for product #{productId}
          </p>
        </div>

        {/* Form */}
        <div className="p-5">
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white p-5 rounded-lg shadow"
          >
            <h2 className="text-2xl font-semibold mb-4">New Loan Application</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Customer ID (optional)</label>
                <input
                  type="number"
                  value={customerId ?? ""}
                  onChange={(e) =>
                    setCustomerId(e.target.value ? Number(e.target.value) : null)
                  }
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1">Group ID (optional)</label>
                <input
                  type="number"
                  value={groupId ?? ""}
                  onChange={(e) =>
                    setGroupId(e.target.value ? Number(e.target.value) : null)
                  }
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1">Branch ID</label>
                <input
                  type="number"
                  value={branchId}
                  onChange={(e) => setBranchId(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Amount Applied</label>
                <input
                  type="number"
                  step="0.01"
                  value={amountApplied}
                  onChange={(e) => setAmountApplied(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Tenure (Months)</label>
                <input
                  type="number"
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Guarantor ID (optional)</label>
                <input
                  type="number"
                  value={guarantorId ?? ""}
                  onChange={(e) =>
                    setGuarantorId(e.target.value ? Number(e.target.value) : null)
                  }
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Application
            </button>
          </form>
        </div>

        {/* Table of loan applications */}
        <div className="p-5">
          <h2 className="text-3xl font-roboto mb-4 text-blue-950">
            All Loan Applications
          </h2>
          {loading ? (
            <div className="flex items-center justify-center">
              <p className="text-xl">Loading loan applications...</p>
              <Spinner />
            </div>
          ) : loanApplications.length === 0 ? (
            <p>No loan applications found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-separate border-spacing-0 font-open-sans">
                <thead>
                  <tr className="bg-blue-950 text-white font-inter">
                    <th className="px-4 py-3 rounded-tl-2xl">ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Group</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Branch</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Tenure</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 rounded-tr-2xl">Guarantor</th>
                  </tr>
                </thead>
                <tbody>
                  {loanApplications.map((loan, i) => (
                    <tr
                      key={loan.loan_application_id}
                      className={`${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition`}
                    >
                      <td className="px-4 py-3 text-blue-950">
                        {loan.loan_application_id}
                      </td>
                      <td className="px-4 py-3">{loan.customer_id ?? "—"}</td>
                      <td className="px-4 py-3">{loan.group_id ?? "—"}</td>
                      <td className="px-4 py-3">{loan.product_id}</td>
                      <td className="px-4 py-3">{loan.branch_id}</td>
                      <td className="px-4 py-3 font-semibold text-blue-950">
                        {loan.amount_applied.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{loan.tenure_months}</td>
                      <td className="px-4 py-3">
                        {new Date(loan.application_date).toLocaleDateString()}
                      </td>
                      <td
                        className={`px-4 py-3 font-inter ${
                          loan.status === "Pending"
                            ? "text-yellow-600"
                            : loan.status === "Approved"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {loan.status}
                      </td>
                      <td className="px-4 py-3">{loan.guarantor_id ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
