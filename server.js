// ==========================================
// SNAPSPHERE - NÚCLEO DE ENLACE OPTIMIZADO
// ==========================================
const express = require('express');
const cors = require('cors'); // La llave maestra para el celular
const os = require('os');     // El radar para encontrar tu IP

const app = express();

// --- OPTIMIZACIÓN DE PERMISOS ---
app.use(cors()); // Abre la puerta a conexiones externas (celular)
app.use(express.json({ limit: '50mb' })); // Optimizado para recibir videos pesados
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const { MongoClient } = require('mongodb');

// Esta es tu dirección secreta que copiaste de Atlas
const uri = "mongodb+srv://josedejesuscanales39_db_user:q3xz2aVro8zjn4Ih@cluster0.1rgsxra.mongodb.net/?retryWrites=true&w=majority";
async function conectarBase() {
    try {
        await client.connect();
        console.log("¡Conexión exitosa! Snapsphere ya guarda datos.");
    } catch (e) {
        console.error("Error de conexión:", e);
    }
}

conectarBase();

const fs = require('fs');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios'); 

const app = express();
app.use(express.json());
app.use(cors());

// --- CONFIGURACIÓN DE SEGURIDAD 3.0 (BÚNKER) ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'soportesnapsphere@gmail.com',
        pass: 'xuhy gcsc bgew antl' 
    }
});

// Verificación inicial del búnker de correos
transporter.verify((error) => {
    if (error) {
        console.log("\n🚨 [ERROR CRÍTICO] El búnker de correos no responde.");
        console.log(error);
    } else {
        console.log("\n🛡️  [SISTEMA ACTIVO] Sistema de mensajería Snapsphere en línea.");
    }
});

// --- BASES DE DATOS VOLÁTILES (MEMORIA RAM) ---
const registeredUsers = {}; 
const pendingVerifications = {}; 
const systemNotifications = []; 
const chatMessages = []; 

