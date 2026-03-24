const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // ensinar a API a ler e entender dados que chegam no formato JSON no corpo da requisição

require('./src/index')(app);
app.use(express.static('public'));

app.use(express.static('public'));

app.listen(3333);