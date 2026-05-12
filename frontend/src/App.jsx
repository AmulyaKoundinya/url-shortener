// Main dashboard application
import "./App.css";
import { useEffect, useState } from "react";
import StatsCards from "./components/StatsCards";
import UrlForm from "./components/UrlForm";
import Dashboard from "./components/Dashboard";

function App() {

  const [stats, setStats] = useState({});
  const [links, setLinks] = useState([]);
  const [connected, setConnected] = useState(false);

  const loadData = async () => {

    try {

      const statsRes = await fetch("/api/stats");
      const statsData = await statsRes.json();

      const linksRes = await fetch("/api/all");
      const linksData = await linksRes.json();

      setStats(statsData);
      setLinks(linksData);

      setConnected(true);

    } catch (error) {

      console.log(error);

      setConnected(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">

      <div className="header">

        <h1>🔗 Shortly</h1>

        <span className={connected ? "badge" : "badge disconnected"}>

          {connected
            ? "🟢 Backend Connected"
            : "🔴 Backend Disconnected"}

        </span>

      </div>

      <StatsCards stats={stats} />

      <UrlForm reload={loadData} />

      <Dashboard links={links} reload={loadData} />

    </div>
  );
}

export default App;