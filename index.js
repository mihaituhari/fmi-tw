const express = require('express');
const path = require('path');
const fs = require('fs');
const sass = require('sass');

let obGlobal = {
  obErori: null,
  folderScss: path.join(__dirname, 'resurse', 'scss'),
  folderCss: path.join(__dirname, 'resurse', 'css'),
  folderBackup: path.join(__dirname, 'backup'),
};

const app = express();
const port = 8081;

const {initErori, afisareEroare} = require('./errorManagement');

console.log(`\n🚀 Serverul porneste ...`);
console.log('→ Folderul fisierului [__dirname]: ' + __dirname);
console.log('→ Cale fisier [__filename]: ' + __filename);
console.log('→ Folderul curent de lucru [__process.cwd()]: ' + process.cwd());

/**
 * Creare foldere temporare.
 */
let createFolders = ['temp', 'backup'];

console.log('\n 📁 Creare foldere temporare: ');
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
  let caleBackup = path.join(caleBackupFolderCss, path.basename(caleCssAbsoluta));
  if (fs.existsSync(caleCssAbsoluta)) {
    fs.copyFileSync(caleCssAbsoluta, caleBackup);
  }

  // Compilam SCSS in CSS
  let rezultat = sass.compile(caleScssAbsoluta, {'sourceMap': true});
  fs.writeFileSync(caleCssAbsoluta, rezultat.css);
}

// Compilare initiala
console.log('\n 📦 Compilare SCSS/SASS in CSS:');
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
    afisareEroare(res, 403);
  } else {
    next();
  }
});
app.use((req, res, next) => {
  if (req.path.endsWith('.ejs')) {
    afisareEroare(res, 400);
  } else {
    next();
  }
});

/**
 * Routes.
 */
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'resurse', 'ico', 'favicon.ico'));
});

app.get(['/', '/index', '/home', '/*'], (req, res) => {
  let pagina;
  let userIP = req.ip;

  if (['/', '/index', '/home'].includes(req.path)) {
    pagina = 'index';
  } else {
    pagina = req.path.substr(1); // Eliminam primul caracter (/)
  }

  res.render(`pagini/${pagina}`, {ip: userIP}, function(err, rezultatRandare) {
    if (!err) {
      res.send(rezultatRandare);
      return;
    }

    if (err.message.startsWith('Failed to lookup view')) { // Eroare 404
      afisareEroare(res, 404);
    } else { // Eroare generica
      afisareEroare(res);
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
