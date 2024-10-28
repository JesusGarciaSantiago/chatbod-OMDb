const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// API Key de OMDb (obtén la tuya en https://www.omdbapi.com/apikey.aspx)
const API_KEY = '7e8f3f1e';
const BASE_URL = 'http://www.omdbapi.com/';

app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta para buscar películas
app.post('/search', async (req, res) => {
    const query = req.body.query;
    try {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&t=${query}`);
        const movie = response.data;

        if (movie.Response === 'True') {
            res.json({ movie });
        } else {
            res.status(404).json({ error: 'Película no encontrada.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al conectar con la API.');
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
