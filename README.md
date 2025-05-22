# TP MERN Florian Dardy - Leboncoin

Projet MERN (MongoDB, Express, React, Node.js) inspiré du site Leboncoin

---
## 🔧 Prérequis

- Node.js (version LTS) : https://nodejs.org  
- npm (installé avec Node.js)  
- MongoDB : https://www.mongodb.com/try/download/community  
> MongoDB doit être lancé en local sur `mongodb://127.0.0.1:27017`
---

## ✅ Fonctionnalités

- Authentification (inscription / connexion) sécurisée (bcrypt + JWT)
- Création, consultation et suppression d'annonces
- Association automatique de l’auteur à l’annonce
- Filtrage par catégorie
- Page de détails pour chaque annonce
- Stockage du token en localStorage
- Gestion de l’état avec `useState`
- Déconnexion accessible sur toutes les pages

---

## 🚀 Installation

### 1.1 Cloner le projet
```bash
git clone git@github.com:Tereee/tp_mern.git
cd tp_Mern
```
### 1.2 Installer le backend
```bash
cd backend
npm install
```
### 1.3 Lancer le backend
```bash
node index.js
```
### Ouvrir un autre terminal pour le frontend
### 1.4 Installer le frontend
```bash
cd frontend
npm install
```
### 1.5 Lancer l'application React
```bash
npm start
```