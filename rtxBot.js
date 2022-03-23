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
