import React from "react";

function StatsPage({ urls }) {
  return (
    <div className="stats-container">
      <h2>URL Statistics</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Shortcode</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Original URL</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Created</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Validity</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((u, i) => {
            const createdTime = new Date(u.created).toLocaleString();
            return (
              <tr key={i}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{u.short}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{u.original}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{createdTime}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{u.validity} min</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{u.clicks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StatsPage;