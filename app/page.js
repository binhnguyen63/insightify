"use client";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import OverviewCards from "./components/OverviewCards";
import { useState } from "react";
import SearchResult from "./components/searchResult";
import AiModel from "./components/AiModel";
export default function Home() {
  const [query, setQuery] = useState("loreal foundation");
  return (
    <div className="home">
      <Topbar query={query} setQuery={setQuery} />
      <div className="dashboard">
        <Sidebar />
        <div className="main-dashboard">
          <OverviewCards />
          <div className="pending-leader">
            <SearchResult query={query} />
            <AiModel query={query} />
          </div>
        </div>
      </div>
    </div>
  );
}
