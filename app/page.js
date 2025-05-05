import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import OverviewCards from "./components/OverviewCards";
import PendingVideos from "./components/PendingVideos";
import Leaderboard from "./components/Leaderboard";
export default function Home() {
  return (
    // <div style={{ display: "flex" }}>
    //   <Sidebar />
    //   <main style={{ flex: 1, padding: "1rem 2rem" }}>
    //     <Topbar />
    //     <OverviewCards />
    //     {/* <div style={{ display: "flex", gap: "1rem" }}>
    //       <div style={{ flex: 2 }}>
    //         <PendingVideos />
    //       </div>
    //       <div style={{ flex: 1 }}>
    //         <Leaderboard />
    //       </div>
    //     </div> */}
    //   </main>
    // </div>
    <div className="home">
      <Topbar />
      <div className="dashboard">
        <Sidebar />
        <div className="main-dashboard">
          <OverviewCards />
          <div className="pending-leader">
            <PendingVideos />
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}
