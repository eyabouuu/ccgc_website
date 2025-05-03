"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function ClientInsights() {
  const [clientsByGovernorateData, setClientsByGovernorateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientsByGovernorate = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/clients/clients-by-governorate");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setClientsByGovernorateData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientsByGovernorate();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="space-y-6 dark:bg-gray-900 dark:text-white">
      {/* Clients by Governorate */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Clients by Governorate</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total number of clients by governorate</p>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={clientsByGovernorateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="governorate" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value} clients`, "Count"]}
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                }}
              />
              <Legend />
              <Bar dataKey="clients" name="Number of Clients" fill="#eab308" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}