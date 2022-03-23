const puppeteer = require('puppeteer');
const fs = require('fs');
const nodemailer = require("nodemailer");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://www.bestbuy.ca/fr-ca/produit/carte-graphique-avec-memoire-gddr6-de-8-go-geforce-rtx-3060-ti-de-nvidia/15166285';

    await page.goto(url);  //navigue vers l'url

    const dispo = '#test > button[disabled]';
    const waiter = '#test > button';
            await page.waitForSelector(waiter); //attend que le selecteur css se charge
            try { //vérifie si la page existe bien
                await page.waitForSelector(dispo, { timeout: 3000 })
                if (await page.$(dispo) == null) {  //récupère le texte dans le selecteur de mail si il est bien présent
                    
                }
            } catch (error) { }
            await page.goBack();
            await page.waitForSelector(Agences);
    console.log('end');
    await browser.close();
})();

// async..await is not allowed in global scope, must use a wrapper
async function mail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

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
    text: url, // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
