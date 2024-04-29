CREATE TYPE categorie_enum AS ENUM ('muzica', 'sport', 'arta');

CREATE TABLE evenimente
(
    id            SERIAL PRIMARY KEY,
    nume          TEXT,
    descriere     TEXT,
    imagine       TEXT,
    categorie_1   categorie_enum,
    categorie_2   VARCHAR(255),
    pret          DECIMAL(10, 2),
    pret_studenti DECIMAL(10, 2),
    data          DATE,
    culoare       VARCHAR(255),
    tags          VARCHAR(255),
    activ         BOOLEAN
);

-- Muzica
INSERT INTO evenimente (id, nume, descriere, imagine, categorie_1, categorie_2, pret, pret_studenti, data, culoare, tags,
                        activ)
VALUES (1, 'Concert Smiley', 'Smiley live la Arenele Romane', '/resurse/images/evenimente/1-smiley.webp', 'muzica', 'pop', 150.00,
        120.00, '2024-05-20', 'blue', 'concert,pop,smiley', TRUE),
       (2, 'Jazz in the Park', 'Festival de jazz în Parcul Central', '/resurse/images/evenimente/2-jazz-park.webp', 'muzica', 'jazz',
        90.00, 70.00, '2024-06-15', 'green', 'jazz,festival', TRUE),
       (3, 'Rock the City', 'Festival de rock în centrul orașului', '/resurse/images/evenimente/3-rock-city.webp', 'muzica', 'rock',
        200.00, 160.00, '2024-07-22', 'black', 'rock,festival', TRUE),
       (4, 'Folk Fest', 'Festival de muzică folk la malul mării', '/resurse/images/evenimente/4-folk-fest.webp', 'muzica', 'folk',
        120.00, 100.00, '2024-08-05', 'brown', 'folk,seaside', TRUE),
       (5, 'Opera Night', 'Seară de operă la Teatrul Național', '/resurse/images/evenimente/5-opera.webp', 'muzica', 'classical',
        300.00, 240.00, '2024-09-10', 'purple', 'opera,classical', TRUE),
       (6, 'Techno Underground', 'Petrecere techno în club', '/resurse/images/evenimente/6-techno.webp', 'muzica', 'electronic',
        100.00, 80.00, '2024-05-02', 'red', 'techno,nightlife', TRUE),
       (7, 'Rap Battle', 'Concurs de rap la Sala Palatului', '/resurse/images/evenimente/7-rap-battle.webp', 'muzica', 'hip-hop',
        130.00, 110.00, '2024-05-16', 'grey', 'rap,competition', TRUE),
       (8, 'Blues at the Castle', 'Concert de blues la Castelul Bran', '/resurse/images/evenimente/8-blues-castle.webp', 'muzica',
        'blues', 160.00, 140.00, '2024-06-20', 'dark blue', 'blues,historical', TRUE),
       (9, 'Classic Meets Rock', 'Concert simfonic cu twist de rock', '/resurse/images/evenimente/9-classic-rock.webp', 'muzica',
        'hybrid', 220.00, 180.00, '2024-07-18', 'violet', 'symphony,rock', TRUE),
       (10, 'Indie Festival', 'Festival indie cu artiști internaționali', '/resurse/images/evenimente/10-indie-fest.webp', 'muzica',
        'indie', 140.00, 120.00, '2024-08-08', 'orange', 'indie,music festival', TRUE);


-- Sport
INSERT INTO evenimente (id, nume, descriere, imagine, categorie_1, categorie_2, pret, pret_studenti, data, culoare, tags,
                        activ)
