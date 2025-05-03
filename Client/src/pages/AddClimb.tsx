import { useState } from "react";
import axios from "axios";
import ClimbBuilder from "../components/ClimbBuilder";

export default function AddClimb() {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const addClimbDynamic = () => {

  }

  const routes = [
    {
      espIp: "192.168.0.175",
      routeName: "Blue Traverse",
      moves: [
        { description: 0, isStart: true, isEnd: false },
        { description: 1, isStart: true, isEnd: false },
        { description: 10, isStart: false, isEnd: false },
        { description: 21, isStart: false, isEnd: false },
        { description: 28, isStart: false, isEnd: false },
        { description: 42, isStart: false, isEnd: true },
      ],
    },
    {
      espIp: "192.168.0.175",
      routeName: "dyno",
      moves: [
        { description: 0, isStart: true, isEnd: false },
        { description: 2, isStart: true, isEnd: false },
        { description: 7, isStart: false, isEnd: false },
        { description: 10, isStart: false, isEnd: false },
        { description: 18, isStart: false, isEnd: false },
        { description: 29, isStart: false, isEnd: false },
        { description: 36, isStart: false, isEnd: false },
        { description: 45, isStart: false, isEnd: true },
      ],
    },
  ];

  const [lastSent, setLastSent] = useState<string | null>(null);

  const sendRoute = async (routeData: (typeof routes)[number]) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/controller`,
        routeData
      );
      console.log("Route sent! Response:", response.data);
      setLastSent(routeData.routeName);
    } catch (error) {
      console.error("Error sending route:", error);
    }
  };

  return (
    <ClimbBuilder />
  );
}
