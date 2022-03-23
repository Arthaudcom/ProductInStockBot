const puppeteer = require('puppeteer');
const fs = require('fs');
const nodemailer = require("nodemailer");

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    //url du produit désiré
    const url = 'https://www.bestbuy.ca/fr-ca/produit/carte-graphique-avec-memoire-gddr6-de-8-go-geforce-rtx-3060-ti-de-nvidia/15166285';

    //sélécteur css du bouton de rupture de stock, si il est sur la page cela signiie que le produit n'est pas disponible
    const dispo = '#test > button[disabled]';

    //sélécteur css présent lorsque la page est chargée
    const waiter = '#test > button';

    await page.goto(url);  //navigue vers l'url
    let done = false;
    while (done == false){
    console.log("reload");
    await page.reload();

    console.log("waiting for selector");
    await page.waitForSelector(waiter); //attend que la page se charge

    if (await page.$(dispo) == null) {
        mail(url).catch(console.error);
         done = true;
    } else {
         console.log("produit indisponible") }
    }

    console.log('end of puppeteer job');
    await browser.close();
})();

/**
 * fonction permettant de se connecter et d'envoyer un mail
 * @param {string} url lien vers la page du produit que l'on va envoyer dans le mail
 */
async function mail(url) {

    console.log("début de l'envoi du mail...")
    let transporter = nodemailer.createTransport({
        host: "smtpbv.univ-lyon1.fr", //Simple mail transfer protocol adress
        port: 587,
        secure: false, // true for 465, false nfor other ports
        auth: {
            user: "p2001337", // username (usually an email adress)
            pass: "VroumVroum", // password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Arthaud Morin" <arthaud.morin@etu.univ-lyon1.fr>', // sender address
        to: "arthaudmorin@gmail.com", // list of receivers
        subject: "!![AVAILABLE PRODUCT]!!", // Subject line
        html: "<b>"+ url +"</b>", 
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}


