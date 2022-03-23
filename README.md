# Product In Stock Bot

## Prérequis
1ère étape: Installer Node

2ème étape: Saisir la commande suivante dans le terminal:
```bash
 npm install
```
## Lancement de l'app

Modifier les constantes de mail qui se situent au début du code. C'est par cette adresse que vous allez recevoir des mails pour vous indiquer que le produit est disponible. Il est conseillé de créer une nouvelle adresse mail spécialement prévue à cet effet pour ne pas avoir de problème s'il y a une fuite.

 ```javascript
const  host  =  "testsmtp.fr"; //Simple mail transfer protocol adress
const  port=  587;
const  username=  "tes@gmail.com"; // username (souvent une adresse email)
const  password  =  "MotdePaaase"; // mot de passe
const  receiver  =  "receveur@gmail.com"; //personnes à qui envoyer le mail
const  sender  =  '"John doe" <JohnDoe@gmail.fr>';
```

Remplir les variables avec l'url du produit et les bons sélecteurs css pour que le bot fonctionne.
 ```javascript
 const  objet  =  "RTX3060"  //Nom de l'objet que vous voulez acheter

//url du produit désiré
const  url  =  'https://www.bestbuy.ca/fr-ca/produit/energizer-chargeur-maxi-d-energizer-avec-4-piles-rechargeables-aa-nimh-chvcmwb4-chvcmwb4/10135654';

//sélécteur css du bouton de rupture de stock, si il est sur la page cela signifie que le produit n'est pas disponible
const  dispo  =  '#test > button[disabled]';

//sélécteur css présent lorsque la page est chargée, cela permet d'indiquer au bot que la page a fini de charger
const  waiter  =  '#test > button';
```


Une fois que c'est fait,  enregistrez puis lancez la commande suivante dans le terminal :
```bash
node rtxBot.js
```
Vous n'avez plus qu'a attendre que le produit soit disponible, un mail vous sera alors envoyé.


## Le projet

Script permettant de vérifier la disponibilité d'un produit sur des sites de vente en ligne, une fois qu'il est disponible, un mail est envoyé à l'utilisateur pour l'avertir avec le lien vers le produit

<img src="https://i1.wp.com/community.nodemailer.com/wp-content/uploads/2015/10/n2-2.png" alt="drawing" width="200" style="margin:90px"/>
<img src="https://developers.google.com/web/tools/images/puppeteer.png" alt="drawing" width="120" style="margin:90px"/>   


## Objectif du projet
L'objectif original du projet est de trouver une carte graphique Nvidia . J'ai trouvé des sites qui permettaient déjà de faire ça mais le temps entre chaque vérification était de 5mn alors qu'il est seulement de quelques secondes pour le mien. Je vais aussi pouvoir le  modifier dans le futur pour le rendre encore plus performant aller plus loin dans l'automatisation.


## Les outils utilisés

### Puppeteer
Librairie Node fournissant une API permettant d'exécuter et de lancer chrome en Headless. Dans le cadre de mon projet, il est lancé pour aller sur le site qui vend le produit et recharger la page jusqu'au moment ou il va être de nouveau en vente.

### Node mailer
Node mailer est un module node permettant d'envoyer simplement des mails via Node. Dans mon projet, il va être appelé lorsque le produit est disponible, il va alors envoyer un mail pour prévenir l'utilisateur.
