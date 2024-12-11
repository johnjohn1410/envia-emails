const nodemailer = require('nodemailer');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'martelletojoaovitor@gmail.com',
        pass: 'jyhb wrvu icfj kjps'
        }
});

let mailOptions = {
    from: 'martelletojoaovitor@gmail.com',
    to: 'steixeira@almavivasolutions.com.br',
    subject: 'Currículo Almaviva Solutions',
    html: '<h1>Olá, tudo bem?</h1> <h2>Segue currículo em anexo.</h2>',
    attachments:[
        {
            filename: 'CURRÍCULO_PADRÃO.doc',
            path: '/dev/projects/envia-emails/arquivos/CURRÍCULO_PADRÃO.doc'
        }
    ]
};

transporter.sendMail(mailOptions, (error, info) =>{
    if (error) {
        return console.log(error);
    }
    console.log('Email enviado: ' + info.response)
})