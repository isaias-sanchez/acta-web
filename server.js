import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Inicializar Express
const app = express();
// Usar el puerto de Hostinger (process.env.PORT) o 3000 por defecto
const PORT = process.env.PORT || 3000;

// 2. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Servir archivos estáticos de la carpeta 'dist' (Build de Vite)
// Esto es VITAL para que el navegador encuentre el JS/CSS.
const staticPath = path.join(__dirname, 'dist');
app.use(express.static(staticPath));

// 4. Ruta para enviar correos
app.post('/api/send-email', async (req, res) => {
    // ⚠️ Hostinger inyecta estas variables de entorno
    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_PASS = process.env.GMAIL_PASS;

    // Verificar que las variables existen. Si no, el servidor NO crashea.
    if (!GMAIL_USER || !GMAIL_PASS) {
        console.error("ERROR: GMAIL_USER o GMAIL_PASS no están definidas en el entorno.");
        return res.status(500).json({ error: "Configuración de correo incompleta en el servidor." });
    }

    const { nombre, email, mensaje } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS, // Contraseña de aplicación
        },
    });

    const mailOptions = {
        from: GMAIL_USER, // El correo que usamos para enviar
        to: GMAIL_USER, // Tu correo donde recibirás el mensaje
        subject: `[ACTA WEB] Nuevo Mensaje de: ${nombre}`,
        html: `
            <h3>Nuevo Contacto de la Web</h3>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${mensaje}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Correo enviado con éxito.' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Fallo al enviar el correo. Revisa la consola del servidor.' });
    }
});

// 5. Catch-all: Sirve el index.html para cualquier otra ruta (esencial)
app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

// 6. Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Node.js corriendo en el puerto ${PORT}`);
});