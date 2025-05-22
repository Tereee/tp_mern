import React, { useState } from "react";

export default function AdForm({ token, onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, price, category }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur de création");

      setMessage("Annonce créée !");
      setError("");
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      onCreated(data.ad);
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>Créer une annonce</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />
        <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        style={{ display: "block", width: "100%", marginBottom: 10 }}
        >
        <option value="">-- Choisir une catégorie --</option>
        <option value="Électronique">Électronique</option>
        <option value="Immobilier">Immobilier</option>
        <option value="Véhicules">Véhicules</option>
        <option value="Autres">Autres</option>
        </select>
        <button type="submit">Publier</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
