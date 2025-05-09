"use client";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import OverviewCards from "./components/OverviewCards";
import { useState } from "react";
import SearchResult from "./components/searchResult";
import AiModel from "./components/AiModel";
import Footer from "./components/footer";
export default function Home() {
  const [query, setQuery] = useState("toy");
  return (
    <div className="home">
      <Topbar query={query} setQuery={setQuery} />
      <div className="dashboard">
        {/* <Sidebar /> */}
        <div className="main-dashboard">
          <OverviewCards query={query} />
          <div className="pending-leader">
            <SearchResult query={query} />
            <AiModel query={query} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
