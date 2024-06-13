const express = require('express');
const path = require('path');
const fs = require('fs');
const sass = require('sass');
const {Client} = require('pg');

/**
 * Conectare la DB.
 */
const client = new Client({
  user: 'mihai',
  host: 'localhost',
  database: 'tw',
  password: '',
  port: 5432,
});

client.connect();

let obGlobal = {
  obErori: null,
  folderScss: path.join(__dirname, 'resurse', 'scss'),
  folderCss: path.join(__dirname, 'resurse', 'css'),
  folderBackup: path.join(__dirname, 'backup'),
  categorii: {
    'muzica': 'Muzică',
    'sport': 'Sport',
    'arta': 'Artă',
  },
};

const app = express();
const port = 8081;

const {initErori, afisareEroare} = require('./errorManagement');
const {getGalleryImages, getEvents, getEventById} = require('./functions');

console.log(`\n🚀 Serverul porneste ...`);
console.log('→ Folderul fisierului [__dirname]: ' + __dirname);
console.log('→ Cale fisier [__filename]: ' + __filename);
console.log('→ Folderul curent de lucru [__process.cwd()]: ' + process.cwd());

/**
 * Creare foldere temporare.
 */
let createFolders = ['temp', 'backup'];

console.log('\n📁 Creare foldere temporare: ');
createFolders.forEach((folder) => {
  let folderPath = path.join(__dirname, folder);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(` → ${folder} a fost creat.`);
  } else {
    console.log(` → ${folder} există deja.`);
  }
});

/**
 * Compilare SCSS/SASS in CSS.
 */
function compileazaScss(caleScss, caleCss) {
  console.log(` → compilare ${caleScss} -> ${caleCss}`);

  // Verificam daca calea este relativa sau absoluta
  let caleScssAbsoluta = path.isAbsolute(caleScss) ? caleScss : path.join(obGlobal.folderScss, caleScss);
  let caleCssAbsoluta = path.isAbsolute(caleCss) ? caleCss : path.join(obGlobal.folderCss, caleCss);

  // Creaza folder backup daca nu exista
  let caleBackupFolderCss = path.join(obGlobal.folderBackup, 'resurse', 'css');
  if (!fs.existsSync(caleBackupFolderCss)) {
    fs.mkdirSync(caleBackupFolderCss, {recursive: true});
  }

  // Salvam fisierul CSS vechi (daca exista) in folderul de backup
  let date = new Date();
  let timestamp = date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date.getDate().toString().padStart(2, '0') + '_' +
      date.getHours().toString().padStart(2, '0') +
      date.getMinutes().toString().padStart(2, '0'); // Format: YYYYMMDD-HHMM

  let caleBackup = path.join(caleBackupFolderCss, path.basename(caleCssAbsoluta, '.css') + '_' + timestamp + '.css');
  if (fs.existsSync(caleCssAbsoluta)) {
    fs.copyFileSync(caleCssAbsoluta, caleBackup);
  }

  // Compilam SCSS in CSS
  let rezultat = sass.compile(caleScssAbsoluta, {'sourceMap': true});
  fs.writeFileSync(caleCssAbsoluta, rezultat.css);
}

// Compilare initiala
console.log('\n📦 Compilare SCSS/SASS in CSS:');
fs.readdirSync(obGlobal.folderScss).forEach(file => {
  if (path.extname(file) === '.sass') {
    compileazaScss(file, path.basename(file, '.sass') + '.css');
  }
});

// Compilare pe parcurs
fs.watch(obGlobal.folderScss, (eventType, filename) => {
  if (eventType === 'change' && path.extname(filename) === '.sass') {
    compileazaScss(filename, path.basename(filename, '.sass') + '.css');
  }
});

/**
 * Views.
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**
 * Resources.
 */
app.use('/resurse', express.static(path.join(__dirname, 'resurse')));
app.use('/resurse', (req, res, next) => {
  if (req.path.endsWith('/')) {
    afisareEroare(obGlobal, res, 403);
  } else {
    next();
  }
});
app.use((req, res, next) => {
  if (req.path.endsWith('.ejs')) {
    afisareEroare(obGlobal, res, 400);
  } else {
    next();
  }
});

app.use((req, res, next) => {
  res.locals.obGlobal = obGlobal;
  next();
});

/**
 * Routes.
 */
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'resurse', 'ico', 'favicon.ico'));
});

app.get('/evenimente/:categorie?', async (req, res) => {
  let categorie_1 = req.params.categorie;

  if (categorie_1 && !obGlobal.categorii.hasOwnProperty(categorie_1)) {
    afisareEroare(obGlobal, res, 404);
    return;
  }

  try {
    let events = await getEvents(client, categorie_1);
    res.render('pagini/evenimente', {events: events, categorie_1: categorie_1});
  } catch (err) {
    afisareEroare(obGlobal, res, 500);
  }
});

app.get('/eveniment/:id', async (req, res) => {
  let id = req.params.id;
  let modal = req.query.modal === '1';

  let view = modal ? 'fragmente/eveniment' : 'pagini/eveniment';

  try {
    let event = await getEventById(client, id);

    if (event) {
      res.render(view, {event: event, modal: modal});
    } else {
      afisareEroare(obGlobal, res, 404);
    }
  } catch (err) {
    afisareEroare(obGlobal, res, 500);
  }
});

app.get(['/', '/index', '/home', '/*'], (req, res) => {
  let pagina;
  let userIP = req.ip;
  let galleryImages = getGalleryImages();

  if (['/', '/index', '/home'].includes(req.path)) {
    pagina = 'index';
  } else {
    pagina = req.path.substr(1); // Eliminam primul caracter (/)
  }

  res.render(`pagini/${pagina}`, {ip: userIP, galleryImages: galleryImages}, function(err, rezultatRandare) {
    if (!err) {
      res.send(rezultatRandare);
      return;
    }

    if (err.message.startsWith('Failed to lookup view')) { // Eroare 404
      afisareEroare(obGlobal, res, 404);
    } else { // Eroare generica
      afisareEroare(obGlobal, res);
    }
  });
});



/**
 * Boot.
 */
app.listen(port, () => {
  console.log(`\n🟢 Serverul a pornit pe portul ${port}`);
});

// Initializare erori
initErori(obGlobal);
