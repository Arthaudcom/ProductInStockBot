const puppeteer = require('puppeteer');
const fs = require('fs');
const nodemailer = require("nodemailer");


(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    //url du produit désiré
    const url = 'https://www.bestbuy.ca/fr-ca/produit/energizer-chargeur-maxi-d-energizer-avec-4-piles-rechargeables-aa-nimh-chvcmwb4-chvcmwb4/10135654';
    await page.waitForTimeout(3000); //Vérifie si le bouton de rupture de stock apparaît sur la page

    await page.goto(url);  //navigue vers l'url
    //sélécteur css du bouton de rupture de stock, si il est sur la page cela signiie que le produit n'est pas disponible
    const dispo = '#test > button[disabled]';
    const waiter = '#test > button';     //sélécteur css présent lorsque la page est chargée
    await page.waitForSelector(waiter); //attend que la page se charge
    if (await page.$(dispo) == null) {  //
        mail(url).catch(console.error);
    } else {
         console.log("produit indisponible") }
    console.log('end');
    await browser.close();
})();

// async..await is not allowed in global scope, must use a wrapper
async function mail(url) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtpbv.univ-lyon1.fr",
        port: 587,
        secure: false, // true for 465, false nfor other ports
        auth: {
            user: "p2001337", // generated ethereal user
            pass: "@Assassin_sith64@", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Arthaud Morin" <arthaud.morin@etu.univ-lyon1.fr>', // sender address
        to: "arthaudmorin@gmail.com", // list of receivers
        subject: "!![AVAILABLE PRODUCT]!!", // Subject line
        html: "<b>"+ url +"</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


