import React from "react";
import { Link } from "react-router-dom";

export default function Header({ token, onLogout }) {
  return (
    <div
      style={{
        background: "#f4f4f4",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <Link to="/" style={{ fontWeight: "bold", textDecoration: "none", color: "#333" }}>
        Le Bon Coin MERN
      </Link>
      {token && (
        <button onClick={onLogout}>Se déconnecter</button>
      )}
    </div>
  );
}
