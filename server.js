const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const password = require('./password.js');
require('dotenv').config();

const app = express();
const DIST_DIR = path.join(__dirname, '/dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const connectionString = `mongodb+srv://CEICUDG:5HxKswzBdzBq%40EY@autoshaping0.6vxnd.mongodb.net/datos?retryWrites=true&w=majority`;

mongoose.connect(process.env.MONGO_URL, {
 
})
.then(() => {
    console.log('Database connected')
}).catch(err => {
    console.error('Unsuccesfull connect',err)
})


app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(DIST_DIR));
app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

});