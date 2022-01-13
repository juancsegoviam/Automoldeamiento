const path = require('path');
const express = require('express');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const DIST_DIR = path.join(__dirname, '/dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');


app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(DIST_DIR));
app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL, {
 useNewUrlParser:true
})
.then(() => {
    console.log('Database connected')
}).catch(err => {
    console.error('Unsuccesfull connect', err)
})

dataMatrix.save()
    .then(result => {
      console.log(result);
      mongoose.connection.close();
     })
     .catch(err => {
       console.log(err)
     })


app.listen(PORT, () => {

});