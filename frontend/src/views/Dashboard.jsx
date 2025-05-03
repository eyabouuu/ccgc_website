"use client"

import { useState } from "react"
import { SalesOverview } from "../components/dashboard/SalesOverview"
import { ArticlePerformance } from "../components/dashboard/ArticlePerformance"
import {ClientInsights} from "../components/dashboard/ClientInsights"
export default function DashboardPage() {
  const [showFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("sales")

  // Mock components with black theme
  const GlobalFilters = () => <div className="p-4 bg-gray-900 rounded-lg text-white">Global Filters Component</div>

  

  const tabs = [
    { value: "sales", label: "Sales & Purchases" },
    { value: "articles", label: "Article Performance" },
    { value: "clients", label: "Client Insights" },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col bg-black">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="font-semibold text-2xl transform transition-all duration-300 hover:translate-x-1">Dashboard Overview</h1>
            <p className="text-sm text-gray-400">Monitor your business performance with real-time analytics</p>
          </div>
          {/*<div className="flex items-center gap-2">
            <DateRangePicker />
            
          </div>*/}
        </div>

        {showFilters && <GlobalFilters />}

        <div className="space-y-4">
          <div className="relative grid grid-cols-2 md:grid-cols-7 gap-2">
            <div className="flex col-span-full relative">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex-1 py-2 px-4 text-sm font-medium relative z-10 transition-all duration-300 ease-in-out
                    ${activeTab === tab.value 
                      ? 'text-white scale-105' 
                      : 'text-gray-200 hover:text-white hover:scale-102'}`}
                >
                  {tab.label}
                  {activeTab === tab.value && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform transition-all duration-300 ease-in-out scale-x-100 origin-center" />
                  )}
                  {activeTab !== tab.value && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 hover:scale-x-50 transition-all duration-300 ease-in-out origin-center" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {activeTab === "sales" && <SalesOverview />}
            {activeTab === "articles" && <ArticlePerformance />}
            {activeTab === "clients" && <ClientInsights />}
          </div>
        </div>
      </main>
    </div>
  )
}