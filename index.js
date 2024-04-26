const express = require('express');
const routes = require('./routes')
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(routes)

app.listen(9000, () => {

})