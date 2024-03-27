const fs = require('fs');
const path = require('path');

let obGlobal = {
  obErori: null,
};

function initErori() {
  const erori = JSON.parse(fs.readFileSync('erori.json', 'utf8'));

  obGlobal.obErori = erori;
  obGlobal.obErori.info_erori.forEach(eroare => {
    eroare.imagine = path.join(obGlobal.obErori.cale_baza, eroare.imagine);
  });
}

function afisareEroare(res, identificator, titlu, text, imagine) {
  let eroare;

  if (identificator) {
    eroare = obGlobal.obErori.info_erori.find(e => e.identificator === identificator);
  }

  if (!eroare) {
    eroare = obGlobal.obErori.eroare_default;
  }

  if (titlu) eroare.titlu = titlu;
  if (text) eroare.text = text;
  if (imagine) eroare.imagine = path.join(obGlobal.obErori.cale_baza, imagine);

  res.status(identificator || 500).render('pagini/eroare', {
    titlu: eroare.titlu,
    text: eroare.text,
    imagine: eroare.imagine,
  });
}

module.exports = {initErori, afisareEroare};