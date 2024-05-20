import { useEffect, useState } from "react";
import { Company, Transaction } from "../../data-types/entities";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { getCompanies } from "../../calling/companyCaller";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  // Fetch transactions
  useEffect(() => {
    const sentUrl =
      "http://localhost:8080/transaction/getByCompany/" +
      localStorage.getItem("userId");

    fetch(sentUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Failed to fetch astronauts: ${response.statusText}`);
        }
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });
  }, []);

  // Fetch companies
  useEffect(() => {
    getCompanies({ token: "" }) // Adjust if you have a token management system
      .then((data) => {
        setCompanies(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const getCompanyNameById = (receiverId: number) => {
    const company = companies.find((company) => company.userId === receiverId);
    return company ? company.name : "Unknown";
  };

  return (
    <div className="outer">
      <Header />
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800 my-6">
          Transactions
        </h1>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer transition duration-300 hover:shadow-lg hover:cursor-default"
            >
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800">
                  {transaction.fromCompanyId ===
                  Number(localStorage.getItem("userId"))
                    ? "Outgoing Transaction to "
                    : "Incoming Transaction from "}
                  {getCompanyNameById(transaction.fromCompanyId)}
                </p>
                <p className="text-sm text-gray-500">
                  Transaction Amount: {transaction.transactionAmount}
                </p>
                <p className="text-sm text-gray-500">
                  Date:{" "}
                  {new Date(transaction.transactionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
