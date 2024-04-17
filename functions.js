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

module.exports = {getGalleryImages};
