import React from "react";
import { Link } from "react-router-dom";

export default function AdItem({ ad, token, onDeleted }) {
  const handleDelete = async () => {
    if (!token) return;
    await fetch(`http://localhost:3000/api/ads/${ad._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    onDeleted(ad._id);
  };

  return (
    <div style={{
      border: "1px solid #ccc", padding: 10, marginBottom: 10, borderRadius: 4
    }}>
        <h2>
            <Link to={`/ads/${ad._id}`}>{ad.title}</Link>
        </h2>
        <p>{ad.description}</p>
        <p><strong>Prix :</strong> {ad.price}€</p>
            <p><strong>Categorie</strong> {ad.category}</p>
        <p><strong>Auteur :</strong> {ad.author.username}</p>
        {token && (
            <button onClick={handleDelete}>Supprimer</button>
        )}
    </div>
  );
}
