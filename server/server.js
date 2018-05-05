const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');

var app = express();
app.use(express.static(publicPath));
// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Magic happen at ${port} port`)
});