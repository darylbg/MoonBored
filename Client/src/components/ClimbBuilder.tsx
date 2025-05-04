import  { useEffect, useState } from "react";
import axios from "axios";

interface Move {
  description: number;
  isStart: boolean;
  isEnd: boolean;
}

const GRID_WIDTH = 6;
const GRID_HEIGHT = 9;
const ACTUAL_LED_COUNT = 50;

const ClimbBuilder = () => {
  const [selectedMoves, setSelectedMoves] = useState<Move[]>([]);
  const [espIp, setEspIp] = useState("192.168.0.175"); // default or empty
  const [routeName, setRouteName] = useState("Custom Route");

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const toggleMove = (index: number) => {
    const existing = selectedMoves.find((m) => m.description === index);
    if (existing) {
      setSelectedMoves(selectedMoves.filter((m) => m.description !== index));
    } else {
      setSelectedMoves([
        ...selectedMoves,
        { description: index, isStart: false, isEnd: false },
      ]);
    }
  };

  const updateMoveType = (index: number, type: "start" | "end") => {
    setSelectedMoves((prev) => {
      if (type === "start") {
        const currentStarts = prev.filter((m) => m.isStart);
        const alreadyStart = prev.find((m) => m.description === index)?.isStart;

        // If it's already a start, toggle off
        if (alreadyStart) {
          return prev.map((m) =>
            m.description === index ? { ...m, isStart: false } : m
          );
        }

        // If two starts exist, remove the oldest one
        let updated = [...prev];
        if (currentStarts.length >= 2) {
          const firstStartIndex = updated.findIndex((m) => m.isStart);
          if (firstStartIndex !== -1) {
            updated[firstStartIndex] = {
              ...updated[firstStartIndex],
              isStart: false,
            };
          }
        }

        return updated.map((m) =>
          m.description === index ? { ...m, isStart: true } : m
        );
      }

      if (type === "end") {
        return prev.map(
          (m) =>
            m.description === index
              ? { ...m, isEnd: true }
              : { ...m, isEnd: false } // clear previous end
        );
      }

      return prev;
    });
  };

  const removeMove = (index: number) => {
    setSelectedMoves((prevMoves) =>
      prevMoves.filter((move) => move.description !== index)
    );
  };

  const renderGrid = () => {
    const cells = [];
    for (let y = GRID_HEIGHT - 1; y >= 0; y--) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        const index =
          y % 2 === 0
            ? y * GRID_WIDTH + (GRID_WIDTH - 1 - x)
            : y * GRID_WIDTH + x;

        const selected = selectedMoves.find((m) => m.description === index);
        cells.push(
          <button
            key={index}
            onClick={() => toggleMove(index)}
            disabled={index > ACTUAL_LED_COUNT - 1}
            style={{
              width: 40,
              height: 40,
              margin: 0,
              fontWeight: selected
                ? "bold"
                : "initial",
              color: selected
                ? selected.isStart
                  ? "green"
                  : selected.isEnd
                  ? "red"
                  : "blue"
                : "#333",
              textShadow: selected
                ? selected.isStart
                  ? "0 0 20px #66cc66, 0 0 8px #66cc66"
                  : selected.isEnd
                  ? "0 0 20px #ff6666, 0 0 8px #ff6666"
                  : "0 0 20px #6666ff, 0 0 8px #6666ff"
                : "none",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              border: "1px solid #ccc",
              fontSize: 12,
            }}
          >
            {index}
          </button>
        );
      }
    }
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
          marginBottom: 20,
          justifyItems: "center",
          border: "1px solid gray",
          padding: "1rem",
          aspectRatio: "11/16",
          maxHeight: "600px",
        }}
      >
        {cells}
      </div>
    );
  };

  useEffect(() => {
    const sendLiveClimb = async () => {
      //   if (!espIp || selectedMoves.length === 0) return;

      const payload = {
        espIp,
        routeName,
        moves: selectedMoves,
      };

      try {
        await axios.post(`${serverUrl}/api/controller/led/climb-builder`, payload);
        console.log("Live update sent to ESP:", selectedMoves);
      } catch (error) {
        console.error("Error sending live update:", error);
      }
    };

    sendLiveClimb();
  }, [selectedMoves, espIp, serverUrl, routeName]);

  return (
    <div className="p-2">
      <h2>Climb Builder</h2>

      <div style={{ marginBottom: 20 }}>
        <label>
          ESP32 IP:{" "}
          <input
            type="text"
            value={espIp}
            onChange={(e) => setEspIp(e.target.value)}
          />
        </label>
        <br />
        <label>
          Route Name:{" "}
          <input
            type="text"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
          />
        </label>
      </div>
      <div className="flex flex-col-reverse sm:flex-row w-full gap-1 sm:gap-5">
        <div className="flex-1">
          <h3>Selected Moves</h3>
          <ul>
            {selectedMoves
              .slice() // make a shallow copy to avoid mutating state
              .sort((a, b) => b.description - a.description)
              .map((move) => (
                <li key={move.description} className="flex justify-between">
                  <div>
                    LED {move.description}{" "}
                    <button
                      onClick={() => updateMoveType(move.description, "start")}
                      className={`rounded ${
                        move.isStart ? `bg-green-500` : `bg-white`
                      }`}
                    >
                      {"S"}
                    </button>
                    <button
                      onClick={() => updateMoveType(move.description, "end")}
                      className={`rounded ${
                        move.isEnd ? `bg-red-500` : `bg-white`
                      }`}
                    >
                      {"E"}
                    </button>
                  </div>
                  <button onClick={() => removeMove(move.description)}>
                    -
                  </button>
                </li>
              ))}
          </ul>
        </div>
        {renderGrid()}
      </div>
      <button>add Route</button>
    </div>
  );
};

export default ClimbBuilder;