VALUES (11, 'Maraton București', 'Maraton anual în capitala României', '/resurse/images/evenimente/11-marathon.webp', 'sport',
        'running', 50.00, 40.00, '2024-10-15', 'red', 'marathon,running', TRUE),
       (12, 'Cupa Transilvania la Tenis', 'Turneu de tenis la Cluj-Napoca', '/resurse/images/evenimente/12-tennis.webp', 'sport',
        'tennis', 60.00, 50.00, '2024-06-01', 'blue', 'tennis,tournament', TRUE),
       (13, 'Raliul Carpaților', 'Competiție automobilistică prin munții Carpați', '/resurse/images/evenimente/13-rally.webp', 'sport',
        'motorsport', 120.00, 100.00, '2024-08-15', 'black', 'rally,cars', TRUE),
       (14, 'Triatlon Sibiu', 'Triatlon anual care include înot, ciclism și alergare', '/resurse/images/evenimente/14-triathlon.webp',
        'sport', 'triathlon', 150.00, 130.00, '2024-07-10', 'green', 'triathlon,challenge', TRUE),
       (15, 'Campionatul Național de Fotbal', 'Meciuri de fotbal între echipele naționale',
        '/resurse/images/evenimente/15-football.webp', 'sport', 'football', 80.00, 60.00, '2024-09-20', 'red', 'football,national',
        TRUE),
       (16, 'Turneul de Volei pe Plajă', 'Competiție de volei pe plajă la Constanța', '/resurse/images/evenimente/16-beach-volley.webp',
        'sport', 'volleyball', 40.00, 30.00, '2024-08-05', 'yellow', 'volleyball,beach', TRUE),
       (17, 'Campionatul de Baschet 3x3', 'Campionat de baschet în format 3x3 la București',
        '/resurse/images/evenimente/17-basketball.webp', 'sport', 'basketball', 70.00, 50.00, '2024-10-01', 'orange',
        'basketball,3x3', TRUE),
       (18, 'Competiție de Skateboarding', 'Competiție de skateboarding pentru tineri',
        '/resurse/images/evenimente/18-skateboarding.webp', 'sport', 'skateboarding', 35.00, 25.00, '2024-05-25', 'purple',
        'skateboarding,youth', TRUE),
       (19, 'Turneul de Badminton', 'Turneu național de badminton', '/resurse/images/evenimente/19-badminton.webp', 'sport',
        'badminton', 55.00, 45.00, '2024-11-07', 'pink', 'badminton,tournament', TRUE),
       (20, 'Cursa Ciclistă prin Banat', 'Cursă de ciclism pe un traseu pitoresc prin Banat',
        '/resurse/images/evenimente/20-cycling.webp', 'sport', 'cycling', 65.00, 55.00, '2024-09-12', 'grey',
        'cycling,scenic route', TRUE);

-- Arta
INSERT INTO evenimente (id, nume, descriere, imagine, categorie_1, categorie_2, pret, pret_studenti, data, culoare, tags,
                        activ)
VALUES (21, 'Sculpture in the Park', 'Expoziție de sculptură în aer liber', '/resurse/images/evenimente/21-sculpture.webp', 'arta',
        'sculpture', 35.00, 30.00, '2024-04-20', 'gray', 'sculpture,outdoor', TRUE),
       (22, 'Modern Art Biennale', 'Bienala de artă modernă cu artiști internaționali', '/resurse/images/evenimente/22-modern-art.webp',
        'arta', 'contemporary', 50.00, 40.00, '2024-05-15', 'white', 'contemporary art,biennale', TRUE),
       (23, 'Medieval Art Festival', 'Festival dedicat artei medievale', '/resurse/images/evenimente/23-medieval-art.webp', 'arta',
        'medieval', 45.00, 35.00, '2024-06-05', 'brown', 'medieval,history', TRUE),
       (24, 'Photography Exhibition', 'Expoziție de fotografie de natură', '/resurse/images/evenimente/24-photography.webp', 'arta',
        'photography', 30.00, 25.00, '2024-07-25', 'green', 'photography,nature', TRUE),
       (25, 'Film and Culture Festival', 'Festival de film și cultură', '/resurse/images/evenimente/25-film-festival.webp', 'arta',
        'film', 60.00, 50.00, '2024-08-20', 'black', 'film,culture', TRUE),
       (26, 'Street Art Tour', 'Tur al artei stradale din București', '/resurse/images/evenimente/26-street-art.webp', 'arta',
        'street art', 20.00, 15.00, '2024-09-10', 'vivid', 'street art,walking tour', TRUE),
       (27, 'Classical Music and Visual Arts', 'Serată de muzică clasică acompaniată de artă vizuală',
        '/resurse/images/evenimente/27-classical-music-art.webp', 'arta', 'multimedia', 70.00, 55.00, '2024-10-03', 'purple',
        'classical music,visual arts', TRUE),
       (28, 'Interactive Art Workshop', 'Atelier interactiv de creație artistică', '/resurse/images/evenimente/28-workshop.webp',
        'arta', 'workshop', 25.00, 20.00, '2024-11-15', 'blue', 'workshop,interactive', TRUE),
       (29, 'Theatre Arts Festival', 'Festival de teatru cu spectacole inovative', '/resurse/images/evenimente/29-theatre.webp',
        'arta', 'theatre', 55.00, 45.00, '2024-12-05', 'red', 'theatre,festival', TRUE),
       (30, 'Art Expo', 'Expoziție de artă modernă la Muzeul de Artă', '/resurse/images/evenimente/30-art-expo.webp', 'arta', 'modern art', 30.00, 25.00, '2024-11-20', 'white', 'art', TRUE);
