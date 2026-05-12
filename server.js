const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- CONFIGURACIÓN TÉCNICA SNAPSPHERE ---
const dbUser = "snapsphere2_0";
const dbPass = "soportesnapsphere";
const dbName = "snapsphere_db";

// Usamos la URI directa sin SRV para evitar el caché de red
const MONGO_URI = `mongodb://${dbUser}:${dbPass}@cluster0-shard-00-00.1rgsxra.mongodb.net:27017,cluster0-shard-00-01.1rgsxra.mongodb.net:27017,cluster0-shard-00-02.1rgsxra.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-1rgsxra-shard-0&authSource=admin&retryWrites=true&w=majority`;

console.log("🚀 INICIANDO PROTOCOLO DE CONEXIÓN...");

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("************************************");
        console.log("✅ SEÑAL ACTIVA: MONGO DB CONECTADO");
        console.log("************************************");
    })
    .catch(err => {
        console.log("❌ ERROR DE RED DETECTADO:");
        console.log(err.message);
    });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`📡 SERVIDOR ESCUCHANDO EN PUERTO ${PORT}`);
});