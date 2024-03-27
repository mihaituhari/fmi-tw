const express = require('express');
const path = require('path');
const app = express();
const port = 8081;

const erori = require('./erori.json');

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Resources
app.use('/resurse', express.static(path.join(__dirname, 'resurse')));

// Routes
app.get(['/', '/index', '/home'], (req, res) => {
  res.render('pagini/index');
});

app.get('/*', (req, res) => {
  let pagina = req.path.substr(1); // eliminam slash-ul de la inceput
  res.render(`pagini/${pagina}`, function(err, rezultatRandare) {
    if (!err) {
      res.send(rezultatRandare);
      return;
    }

    if (err.message.startsWith('Failed to lookup view')) {
      // Eroare 404
      let eroare = erori.info_erori.find(e => e.identificator === 404) || erori.eroare_default;

      res.status(404).render('pagini/eroare', {
        titlu: eroare.titlu,
        text: eroare.text,
        imagine: path.join(erori.cale_baza, eroare.imagine),
      });
    } else {
      // Eroare generica
      let eroare = erori.eroare_default;

      res.status(500).render('pagini/eroare', {
        titlu: eroare.titlu,
        text: eroare.text,
        imagine: path.join(erori.cale_baza, eroare.imagine),
      });
    }
  });
});

// Boot
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

console.log('Directory of this file [__dirname]: ' + __dirname);
console.log('File path [__filename]: ' + __filename);
console.log('Current working directory [__process.cwd()]: ' + process.cwd());
