const express = require('express');
const path = require('path');
const app = express();
const port = 8081;
const fs = require('fs');
const {initErori, afisareEroare} = require('./errorManagement');

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Resurse
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

// Rute
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

// Boot
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

initErori();

console.log('Directory of this file [__dirname]: ' + __dirname);
console.log('File path [__filename]: ' + __filename);
console.log('Current working directory [__process.cwd()]: ' + process.cwd());
