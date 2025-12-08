import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Log para depuración
console.log('Usuario configurado:', process.env.EMAIL_USER);

// Configuración de transporte (Transporter) - Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // BORRA process.env.EMAIL_USER y pon tu correo real entre comillas
        user: 'acta.proyect@gmail.com',

        // BORRA process.env.EMAIL_PASS y pega tu contraseña de 16 letras
        pass: 'nazlxzghyxvcfkfr'
    }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.post('/api/send-email', async (req, res) => {
    console.log('📩 Petición recibida desde el frontend');
    console.log('Datos:', req.body);

    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const mailOptions = {
            from: '"ACTA Notificaciones" <acta.proyect@gmail.com>',
            to: 'acta.proyect@gmail.com',
            replyTo: email,
            subject: `🔔 NUEVO PROYECTO - ${nombre}`,
            text: `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Correo enviado correctamente a Gmail');
        res.status(200).json({ message: 'Correo enviado con éxito' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
});


// Servir archivos estáticos del frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

// Cualquier otra ruta devuelve el index.html (para que funcione la navegación)
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
