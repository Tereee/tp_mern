import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function AdDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      const res = await fetch(`http://localhost:3000/api/ads`);
      const data = await res.json();
      const found = data.find((a) => a._id === id);
      setAd(found);
    };
    fetchAd();
  }, [id]);

  if (!ad) return <p>Chargement...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "30px auto" }}>
      <Link to="/">← Retour</Link>
      <h1>{ad.title}</h1>
      <p>{ad.description}</p>
      <p><strong>Prix :</strong> {ad.price}€</p>
      <p><strong>Catégorie :</strong> {ad.category || "Non renseignée"}</p>
      <p><strong>Posté par :</strong> {ad.author.username}</p>
    </div>
  );
}
