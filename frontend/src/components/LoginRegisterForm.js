import React, { useState } from "react";

export default function LoginRegisterForm({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur de connexion");
      localStorage.setItem("token", data.token);
      setMessage("Connexion réussie !");
      setError("");
      onAuth(data.token);
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur d'inscription");
      setMessage("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      setError("");
      setMode("login");
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h1>{mode === "login" ? "Connexion" : "Inscription"}</h1>
      <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
        {mode === "register" && (
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginBottom: 10 }}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />
        <button type="submit">
          {mode === "login" ? "Se connecter" : "S'inscrire"}
        </button>
      </form>

      <p style={{ marginTop: 15 }}>
        {mode === "login" ? (
          <>Pas encore de compte ? <button onClick={() => setMode("register")}>S'inscrire</button></>
        ) : (
          <>Déjà inscrit ? <button onClick={() => setMode("login")}>Se connecter</button></>
        )}
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}
