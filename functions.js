const fs = require('fs');
const path = require('path');

function getGalleryImages() {
  const allImages = JSON.parse(fs.readFileSync('galerie.json', 'utf8'));

  let currentMonth = new Date().toLocaleString('ro', {month: 'long'}); // Luna curenta in RO
  let filteredImages = allImages.imagini.
      filter(image => image.luni.includes(currentMonth)). // Filtrare dupa luna in RO
      map(image => { // Adaugare cale completa
        image.cale_fisier = path.join(allImages.cale_baza, image.cale_fisier);
        return image;
      }).
      slice(0, 12); // Limitare la 12 imagini

  return filteredImages;
}

module.exports = {getGalleryImages};
