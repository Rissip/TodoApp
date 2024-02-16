const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/', require('./src/route'));

app.listen(8000, () => {
  console.log(`Le serveur est en cours d'exécution sur le port 8000`);
});
