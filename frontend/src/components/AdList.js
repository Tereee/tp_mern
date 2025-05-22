import React, { useEffect, useState } from "react";
import AdItem from "./AdItem";
import AdForm from "./AdForm";


export default function AdList({ token }) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [ads, setAds] = useState([]);

    const fetchAds = async () => {
        const res = await fetch("http://localhost:3000/api/ads");
        const data = await res.json();
        setAds(data);
    };

    useEffect(() => {
        fetchAds();
    }, []);

    const handleDeleted = (id) => {
        setAds(prev => prev.filter(ad => ad._id !== id));
    };

    return (
        
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
        <label style={{ display: "block", marginBottom: "10px" }}>
            Filtrer par catégorie :
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ marginLeft: "10px" }}
            >
                <option value="">Toutes</option>
                <option value="Électronique">Électronique</option>
                <option value="Immobilier">Immobilier</option>
                <option value="Véhicules">Véhicules</option>
                <option value="Autres">Autres</option>
            </select>
        </label>
        <h1>Liste des annonces</h1>
        <AdForm token={token} onCreated={(newAd) => setAds((prev) => [newAd, ...prev])} />
        {ads
        .filter(ad => !selectedCategory || ad.category === selectedCategory)
        .map(ad => (
        <AdItem key={ad._id} ad={ad} token={token} onDeleted={handleDeleted} />
        ))}
    </div>
    );

}
