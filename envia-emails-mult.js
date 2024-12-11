const nodemailer = require('nodemailer');
const path = require('path');

const destinatarios = [
    'martelletojoaovitor@gmail.com',
    'ma.vitorio13@gmail.com'
];

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'martelletojoaovitor@gmail.com',
        pass: 'jyhb wrvu icfj kjps'
    }
});


destinatarios.forEach((email) => {
    let mailOptions = {
        from: 'martelletojoaovitor@gmail.com',
        to: email,
        subject: 'Currículo Almaviva Solutions',
        html: '<h1>Olá, tudo bem?</h1> <h2>Segue currículo em anexo.</h2>',
        attachments: [
            {
                filename: 'CURRÍCULO_PADRÃO.doc',
                path: 'C:\\dev\\projects\\envia-emails\\arquivos\\CURRÍCULO_PADRÃO.doc'
            }
        ]
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Erro ao enviar para ${email}: `, error);
        } else {
            console.log(`Email enviado para ${email}: ` + info.response);
        }
    });
});
