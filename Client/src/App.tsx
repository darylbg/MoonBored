import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const routes = [
    {
      espIp: "192.168.0.175",
      routeName: "Green V3",
      climb: {
        holds: [
          { index: 1, type: "start", color: "green" },
          { index: 2, type: "start", color: "green" },
          { index: 8, type: "mid", color: "blue" },
          { index: 14, type: "mid", color: "blue" },
          { index: 25, type: "mid", color: "blue" },
          { index: 27, type: "mid", color: "blue" },
          { index: 33, type: "mid", color: "blue" },
          { index: 45, type: "mid", color: "blue" },
          { index: 46, type: "mid", color: "blue" },
          { index: 48, type: "end", color: "red" }
        ]
      }
    },
    {
      espIp: "192.168.0.175",
      routeName: "Red Dyno",
      climb: {
        holds: [
          { index: 3, type: "start", color: "green" },
          { index: 5, type: "mid", color: "green" },
          { index: 16, type: "mid", color: "blue" },
          { index: 27, type: "mid", color: "blue" },
          { index: 29, type: "mid", color: "blue" },
          { index: 40, type: "mid", color: "blue" },
          { index: 43, type: "end", color: "red" }
        ]
      }
    },
    {
      espIp: "192.168.0.175",
      routeName: "Blue Traverse",
      climb: {
        holds: [
          { index: 0, type: "start", color: "green" },
          { index: 1, type: "start", color: "green" },
          { index: 10, type: "mid", color: "blue" },
          { index: 14, type: "mid", color: "blue" },
          { index: 18, type: "mid", color: "blue" },
          { index: 19, type: "mid", color: "blue" },
          { index: 29, type: "mid", color: "blue" },
          { index: 31, type: "mid", color: "blue" },
          { index: 42, type: "end", color: "red" }
        ]
      }
    }
  ];

  const [lastSent, setLastSent] = useState<string | null>(null);

  const sendRoute = async (routeData: typeof routes[number]) => {
    try {
      const response = await axios.post(`${serverUrl}/api/controller`, routeData);
      console.log("Route sent! Response:", response.data);
      setLastSent(routeData.routeName);
    } catch (error) {
      console.error("Error sending route:", error);
    }
  };

  return (
    <div>
      <h2>LED Route Sender</h2>
      <div style={{ marginBottom: "1rem" }}>
        {routes.map((route, idx) => (
          <button key={idx} onClick={() => sendRoute(route)} style={{ marginRight: "0.5rem" }}>
            {route.routeName}
          </button>
        ))}
      </div>
      {lastSent && <div>✅ Sent: <strong>{lastSent}</strong></div>}
    </div>
  );
}

export default App;
