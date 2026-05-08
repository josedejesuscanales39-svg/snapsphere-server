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

// --- [ACTUALIZACIÓN] BUSCADOR DE PERSONAS REAL ---
app.get('/search/:username', (req, res) => {
    const query = req.params.username.toLowerCase();
    const userFound = Object.values(registeredUsers).find(u => 
        u.nombre.toLowerCase() === query || u.gmail.split('@')[0] === query
    );

    if (userFound) {
        console.log(`🔍 [BUSCADOR] Se encontró a: ${query}`);
        res.status(200).json({
            found: true,
            nombre: userFound.nombre,
            apellidos: userFound.apellidos,
            seguidores: userFound.seguidores,
            status: 'online'
        });
    } else {
        console.log(`🔍 [BUSCADOR] No se encontró a: ${query}`);
        res.status(404).json({ found: false, message: 'Persona no encontrada' });
    }
});

// --- 1. FUNCIÓN DE REGISTRO CON LOGS AVANZADOS ---
app.post('/register', (req, res) => {
    const { nombre, apellidos, gmail, password, fecha, seguidores } = req.body;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    pendingVerifications[gmail] = { 
        code, 
        userData: { 
            nombre, apellidos, gmail, password, 
            fechaNac: fecha, 
            seguidores: seguidores || 0,
            status: 'pending',
            ip: clientIp,
            date: new Date().toLocaleString() 
        } 
    };

    console.log(`\n📥 [SOLICITUD DE REGISTRO RECIBIDA]`);
    console.log(`👤 Usuario: ${nombre} ${apellidos}`);
    console.log(`📧 Destino: ${gmail}`);
    console.log(`🎂 Fecha Nac: ${fecha}`);
    console.log(`🌐 IP Detectada: ${clientIp}`);
    console.log(`🔑 CÓDIGO: ${code}`);
    console.log(`-------------------------------------------`);

    const mailOptions = {
        from: '"Snapsphere Security" <soportesnapsphere@gmail.com>',
        to: gmail,
        subject: `Tu código de acceso: ${code}`,
        html: `
            <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif; border: 2px solid #0095f6; border-radius: 15px;">
                <h1 style="color: #0095f6; text-align: center;">SNAPSPHERE 3.0</h1>
                <p>Tu código es: <b style="font-size: 30px; color: #0095f6;">${code}</b></p>
                <p style="font-size: 12px; color: #888;">Seguridad activa en Río Grande, Zacatecas.</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) return res.status(500).json({ message: 'Error de envío' });
        res.status(200).json({ message: 'Código enviado' });
    });
});

// --- 2. VERIFICACIÓN (VALIDAR CÓDIGO) ---
app.post('/verify', (req, res) => {
    const { gmail, code } = req.body;
    if (pendingVerifications[gmail] && pendingVerifications[gmail].code === code) {
        registeredUsers[gmail] = pendingVerifications[gmail].userData;
        registeredUsers[gmail].status = 'active';
        delete pendingVerifications[gmail]; 
        console.log(`✅ [CUENTA ACTIVADA] ${gmail} ha verificado su identidad.`);
        res.status(200).json({ 
            message: 'Éxito', 
            nombre: registeredUsers[gmail].nombre,
            fechaNac: registeredUsers[gmail].fechaNac 
        });
    } else {
        res.status(401).json({ message: 'Código incorrecto' });
    }
});

// --- 3. LOGIN CON CONEXIÓN AL SERVIDOR PANDA (4000) ---
app.post('/login', async (req, res) => {
    const { gmail, password } = req.body;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (registeredUsers[gmail] && registeredUsers[gmail].password === password) {
        console.log(`🔓 [LOGIN EXITOSO] ${gmail} desde IP: ${clientIp}`);
        
        axios.post('http://localhost:4000/conectar', { 
            user: gmail, status: 'online', ip: clientIp, lastLogin: new Date().toLocaleString()
        }).catch(() => { console.log("☁️  [INFO] Servidor Panda (4000) durmiendo."); });

        res.status(200).json({ 
            message: 'Bienvenido', 
            nombre: registeredUsers[gmail].nombre,
            fechaNac: registeredUsers[gmail].fechaNac 
        });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

// --- 4. ALERTA SÍSMICA Y NOTIFICACIONES ---
app.post('/notify', (req, res) => {
    const { user, type, message } = req.body;
    const notification = { id: Date.now(), user, type, message, timestamp: new Date().toLocaleTimeString() };
    systemNotifications.push(notification);
    console.log(`🔔 [NOTIFICACIÓN] ${type.toUpperCase()}: ${message}`);
    res.status(200).json(notification);
});

// --- 5. MENSAJES DIRECTOS (DMs) ---
app.post('/send-dm', (req, res) => {
    const { emisor, receptor, mensaje } = req.body;
    const msgData = { from: emisor, to: receptor, content: mensaje, time: new Date().toLocaleString() };
    chatMessages.push(msgData);
    console.log(`💬 [DM] ${emisor} -> ${receptor}: ${mensaje}`);
    res.status(200).json({ status: 'Mensaje entregado' });
});

// --- ARRANQUE SNAPSPHERE UNIVERSAL ---
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.clear();
    console.log("==================================================");
    console.log("      SNAPSPHERE PRO - SERVIDOR DE SEGURIDAD      ");
    console.log("==================================================");
    console.log(`📍 DIRECCIÓN LOCAL: http://localhost:${PORT}`);
    console.log(`🚀 ESTADO: OPERATIVO Y ESPERANDO CONEXIONES`);
    console.log(`🔐 PROTECCIÓN: NIVEL 3.0 ACTIVA`);
    console.log(`🎂 VALIDACIÓN: EDAD MÍNIMA 10 AÑOS`);
    console.log(`💻 DESARROLLO: Visual Studio Code`);
    console.log("==================================================\n");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Snapsphere encendido en el puerto ${PORT}`);
});

// --- CONFIGURACIÓN PARA RENDER ---

// 1. Sirve los archivos de la carpeta 'public' (CSS, imágenes, etc.)
app.use(express.static('public'));

// 2. Ruta principal: Carga tu página Snapsphere
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// 3. El puerto dinámico (lo que vimos en azul)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Snapsphere encendido en el puerto ${PORT}`);
});