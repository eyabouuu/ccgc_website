import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function ArticlePerformance() {
  const [salesByArticleTypeData, setSalesByArticleTypeData] = useState([]);
  const [transactionTypesData, setTransactionTypesData] = useState([]);
  const [articlePerformanceData, setArticlePerformanceData] = useState([]); // State for article performance data

  useEffect(() => {
    // Fetch sales by article type data
    fetch("http://localhost:5000/api/articles/sales-by-article")
      .then((response) => response.json())
      .then((data) => setSalesByArticleTypeData(data))
      .catch((error) => console.error("Error fetching sales data:", error));

    // Fetch transaction types distribution data
    fetch("http://localhost:5000/api/transaction-types-distribution")
      .then((response) => response.json())
      .then((data) => setTransactionTypesData(data))
      .catch((error) =>
        console.error("Error fetching transaction types data:", error)
      );

    // Fetch article performance data
    fetch("http://localhost:5000/api/articles/article-performance")
      .then((response) => response.json())
      .then((data) => setArticlePerformanceData(data))
      .catch((error) =>
        console.error("Error fetching article performance data:", error)
      );
  }, []);

  return (
    <div className="space-y-6 p-4 bg-gray-900 text-white">
      {/* Top Grid with Two Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Sales by Article Type */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-2">
            Sales by Article Type
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Distribution of sales by article type
          </p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByArticleTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="article" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  formatter={(value) => [`${value} units`, "Sales"]}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Bar dataKey="sales" name="Sales Quantity" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transaction Types Pie Chart */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-2">
            Transaction Types Share
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Share of transaction types (ACHAT, VENTE)
          </p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transactionTypesData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius="80%"
                  fill="#10B981"
                >
                  {transactionTypesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#10B981" : "#F59E0B"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    color: "#fff",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Article Performance Metrics */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-2">
          Article Performance Metrics
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          Metrics for mnt_base, mnt_bonif, and mont_ttc by article
        </p>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={articlePerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="article" stroke="#9CA3AF" />
              <YAxis yAxisId="left" orientation="left" stroke="#9CA3AF" />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#9CA3AF"
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "mnt_base") return [`${value} units`, name];
                  return [`$${value.toLocaleString()}`, name];
                }}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#fff",
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="mnt_base"
                name="Mnt Base"
                fill="#10B981"
              />
              <Bar
                yAxisId="right"
                dataKey="mnt_bonif"
                name="Mnt Bonif"
                fill="#F59E0B"
              />
              <Bar
                yAxisId="right"
                dataKey="mont_ttc"
                name="Mont TTC"
                fill="#3B82F6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
