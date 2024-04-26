const express = require('express');
const routes = express.Router();
const axios = require('axios');
const baseURL = 'https://api.steampowered.com/';
const storeURL = 'http://store.steampowered.com/';

// Rota app-list
routes.get('/', (req, res) => {
    axios.get(`${baseURL}ISteamApps/GetAppList/v2/`)
    .then((response) => {
/*         console.log(response.data); */
        res.send(response.data);
    })
    .catch((error) => {
        console.error('Erro ao buscar dados da Steam:', error);
        res.status(500).send('Erro ao buscar dados da Steam');
    });
});

// Rota user-info
routes.get('/userinfo/:steamid', (req, res) => {
    const STEAM_ID = req.params.steamid;
    axios.get(`${baseURL}ISteamUser/GetPlayerSummaries/v0002/?key=444828FF0F642DB0BDD366F115534715&steamids=${STEAM_ID}`).then((response) => {
        console.log(response.data);
        res.send(response.data);
    }).catch((error) => {
        console.error('Erro ao buscar dados da Steam:', error);
        res.status(500).send('Erro ao buscar dados da Steam');
    })
});

// Rota user-app-list 
routes.get('/userapps/:steamid', (req, res) => {
    const STEAM_ID = req.params.steamid;
    axios.get(`${baseURL}IPlayerService/GetOwnedGames/v0001/?key=444828FF0F642DB0BDD366F115534715&steamid=${STEAM_ID}&format=json`).then((response) => {
        console.log(response.data);
        res.send(response.data);
    }).catch((error) => {
        console.error('Erro ao buscar dados da Steam:', error);
        res.status(500).send('Erro ao buscar dados da Steam');
    })
});

// Rota app-info
routes.get('/appsinfo/:appid', (req, res) => {
    const APP_ID = req.params.appid;
    axios.get(`${storeURL}api/appdetails?appids=${APP_ID}`).then((response) => {
        if (response.data[APP_ID]) {
            const gameData = response.data[APP_ID].data;
            console.log(gameData);
            res.status(200).send({
                name: gameData.name,
                type: gameData.type,
                exchange: gameData.price_overview?.currency,
                price: gameData.price_overview?.final_formatted,
                header_image: gameData.header_image,
                coming_soon: gameData.release_date.coming_soon,
                date: gameData.release_date.date,
                rating: gameData.ratings?.esrb?.rating,
                rating_desc: gameData.ratings?.esrb?.descriptors,
                required_age: gameData.ratings?.esrb?.required_age,
            });
        } else {
            res.status(404).send('Jogo não encontrado');
        }
    }).catch((error) => {
        console.error('Erro ao buscar dados da Steam:', error);
        res.status(500).send('Erro ao buscar dados da Steam');
    });
});

// Rota user-friends
routes.get('/userfriends/:steamid', (req, res) => {
    const STEAM_ID = req.params.steamid;
    axios.get(`${baseURL}ISteamUser/GetFriendList/v0001/?key=444828FF0F642DB0BDD366F115534715&steamid=${STEAM_ID}&relationship=friend`).then((response) => {
            console.log(response.data);
            res.send(response.data);
        }).catch((error) => {
            console.error('Erro ao buscar dados da Steam:', error);
            res.status(500).send('Erro buscar dados da Steam');
        });
});

module.exports = routes;