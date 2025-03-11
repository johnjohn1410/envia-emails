import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import process from 'process';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'interface')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'interface', 'index.html'));
});
app.get('/send-email', (req, res) => {
    res.sendFile(path.join(__dirname, 'interface', 'send-email.html'));
});

let transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWD
        }
});
app.post('/send-email', (req, res) => {
    const { email, assunto, mensagem } = req.body;

    const mensagemFormatada = mensagem.replace(/\n/g, '<br>');

const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: assunto,
    html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
            <p style="margin: 0 0 16px;">${mensagemFormatada}</p>
        </div>
    `,
};
    transporter.sendMail(mailOptions, (error, info) =>{
        if (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
        res.status(200).redirect('/send-email');
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})

