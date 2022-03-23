const puppeteer = require('puppeteer');
const fs = require('fs');
const nodemailer = require("nodemailer");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const  host  =  "testsmtp.fr"; //Simple mail transfer protocol adress
    const  port=  587;
    const  username=  "tes@gmail.com"; // username (souvent une adresse email)
    const  password  =  "MotdePaaase"; // mot de passe
    const  receiver  =  "receveur@gmail.com"; //personnes à qui envoyer le mail
    const  sender  =  '"John doe" <JohnDoe@gmail.fr>';


    const objet = "RTX3060" //Nom de l'objet que vous voulez acheter

    //url du produit désiré
    const url = 'https://www.bestbuy.ca/fr-ca/produit/energizer-chargeur-maxi-d-energizer-avec-4-piles-rechargeables-aa-nimh-chvcmwb4-chvcmwb4/10135654';

    //sélécteur css du bouton de rupture de stock, si il est sur la page cela signifie que le produit n'est pas disponible
    const dispo = '#test > button[disabled]';

    //sélécteur css présent lorsque la page est chargée
    const waiter = '#test > button';

    console.log("navigation vers l'url");
    await page.goto(url);  //navigue vers l'url
    let done = false;
    while (done == false){
    console.log("reload");
    await page.reload();

    console.log("waiting for selector");
    await page.waitForSelector(waiter); //attend que la page se charge

    if (await page.$(dispo) == null) {
        mail(objet, url,host,port,username,password,receiver,sender).catch(console.error);
         done = true;
    } else {
         console.log("produit indisponible") }
    }

    console.log('end of puppeteer job');
    await browser.close();
})();

/**
 * fonction permettant de se connecter et d'envoyer un mail lorsque l'objet est disponible
 * @param {string} url lien vers la page du produit que l'on va envoyer dans le mail
 * @param {string} objet objet du mail
 */
async function mail(objet,url,host,port,username,password,receiver,sender) {

    console.log("début de l'envoi du mail...")
    let transporter = nodemailer.createTransport({
        host: host, 
        port: port,
        secure: false, // true for 465, false nfor other ports
        auth: {
            user: username,
            pass: password,
        },
    });

    let info = await transporter.sendMail({
        from: sender,
        to: receiver,
        subject: "!!["+objet+" Disponible]!!",
        html: "<b>"+ url +"</b>", 
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}


