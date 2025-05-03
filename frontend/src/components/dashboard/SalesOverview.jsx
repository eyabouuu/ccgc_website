"use client";

import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function SalesOverview() {
  const [salesByCenterData, setSalesByCenterData] = useState([]);
  const [salesByClientData, setSalesByClientData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch top 5 centers when year changes
  useEffect(() => {
    const fetchTopCenters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/sales/top-centers?year=${selectedYear}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched top centers:", data);
        setSalesByCenterData(data);
      } catch (error) {
        console.error("Error fetching top centers:", error);
        setError("Failed to fetch data. Please try again.");
        setSalesByCenterData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopCenters();
  }, [selectedYear]);

  // Fetch top clients
  useEffect(() => {
    const fetchTopClients = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sales/top-clients");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched top clients:", data);
        setSalesByClientData(data);
      } catch (error) {
        console.error("Error fetching top clients:", error);
        setSalesByClientData([]);
      }
    };

    fetchTopClients();
  }, []);

  // Year options for dropdown
  const years = [2025, 2024, 2023, 2022, 2021];

  return (
    <div className="space-y-4 text-white">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Sales by Center */}
        <div className="bg-gray-900 rounded-lg p-4 transition-all duration-500 ease-in-out hover:shadow-lg hover:-translate-y-1">
          <div className="mb-4">
            <h3 className="text-lg font-semibold transition-all duration-300 ease-in-out hover:text-green-500">
              Top 5 Montant TTC by Center
            </h3>
            {/* Year Dropdown */}
            <div className="mt-2">
              <label htmlFor="year" className="text-sm text-gray-400 mr-2">
                Select Year:
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-gray-800 text-white rounded-md p-1"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="h-[300px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                Loading...
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full text-red-400">
                {error}
              </div>
            ) : salesByCenterData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                No data available for {selectedYear}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByCenterData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="center" stroke="#9CA3AF" />
                  <YAxis
                    tickFormatter={(value) => `$${value / 1000}k`}
                    stroke="#9CA3AF"
                  />
                  <Tooltip
                    formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]}
                    contentStyle={{
                      backgroundColor: "#111827",
                      borderColor: "#374151",
                      color: "#fff",
                    }}
                  />
                  <Legend wrapperStyle={{ color: "#9CA3AF" }} />
                  <Bar
                    dataKey="amount"
                    name="Sales Amount"
                    fill="#22c55e"
                    animationDuration={1000}
                    animationEasing="ease-in-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Sales by Client */}
        <div className="bg-gray-900 rounded-lg p-4 transition-all duration-500 ease-in-out hover:shadow-lg hover:-translate-y-1">
          <div className="mb-4">
            <h3 className="text-lg font-semibold transition-all duration-300 ease-in-out hover:text-green-500">
              Montant TTC by Client
            </h3>
            <p className="text-sm text-gray-400">Total invoice amount by client</p>
          </div>
          <div className="h-[300px]">
            {salesByClientData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                No client data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByClientData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="client" stroke="#9CA3AF" />
                  <YAxis
                    tickFormatter={(value) => `$${value / 1000}k`}
                    stroke="#9CA3AF"
                  />
                  <Tooltip
                    formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]}
                    contentStyle={{
                      backgroundColor: "#111827",
                      borderColor: "#374151",
                      color: "#fff",
                    }}
                  />
                  <Legend wrapperStyle={{ color: "#9CA3AF" }} />
                  <Bar
                    dataKey="amount"
                    name="Sales Amount"
                    fill="#eab308"
                    animationDuration={1000}
                    animationEasing="ease-in-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}