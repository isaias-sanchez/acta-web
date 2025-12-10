import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

console.log('Intentando conectar con Gmail...');

transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Error en la conexión:', error);
    } else {
        console.log('✅ CONEXIÓN EXITOSA CON GMAIL');
    }
});
