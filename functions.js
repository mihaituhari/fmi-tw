const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sizes = [1000, 600, 400];

function getGalleryImages() {
  const allImages = JSON.parse(fs.readFileSync('galerie.json', 'utf8'));
  const thumbsDir = allImages.cale_baza + '/thumbs';

  let currentMonth = new Date().toLocaleString('ro', {month: 'long'}); // Luna curenta in RO
  let filteredImages = allImages.imagini.
      filter(image => image.luni.includes(currentMonth)). // Filtrare dupa luna in RO
      map(image => {
        const sourcePath = path.join(allImages.cale_baza, image.cale_fisier);
        image.thumbs = {};

        for (let size of sizes) {
          let thumbDir = path.join(thumbsDir, size.toString());
          if (!fs.existsSync(thumbDir)) {
            fs.mkdirSync(thumbDir, {recursive: true});
          }

          const thumbPath = path.join(thumbDir, image.cale_fisier);
          if (!fs.existsSync(thumbPath)) {
            sharp(path.join(__dirname, sourcePath)).resize(size, size).toFile(thumbPath);
          }

          image.thumbs[size] = path.join('/', thumbPath);
        }

        return image;
      }).
      slice(0, 12); // Limitare la 12 imagini

  return filteredImages;
}

function getEvents(client, categorie_1, keyword) {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM evenimente';
    let params = [];
    let whereClauses = [];

    if (categorie_1) {
      console.log('a');
      whereClauses.push('categorie_1 = $' + (params.length + 1));
      params.push(categorie_1);
    }

    if (keyword) {
      whereClauses.push('LOWER(TRIM(nume)) LIKE $' + (params.length + 1));
      keyword = keyword.toLowerCase().trim();
      params.push('%' + keyword + '%');
    }

    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    query += ' ORDER BY data DESC';

    client.query(query, params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        // Transformam fiecare row intr-un obiect
        let events = res.rows.map(row => {
          let event = {};
          for (let prop in row) {
            event[prop] = row[prop];
          }

          event.imagine = event.imagine.split(',');
          event.nume_normalizat = faraDiacritice(event.nume.toLowerCase());

          return event;
        });

        resolve(events);
      }
    });
  });
}

function getEventById(client, id) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM evenimente WHERE id = $1';
    const params = [id];

    client.query(query, params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        let event = res.rows[0];
        event.imagine = event.imagine.split(',');

        resolve(event);
      }
    });
  });
}

function faraDiacritice(str) {
  const diacritice = {
    'ă': 'a',
    'â': 'a',
    'î': 'i',
    'ș': 's',
    'ț': 't',
    'Ă': 'A',
    'Â': 'A',
    'Î': 'I',
    'Ș': 'S',
    'Ț': 'T',
  };

  return str.split('').map(function(char) {
    return diacritice[char] || char;
  }).join('');
}

module.exports = {getGalleryImages, getEvents, getEventById, faraDiacritice};