// --- 1. FUNCIÓN DE REGISTRO CON LOGS AVANZADOS ---
app.post('/register', (req, res) => {
    const { nombre, apellidos, gmail, password } = req.body;
    
    // Generar código de 6 dígitos para la terminal
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    pendingVerifications[gmail] = { 
        code, 
        userData: { 
            nombre, 
            apellidos, 
            gmail, 
            password, 
            status: 'pending',
            date: new Date().toLocaleString() 
        } 
    };

    // LOG DETALLADO EN VS CODE
    console.log(`\n📥 [SOLICITUD DE REGISTRO RECIBIDA]`);
    console.log(`👤 Usuario: ${nombre} ${apellidos}`);
    console.log(`📧 Correo de destino: ${gmail}`);
    console.log(`🔑 CÓDIGO DE SEGURIDAD: ${code}`);
    console.log(`📅 Fecha/Hora: ${new Date().toLocaleString()}`);
    console.log(`-------------------------------------------`);

    const mailOptions = {
        from: '"Snapsphere Security" <soportesnapsphere@gmail.com>',
        to: gmail,
        subject: `Tu código de acceso Snapsphere: ${code}`,
        html: `
            <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif; border: 2px solid #0095f6; border-radius: 15px;">
                <h1 style="color: #0095f6; text-align: center;">SNAPSPHERE 3.0</h1>
                <p style="font-size: 16px;">Hola <strong>${nombre}</strong>,</p>
                <p>Tu cuenta está casi lista. Ingresa el siguiente código en la app para verificar tu identidad:</p>
                <div style="background: #111; font-size: 35px; font-weight: bold; color: #0095f6; text-align: center; padding: 15px; border-radius: 10px; margin: 20px 0; border: 1px dashed #0095f6;">
                    ${code}
                </div>
                <p style="font-size: 12px; color: #888; text-align: center;">Protección de datos activa en Río Grande, Zacatecas.</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(`❌ Error al enviar correo a ${gmail}`);
            return res.status(500).json({ message: 'Error de envío' });
        }
        res.status(200).json({ message: 'Código enviado' });
    });
});

// --- 2. FUNCIÓN DE VERIFICACIÓN (VALIDAR CÓDIGO) ---
app.post('/verify', (req, res) => {
    const { gmail, code } = req.body;

    if (pendingVerifications[gmail] && pendingVerifications[gmail].code === code) {
        // Mover de pendientes a usuarios oficiales
        registeredUsers[gmail] = pendingVerifications[gmail].userData;
        registeredUsers[gmail].status = 'active';
        // --- GUARDADO EN USB ---
const usbPath = 'D:/SnapSphere_Backup/usuarios.json'; // Asegúrate de que D: sea tu USB
try {
    const fs = require('fs');
    let data = [];
    if (fs.existsSync(usbPath)) {
        data = JSON.parse(fs.readFileSync(usbPath, 'utf8'));
    }
    data.push({ gmail, status: 'active', date: new Date().toISOString() });
    fs.writeFileSync(usbPath, JSON.stringify(data, null, 2));
    console.log("✅ Respaldo en USB completado.");
} catch (err) {
    console.error("❌ Error al guardar en USB:", err.message);
}
// ------------------------
        delete pendingVerifications[gmail]; 
        
        console.log(`✅ [CUENTA ACTIVADA] El usuario ${gmail} ha pasado la Verificación 3.0.`);
        res.status(200).json({ 
            message: 'Éxito', 
            nombre: registeredUsers[gmail].nombre,
            apellidos: registeredUsers[gmail].apellidos 
        });
    } else {
        console.log(`⚠️ [ALERTA] Intento de código incorrecto detectado para: ${gmail}`);
        res.status(401).json({ message: 'Código de seguridad incorrecto' });
    }
});

// --- 3. LOGIN CON CONEXIÓN SILENCIOSA AL SERVIDOR 4000 ---
app.post('/login', async (req, res) => {
    const { gmail, password } = req.body;

    if (registeredUsers[gmail] && registeredUsers[gmail].password === password) {
        console.log(`🔓 [LOGIN EXITOSO] ${gmail} ha entrado al sistema.`);

        // Validar que el usuario tenga los contadores inicializados
if (user.followers === undefined) user.followers = 0;
if (user.following === undefined) user.following = 0;
if (user.posts === undefined) user.posts = 0;

// Enviar la respuesta al frontend con los datos reales
res.status(200).json({
    message: "Login exitoso",
    user: {
        gmail: user.gmail,
        username: user.username,
        followers: user.followers,
        following: user.following,
        posts: user.posts
    }
});
        
        // Conexión con el servidor Panda (otra terminal)
        axios.post('http://localhost:4000/conectar', { 
            user: gmail,
            status: 'online',
            lastLogin: new Date().toLocaleString()
        }).catch(() => {
            console.log("☁️  [INFO] Servidor secundario Panda (4000) no detectado, operando en modo local.");
        });

        res.status(200).json({ 
            message: 'Bienvenido', 
            nombre: registeredUsers[gmail].nombre 
        });
    } else {
        console.log(`❌ [ACCESO DENEGADO] Intento de login fallido en la cuenta: ${gmail}`);
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

// --- 4. RUTA DE NOTIFICACIONES Y ALERTA SÍSMICA ---
app.post('/notify', (req, res) => {
    const { user, type, message } = req.body;
    const notification = {
        id: Date.now(),
        user,
        type, // sismo, follow, like, system
        message,
        timestamp: new Date().toLocaleTimeString()
    };
    systemNotifications.push(notification);
    console.log(`🔔 [NOTIFICACIÓN] Tipo: ${type} | Detalle: ${message}`);
    res.status(200).json(notification);
});

// --- 5. RUTA DE MENSAJES DIRECTOS (DMs) ---
app.post('/send-dm', (req, res) => {
    const { emisor, receptor, mensaje } = req.body;
    const msgData = {
        from: emisor,
        to: receptor,
        content: mensaje,
        time: new Date().toLocaleString()
    };
    chatMessages.push(msgData);
    console.log(`💬 [MENSAJE DIRECTO] De: ${emisor} -> Para: ${receptor}`);
    res.status(200).json({ status: 'Mensaje entregado' });
});

// --- ARRANQUE PROFESIONAL SNAPSPHERE ---
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.clear();
    console.log("==================================================");
    console.log("      SNAPSPHERE PRO - SERVIDOR DE SEGURIDAD      ");
    console.log("==================================================");
    console.log(`📍 DIRECCIÓN LOCAL: http://localhost:${PORT}`);
    console.log(`🚀 ESTADO: OPERATIVO Y ESPERANDO CONEXIONES`);
    console.log(`🔐 PROTECCIÓN: NIVEL 3.0 ACTIVA`);
    console.log(`💻 DESARROLLO: Visual Studio Code`);
    console.log("==================================================\n");
});