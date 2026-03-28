import { useEffect, useState } from "react";
import { getRanking } from "../lib/gameDB";

export default function RankingPanel() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      const data = await getRanking();
      if (active) {
        setRanking(data || []);
        setLoading(false);
      }
    };

    void load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <div
        style={{
          fontFamily: "'Cinzel', serif",
          color: "#f0c040",
          fontSize: "18px",
          letterSpacing: "2px",
          marginBottom: "18px",
        }}
      >
        Ranking
      </div>
      <div
        style={{
          overflowX: "auto",
          border: "1px solid rgba(201,147,58,0.28)",
          borderRadius: "8px",
          background: "rgba(18,10,5,0.65)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}>
          <thead>
            <tr>
              {["Posición", "Nombre", "Partidas", "Nodos explorados", "Finales encontrados"].map((header) => (
                <th
                  key={header}
                  style={{
                    padding: "12px 14px",
                    borderBottom: "1px solid rgba(201,147,58,0.22)",
                    color: "#f0c040",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "12px",
                    textAlign: "left",
                    letterSpacing: "1px",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ padding: "18px 14px", color: "#d8bc8c" }}>
                  Cargando ranking...
                </td>
              </tr>
            ) : ranking.length ? (
              ranking.map((entry, index) => {
                const endings = [
                  entry.ending_hero,
                  entry.ending_dark,
                  entry.ending_dead,
                  entry.ending_exile,
                ].filter(Boolean).length;

                return (
                  <tr key={`${entry.player_name}-${index}`}>
                    <td style={{ padding: "12px 14px", color: "#f7df95" }}>{index + 1}</td>
                    <td style={{ padding: "12px 14px", color: "#f0d080" }}>{entry.player_name}</td>
                    <td style={{ padding: "12px 14px", color: "#d8bc8c" }}>{entry.partidas_jugadas || 0}</td>
                    <td style={{ padding: "12px 14px", color: "#d8bc8c" }}>
                      {(entry.nodes_visited || []).length}
                    </td>
                    <td style={{ padding: "12px 14px", color: "#d8bc8c" }}>{endings}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: "18px 14px", color: "#d8bc8c" }}>
                  Todavía no hay aventureros en el ranking.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
